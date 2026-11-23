"use client";
import { Edges } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/*
  Maqueta 3D que se construye fase a fase:
  0 parcela + curvas de nivel · 1 volúmenes en alambre · 2 volúmenes sólidos
  3 forjados, huecos y cotas · 4 materiales · 5 casa terminada con luz y jardín.
*/

const INK = "#151514";
const PAPER = "#f3efe8";
const BRONZE = "#a8814f";

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function Contours({ phaseRef }: { phaseRef: { current: number } }) {
  const ref = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const arr: THREE.Vector3[][] = [];
    for (let k = 0; k < 7; k++) {
      const pts: THREE.Vector3[] = [];
      const r = 7 + k * 1.6;
      for (let i = 0; i <= 90; i++) {
        const a = (i / 90) * Math.PI * 2;
        const wob = Math.sin(a * 3 + k) * 0.6 + Math.cos(a * 2 - k * 0.5) * 0.5;
        pts.push(new THREE.Vector3(Math.cos(a) * (r + wob) * 1.2, -0.01, Math.sin(a) * (r + wob)));
      }
      arr.push(pts);
    }
    return arr.map((pts) => new THREE.BufferGeometry().setFromPoints(pts));
  }, []);
  useFrame(() => {
    const o = 1 - smooth(3.5, 5, phaseRef.current) * 0.6;
    ref.current?.children.forEach((c, i) => {
      const m = (c as THREE.Line).material as THREE.LineBasicMaterial;
      m.opacity = o * smooth(i * 0.08, 0.4 + i * 0.08, phaseRef.current + 0.6) * 0.35;
    });
  });
  return (
    <group ref={ref}>
      {lines.map((g, i) => (
        <primitive key={i} object={new THREE.Line(g, new THREE.LineBasicMaterial({ color: INK, transparent: true, opacity: 0 }))} />
      ))}
    </group>
  );
}

function Parcel({ phaseRef }: { phaseRef: { current: number } }) {
  const geo = useMemo(() => {
    const pts = [
      new THREE.Vector3(-8, 0, -6),
      new THREE.Vector3(8.5, 0, -6.5),
      new THREE.Vector3(9, 0, 6),
      new THREE.Vector3(-7.5, 0, 6.5),
      new THREE.Vector3(-8, 0, -6),
    ];
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    return g;
  }, []);
  const line = useMemo(() => {
    const m = new THREE.LineDashedMaterial({ color: BRONZE, dashSize: 0.4, gapSize: 0.25, transparent: true });
    const l = new THREE.Line(geo, m);
    l.computeLineDistances();
    return l;
  }, [geo]);
  useFrame(() => {
    (line.material as THREE.LineDashedMaterial).opacity = smooth(0, 0.5, phaseRef.current + 0.5);
  });
  return <primitive object={line} />;
}

function Volume({
  position,
  size,
  phaseRef,
  appear,
  material = "white",
}: {
  position: [number, number, number];
  size: [number, number, number];
  phaseRef: { current: number };
  appear: number;
  material?: "white" | "wood" | "stone";
}) {
  const g = useRef<THREE.Group>(null);
  const solid = useRef<THREE.MeshBasicMaterial>(null);
  const colors = { white: "#f7f4ee", wood: "#a07a52", stone: "#cfc6b6" };
  useFrame(() => {
    const p = phaseRef.current;
    const a = smooth(appear, appear + 0.5, p);
    if (g.current) {
      g.current.scale.y = Math.max(a, 0.001);
      g.current.visible = a > 0.001;
    }
    if (solid.current) {
      solid.current.opacity = smooth(1.8, 2.6, p);
      const base = new THREE.Color("#f7f4ee");
      const target = new THREE.Color(colors[material]);
      solid.current.color.copy(base.lerp(target, smooth(3.8, 4.6, p)));
    }
  });
  return (
    <group ref={g} position={[position[0], position[1] - size[1] / 2, position[2]]}>
      <mesh position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshBasicMaterial ref={solid} color="#f7f4ee" transparent opacity={0} />
        <Edges color={INK} threshold={15} />
      </mesh>
    </group>
  );
}

function Windows({ phaseRef }: { phaseRef: { current: number } }) {
  const mats = useRef<THREE.MeshBasicMaterial[]>([]);
  const items: { p: [number, number, number]; s: [number, number] }[] = [
    { p: [-1.5, 1.35, 2.51], s: [4.2, 2.1] },
    { p: [2.8, 1.35, 2.51], s: [1.6, 2.1] },
    { p: [0.6, 4.35, 2.01], s: [3.6, 1.6] },
    { p: [4.01, 1.35, 0], s: [0.01, 0] },
  ];
  useFrame(() => {
    const p = phaseRef.current;
    mats.current.forEach((m) => {
      if (!m) return;
      m.opacity = smooth(2.8, 3.4, p);
      m.color.lerpColors(new THREE.Color(INK), new THREE.Color("#f1c98f"), smooth(5, 5.6, p));
    });
  });
  return (
    <group>
      {items.slice(0, 3).map((w, i) => (
        <mesh key={i} position={w.p}>
          <planeGeometry args={w.s} />
          <meshBasicMaterial ref={(m) => { if (m) mats.current[i] = m; }} transparent opacity={0} color={INK} />
        </mesh>
      ))}
    </group>
  );
}

