import { Point, AppState } from "../core/types";
import { createDragShapeTool } from "./dragShape";

export const lineTool = createDragShapeTool(
  { name: "line", label: "Line", icon: "╲" },
  drawLine
);

function drawLine(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  state: AppState
): void {
  ctx.strokeStyle = state.primaryColour;
  ctx.lineWidth = state.brushSize;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}
