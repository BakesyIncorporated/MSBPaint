import { DrawTool, Point } from "../core/types";
import { setPrimaryColour } from "../core/state";
import { readRgb, rgbToHex } from "../core/colour";

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
  const hex = rgbToHex(...readRgb(pixel, 0));
  setPrimaryColour(hex);
}