function Pool({ phaseRef }: { phaseRef: { current: number } }) {
  const m = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    if (m.current) m.current.opacity = smooth(4.2, 5, phaseRef.current) * 0.9;
  });
  return (
    <mesh position={[1.2, 0.02, 5]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 2]} />
      <meshBasicMaterial ref={m} color="#6fa3a8" transparent opacity={0} />
    </mesh>
  );
}

function Trees({ phaseRef }: { phaseRef: { current: number } }) {
  const g = useRef<THREE.Group>(null);
  const spots: [number, number, number][] = [
    [-6.5, 0, 3.5],
    [-6, 0, -3.5],
    [6.8, 0, -3],
    [7.5, 0, 3.8],
    [-3.5, 0, -5],
  ];
  useFrame(() => {
    g.current?.children.forEach((c, i) => {
      const s = smooth(4.8 + i * 0.12, 5.5 + i * 0.12, phaseRef.current);
      c.scale.setScalar(Math.max(s, 0.001));
    });
  });
  return (
    <group ref={g}>
      {spots.map((p, i) => (
        <group key={i} position={p}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 1.4, 6]} />
            <meshBasicMaterial color={INK} />
          </mesh>
          <mesh position={[0, 1.9, 0]}>
            <icosahedronGeometry args={[0.9 + (i % 2) * 0.3, 0]} />
            <meshBasicMaterial color="#8d9a86" />
            <Edges color={INK} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Dimensions({ phaseRef }: { phaseRef: { current: number } }) {
  const ref = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const segs = [
      [new THREE.Vector3(-4, 0.01, 3.4), new THREE.Vector3(4, 0.01, 3.4)],
      [new THREE.Vector3(-4, 0.01, 3.2), new THREE.Vector3(-4, 0.01, 3.6)],
      [new THREE.Vector3(4, 0.01, 3.2), new THREE.Vector3(4, 0.01, 3.6)],
      [new THREE.Vector3(4.9, 0.01, -2.5), new THREE.Vector3(4.9, 0.01, 2.5)],
      [new THREE.Vector3(4.7, 0.01, -2.5), new THREE.Vector3(5.1, 0.01, -2.5)],
      [new THREE.Vector3(4.7, 0.01, 2.5), new THREE.Vector3(5.1, 0.01, 2.5)],
      [new THREE.Vector3(-4.6, 0, -2.5), new THREE.Vector3(-4.6, 6, -2.5)],
    ];
    return segs.map((s) => new THREE.Line(new THREE.BufferGeometry().setFromPoints(s), new THREE.LineBasicMaterial({ color: BRONZE, transparent: true, opacity: 0 })));
  }, []);
  useFrame(() => {
    const o = smooth(2.9, 3.4, phaseRef.current) * (1 - smooth(4.6, 5.2, phaseRef.current));
    lines.forEach((l) => ((l.material as THREE.LineBasicMaterial).opacity = o));
  });
  return (
    <group ref={ref}>
      {lines.map((l, i) => (
        <primitive key={i} object={l} />
      ))}
    </group>
  );
}

function Scene({ phase }: { phase: { current: number } }) {
  const smoothPhase = useRef(0);
  const root = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    smoothPhase.current += (phase.current - smoothPhase.current) * Math.min(dt * 3, 1);
    const p = smoothPhase.current;
    if (root.current) root.current.rotation.y = -0.6 + p * 0.22 + state.pointer.x * 0.08;
    const cam = state.camera;
    const aspect = state.size.width / state.size.height;
    const fit = Math.min(Math.max(1, 1.1 / aspect), 2.1);
    const dist = (30 - p * 1.4) * fit;
    const elev = (16 - p * 1.6) * fit;
    cam.position.set(dist * 0.62, elev, dist * 0.78);
    cam.lookAt(0, 1.2, 0);
  });
  return (
    <group ref={root}>
      <gridHelper args={[40, 40, "#c9c0b0", "#ddd5c7"]} position={[0, -0.02, 0]} />
      <Contours phaseRef={smoothPhase} />
      <Parcel phaseRef={smoothPhase} />
      {/* planta baja */}
      <Volume position={[-0.5, 1.5, 0]} size={[9, 3, 5]} phaseRef={smoothPhase} appear={0.8} material="stone" />
      {/* planta alta en voladizo */}
      <Volume position={[0.8, 4.5, -0.5]} size={[6.5, 3, 5]} phaseRef={smoothPhase} appear={1.2} material="wood" />
      {/* pieza auxiliar */}
      <Volume position={[-6, 1.2, -1]} size={[2.5, 2.4, 3.2]} phaseRef={smoothPhase} appear={1.5} />
      <Windows phaseRef={smoothPhase} />
      <Dimensions phaseRef={smoothPhase} />
      <Pool phaseRef={smoothPhase} />
      <Trees phaseRef={smoothPhase} />
    </group>
  );
}

export default function ProcessHouse({ phase }: { phase: { current: number } }) {
  return (
    <Canvas linear flat dpr={[1, 1.75]} camera={{ fov: 30, position: [16, 15, 20] }} gl={{ antialias: true, alpha: true }}>
      <Scene phase={phase} />
    </Canvas>
  );
}

export { PAPER };
