import { state, setTool, setBrushSize, subscribe } from "../core/state";
import { getAllTools } from "../tools/registry";

const BRUSH_SIZES = [1, 2, 4, 8];

export function initToolbar(): void {
  const container = document.getElementById("toolbar")!;
  render(container);
  subscribe(() => render(container));
}

function render(container: HTMLElement): void {
  container.innerHTML = "";

  for (const tool of getAllTools()) {
    const btn = document.createElement("button");
    btn.className = "tool-button" + (state.activeTool === tool.name ? " active" : "");
    btn.title = tool.label;
    btn.textContent = tool.icon;
    btn.addEventListener("click", () => setTool(tool.name));
    container.appendChild(btn);
  }

  const sizeContainer = document.createElement("div");
  sizeContainer.className = "brush-size-picker";

  for (const size of BRUSH_SIZES) {
    const btn = document.createElement("button");
    btn.className = "brush-size-option" + (state.brushSize === size ? " active" : "");
    btn.title = `${size}px`;

    const dot = document.createElement("span");
    dot.className = "brush-size-dot";
    const dotSize = `${size}px`;
    dot.style.width = dotSize;
    dot.style.height = dotSize;
    btn.appendChild(dot);

    btn.addEventListener("click", () => setBrushSize(size));
    sizeContainer.appendChild(btn);
  }

  container.appendChild(sizeContainer);
}
