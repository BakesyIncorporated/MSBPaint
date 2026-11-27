import { state, setPrimaryColour, setSecondaryColour, subscribe } from "../core/state";

// MS Paint-style palette: two rows of 14 swatches, dark row first, then light row.
// Classic MS Paint basics keep their slots: black, grey, maroon, green, purple and
// brown in the dark row; white, silver, red, yellow, lime, blue, magenta and orange
// in the light row. Every other slot is a jewel-tone accent.
const COLOURS = [
  "#000000", "#808080", "#800000", "#e6c8d8",
  "#008000", "#0f6e5f", "#2a2d7c", "#800080",
  "#50c878", "#1b1f3b", "#e0a526", "#9b1b4a",
  "#7b3fa0", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
  "#00ff00", "#f0c75e", "#0000ff", "#ff00ff",
  "#bfe9e0", "#c4b5ec", "#f2a6c0", "#3a8fb7",
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
