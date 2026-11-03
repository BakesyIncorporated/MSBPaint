import { state, setPrimaryColour, setSecondaryColour, subscribe } from "../core/state";

// Classic MS Paint colour palette (non-basic colours theme: autumn harvest)
const COLOURS = [
  "#000000", "#808080", "#800000", "#e6c78a",
  "#008000", "#6b8e3d", "#4a2c2a", "#800080",
  "#8a9a5b", "#6d3b5e", "#d9822b", "#a63a2b",
  "#7b6a8d", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
  "#00ff00", "#6a9a94", "#0000ff", "#ff00ff",
  "#f2d98b", "#b5c76a", "#e9d8c4", "#c9a0a0",
  "#e0a458", "#ff8040",
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
