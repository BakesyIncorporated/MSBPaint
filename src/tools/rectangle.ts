import { DrawTool, Point, AppState } from "../core/types";

let startPoint: Point | null = null;
let savedImageData: ImageData | null = null;

export const rectangleTool: DrawTool = {
  name: "rectangle",
  label: "Rectangle",
  icon: "▭",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point): void {
    startPoint = point;
    savedImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  },

  onPointerMove(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    if (!startPoint || !savedImageData) return;
    ctx.putImageData(savedImageData, 0, 0);
    drawRect(ctx, startPoint, point, state);
  },

  onPointerUp(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    if (!startPoint) return;
    if (savedImageData) ctx.putImageData(savedImageData, 0, 0);
    drawRect(ctx, startPoint, point, state);
    startPoint = null;
    savedImageData = null;
  },
};

// TODO: support filled rectangles (outline + fill, fill only)
function drawRect(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  state: AppState
): void {
  ctx.strokeStyle = state.primaryColour;
  ctx.lineWidth = state.brushSize;
  ctx.strokeRect(
    from.x,
    from.y,
    to.x - from.x,
    to.y - from.y
  );
}
