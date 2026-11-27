import { Point } from "../core/types";

// Kept apart from status-bar.ts so core/canvas.ts can use these without a
// circular import (status-bar.ts imports from core/canvas.ts).

// The "W x H" text the status bar shows for a canvas size
export function formatDimensions(width: number, height: number): string {
  return `${width} x ${height}`;
}

export function setStatusCoords(point: Point): void {
  const el = document.getElementById("status-coords");
  if (el) el.textContent = `${point.x}, ${point.y}px`;
}

export function setStatusDimensions(width: number, height: number): void {
  const el = document.getElementById("status-dimensions");
  if (el) el.textContent = formatDimensions(width, height);
}
