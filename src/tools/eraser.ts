import { AppState } from "../core/types";
import { createFreehandTool } from "./freehand";

const eraserSize = (state: AppState) => state.brushSize * 2;

export const eraserTool = createFreehandTool({
  name: "eraser",
  label: "Eraser",
  icon: "🧹",

  dab(ctx, point, state) {
    ctx.fillStyle = state.secondaryColour;
    const size = eraserSize(state);
    ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
  },

  strokeStyle: (state) => ({
    colour: state.secondaryColour,
    width: eraserSize(state),
    cap: "square",
  }),
});
