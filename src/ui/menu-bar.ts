import {
  clearCanvas,
  resizeCanvas,
  MAX_CANVAS_SIZE,
  resetZoom,
  setZoomLevel,
  zoomIn,
  zoomOut,
  ZOOM_LEVELS,
} from "../core/canvas";
import { state } from "../core/state";
import { exportAsPNG } from "../core/export";

// TODO: implement actual dropdown menus instead of direct action on click
// TODO: implement Edit > Undo / Redo (needs an undo history stack)

export function initMenuBar(): void {
  const menuItems = document.querySelectorAll<HTMLButtonElement>(".menu-item");

  for (const item of menuItems) {
    item.addEventListener("click", () => {
      const menu = item.dataset.menu;
      handleMenuAction(menu);
    });
  }
}

function handleMenuAction(menu: string | undefined): void {
  switch (menu) {
    case "file":
      // For now, clicking File just saves as PNG
      exportAsPNG();
      break;
    case "edit":
      // For now, clicking Edit clears the canvas
      clearCanvas();
      break;
    case "image":
      // For now, clicking Image opens a resize prompt (Image > Attributes)
      promptCanvasSize();
      break;
    case "view":
      // For now, clicking View opens a zoom prompt (View > Zoom)
      promptZoom();
      break;
    case "help":
      alert("MSBPaint v0.1.0\n\nA very serious paint application.");
      break;
  }
}

function promptCanvasSize(): void {
  const input = prompt(
    `Canvas size in pixels (width x height, max ${MAX_CANVAS_SIZE}):`,
    `${state.canvasWidth} x ${state.canvasHeight}`,
  );
  if (input === null) return;

  const match = input.match(/^\s*(\d+)\s*[x×,\s]\s*(\d+)\s*$/i);
  if (!match) {
    alert(`"${input}" is not a valid size. Use the form 800 x 600.`);
    return;
  }

  resizeCanvas(Number(match[1]), Number(match[2]));
}

function promptZoom(): void {
  const levels = ZOOM_LEVELS.map((z) => `${z * 100}%`).join(", ");
  const input = prompt(
    `Zoom: type "in", "out", "reset", or a level (${levels}).\nCtrl+scroll over the canvas also zooms.`,
    `${Math.round(state.zoom * 100)}%`,
  );
  if (input === null) return;

  const command = input.trim().toLowerCase();
  if (command === "in" || command === "+") return zoomIn();
  if (command === "out" || command === "-") return zoomOut();
  if (command === "reset" || command === "0") return resetZoom();

  const match = command.match(/^(\d+(?:\.\d+)?)\s*%?$/);
  const zoom = match ? Number(match[1]) / 100 : NaN;
  if (!ZOOM_LEVELS.includes(zoom)) {
    alert(`"${input}" is not a zoom level. Use in, out, reset, or one of ${levels}.`);
    return;
  }

  setZoomLevel(zoom);
}
