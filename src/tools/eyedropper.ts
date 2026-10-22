import { DrawTool, Point } from "../core/types";
import { setPrimaryColour } from "../core/state";

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

export const eyedropperTool: DrawTool = {
  name: "eyedropper",
  label: "Pick Colour",
  icon: "💧",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point): void {
    pickColour(ctx, point);
  },

  onPointerMove(ctx: CanvasRenderingContext2D, point: Point): void {
    pickColour(ctx, point);
  },

  onPointerUp(): void {},
};

function pickColour(ctx: CanvasRenderingContext2D, point: Point): void {
  const pixel = ctx.getImageData(point.x, point.y, 1, 1).data;
  const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
  setPrimaryColour(hex);
}
