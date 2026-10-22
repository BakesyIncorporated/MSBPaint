import { DrawTool, Point, AppState } from "../core/types";

export type DrawShape = (
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  state: AppState
) => void;

// Builds a click-and-drag shape tool: snapshots the canvas on press, restores
// it and redraws the shape on every move, and commits the shape on release.
export function createDragShapeTool(
  meta: Pick<DrawTool, "name" | "label" | "icon">,
  draw: DrawShape
): DrawTool {
  let startPoint: Point | null = null;
  let savedImageData: ImageData | null = null;

  return {
    ...meta,

    onPointerDown(ctx: CanvasRenderingContext2D, point: Point): void {
      startPoint = point;
      savedImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    },

    onPointerMove(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
      if (!startPoint || !savedImageData) return;
      ctx.putImageData(savedImageData, 0, 0);
      draw(ctx, startPoint, point, state);
    },

    onPointerUp(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
      if (!startPoint) return;
      if (savedImageData) ctx.putImageData(savedImageData, 0, 0);
      draw(ctx, startPoint, point, state);
      startPoint = null;
      savedImageData = null;
    },
  };
}
