# MSBPaint

A silly MS Paint clone. Very serious software.

## Getting started

```
npm install
npm run dev
```

Then open http://localhost:5173.

## Tools

- Pencil — freehand 1px drawing
- Brush — freehand drawing with configurable size
- Eraser — erases to the secondary colour
- Fill bucket — flood fill
- Line — click and drag to draw a line
- Rectangle — click and drag to draw a rectangle outline
- Ellipse — click and drag to draw an ellipse outline
- Eyedropper — pick a colour from the canvas

## Controls

- **Left click** on a colour swatch to set primary colour
- **Right click** on a colour swatch to set secondary colour
- **File** menu exports as PNG
- **Edit** menu clears the canvas
- **Image** menu resizes the canvas (enter a size like `800 x 600`)
- **View** menu zooms (type `in`, `out`, `reset`, or a level like `200%`); **Ctrl+scroll** over the canvas zooms too; the status bar shows the zoom level with **-**, **+** and **100%** buttons to zoom out, zoom in and reset
- Drag the handle at the canvas's bottom-right corner to resize it; new area is filled with the secondary colour

## Project structure

```
src/
  core/       — canvas setup, app state, export
  tools/      — one file per drawing tool
  ui/         — toolbar, colour palette, status bar, menus
  styles/     — one CSS file per UI region
  main.ts     — boot sequence
```
