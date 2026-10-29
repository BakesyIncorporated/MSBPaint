import { state, setPrimaryColour, setSecondaryColour, subscribe } from "../core/state";

// Classic MS Paint colour palette (non-basic colours theme: ocean tones)
const COLOURS = [
  "#000000", "#808080", "#800000", "#a68a64",
  "#008000", "#1b6ca8", "#0b2545", "#800080",
  "#4f6f52", "#2f4858", "#f4845f", "#b86f52",
  "#5c6bc0", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
  "#00ff00", "#48cae4", "#0000ff", "#ff00ff",
  "#f6e7c1", "#a8e6cf", "#caf0f8", "#b8c0ff",
  "#ff8fab", "#ff8040",
];

export function initColourPalette(): void {
  const container = document.getElementById("colour-palette")!;
  render(container);
  subscribe(() => render(container));
}

function render(container: HTMLElement): void {
  container.innerHTML = "";

  // Active colour display
  const activeDisplay = document.createElement("div");
  activeDisplay.className = "active-colours";

  const primary = document.createElement("div");
  primary.className = "active-colour-primary";
  primary.style.background = state.primaryColour;

  const secondary = document.createElement("div");
  secondary.className = "active-colour-secondary";
  secondary.style.background = state.secondaryColour;

  activeDisplay.appendChild(secondary);
  activeDisplay.appendChild(primary);
  container.appendChild(activeDisplay);

  // Swatches
  for (const colour of COLOURS) {
    const swatch = document.createElement("button");
    swatch.className = "colour-swatch";
    if (colour === state.primaryColour) {
      swatch.className += " active-primary";
    }
    swatch.style.background = colour;
    swatch.title = colour;

    swatch.addEventListener("click", () => setPrimaryColour(colour));
    swatch.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      setSecondaryColour(colour);
    });

    container.appendChild(swatch);
  }
}
