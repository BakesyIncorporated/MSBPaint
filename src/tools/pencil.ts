import { DrawTool, Point, AppState } from "../core/types";

let lastPoint: Point | null = null;

export const pencilTool: DrawTool = {
  name: "pencil",
  label: "Pencil",
  icon: "✏️",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    lastPoint = point;
    ctx.fillStyle = state.primaryColour;
    ctx.fillRect(point.x, point.y, 1, 1);
  },

  onPointerMove(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    if (!lastPoint) return;
    ctx.strokeStyle = state.primaryColour;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPoint = point;
  },

  onPointerUp(): void {
    lastPoint = null;
  },
};
