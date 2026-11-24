import { formatDimensions } from "../core/state";
import { Point } from "../core/types";

// Kept apart from status-bar.ts so core/canvas.ts can use these without a
// circular import (status-bar.ts imports from core/canvas.ts).

export function setText(id: string, text: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

export function setStatusCoords(point: Point): void {
  setText("status-coords", `${point.x}, ${point.y}px`);
}

export function setStatusDimensions(width: number, height: number): void {
  setText("status-dimensions", formatDimensions(width, height));
}
