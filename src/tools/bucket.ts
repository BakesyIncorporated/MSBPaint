import { DrawTool, Point, AppState } from "../core/types";
import { hexToRgb } from "../core/colour";

// Offset of pixel (x, y) in RGBA image data: 4 bytes (R, G, B, A) per pixel.
function pixelIndex(x: number, y: number, width: number): number {
  return (y * width + x) * 4;
}

function colourMatch(
  data: Uint8ClampedArray,
  idx: number,
  target: [number, number, number]
): boolean {
  return (
    data[idx] === target[0] &&
    data[idx + 1] === target[1] &&
    data[idx + 2] === target[2]
  );
}

function readRgb(data: Uint8ClampedArray, idx: number): [number, number, number] {
  return [data[idx], data[idx + 1], data[idx + 2]];
}

function writeRgb(
  data: Uint8ClampedArray,
  idx: number,
  rgb: [number, number, number]
): void {
  data[idx] = rgb[0];
  data[idx + 1] = rgb[1];
  data[idx + 2] = rgb[2];
  data[idx + 3] = 255;
}

export const bucketTool: DrawTool = {
  name: "bucket",
  label: "Fill",
  icon: "🪣",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    const { width, height } = ctx.canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const startIdx = pixelIndex(point.x, point.y, width);
    const targetColour = readRgb(data, startIdx);
    const fillColour = hexToRgb(state.primaryColour);

    if (colourMatch(data, startIdx, fillColour)) return;

    const stack: [number, number][] = [[point.x, point.y]];

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      if (x < 0 || x >= width || y < 0 || y >= height) continue;

      const idx = pixelIndex(x, y, width);
      if (!colourMatch(data, idx, targetColour)) continue;

      writeRgb(data, idx, fillColour);

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  },

  onPointerMove(): void {},
  onPointerUp(): void {},
};
