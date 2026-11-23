import { state, setPrimaryColour, setSecondaryColour, subscribe } from "../core/state";

// Classic MS Paint colour palette (non-basic colours theme: ocean tones)
const COLOURS = [
  "#000000", "#808080", "#800000", "#f1e4c3",
  "#008000", "#1d4e6b", "#0b2a4a", "#800080",
  "#5fa8a0", "#12383f", "#ff7f6e", "#c4553f",
  "#4b6fb5", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
  "#00ff00", "#e0b15a", "#0000ff", "#ff00ff",
  "#e6d5b8", "#9ad1d4", "#f4b8a8", "#7a8fa6",
  "#2aa7b8", "#ff8040",
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
