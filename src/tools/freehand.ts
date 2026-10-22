import { DrawTool, Point, AppState, ToolType } from "../core/types";

export interface StrokeStyle {
  colour: string;
  width: number;
  cap: CanvasLineCap;
  join?: CanvasLineJoin;
}

export function strokeSegment(
  ctx: CanvasRenderingContext2D,
  from: Point,
  to: Point,
  style: StrokeStyle
): void {
  ctx.strokeStyle = style.colour;
  ctx.lineWidth = style.width;
  ctx.lineCap = style.cap;
  if (style.join) ctx.lineJoin = style.join;
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
}

interface FreehandToolConfig {
  name: ToolType;
  label: string;
  icon: string;
  // Marks the pointer-down point so a click without a drag still paints.
  dab(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void;
  strokeStyle(state: AppState): StrokeStyle;
}

// Each tool gets its own lastPoint, joining successive pointer moves into segments.
export function createFreehandTool(config: FreehandToolConfig): DrawTool {
  let lastPoint: Point | null = null;

  return {
    name: config.name,
    label: config.label,
    icon: config.icon,

    onPointerDown(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
      lastPoint = point;
      config.dab(ctx, point, state);
    },

    onPointerMove(ctx: CanvasRenderingContext2D, point: Point, state: AppState): void {
      if (!lastPoint) return;
      strokeSegment(ctx, lastPoint, point, config.strokeStyle(state));
      lastPoint = point;
    },

    onPointerUp(): void {
      lastPoint = null;
    },
  };
}
