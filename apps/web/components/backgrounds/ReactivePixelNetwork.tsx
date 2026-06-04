"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const PRIMARY = { r: 7, g: 62, b: 253 };
const ACCENT = { r: 126, g: 168, b: 255 };
const SPACING = 28;
const PIXEL_SIZE = 3;

type Node = { x: number; y: number; ix: number; iy: number; phase: number };
type Edge = { a: number; b: number; len: number };
type PointerState = { x: number; y: number; active: boolean };

export type PixelNetworkTheme = "light" | "dark";

const THEME = {
  light: {
    color: PRIMARY,
    globalAlpha: 0.52,
    pointerRadius: 200,
    maxEdge: 0.22,
    maxNode: 0.32,
    pointerEdgeBoost: 0.14,
    pointerNodeBoost: 0.2,
    pulseEdgeBase: 0.04,
    pulseEdgeAmp: 0.05,
    pulseNodeBase: 0.1,
    pulseNodeAmp: 0.12,
    pulseSpeedEdge: 0.75,
    pulseSpeedNode: 1.1,
    canvasClass: "opacity-90",
    baseScale: 1,
  },
  dark: {
    color: ACCENT,
    globalAlpha: 0.62,
    pointerRadius: 220,
    maxEdge: 0.28,
    maxNode: 0.38,
    pointerEdgeBoost: 0.18,
    pointerNodeBoost: 0.24,
    pulseEdgeBase: 0.04,
    pulseEdgeAmp: 0.05,
    pulseNodeBase: 0.1,
    pulseNodeAmp: 0.12,
    pulseSpeedEdge: 0.75,
    pulseSpeedNode: 1.1,
    canvasClass: "opacity-85",
    baseScale: 1,
  },
} as const;

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
  pointer: PointerState,
  radius: number
): number {
  if (!pointer.active) return 0;
  const dist = Math.hypot(x - pointer.x, y - pointer.y);
  const sigma = radius * 0.55;
  return Math.exp(-(dist * dist) / (2 * sigma * sigma));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function applyThemeFade(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  theme: PixelNetworkTheme
) {
  const fade = ctx.createLinearGradient(0, 0, 0, h);
  if (theme === "light") {
    fade.addColorStop(0, "rgba(255,255,255,0)");
    fade.addColorStop(0.55, "rgba(255,255,255,0)");
    fade.addColorStop(1, "rgba(255,255,255,0.85)");
  } else {
    fade.addColorStop(0, "rgba(23,23,23,0)");
    fade.addColorStop(0.5, "rgba(23,23,23,0)");
    fade.addColorStop(1, "rgba(23,23,23,0.8)");
  }
  ctx.fillStyle = fade;
  ctx.fillRect(0, 0, w, h);
}

export function ReactivePixelNetwork({
  theme = "light",
  className,
}: {
  theme?: PixelNetworkTheme;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const meshRef = useRef<ReturnType<typeof buildMesh> | null>(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const targetPointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const smoothPointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const cfg = THEME[theme];
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mount = canvas.parentElement;
    const interactionRoot =
      canvas.closest("section") ?? mount ?? canvas;
    if (!mount) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { r, g, b } = cfg.color;

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
      const rect = interactionRoot.getBoundingClientRect();
      targetPointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onPointerLeave = () => {
      targetPointerRef.current.active = false;
    };

    const onPointerEnter = (e: PointerEvent) => {
      onPointerMove(e);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    interactionRoot.addEventListener("pointerenter", onPointerEnter, true);
    interactionRoot.addEventListener("pointermove", onPointerMove, true);
    interactionRoot.addEventListener("pointerleave", onPointerLeave);

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

      for (const edge of edges) {
        const a = nodes[edge.a];
        const b = nodes[edge.b];
        const midX = (a.x + b.x) / 2;
        const midY = (a.y + b.y) / 2;
        const influence = pointerInfluence(
          midX,
          midY,
          smooth,
          cfg.pointerRadius
        );

        const pulse = reducedMotion
          ? cfg.pulseEdgeBase + cfg.pulseEdgeAmp * 0.5
          : cfg.pulseEdgeBase +
            cfg.pulseEdgeAmp *
              (0.5 +
                0.5 *
                  Math.sin(
                    t * cfg.pulseSpeedEdge - edge.len * 0.02 + a.phase + b.phase
                  ));

        const alpha =
          cfg.globalAlpha *
          cfg.baseScale *
          Math.min(cfg.maxEdge, pulse + influence * cfg.pointerEdgeBoost);

        const pull = theme === "light" ? 0.04 : 0.04;
        const ax = a.x + (smooth.active ? (smooth.x - a.x) * influence * pull : 0);
        const ay = a.y + (smooth.active ? (smooth.y - a.y) * influence * pull : 0);
        const bx = b.x + (smooth.active ? (smooth.x - b.x) * influence * pull : 0);
        const by = b.y + (smooth.active ? (smooth.y - b.y) * influence * pull : 0);

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const node of nodes) {
        const influence = pointerInfluence(
          node.x,
          node.y,
          smooth,
          cfg.pointerRadius
        );
        const glow = reducedMotion
          ? cfg.pulseNodeBase + cfg.pulseNodeAmp * 0.5
          : cfg.pulseNodeBase +
            cfg.pulseNodeAmp * (0.5 + 0.5 * Math.sin(t * cfg.pulseSpeedNode + node.phase));
        const alpha =
          cfg.globalAlpha *
          cfg.baseScale *
          Math.min(cfg.maxNode, glow + influence * cfg.pointerNodeBoost);

        const nodePull = theme === "light" ? 0.05 : 0.05;
        const nx =
          node.x + (smooth.active ? (smooth.x - node.x) * influence * nodePull : 0);
        const ny =
          node.y + (smooth.active ? (smooth.y - node.y) * influence * nodePull : 0);

        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fillRect(
          nx - PIXEL_SIZE / 2,
          ny - PIXEL_SIZE / 2,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }

      applyThemeFade(ctx, w, h, theme);

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
      interactionRoot.removeEventListener("pointerenter", onPointerEnter, true);
      interactionRoot.removeEventListener("pointermove", onPointerMove, true);
      interactionRoot.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [theme]);

  const canvasClass = THEME[theme].canvasClass;

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 z-0 h-full w-full pointer-events-none",
        canvasClass,
        className
      )}
      aria-hidden
    />
  );
}
