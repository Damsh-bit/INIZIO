"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/*
  Hero "Del plano a la obra": cada proyecto aparece primero como un dibujo técnico
  (detección de bordes sobre la foto + retícula), y se construye de abajo arriba hasta
  la fotografía real. El cursor funciona como una lente de rayos X que invierte el estado.
*/

const vertex = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec2 uResA;
uniform vec2 uResB;
uniform vec2 uRes;
uniform float uMix;      // 0 = A, 1 = B (solo en estado plano)
uniform float uBuild;    // 0 = plano, 1 = foto
uniform vec2 uMouse;
uniform float uLens;
uniform float uTime;
uniform float uScroll;

vec2 coverUv(vec2 uv, vec2 img) {
  float rs = uRes.x / uRes.y; float ri = img.x / img.y;
  vec2 scale = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  vec2 o = (uv - 0.5) * scale + 0.5;
  o.y += uScroll * 0.08;
  return o;
}

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y);
}

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

float edges(sampler2D t, vec2 uv, vec2 res) {
  vec2 px = 1.4 / res;
  float tl = luma(texture2D(t, uv + px*vec2(-1, 1)).rgb);
  float  l = luma(texture2D(t, uv + px*vec2(-1, 0)).rgb);
  float bl = luma(texture2D(t, uv + px*vec2(-1,-1)).rgb);
  float  tp = luma(texture2D(t, uv + px*vec2( 0, 1)).rgb);
  float  b = luma(texture2D(t, uv + px*vec2( 0,-1)).rgb);
  float tr = luma(texture2D(t, uv + px*vec2( 1, 1)).rgb);
  float  r = luma(texture2D(t, uv + px*vec2( 1, 0)).rgb);
  float br = luma(texture2D(t, uv + px*vec2( 1,-1)).rgb);
  float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
  float gy = -tl - 2.0*tp - tr + bl + 2.0*b + br;
  return smoothstep(0.28, 0.75, length(vec2(gx, gy)));
}

vec3 blueprint(vec2 uv, float e) {
  vec3 bg = vec3(0.075, 0.08, 0.078);
  vec3 line = vec3(0.93, 0.9, 0.85);
  vec2 g = uv * uRes / 48.0;
  vec2 gf = abs(fract(g) - 0.5);
  float grid = (1.0 - smoothstep(0.0, 0.03, min(gf.x, gf.y))) * 0.07;
  vec2 g2 = uv * uRes / 240.0;
  vec2 gf2 = abs(fract(g2) - 0.5);
  grid += (1.0 - smoothstep(0.0, 0.006, min(gf2.x, gf2.y))) * 0.08;
  return bg + line * grid + line * e * 0.7;
}

void main() {
  vec2 uv = vUv;
  vec2 ua = coverUv(uv, uResA);
  vec2 ub = coverUv(uv, uResB);
  vec3 photoA = texture2D(uTexA, ua).rgb;
  vec3 photoB = texture2D(uTexB, ub).rgb;
  float eA = edges(uTexA, ua, uResA);
  float eB = edges(uTexB, ub, uResB);

  // transición entre planos con barrido de ruido
  float n = noise(uv * 6.0 + uTime * 0.1);
  float mixMask = smoothstep(uMix - 0.15, uMix + 0.15, uv.x * 0.7 + n * 0.3);
  mixMask = 1.0 - mixMask;
  float e = mix(eA, eB, mixMask);
  vec3 bp = blueprint(uv, e);
  vec3 photo = mix(photoA, photoB, step(0.5, uMix));

  // construcción de abajo arriba
  float bn = noise(uv * vec2(14.0, 3.0) + 3.0) * 0.12;
  float buildMask = smoothstep(uBuild * 1.25 - 0.08, uBuild * 1.25, 1.0 - uv.y + bn);
  buildMask = 1.0 - buildMask;
  float front = smoothstep(0.0, 0.015, abs((1.0 - uv.y + bn) - uBuild * 1.25 + 0.04));
  vec3 state = mix(bp, photo, buildMask);
  vec3 inv = mix(photo, bp, buildMask);

  // lente del cursor
  float aspect = uRes.x / uRes.y;
  vec2 d = (uv - uMouse) * vec2(aspect, 1.0);
  float r = 0.17 + 0.012 * sin(uTime * 2.0);
  float lens = (1.0 - smoothstep(r - 0.006, r, length(d))) * uLens;
  float ring = (smoothstep(r - 0.006, r, length(d)) - smoothstep(r, r + 0.004, length(d))) * uLens;
  vec3 col = mix(state, inv, lens);
  col += vec3(0.66, 0.5, 0.31) * ring * 0.9;
  col = mix(col + vec3(0.66, 0.5, 0.31) * 0.6, col, front) ;

  // viñeta para legibilidad del texto
  float vig = smoothstep(1.2, 0.3, length((uv - vec2(0.3, 0.35)) * vec2(1.0, 1.2)));
  col *= mix(0.55, 1.0, vig);
  col *= mix(0.5, 1.0, smoothstep(0.0, 0.55, uv.y));
  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  images: string[];
  onIndex?: (i: number) => void;
  scroll?: { current: number };
};

