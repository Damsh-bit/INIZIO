"use client";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/*
  Anillo 3D de proyectos. El scroll de la sección (progress 0..1) gira el anillo,
  y además se puede arrastrar. El proyecto de frente se muestra a color y el resto en
  escala de grises; las láminas se curvan para seguir el cilindro.
*/

const vertex = /* glsl */ `
uniform float uBend;
uniform float uVel;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  p.z -= (p.x * p.x) * uBend;
  p.y += sin(uv.x * 3.14159) * uVel * 0.25;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uImg;
uniform vec2 uPlane;
uniform float uActive;
uniform float uHover;
varying vec2 vUv;
void main() {
  float rp = uPlane.x / uPlane.y; float ri = uImg.x / uImg.y;
  vec2 s = rp > ri ? vec2(1.0, ri / rp) : vec2(rp / ri, 1.0);
  float z = 1.0 - 0.08 * uHover;
  vec2 uv = (vUv - 0.5) * s * z + 0.5;
  vec3 c = texture2D(uTex, uv).rgb;
  float g = dot(c, vec3(0.299, 0.587, 0.114));
  vec3 gray = mix(vec3(g), vec3(0.95, 0.93, 0.89), 0.15);
  c = mix(gray * 0.85, c, uActive);
  gl_FragColor = vec4(c, 1.0);
}
`;

export type RingItem = { slug: string; image: string; name: string };

type Props = {
  items: RingItem[];
  progress: { current: number };
  onActive: (i: number) => void;
  onOpen: (slug: string) => void;
};

function Card({
  item,
  index,
  count,
  radius,
  w,
  h,
  activeRef,
  velRef,
  onOpen,
}: {
  item: RingItem;
  index: number;
  count: number;
  radius: number;
  w: number;
  h: number;
  activeRef: { current: number };
  velRef: { current: number };
  onOpen: (slug: string) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const hover = useRef(0);
  const hovered = useRef(false);
  const tex = useMemo(() => {
    const t = new THREE.TextureLoader().load(item.image, (tx) => {
      const im = tx.image as HTMLImageElement;
      uniforms.uImg.value.set(im.width, im.height);
    });
    t.colorSpace = THREE.NoColorSpace;
    return t;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.image]);
  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uImg: { value: new THREE.Vector2(1, 1) },
      uPlane: { value: new THREE.Vector2(w, h) },
      uActive: { value: 0 },
      uHover: { value: 0 },
      uBend: { value: 0.5 / radius },
      uVel: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tex]
  );
  uniforms.uPlane.value.set(w, h);
  uniforms.uBend.value = 0.5 / radius;

  const angle = (index / count) * Math.PI * 2;

  useFrame((_, dt) => {
    const isActive = activeRef.current === index ? 1 : 0;
    uniforms.uActive.value += (isActive - uniforms.uActive.value) * Math.min(dt * 5, 1);
    hover.current += ((hovered.current ? 1 : 0) - hover.current) * Math.min(dt * 6, 1);
    uniforms.uHover.value = hover.current;
    uniforms.uVel.value = velRef.current;
    if (mesh.current) {
      const s = 1 + hover.current * 0.04;
      mesh.current.scale.set(s, s, 1);
    }
  });

  return (
    <group rotation={[0, angle, 0]}>
      <mesh
        ref={mesh}
        position={[0, 0, radius]}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.dataset.ringHover = "1";
        }}
        onPointerOut={() => {
          hovered.current = false;
          delete document.body.dataset.ringHover;
        }}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          if (Math.abs(velRef.current) < 0.02) onOpen(item.slug);
        }}
      >
        <planeGeometry args={[w, h, 32, 8]} />
        <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Ring({ items, progress, onActive, onOpen }: Props) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const count = items.length;
  const mobile = size.width < 768;
  const w = mobile ? 2.6 : 3.2;
  const h = w * 1.25;
  const radius = (count * (w + (mobile ? 0.5 : 0.7))) / (Math.PI * 2);
  const activeRef = useRef(0);
  const velRef = useRef(0);
  const drag = useRef({ on: false, x: 0, offset: 0, target: 0 });
  const rot = useRef(0);

  useEffect(() => {
    const el = document.querySelector("[data-ring-canvas]") as HTMLElement | null;
    if (!el) return;
    const down = (e: PointerEvent) => {
      drag.current.on = true;
      drag.current.x = e.clientX;
    };
    const move = (e: PointerEvent) => {
      if (!drag.current.on) return;
      const dx = e.clientX - drag.current.x;
      drag.current.x = e.clientX;
      drag.current.target += dx * 0.005;
    };
    const up = () => (drag.current.on = false);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  useFrame((state, dt) => {
    dt = Math.min(dt, 0.05);
    drag.current.offset += (drag.current.target - drag.current.offset) * Math.min(dt * 6, 1);
    const target = -progress.current * Math.PI * 2 * ((count - 1) / count) + drag.current.offset;
    const prev = rot.current;
    rot.current += (target - rot.current) * Math.min(dt * 4, 1);
    velRef.current += ((rot.current - prev) * 6 - velRef.current) * 0.2;
    if (group.current) {
      group.current.rotation.y = rot.current;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.04, 0.05);
    }
    const step = (Math.PI * 2) / count;
    let a = Math.round(-rot.current / step) % count;
    if (a < 0) a += count;
    if (a !== activeRef.current) {
      activeRef.current = a;
      onActive(a);
    }
    state.camera.position.z = radius + (mobile ? 9 : 10);
    state.camera.position.y = 0;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={group} position={[0, mobile ? 0.3 : 0, 0]} scale={viewport.width < 5 ? 0.8 : 1}>
      {items.map((it, i) => (
        <Card
          key={it.slug}
          item={it}
          index={i}
          count={count}
          radius={radius}
          w={w}
          h={h}
          activeRef={activeRef}
          velRef={velRef}
          onOpen={onOpen}
        />
      ))}
    </group>
  );
}

export default function ProjectsRing(props: Props) {
  return (
    <div data-ring-canvas className="absolute inset-0 touch-pan-y" data-cursor="Arrastrar">
      <Canvas linear flat dpr={[1, 1.75]} camera={{ fov: 35, position: [0, 0, 14] }}>
        <Ring {...props} />
      </Canvas>
    </div>
  );
}
