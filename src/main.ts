import { registerAllTools } from "./tools/registry";
import { initCanvas } from "./core/canvas";
import { initToolbar } from "./ui/toolbar";
import { initColourPalette } from "./ui/colour-palette";
import { initStatusBar } from "./ui/status-bar";
import { initMenuBar } from "./ui/menu-bar";

function boot(): void {
  registerAllTools();
  initCanvas();
  initToolbar();
  initColourPalette();
  initStatusBar();
  initMenuBar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
