import { state, formatDimensions, subscribe } from "../core/state";
import { ZOOM_LEVELS, resetZoom, zoomIn, zoomOut } from "../core/canvas";

export function initStatusBar(): void {
  document.getElementById("status-zoom-out")?.addEventListener("click", zoomOut);
  document.getElementById("status-zoom-in")?.addEventListener("click", zoomIn);
  document.getElementById("status-zoom-reset")?.addEventListener("click", resetZoom);

  update();
  subscribe(update);
}

function update(): void {
  const dims = document.getElementById("status-dimensions");
  if (dims) dims.textContent = formatDimensions(state.canvasWidth, state.canvasHeight);

  const zoom = document.getElementById("status-zoom");
  if (zoom) zoom.textContent = `${Math.round(state.zoom * 100)}%`;

  // Disable the zoom buttons that would do nothing at the current level
  setDisabled("status-zoom-out", state.zoom <= ZOOM_LEVELS[0]);
  setDisabled("status-zoom-in", state.zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]);
  setDisabled("status-zoom-reset", state.zoom === 1);

  const tool = document.getElementById("status-tool");
  if (tool) tool.textContent = state.activeTool;
}

function setDisabled(id: string, disabled: boolean): void {
  const btn = document.getElementById(id) as HTMLButtonElement | null;
  if (btn) btn.disabled = disabled;
}
