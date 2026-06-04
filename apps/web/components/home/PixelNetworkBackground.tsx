"use client";

import { useEffect, useRef } from "react";

const PRIMARY = { r: 7, g: 62, b: 253 };
const SPACING = 28;
const PIXEL_SIZE = 3;
const POINTER_RADIUS = 200;
const GLOBAL_ALPHA = 0.52;

type Node = { x: number; y: number; ix: number; iy: number; phase: number };
type Edge = { a: number; b: number; len: number };

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

function buildMesh(width: number, height: number) {
  const cols = Math.max(8, Math.floor(width / SPACING));
  const rows = Math.max(6, Math.floor(height / SPACING));
  const padX = (width - (cols - 1) * SPACING) / 2;
  const padY = (height - (rows - 1) * SPACING) / 2;

  const nodes: Node[] = [];
  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      const jitter = (ix * 7 + iy * 13) % 5;
      nodes.push({
        x: padX + ix * SPACING + (jitter - 2) * 0.4,
        y: padY + iy * SPACING + ((ix + iy) % 4 - 1.5) * 0.4,
        ix,
        iy,
        phase: (ix * 0.31 + iy * 0.47) * Math.PI,
      });
    }
  }

  const index = (ix: number, iy: number) => iy * cols + ix;
  const edges: Edge[] = [];
  const seen = new Set<string>();

  const addEdge = (a: number, b: number) => {
    if (a === b) return;
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (seen.has(key)) return;
    seen.add(key);
    const dx = nodes[a].x - nodes[b].x;
    const dy = nodes[a].y - nodes[b].y;
    edges.push({ a, b, len: Math.hypot(dx, dy) });
  };

  for (let iy = 0; iy < rows; iy++) {
    for (let ix = 0; ix < cols; ix++) {
      const i = index(ix, iy);
      if (ix < cols - 1) addEdge(i, index(ix + 1, iy));
      if (iy < rows - 1) addEdge(i, index(ix, iy + 1));
      if (ix < cols - 1 && iy < rows - 1) addEdge(i, index(ix + 1, iy + 1));
      if (ix > 0 && iy < rows - 1) addEdge(i, index(ix - 1, iy + 1));
    }
  }

  return { nodes, edges };
}

function pointerInfluence(
  x: number,
  y: number,
  pointer: PointerState
): number {
  if (!pointer.active) return 0;
  const dist = Math.hypot(x - pointer.x, y - pointer.y);
  const sigma = POINTER_RADIUS * 0.55;
  return Math.exp(-(dist * dist) / (2 * sigma * sigma));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function PixelNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<ReturnType<typeof buildMesh> | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const targetPointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const smoothPointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const section = canvas.closest("section");
    const interactionRoot = section ?? canvas.parentElement;
    if (!interactionRoot) return;

    const mount = canvas.parentElement;
    if (!mount) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      meshRef.current = buildMesh(w, h);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = interactionRoot.getBoundingClientRect();
      targetPointerRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        active: true,
      };
    };

    const onPointerLeave = () => {
      targetPointerRef.current.active = false;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    interactionRoot.addEventListener("pointermove", onPointerMove, true);
    interactionRoot.addEventListener("pointerleave", onPointerLeave);
    interactionRoot.addEventListener("pointerenter", onPointerMove, true);

    const draw = (time: number) => {
      if (!startRef.current) startRef.current = time;
      const t = (time - startRef.current) / 1000;
      const mesh = meshRef.current;
      if (!mesh || !ctx) return;

      const { nodes, edges } = mesh;
      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      const target = targetPointerRef.current;
      const smooth = smoothPointerRef.current;
      const follow = reducedMotion ? 1 : 0.07;
      smooth.x = lerp(smooth.x, target.x, follow);
      smooth.y = lerp(smooth.y, target.y, follow);
      smooth.active = target.active;

      ctx.clearRect(0, 0, w, h);

      const bottomFade = ctx.createLinearGradient(0, 0, 0, h);
      bottomFade.addColorStop(0, "rgba(255,255,255,0)");
      bottomFade.addColorStop(0.55, "rgba(255,255,255,0)");
      bottomFade.addColorStop(1, "rgba(255,255,255,0.85)");

      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const influence = pointerInfluence(midX, midY, smooth);

        const pulse = reducedMotion
          ? 0.06
          : 0.04 +
            0.05 *
              (0.5 +
                0.5 *
                  Math.sin(
                    t * 0.75 - edge.len * 0.02 + a.phase + b.phase
                  ));

        const alpha =
          GLOBAL_ALPHA * Math.min(0.22, pulse + influence * 0.14);

        const ax =
          a.x + (smooth.active ? (smooth.x - a.x) * influence * 0.04 : 0);
        const ay =
          a.y + (smooth.active ? (smooth.y - a.y) * influence * 0.04 : 0);
        const bx =
          b.x + (smooth.active ? (smooth.x - b.x) * influence * 0.04 : 0);
        const by =
          b.y + (smooth.active ? (smooth.y - b.y) * influence * 0.04 : 0);

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(${PRIMARY.r},${PRIMARY.g},${PRIMARY.b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const node of nodes) {
        const influence = pointerInfluence(node.x, node.y, smooth);
        const glow = reducedMotion
          ? 0.14
          : 0.1 +
            0.12 * (0.5 + 0.5 * Math.sin(t * 1.1 + node.phase));
        const alpha =
          GLOBAL_ALPHA * Math.min(0.32, glow + influence * 0.2);

        const nx =
          node.x +
          (smooth.active ? (smooth.x - node.x) * influence * 0.05 : 0);
        const ny =
          node.y +
          (smooth.active ? (smooth.y - node.y) * influence * 0.05 : 0);

        ctx.fillStyle = `rgba(${PRIMARY.r},${PRIMARY.g},${PRIMARY.b},${alpha})`;
        ctx.fillRect(
          nx - PIXEL_SIZE / 2,
          ny - PIXEL_SIZE / 2,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }

      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, 0, w, h);

      if (!reducedMotion) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    if (reducedMotion) {
      draw(0);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      ro.disconnect();
      interactionRoot.removeEventListener("pointermove", onPointerMove, true);
      interactionRoot.removeEventListener("pointerleave", onPointerLeave);
      interactionRoot.removeEventListener("pointerenter", onPointerMove, true);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-90"
      aria-hidden
    />
  );
}
