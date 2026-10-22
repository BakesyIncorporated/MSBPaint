import { Point, AppState } from "../core/types";
import { createDragShapeTool } from "./dragShape";

export const ellipseTool = createDragShapeTool(
  { name: "ellipse", label: "Ellipse", icon: "◯" },
  drawEllipse
);

// TODO: support filled ellipses
function drawEllipse(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  state: AppState
): void {
  const cx = (from.x + to.x) / 2;
  const cy = (from.y + to.y) / 2;
  const rx = Math.abs(to.x - from.x) / 2;
  const ry = Math.abs(to.y - from.y) / 2;

  ctx.strokeStyle = state.primaryColour;
  ctx.lineWidth = state.brushSize;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
}
