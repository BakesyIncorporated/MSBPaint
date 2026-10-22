import { createFreehandTool } from "./freehand";

export const brushTool = createFreehandTool({
  name: "brush",
  label: "Brush",
  icon: "🖌️",

  dab(ctx, point, state) {
    ctx.fillStyle = state.primaryColour;
    const r = state.brushSize / 2;
    ctx.beginPath();
    ctx.arc(point.x, point.y, r, 0, Math.PI * 2);
    ctx.fill();
  },

  strokeStyle: (state) => ({
    colour: state.primaryColour,
    width: state.brushSize,
    cap: "round",
    join: "round",
  }),
});