function Plane({ images, onIndex, scroll }: Props) {
  const { size, viewport } = useThree();
  const textures = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return images.map((src) => {
      const t = loader.load(src, (tex) => {
        const img = tex.image as HTMLImageElement;
        tex.userData.res = new THREE.Vector2(img.width, img.height);
      });
      t.colorSpace = THREE.NoColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
      t.userData.res = new THREE.Vector2(16, 9);
      return t;
    });
  }, [images]);

  const uniforms = useMemo(
    () => ({
      uTexA: { value: textures[0] },
      uTexB: { value: textures[1 % textures.length] },
      uResA: { value: new THREE.Vector2(16, 9) },
      uResB: { value: new THREE.Vector2(16, 9) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMix: { value: 0 },
      uBuild: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.7, 0.5) },
      uLens: { value: 0 },
      uTime: { value: 0 },
      uScroll: { value: 0 },
    }),
    [textures]
  );

  const state = useRef({ idx: 0, t: 0, phase: "build" as "build" | "hold" | "unbuild" | "swap", lens: 0, target: new THREE.Vector2(0.7, 0.5), active: false });

  useEffect(() => {
    const move = (e: PointerEvent) => {
      state.current.target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
      state.current.active = e.pointerType === "mouse";
    };
    const leave = () => (state.current.active = false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  useFrame((_, dt) => {
    const s = state.current;
    const u = uniforms;
    dt = Math.min(dt, 0.05);
    u.uTime.value += dt;
    u.uRes.value.set(size.width * viewport.dpr, size.height * viewport.dpr);
    u.uScroll.value = scroll?.current ?? 0;
    s.t += dt;
    const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
    if (s.phase === "build") {
      u.uBuild.value = ease(Math.min(s.t / 2.6, 1));
      if (s.t > 2.6) { s.phase = "hold"; s.t = 0; }
    } else if (s.phase === "hold") {
      if (s.t > 4.2) { s.phase = "unbuild"; s.t = 0; }
    } else if (s.phase === "unbuild") {
      u.uBuild.value = 1 - ease(Math.min(s.t / 1.4, 1));
      if (s.t > 1.4) { s.phase = "swap"; s.t = 0; }
    } else if (s.phase === "swap") {
      u.uMix.value = ease(Math.min(s.t / 1.2, 1));
      if (s.t > 1.2) {
        s.idx = (s.idx + 1) % textures.length;
        u.uTexA.value = textures[s.idx];
        u.uTexB.value = textures[(s.idx + 1) % textures.length];
        u.uMix.value = 0;
        s.phase = "build"; s.t = 0;
        onIndex?.(s.idx);
      }
    }
    u.uResA.value.copy(u.uTexA.value.userData.res);
    u.uResB.value.copy(u.uTexB.value.userData.res);
    s.lens += ((s.active ? 1 : 0) - s.lens) * Math.min(dt * 5, 1);
    u.uLens.value = s.lens;
    u.uMouse.value.lerp(s.target, Math.min(dt * 8, 1));
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
}

export default function BlueprintHero(props: Props) {
  return (
    <Canvas linear flat dpr={[1, 1.75]} gl={{ antialias: false, powerPreference: "high-performance" }} className="!absolute inset-0">
      <Plane {...props} />
    </Canvas>
  );
}
