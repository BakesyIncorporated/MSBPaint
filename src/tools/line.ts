import { Point, AppState } from "../core/types";
import { createDragShapeTool } from "./dragShape";
import { strokeSegment } from "./freehand";

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
  strokeSegment(ctx, from, to, {
    colour: state.primaryColour,
    width: state.brushSize,
    cap: "round",
  });
}
