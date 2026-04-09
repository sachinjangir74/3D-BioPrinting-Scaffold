# 3D Bioprinting Scaffold Platform

An interactive React + Vite frontend for exploring 3D bioprinting, biomimetic scaffold design, and tissue engineering workflows. Designed for researchers, medical professionals, and biotech educators, this platform combines deep-dive content with interactive browser-based 3D visualizations and a G-code simulation engine.

## 🚀 Key Features

*   **Responsive Single-Page Interface**: Heavily animated using Framer Motion and optimized with Tailwind CSS.
*   **Live 3D Bioprinting Simulation**: In-browser rendering maps mathematical topological properties of biological tissues using Plotly.js.
*   **Biomimetic Scaffold Generator**: Visualizes vascular network systems necessary for tissue oxygenation.
*   **G-Code Generator Demo**: Programmatic visual mapping for physical bioprinter pathways.
*   **Comprehensive Modules**: Includes Research, Materials Library, FAQ, Team, Process, and Contact sections.

---

## 🏗️ Technical Architecture

This application focuses strictly on a performant **Frontend SPA (Single Page Application)**. Given the computational complexity of the 3D plots, it utilizes robust local state and dynamic UI rendering.

*   **Core Framework**: React 18, Vite 5
*   **Styling & UI**: Tailwind CSS 3
*   **Animations**: Framer Motion
*   **Data Visualization Engine**: Plotly, `react-plotly.js`

### Folder Structure Overview

```text
├── src/
│   ├── components/
│   │   ├── layout/       # Standard wrapper components (Navbar, Footer)
│   │   └── sections/     # Modular view sections (Hero, About, Simulation blocks)
│   ├── App.jsx           # Master Component Tree
│   └── main.jsx          # Vite React Bootstrap
├── .env.example          # Security template for local environments
├── vercel.json           # Cloud deployment routing instructions
└── tailwind.config.js    # Global theme rules & blob animations
```

---

## 💻 Local Development Setup

To run this platform locally on your machine, you must have [Node.js (v18+)](https://nodejs.org/) installed.

1. **Clone the repository** (if hosted):
   ```bash
   git clone <repository_url>
   cd 3D-BioPrinting-Scaffold
   ```
2. **Setup your environment**:
   Copy `.env.example` to a new `.env` file for local config overrides.
   ```bash
   cp .env.example .env
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the Vite dev server**:
   ```bash
   npm run dev
   ```
5. Open your browser to \`http://localhost:5173\`

---

## 🚢 Production Deployment

This project is fully containerized for static deployment platforms, optimized for **Vercel**, Netlify, or AWS Amplify.

### Preparing for Production

Run the standard Vite production command to clear memory, minimize JS chunks, and build the asset tree.
```bash
npm run build
```

*(Note: The React-Plotly dependencies are heavy, expect chunking warnings during build. Best practice dictates standard caching headers in your CDN for `dist/assets`)*

### Vercel Integration

A generic `vercel.json` file is already bound to the root directory to ensure client-side routing is preserved across paths.
1. Create a project in [Vercel](https://vercel.com/)
2. Import this GitHub repository
3. The Vite defaults will automatically trigger (`npm install` -> `npm run build`)
4. Vercel will map your output to `dist`.

---

## 🛡️ License & Contributing

This project is an open scaffolding. Pull requests containing optimizations to the Plotly engine (e.g., dynamic imports splitting the chunks) are highly encouraged!

Please feel free to branch and fork.
