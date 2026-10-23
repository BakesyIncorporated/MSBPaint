import { DrawTool, Point, AppState } from "../core/types";

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function sameRgb(
  a: [number, number, number],
  b: [number, number, number]
): boolean {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
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

export const bucketTool: DrawTool = {
  name: "bucket",
  label: "Fill",
  icon: "🪣",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    const { width, height } = ctx.canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const startIdx = (point.y * width + point.x) * 4;
    const targetColour: [number, number, number] = [
      data[startIdx],
      data[startIdx + 1],
      data[startIdx + 2],
    ];
    const fillColour = hexToRgb(state.primaryColour);

    if (sameRgb(targetColour, fillColour)) return;
    const fillRgba = [...fillColour, 255];

    const stack: [number, number][] = [[point.x, point.y]];

    while (stack.length > 0) {
      const [x, y] = stack.pop()!;
      if (x < 0 || x >= width || y < 0 || y >= height) continue;

      const idx = (y * width + x) * 4;
      if (!colourMatch(data, idx, targetColour)) continue;

      data.set(fillRgba, idx);

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
  },

  onPointerMove(): void {},
  onPointerUp(): void {},
};
