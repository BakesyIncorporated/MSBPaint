import { createFreehandTool } from "./freehand";

export const eraserTool = createFreehandTool({
  name: "eraser",
  label: "Eraser",
  icon: "🧹",

  dab(ctx, point, state) {
    ctx.fillStyle = state.secondaryColour;
    const size = state.brushSize * 2;
    ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
  },

  strokeStyle: (state) => ({
    colour: state.secondaryColour,
    width: state.brushSize * 2,
    cap: "square",
  }),
});
