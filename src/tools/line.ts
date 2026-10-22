import { DrawTool, Point, AppState } from "../core/types";

let startPoint: Point | null = null;
let savedImageData: ImageData | null = null;

export const lineTool: DrawTool = {
  name: "line",
  label: "Line",
  icon: "╲",

  onPointerDown(ctx: CanvasRenderingContext2D, point: Point): void {
    startPoint = point;
    savedImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  },

  onPointerMove(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    if (!startPoint || !savedImageData) return;
    ctx.putImageData(savedImageData, 0, 0);
    ctx.strokeStyle = state.primaryColour;
    ctx.lineWidth = state.brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  },

  onPointerUp(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
    if (!startPoint) return;
    if (savedImageData) ctx.putImageData(savedImageData, 0, 0);
    ctx.strokeStyle = state.primaryColour;
    ctx.lineWidth = state.brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    startPoint = null;
    savedImageData = null;
  },
};
