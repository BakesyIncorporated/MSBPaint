import { getCanvas } from "./canvas";

export function exportAsPNG(): void {
  const canvas = getCanvas();
  const link = document.createElement("a");
  link.download = "masterpiece.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// TODO: support exporting as JPEG and BMP
