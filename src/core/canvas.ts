import { state, setCanvasSize } from "./state";
import { Point } from "./types";
import { getActiveTool } from "../tools/registry";

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let drawing = false;

export const MIN_CANVAS_SIZE = 1;
export const MAX_CANVAS_SIZE = 5000;

export function initCanvas(): void {
  canvas = document.getElementById("paint-canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d")!;

  canvas.width = state.canvasWidth;
  canvas.height = state.canvasHeight;

  // Fill with white
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointerleave", onPointerUp);

  initResizeHandle();
}

function getCanvasPoint(e: PointerEvent): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.floor(e.clientX - rect.left),
    y: Math.floor(e.clientY - rect.top),
  };
}

function onPointerDown(e: PointerEvent): void {
  drawing = true;
  canvas.setPointerCapture(e.pointerId);
  const point = getCanvasPoint(e);
  const tool = getActiveTool();
  tool.onPointerDown(ctx, point, state);
}

function onPointerMove(e: PointerEvent): void {
  const point = getCanvasPoint(e);
  updateStatusCoords(point);

  if (!drawing) return;
  const tool = getActiveTool();
  tool.onPointerMove(ctx, point, state);
}

function onPointerUp(e: PointerEvent): void {
  if (!drawing) return;
  drawing = false;
  const point = getCanvasPoint(e);
  const tool = getActiveTool();
  tool.onPointerUp(ctx, point, state);
}

function updateStatusCoords(point: Point): void {
  const el = document.getElementById("status-coords");
  if (el) el.textContent = `${point.x}, ${point.y}px`;
}

export function getCanvas(): HTMLCanvasElement {
  return canvas;
}

export function getContext(): CanvasRenderingContext2D {
  return ctx;
}

export function clearCanvas(): void {
  ctx.fillStyle = state.secondaryColour;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export function clampCanvasSize(size: number): number {
  return Math.min(MAX_CANVAS_SIZE, Math.max(MIN_CANVAS_SIZE, Math.round(size)));
}

// Resizes the canvas, keeping the existing drawing anchored at the top-left.
// Any newly exposed area is filled with the secondary colour.
export function resizeCanvas(width: number, height: number): void {
  width = clampCanvasSize(width);
  height = clampCanvasSize(height);
  if (width === canvas.width && height === canvas.height) return;

  const snapshot = document.createElement("canvas");
  snapshot.width = canvas.width;
  snapshot.height = canvas.height;
  snapshot.getContext("2d")!.drawImage(canvas, 0, 0);

  // Changing the size clears the canvas and resets the context state
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = state.secondaryColour;
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(snapshot, 0, 0);

  setCanvasSize(width, height);
}

function initResizeHandle(): void {
  const wrapper = document.getElementById("canvas-wrapper")!;

  const outline = document.createElement("div");
  outline.className = "canvas-resize-outline";
  wrapper.appendChild(outline);

  const handle = document.createElement("div");
  handle.className = "canvas-resize-handle";
  handle.title = "Drag to resize the canvas";
  wrapper.appendChild(handle);

  let start: Point | null = null;
  let size = { width: 0, height: 0 };

  const sizeFor = (e: PointerEvent) => ({
    width: clampCanvasSize(canvas.width + e.clientX - start!.x),
    height: clampCanvasSize(canvas.height + e.clientY - start!.y),
  });

  handle.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);
    start = { x: e.clientX, y: e.clientY };
    size = { width: canvas.width, height: canvas.height };
    outline.style.width = `${size.width}px`;
    outline.style.height = `${size.height}px`;
    outline.style.display = "block";
  });

  handle.addEventListener("pointermove", (e) => {
    if (!start) return;
    size = sizeFor(e);
    outline.style.width = `${size.width}px`;
    outline.style.height = `${size.height}px`;
    const dims = document.getElementById("status-dimensions");
    if (dims) dims.textContent = `${size.width} x ${size.height}`;
  });

  const finish = (commit: boolean) => {
    if (!start) return;
    start = null;
    outline.style.display = "none";
    if (commit && (size.width !== canvas.width || size.height !== canvas.height)) {
      resizeCanvas(size.width, size.height);
    } else {
      // Cancelled or unchanged: restore the previewed status bar size
      setCanvasSize(canvas.width, canvas.height);
    }
  };

  handle.addEventListener("pointerup", () => finish(true));
  handle.addEventListener("pointercancel", () => finish(false));
}
