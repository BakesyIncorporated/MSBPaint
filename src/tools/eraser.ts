import { DrawTool, Point, AppState } from "../core/types";

let lastPoint: Point | null = null;

export const eraserTool: DrawTool = {
  name: "eraser",
  label: "Eraser",
  icon: "🧹",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    lastPoint = point;
    ctx.fillStyle = state.secondaryColour;
    const size = state.brushSize * 2;
    ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
  },

  onPointerMove(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    if (!lastPoint) return;
    ctx.strokeStyle = state.secondaryColour;
    ctx.lineWidth = state.brushSize * 2;
    ctx.lineCap = "square";
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
