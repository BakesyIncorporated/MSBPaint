import { state, setPrimaryColour, setSecondaryColour, subscribe } from "../core/state";

// Classic MS Paint colour palette
const COLOURS = [
  "#000000", "#808080", "#800000", "#808000",
  "#008000", "#008080", "#000080", "#800080",
  "#808040", "#004040", "#0080ff", "#004080",
  "#4000ff", "#804000",
  "#ffffff", "#c0c0c0", "#ff0000", "#ffff00",
  "#00ff00", "#00ffff", "#0000ff", "#ff00ff",
  "#ffff80", "#00ff80", "#80ffff", "#8080ff",
  "#ff0080", "#ff8040",
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
