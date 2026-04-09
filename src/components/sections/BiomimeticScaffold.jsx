import { useState, useMemo } from 'react'
import Plot from 'react-plotly.js'
import { motion } from 'framer-motion'

// Seeded random number generator
class SeededRandom {
  constructor(seed) {
    this.seed = seed
  }

  next() {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }
}

// KD-Tree for nearest neighbor search (simplified 2D version)
class KDTree {
  constructor(points) {
    this.points = points
  }

  query(point) {
    let minDist = Infinity
    let minIdx = 0

    for (let i = 0; i < this.points.length; i++) {
      const dist = Math.sqrt(
        Math.pow(point[0] - this.points[i][0], 2) +
        Math.pow(point[1] - this.points[i][1], 2)
      )
      if (dist < minDist) {
        minDist = dist
        minIdx = i
      }
    }

    return { distance: minDist, index: minIdx }
  }
}

// Recursive fractal vascular branching
function branch(x, y, z, depth = 0, angle = 0, rng) {
  if (depth > 3) return []

  const pts = [[x, y, z]]
  const length = 0.25 / (depth + 1)

  for (const a of [angle - 0.6, angle + 0.6]) {
    const nx = x + length * Math.cos(a)
    const ny = y + length * Math.sin(a)
    const nz = z + 0.08
    const childPts = branch(nx, ny, nz, depth + 1, a, rng)
    pts.push(...childPts)
  }

  return pts
}

const BiomimeticScaffold = () => {
  const [slices, setSlices] = useState(24)
  const [pointsPerSlice, setPointsPerSlice] = useState(30)
  const [showVascular, setShowVascular] = useState(true)

  const { scaffoldData, layout } = useMemo(() => {
    const rng = new SeededRandom(1)
    const grid = 60
    const Z = []
    for (let i = 0; i < slices; i++) {
      Z.push(-1 + (2 * i) / (slices - 1))
    }

    const allX = []
    const allY = []
    const allZ = []

    // Generate Voronoi-based scaffold for each slice
    for (const zi of Z) {
      // Generate random points for Voronoi seeds
      const pts = []
      for (let i = 0; i < pointsPerSlice; i++) {
        pts.push([rng.next() * 2 - 1, rng.next() * 2 - 1])
      }

      // Create grid
      const gx = []
      const gy = []
      for (let i = 0; i < grid; i++) {
        gx.push(-1 + (2 * i) / (grid - 1))
        gy.push(-1 + (2 * i) / (grid - 1))
      }

      // Create meshgrid
      const gpts = []
      for (let j = 0; j < grid; j++) {
        for (let i = 0; i < grid; i++) {
          gpts.push([gx[i], gy[j]])
        }
      }

      // Build KD-tree and query
      const tree = new KDTree(pts)
      const xs = []
      const ys = []
      const zs = []

      for (const gpt of gpts) {
        const result = tree.query(gpt)
        if (result.distance > 0.12) {
          xs.push(gpt[0])
          ys.push(gpt[1])
          zs.push(zi)
        }
      }

      allX.push(...xs)
      allY.push(...ys)
      allZ.push(...zs)
    }

    // Generate fractal vascular network
    const vascularRng = new SeededRandom(1)
    const bv = branch(0.0, 0.0, -1, 0, 1.2, vascularRng)
    const vascularX = bv.map((p) => p[0])
    const vascularY = bv.map((p) => p[1])
    const vascularZ = bv.map((p) => p[2])

    // Prepare data for Plotly
    const data = [
      {
        x: allX,
        y: allY,
        z: allZ,
        mode: 'markers',
        marker: {
          size: 2,
          color: 'rgb(255, 182, 193)', // tab:pink equivalent
          opacity: 0.7,
        },
        type: 'scatter3d',
        name: 'Scaffold',
      },
    ]

    // Add vascular network if enabled
    if (showVascular && vascularX.length > 0) {
      data.push({
        x: vascularX,
        y: vascularY,
        z: vascularZ,
        mode: 'lines',
        line: {
          color: 'rgb(30, 144, 255)', // tab:blue equivalent
          width: 2,
        },
        type: 'scatter3d',
        name: 'Vascular Network',
      })
    }

    const layout = {
      title: 'Biomimetic Scaffold (Voronoi slices + fractal vascular)',
      scene: {
        aspectmode: 'cube',
        xaxis: { title: 'X' },
        yaxis: { title: 'Y' },
        zaxis: { title: 'Z' },
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 },
        },
      },
      margin: { l: 0, r: 0, t: 60, b: 0 },
    }

    return {
      scaffoldData: data,
      layout,
    }
  }, [slices, pointsPerSlice, showVascular])

  return (
    <section id="biomimetic" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Biomimetic Scaffold Generator</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Generate biomimetic scaffolds using Voronoi tessellation and fractal
            vascular networks that mimic natural tissue microstructure.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 bg-gray-50 rounded-xl p-6"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Slices: {slices}
              </label>
              <input
                type="range"
                min="12"
                max="36"
                value={slices}
                onChange={(e) => setSlices(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Points per Slice: {pointsPerSlice}
              </label>
              <input
                type="range"
                min="20"
                max="50"
                value={pointsPerSlice}
                onChange={(e) => setPointsPerSlice(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVascular}
                  onChange={(e) => setShowVascular(e.target.checked)}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
                <span className="ml-3 text-gray-700 font-semibold">
                  Show Vascular Network
                </span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* 3D Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-4 md:p-8"
        >
          <div className="w-full h-[600px] md:h-[700px]">
            <Plot
              data={scaffoldData}
              layout={layout}
              config={{
                displayModeBar: true,
                displaylogo: false,
                responsive: true,
                toImageButtonOptions: {
                  format: 'png',
                  filename: 'biomimetic-scaffold',
                  height: 700,
                  width: 1000,
                  scale: 1,
                },
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </motion.div>

        {/* Information Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🔷</div>
            <h4 className="font-semibold text-gray-800 mb-2">Voronoi Tessellation</h4>
            <p className="text-sm text-gray-600">
              Produces irregular, cell-like pores that mimic natural scaffold
              microstructure
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🌳</div>
            <h4 className="font-semibold text-gray-800 mb-2">Fractal Branching</h4>
            <p className="text-sm text-gray-600">
              Recursive fractal branching creates biologically plausible vascular
              geometry
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🎲</div>
            <h4 className="font-semibold text-gray-800 mb-2">Reproducible Design</h4>
            <p className="text-sm text-gray-600">
              Random sampling with fixed seed adds natural variation while keeping
              runs reproducible
            </p>
          </div>
        </motion.div>

        {/* Technical Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100"
        >
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Algorithm Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">Voronoi-Based Pore Generation:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Random seed points generate Voronoi regions</li>
                <li>Grid points far from seeds create pore structure</li>
                <li>Distance threshold (0.12) controls pore size</li>
                <li>Stacked slices create 3D scaffold</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Fractal Vascular Network:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Recursive branching with depth limit (3 levels)</li>
                <li>Branch angle variation (±0.6 radians)</li>
                <li>Length decreases with depth (0.25/(depth+1))</li>
                <li>Z-progression creates vertical growth</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BiomimeticScaffold

