export type CtaTone = "light" | "dark";

export type InkBlobConfig = {
  offsetX: number;
  offsetY: number;
  radius: number;
  lag: number;
  colorIndex: number;
  phase: number;
};

export type InkBlob = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  colorIndex: number;
};

export type InkSimulation = {
  blobs: InkBlob[];
  intensity: number;
  targetX: number;
  targetY: number;
};

/** Logo ribbon palette for cloudy ink blobs */
export const INK_COLORS = [
  { r: 120, g: 232, b: 255 },
  { r: 46, g: 91, b: 255 },
  { r: 7, g: 62, b: 253 },
  { r: 123, g: 31, b: 162 },
  { r: 179, g: 136, b: 255 },
] as const;

export const BLOB_CONFIGS: InkBlobConfig[] = [
  { offsetX: 0, offsetY: 0, radius: 0.58, lag: 0.078, colorIndex: 2, phase: 0 },
  { offsetX: -0.14, offsetY: 0.1, radius: 0.44, lag: 0.048, colorIndex: 0, phase: 1.2 },
  { offsetX: 0.12, offsetY: -0.08, radius: 0.4, lag: 0.042, colorIndex: 4, phase: 2.4 },
  { offsetX: 0.08, offsetY: 0.14, radius: 0.36, lag: 0.038, colorIndex: 3, phase: 3.6 },
  { offsetX: -0.1, offsetY: -0.12, radius: 0.32, lag: 0.034, colorIndex: 1, phase: 4.8 },
];

export function createInitialSimulation(): InkSimulation {
  return {
    blobs: BLOB_CONFIGS.map((c) => ({
      x: 0.5,
      y: 0.5,
      radius: c.radius,
      opacity: 0.72,
      colorIndex: c.colorIndex,
    })),
    intensity: 0,
    targetX: 0.5,
    targetY: 0.5,
  };
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function blobGradient(colorIndex: number): string {
  const c = INK_COLORS[colorIndex % INK_COLORS.length];
  const c2 = INK_COLORS[(colorIndex + 1) % INK_COLORS.length];
  return `radial-gradient(circle at 40% 38%, rgba(${c.r},${c.g},${c.b},0.92) 0%, rgba(${c2.r},${c2.g},${c2.b},0.55) 38%, transparent 72%)`;
}

/** Soft primary glow for cursor-following ink shadow */
export function inkCursorShadowGradient(): string {
  const c = INK_COLORS[2];
  const c2 = INK_COLORS[1];
  return `radial-gradient(circle at 50% 50%, rgba(${c.r},${c.g},${c.b},0.5) 0%, rgba(${c2.r},${c2.g},${c2.b},0.22) 42%, transparent 72%)`;
}

export function inkCursorShadowOpacity(intensity: number): number {
  return intensity * 0.62;
}

export function stepSimulation(
  sim: InkSimulation,
  time: number,
  active: boolean
): InkSimulation {
  const targetIntensity = active ? 1 : 0;
  const intensityRate = active ? 0.028 : 0.022;
  const intensity = lerp(
    sim.intensity,
    targetIntensity,
    intensityRate
  );

  const blobs = sim.blobs.map((blob, i) => {
    const cfg = BLOB_CONFIGS[i];
    const orbit = 0.035 * Math.sin(time * 0.0012 + cfg.phase);
    const goalX = Math.min(0.92, Math.max(0.08, sim.targetX + cfg.offsetX + orbit));
    const goalY = Math.min(0.92, Math.max(0.08, sim.targetY + cfg.offsetY + orbit * 0.7));

    return {
      ...blob,
      x: lerp(blob.x, goalX, cfg.lag),
      y: lerp(blob.y, goalY, cfg.lag),
    };
  });

  return { ...sim, blobs, intensity };
}
