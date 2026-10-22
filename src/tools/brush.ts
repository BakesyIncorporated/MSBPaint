import { DrawTool, Point, AppState } from "../core/types";

let lastPoint: Point | null = null;

export const brushTool: DrawTool = {
  name: "brush",
  label: "Brush",
  icon: "🖌️",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    lastPoint = point;
    ctx.fillStyle = state.primaryColour;
    const r = state.brushSize / 2;
    ctx.beginPath();
    ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
    ctx.fill();
  },

  onPointerMove(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    if (!lastPoint) return;
    ctx.strokeStyle = state.primaryColour;
    ctx.lineWidth = state.brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
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
