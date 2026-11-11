import { Point, AppState } from "../core/types";
import { applyOutlineStyle, createDragShapeTool } from "./dragShape";

export const rectangleTool = createDragShapeTool(
  { name: "rectangle", label: "Rectangle", icon: "▭" },
  drawRect
);

// TODO: support filled rectangles (outline + fill, fill only)
function drawRect(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  state: AppState
): void {
  applyOutlineStyle(ctx, state);
  ctx.strokeRect(
    from.x,
    from.y,
    to.x - from.x,
    to.y - from.y
  );
}
