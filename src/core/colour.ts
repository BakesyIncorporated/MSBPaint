export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

export function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function readRgb(data: Uint8ClampedArray, idx: number): [number, number, number] {
  return [data[idx], data[idx + 1], data[idx + 2]];
}

export function writeRgb(
  data: Uint8ClampedArray,
  idx: number,
  rgb: [number, number, number]
): void {
  data[idx] = rgb[0];
  data[idx + 1] = rgb[1];
  data[idx + 2] = rgb[2];
  data[idx + 3] = 255;
}
