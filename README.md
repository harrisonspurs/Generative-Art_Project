# Generative Art Project

Interactive p5.js artwork that paints line fields sampled from image colors.

## Highlights
- Multi-image source set with quick image switching
- Random sampling and grid sampling modes
- Live sliders for line length, grid scale, and draw density
- Pause/resume drawing, clear canvas, randomize settings, and export PNG
- Keyboard shortcuts for fast iteration while creating art

## Tech Stack
- p5.js (local library)
- JavaScript (global mode)
- HTML/CSS
- Vite (development server + production build)

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview production build:
   ```bash
   npm run preview
   ```

You can still open `index.html` directly, but using Vite gives better consistency and deployment output.

## Controls
- **Buttons**: Next Image, Toggle Mode, Pause / Resume, Clear Canvas, Randomize, Save PNG
- **Keyboard**:
  - `Space`: Pause / Resume
  - `I`: Next Image
  - `G`: Toggle Mode
  - `R`: Randomize settings
  - `C`: Clear canvas
  - `S`: Save PNG
