import { createFreehandTool } from "./freehand";

export const pencilTool = createFreehandTool({
  name: "pencil",
  label: "Pencil",
  icon: "✏️",

  dab(ctx, point, state) {
    ctx.fillStyle = state.primaryColour;
    ctx.fillRect(point.x, point.y, 1, 1);
  },

  strokeStyle: (state) => ({ colour: state.primaryColour, width: 1, cap: "round" }),
});
