import { state, setPrimaryColour, setSecondaryColour, subscribe } from "../core/state";

// Classic MS Paint colour palette (non-basic colours theme: desert dusk)
const COLOURS = [
  "#000000", "#808080", "#800000", "#e0c9a6",
  "#008000", "#3e5c76", "#4a2c5a", "#800080",
  "#8a9a5b", "#2d2a3e", "#d9825b", "#a0452e",
  "#6b4c8a", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
  "#00ff00", "#c9a227", "#0000ff", "#ff00ff",
  "#f2d8b0", "#d4a5a5", "#e8b4a0", "#9c7a9e",
  "#e8708f", "#ff8040",
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
