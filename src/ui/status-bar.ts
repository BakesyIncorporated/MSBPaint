import { state, subscribe } from "../core/state";
import { MAX_ZOOM, MIN_ZOOM, formatZoom, resetZoom, zoomIn, zoomOut } from "../core/canvas";

export function initStatusBar(): void {
  document.getElementById("status-zoom-out")?.addEventListener("click", zoomOut);
  document.getElementById("status-zoom-in")?.addEventListener("click", zoomIn);
  document.getElementById("status-zoom-reset")?.addEventListener("click", resetZoom);

  update();
  subscribe(update);
}

function update(): void {
  const dims = document.getElementById("status-dimensions");
  if (dims) dims.textContent = `${state.canvasWidth} x ${state.canvasHeight}`;

  const zoom = document.getElementById("status-zoom");
  if (zoom) zoom.textContent = formatZoom(state.zoom);

  // Disable the zoom buttons that would do nothing at the current level
  setDisabled("status-zoom-out", state.zoom <= MIN_ZOOM);
  setDisabled("status-zoom-in", state.zoom >= MAX_ZOOM);
  setDisabled("status-zoom-reset", state.zoom === 1);

  const tool = document.getElementById("status-tool");
  if (tool) tool.textContent = state.activeTool;
}

function setDisabled(id: string, disabled: boolean): void {
  const btn = document.getElementById(id) as HTMLButtonElement | null;
  if (btn) btn.disabled = disabled;
}
