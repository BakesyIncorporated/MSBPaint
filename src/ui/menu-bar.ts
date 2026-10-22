import { clearCanvas, getCanvas, resizeCanvas, MAX_CANVAS_SIZE } from "../core/canvas";
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
      // TODO: zoom controls
      break;
    case "help":
      alert("MSBPaint v0.1.0\n\nA very serious paint application.");
      break;
  }
}

function promptCanvasSize(): void {
  const canvas = getCanvas();
  const input = prompt(
    `Canvas size in pixels (width x height, max ${MAX_CANVAS_SIZE}):`,
    `${canvas.width} x ${canvas.height}`,
  );
  if (input === null) return;

  const match = input.match(/^\s*(\d+)\s*[x×,\s]\s*(\d+)\s*$/i);
  if (!match) {
    alert(`"${input}" is not a valid size. Use the form 800 x 600.`);
    return;
  }

  resizeCanvas(Number(match[1]), Number(match[2]));
}
