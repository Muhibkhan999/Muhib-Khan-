import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

export type ProgressRef = { current: number };
const clamp = (v: number) => Math.max(0, Math.min(1, v));
const THREADS = [
  { y: -.76, z: .12, radius: .14, snap: .58 },
  { y: .75, z: .03, radius: .12, snap: .55 },
  { y: -.48, z: .38, radius: .20, snap: .66 },
  { y: .46, z: .40, radius: .18, snap: .64 },
  { y: -.24, z: -.32, radius: .22, snap: .70 },
  { y: .23, z: -.18, radius: .20, snap: .72 },
  { y: .02, z: .50, radius: .32, snap: .81 },
  { y: -.06, z: -.28, radius: .24, snap: .76 },
];
function distance(p: number) { return .72 + clamp((p - .08) / .73) * 2.40 + clamp((p - .81) / .19) * .5; }

// A sculpted, asymmetric mass; the inner edge stretches from the same local
// coordinates as the filaments, so their roots remain buried in the surface.
function makeBody(dir: number) {
  const geometry = new THREE.SphereGeometry(1, 64, 40);
  const positions = geometry.getAttribute("position");
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i), y = positions.getY(i), z = positions.getZ(i);
    const relief = 1 + .16 * Math.sin(y * 4.2 + z * 2.8) + .11 * Math.cos(x * 5 - y * 3) + .07 * Math.sin(z * 7 + y * 5);
    positions.setXYZ(i, x * relief * 1.18, y * relief * 1.22 + .13 * Math.sin(x * 3), z * relief * .80);
  }
  geometry.computeVertexNormals();
  geometry.userData.original = Float32Array.from(positions.array);
  geometry.userData.dir = dir;
  return geometry;
}
function makeTube() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(49 * 13 * 3);
  const indices: number[] = [];
  for (let i = 0; i < 48; i++) for (let j = 0; j < 12; j++) {
    const a = i * 13 + j, b = a + 13;
    indices.push(a, b, a + 1, b, b + 1, a + 1);
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
  geometry.setIndex(indices);
  return geometry;
}
function Filament({ index, progress, material }: { index: number; progress: ProgressRef; material: THREE.Material }) {
  const spec = THREADS[index];
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(makeTube, []);
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const p = progress.current, gap = distance(p), stretch = clamp((p - .08) / (spec.snap - .08));
    const broken = p >= spec.snap;
    const recoil = clamp((p - spec.snap) / .10);
    mesh.current.visible = !broken || recoil < 1;
    if (!mesh.current.visible) return;
    const position = geometry.getAttribute("position");
    // Roots are inside the masses, widening into a molten membrane.
    const ax = -gap + .72, bx = gap - .72, span = bx - ax;
    const waist = spec.radius / Math.sqrt(1 + span * 3.5);
    const sag = (.13 + .35 * (1 - stretch)) * Math.min(span, 2);
    for (let ring = 0; ring <= 48; ring++) {
      const u = ring / 48;
      const envelope = Math.sin(Math.PI * u);
      let x = ax + span * u;
      let cy = spec.y - sag * envelope + .025 * Math.sin(u * 9 + clock.elapsedTime * 1.3 + index) * envelope;
      const cz = spec.z + .06 * Math.sin(u * Math.PI * 2 + index) * envelope;
      // Broad bases blend into the body, thin in the middle, subtle necking.
      let radius = waist + spec.radius * 2.2 * Math.pow(Math.abs(2 * u - 1), 4);
      radius *= 1 + .10 * clamp((stretch - .65) / .35) * Math.sin(u * 31 + index);
      if (broken) {
        const side = u < .5 ? -1 : 1;
        const local = u < .5 ? u * 2 : (1 - u) * 2;
        const length = span * .48 * Math.exp(-recoil * 6) * (1 + .25 * Math.sin(recoil * 16));
        x = side < 0 ? ax + local * length : bx - local * length;
        cy = spec.y - local * (.20 + Math.sin(recoil * 10) * .12) * (1 - recoil);
        radius *= (1 - local * .92) * (1 - recoil * .55);
      }
      for (let side = 0; side <= 12; side++) {
        const angle = side / 12 * Math.PI * 2;
        position.setXYZ(ring * 13 + side, x, cy + Math.cos(angle) * radius, cz + Math.sin(angle) * radius * .7);
      }
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });
  return <mesh ref={mesh} geometry={geometry} material={material} frustumCulled={false} />;
}
function Sculpture({ progress, onReady }: { progress: ProgressRef; onReady: () => void }) {
  const left = useRef<THREE.Mesh>(null), right = useRef<THREE.Mesh>(null);
  const ready = useRef(false);
  const bodies = useMemo(() => [makeBody(-1), makeBody(1)], []);
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({ roughness: .28, metalness: 0, clearcoat: .7, clearcoatRoughness: .22, sheen: .25, side: THREE.DoubleSide }), []);
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    material.color.set(css.getPropertyValue("--tear-body").trim());
    material.sheenColor.set(css.getPropertyValue("--tear-rim").trim());
    return () => material.dispose();
  }, [material]);
  useFrame((state, rawDelta) => {
    if (!ready.current) { ready.current = true; requestAnimationFrame(onReady); }
    const p = progress.current, pull = clamp((p - .08) / .73);
    for (const [mesh, dir] of [[left.current, -1], [right.current, 1]] as const) {
      if (!mesh) continue;
      mesh.position.x = dir * distance(p);
      const pos = mesh.geometry.getAttribute("position");
      const original = mesh.geometry.userData.original as Float32Array;
      for (let i = 0; i < pos.count; i++) {
        const x = original[i * 3], y = original[i * 3 + 1], z = original[i * 3 + 2];
        const inner = clamp((-dir * x + .2) / 1.5);
        pos.setXYZ(i, x - dir * inner * pull * .30, y * (1 - pull * .09) + .035 * Math.sin(x * 4 + state.clock.elapsedTime) * (1 - inner), z);
      }
      pos.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    }
  });
  return <>
    <mesh ref={left} geometry={bodies[0]} material={material} frustumCulled={false} />
    <mesh ref={right} geometry={bodies[1]} material={material} rotation-x={.12} frustumCulled={false} />
    {THREADS.map((_, i) => <Filament key={i} index={i} progress={progress} material={material} />)}
  </>;
}
function Framing() {
  const { camera, size } = useThree();
  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    // Visible width is 11.5 units: sculpture occupies most of the screen,
    // without pushing either half outside the camera during the final reveal.
    perspective.position.z = Math.max(6.4, 5.75 / (Math.tan(perspective.fov * Math.PI / 360) * size.width / size.height));
    perspective.updateProjectionMatrix();
  }, [camera, size]);
  return null;
}
export default function CheesePullScene({ progress, active, onReady }: { progress: ProgressRef; active: boolean; onReady: () => void }) {
  return <Canvas dpr={[1, 1.5]} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 9], fov: 40 }} gl={{ antialias: true, alpha: true }}>
    <Framing />
    <ambientLight intensity={.8} />
    <directionalLight position={[2, 5, 7]} intensity={2.2} />
    <Suspense fallback={null}>
      <Environment resolution={64}>
        <Lightformer intensity={3} position={[-3, 5, 3]} scale={[8, 4, 1]} />
        <Lightformer intensity={1.5} position={[4, 0, 3]} scale={[3, 8, 1]} />
      </Environment>
      <Sculpture progress={progress} onReady={onReady} />
    </Suspense>
  </Canvas>;
}
