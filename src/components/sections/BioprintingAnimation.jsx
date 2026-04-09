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

const BioprintingAnimation = () => {
  const [shape, setShape] = useState('heart')

  const resolution = 40
  const numLayers = 36
  const vascularChance = 0.07
  const lim = 1.4

  // Generate 3D grid and process data
  const { frames, initData, layout } = useMemo(() => {
    const rng = new SeededRandom(42)

    // Generate coordinates
    const coords = []
    for (let i = 0; i < resolution; i++) {
      coords.push(-lim + (2 * lim * i) / (resolution - 1))
    }

    // Create meshgrid
    const X = []
    const Y = []
    const Z = []
    for (let k = 0; k < resolution; k++) {
      for (let j = 0; j < resolution; j++) {
        for (let i = 0; i < resolution; i++) {
          X.push(coords[i])
          Y.push(coords[j])
          Z.push(coords[k])
        }
      }
    }

    // Create mask based on shape
    const mask = []
    for (let i = 0; i < X.length; i++) {
      const x = X[i]
      const y = Y[i]
      const z = Z[i]
      let inside = false

      if (shape === 'heart') {
        const F =
          Math.pow(x * x + (9 / 4) * y * y + z * z - 1, 3) -
          x * x * z * z * z -
          (9 / 80) * y * y * z * z * z
        inside = F <= 0
      } else if (shape === 'lung') {
        const left =
          Math.pow((x + 0.5) / 0.6, 2) +
          Math.pow(y / 1.1, 2) +
          Math.pow(z / 1.0, 2) <=
          1
        const right =
          Math.pow((x - 0.5) / 0.6, 2) +
          Math.pow(y / 1.1, 2) +
          Math.pow(z / 1.0, 2) <=
          1
        inside = left || right
      } else {
        // cube
        inside = Math.abs(x) < 1 && Math.abs(y) < 0.8 && Math.abs(z) < 1
      }

      mask.push(inside)
    }

    // Extract points inside mask
    const xs = []
    const ys = []
    const zs = []
    for (let i = 0; i < mask.length; i++) {
      if (mask[i]) {
        xs.push(X[i])
        ys.push(Y[i])
        zs.push(Z[i])
      }
    }

    // Sort by z coordinate
    const indices = Array.from({ length: zs.length }, (_, i) => i)
    indices.sort((a, b) => zs[a] - zs[b])

    const sortedXs = indices.map((i) => xs[i])
    const sortedYs = indices.map((i) => ys[i])
    const sortedZs = indices.map((i) => zs[i])

    // Create layer edges
    const zMin = Math.min(...sortedZs)
    const zMax = Math.max(...sortedZs)
    const layersEdges = []
    for (let i = 0; i <= numLayers; i++) {
      layersEdges.push(zMin + ((zMax - zMin) * i) / numLayers)
    }

    // Assign voxels to layers
    const voxelLayer = sortedZs.map((z) => {
      for (let i = 0; i < layersEdges.length - 1; i++) {
        if (z >= layersEdges[i] && z < layersEdges[i + 1]) {
          return i
        }
      }
      return numLayers - 1
    })

    // Calculate max distance
    let distMax = 0
    for (let i = 0; i < sortedXs.length; i++) {
      const dist = Math.sqrt(
        sortedXs[i] * sortedXs[i] +
        sortedYs[i] * sortedYs[i] +
        sortedZs[i] * sortedZs[i]
      )
      if (dist > distMax) distMax = dist
    }

    // Assign materials
    const materials = new Array(sortedXs.length).fill(0)
    for (let i = 0; i < sortedXs.length; i++) {
      const dist = Math.sqrt(
        sortedXs[i] * sortedXs[i] +
        sortedYs[i] * sortedYs[i] +
        sortedZs[i] * sortedZs[i]
      )
      const probV = vascularChance * (1.2 - dist / distMax)
      if (rng.next() < probV) {
        materials[i] = 1
      }
      const normDist = dist / distMax
      if (normDist > 0.7 && materials[i] === 0) {
        materials[i] = 2
      }
    }

    // Color map
    const colorMap = {
      0: 'rgb(200,120,120)',
      1: 'rgb(30,144,255)',
      2: 'rgb(46,139,87)',
    }

    // Create frames
    const frames = []
    for (let layer = 0; layer < numLayers; layer++) {
      const frameXs = []
      const frameYs = []
      const frameZs = []
      const frameColors = []
      const frameSizes = []
      const frameText = []

      for (let i = 0; i < voxelLayer.length; i++) {
        if (voxelLayer[i] <= layer) {
          frameXs.push(sortedXs[i])
          frameYs.push(sortedYs[i])
          frameZs.push(sortedZs[i])
          frameColors.push(colorMap[materials[i]])
          frameSizes.push(
            materials[i] === 0 ? 3.5 : materials[i] === 1 ? 5.0 : 4.0
          )
          frameText.push(
            `Layer: ${voxelLayer[i]} Material: ${materials[i]}`
          )
        }
      }

      frames.push({
        data: [
          {
            x: frameXs,
            y: frameYs,
            z: frameZs,
            mode: 'markers',
            marker: {
              size: frameSizes,
              color: frameColors,
              opacity: 0.9,
            },
            type: 'scatter3d',
            text: frameText,
            hoverinfo: 'text',
          },
        ],
        name: String(layer),
        layout: {
          title: {
            text: `Layer ${layer + 1}/${numLayers}`,
          },
        },
      })
    }

    // Initial data
    const initXs = []
    const initYs = []
    const initZs = []
    const initColors = []
    const initSizes = []

    for (let i = 0; i < voxelLayer.length; i++) {
      if (voxelLayer[i] <= 0) {
        initXs.push(sortedXs[i])
        initYs.push(sortedYs[i])
        initZs.push(sortedZs[i])
        initColors.push(colorMap[materials[i]])
        initSizes.push(
          materials[i] === 0 ? 3.5 : materials[i] === 1 ? 5.0 : 4.0
        )
      }
    }

    const initData = [
      {
        x: initXs,
        y: initYs,
        z: initZs,
        mode: 'markers',
        marker: {
          size: initSizes,
          color: initColors,
          opacity: 0.9,
        },
        type: 'scatter3d',
      },
    ]

    const layout = {
      title: `3D Bioprint Simulation: ${shape.toUpperCase()}`,
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
      updatemenus: [
        {
          type: 'buttons',
          buttons: [
            {
              label: '▶ Play',
              method: 'animate',
              args: [
                null,
                {
                  frame: { duration: 120, redraw: true },
                  fromcurrent: true,
                },
              ],
            },
            {
              label: '⏸ Pause',
              method: 'animate',
              args: [
                [null],
                {
                  frame: { duration: 0, redraw: false },
                  mode: 'immediate',
                },
              ],
            },
          ],
          x: 0.1,
          y: 0.05,
        },
      ],
      sliders: [
        {
          steps: frames.map((_, k) => ({
            args: [
              [String(k)],
              {
                frame: { duration: 0, redraw: true },
                mode: 'immediate',
              },
            ],
            label: String(k + 1),
            method: 'animate',
          })),
          x: 0.1,
          y: 0,
          len: 0.9,
        },
      ],
    }

    return { frames, initData, layout }
  }, [shape])

  return (
    <section id="simulation" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Interactive 3D Bioprinting Simulation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Experience our voxel-based layer-by-layer 3D bioprinting simulation.
            Watch as personalized tissue scaffolds are built layer by layer.
          </p>

          {/* Shape Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['heart', 'lung', 'cube'].map((s) => (
              <button
                key={s}
                onClick={() => setShape(s)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  shape === s
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-400'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-4 md:p-8"
        >
          <div className="w-full h-[600px] md:h-[700px]">
            <Plot
              data={initData}
              layout={layout}
              frames={frames}
              config={{
                displayModeBar: true,
                displaylogo: false,
                responsive: true,
                toImageButtonOptions: {
                  format: 'png',
                  filename: `bioprint-${shape}`,
                  height: 700,
                  width: 1000,
                  scale: 1,
                },
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🔴</div>
            <h4 className="font-semibold text-gray-800 mb-2">Base Material</h4>
            <p className="text-sm text-gray-600">Primary scaffold structure</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🔵</div>
            <h4 className="font-semibold text-gray-800 mb-2">Vascular Network</h4>
            <p className="text-sm text-gray-600">Blood vessel channels</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-3xl mb-2">🟢</div>
            <h4 className="font-semibold text-gray-800 mb-2">Support Material</h4>
            <p className="text-sm text-gray-600">Structural reinforcement</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100"
        >
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Voxel-Based Layer-by-Layer 3D Bioprinting Simulation Algorithm
          </h3>
          <p className="text-gray-700 leading-relaxed">
            This simulation uses a voxel-based approach to represent biological shapes
            digitally for additive manufacturing. Each layer is printed sequentially,
            with different materials assigned based on structural requirements and
            vascular network probability. The algorithm generates a 3D voxel grid and
            creates an animated visualization of the bioprinting process.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default BioprintingAnimation
