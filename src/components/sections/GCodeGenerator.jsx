import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

// G-code generator class
class GCodeEngine {
  constructor() {
    this.lines = []
    this.currentX = 0
    this.currentY = 0
    this.currentZ = 0
    this.extruderTemp = 210 // Bioprinter temperature
    this.bedTemp = 60
    this.layerHeight = 0.2
    this.printSpeed = 50
    this.travelSpeed = 150
    this.extrusionRate = 0.04
  }

  // Initialize printer
  initialize() {
    this.lines.push('; 3D Bioprinting G-code')
    this.lines.push('; Generated for Personalized Tissue Scaffold')
    this.lines.push(';')
    this.lines.push('G21 ; Set units to millimeters')
    this.lines.push('G90 ; Use absolute positioning')
    this.lines.push('M82 ; Set extruder to absolute mode')
    this.lines.push('M107 ; Turn off fan')
    this.lines.push(`M104 S${this.extruderTemp} ; Set extruder temperature`)
    this.lines.push(`M140 S${this.bedTemp} ; Set bed temperature`)
    this.lines.push('G28 ; Home all axes')
    this.lines.push('G1 Z15 F3000 ; Move to safe Z height')
    this.lines.push('M109 ; Wait for extruder temperature')
    this.lines.push('G92 E0 ; Reset extruder')
    this.lines.push('G1 F1500 ; Set initial feed rate')
    this.lines.push('')
  }

  // Move to position (travel move)
  moveTo(x, y, z) {
    this.lines.push(`G0 X${x.toFixed(3)} Y${y.toFixed(3)} Z${z.toFixed(3)} F${this.travelSpeed * 60}`)
    this.currentX = x
    this.currentY = y
    this.currentZ = z
  }

  // Print line (extrusion move)
  printTo(x, y, z, e = null) {
    const dx = x - this.currentX
    const dy = y - this.currentY
    const dz = z - this.currentZ
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
    
    if (e === null) {
      e = distance * this.extrusionRate
    }
    
    const currentE = this.lines.length > 0 ? this.getLastE() : 0
    const newE = currentE + e

    this.lines.push(`G1 X${x.toFixed(3)} Y${y.toFixed(3)} Z${z.toFixed(3)} E${newE.toFixed(5)} F${this.printSpeed * 60}`)
    this.currentX = x
    this.currentY = y
    this.currentZ = z
  }

  getLastE() {
    for (let i = this.lines.length - 1; i >= 0; i--) {
      const match = this.lines[i].match(/E([\d.]+)/)
      if (match) {
        return parseFloat(match[1])
      }
    }
    return 0
  }

  // Set layer height
  setLayerHeight(height) {
    this.layerHeight = height
  }

  // Finish print
  finish() {
    this.lines.push('')
    this.lines.push('; End of print')
    this.lines.push('G91 ; Relative positioning')
    this.lines.push('G1 E-1 F300 ; Retract filament')
    this.lines.push('G1 Z10 F3000 ; Move up')
    this.lines.push('G90 ; Absolute positioning')
    this.lines.push('G28 X Y ; Home X and Y')
    this.lines.push('M104 S0 ; Turn off extruder')
    this.lines.push('M140 S0 ; Turn off bed')
    this.lines.push('M107 ; Turn off fan')
    this.lines.push('M84 ; Disable steppers')
  }

  // Generate G-code from 3D points
  generateFromPoints(points, scale = 1, offsetX = 0, offsetY = 0) {
    this.initialize()

    // Group points by Z (layer)
    const layers = {}
    points.forEach((point) => {
      const z = Math.round((point.z * scale) / this.layerHeight) * this.layerHeight
      if (!layers[z]) {
        layers[z] = []
      }
      layers[z].push({
        x: point.x * scale + offsetX,
        y: point.y * scale + offsetY,
        z: z,
      })
    })

    // Sort layers by Z
    const sortedLayers = Object.keys(layers)
      .map(Number)
      .sort((a, b) => a - b)

    // Print each layer
    sortedLayers.forEach((z, layerIndex) => {
      this.lines.push(`; Layer ${layerIndex + 1} at Z=${z.toFixed(3)}`)
      
      // Move to layer height
      this.moveTo(this.currentX, this.currentY, z)

      // Print points in layer
      const layerPoints = layers[z]
      if (layerPoints.length > 0) {
        // Move to first point
        this.moveTo(layerPoints[0].x, layerPoints[0].y, z)

        // Print remaining points
        for (let i = 1; i < layerPoints.length; i++) {
          this.printTo(layerPoints[i].x, layerPoints[i].y, z)
        }
      }
    })

    this.finish()
    return this.lines.join('\n')
  }

  // Generate G-code from voxel data
  generateFromVoxels(xs, ys, zs, scale = 10, offsetX = 100, offsetY = 100) {
    const points = xs.map((x, i) => ({
      x: x * scale + offsetX,
      y: ys[i] * scale + offsetY,
      z: zs[i] * scale,
    }))

    return this.generateFromPoints(points, 1, 0, 0)
  }
}

const GCodeGenerator = () => {
  const [selectedModel, setSelectedModel] = useState('bioprinting')
  const [scale, setScale] = useState(10)
  const [layerHeight, setLayerHeight] = useState(0.2)
  const [printSpeed, setPrintSpeed] = useState(50)
  const [gCode, setGCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const generateGCode = () => {
    setIsGenerating(true)
    
    setTimeout(() => {
      const generator = new GCodeEngine()
      generator.setLayerHeight(layerHeight)
      generator.printSpeed = printSpeed

      if (selectedModel === 'bioprinting') {
        // Generate sample data for bioprinting model
        const resolution = 20
        const lim = 1.4
        const xs = []
        const ys = []
        const zs = []

        // Create a simple heart shape for demonstration
        for (let k = 0; k < resolution; k++) {
          for (let j = 0; j < resolution; j++) {
            for (let i = 0; i < resolution; i++) {
              const x = -lim + (2 * lim * i) / (resolution - 1)
              const y = -lim + (2 * lim * j) / (resolution - 1)
              const z = -lim + (2 * lim * k) / (resolution - 1)
              
              const F = Math.pow(x * x + (9 / 4) * y * y + z * z - 1, 3) -
                x * x * z * z * z -
                (9 / 80) * y * y * z * z * z
              
              if (F <= 0) {
                xs.push(x)
                ys.push(y)
                zs.push(z)
              }
            }
          }
        }

        const code = generator.generateFromVoxels(xs, ys, zs, scale)
        setGCode(code)
      } else {
        // Generate sample data for biomimetic scaffold
        const slices = 12
        const grid = 30
        const xs = []
        const ys = []
        const zs = []

        for (let zi = 0; zi < slices; zi++) {
          const z = -1 + (2 * zi) / (slices - 1)
          for (let j = 0; j < grid; j++) {
            for (let i = 0; i < grid; i++) {
              const x = -1 + (2 * i) / (grid - 1)
              const y = -1 + (2 * j) / (grid - 1)
              
              // Simple pattern for demonstration
              const dist = Math.sqrt(x * x + y * y)
              if (dist > 0.3 && dist < 0.9) {
                xs.push(x)
                ys.push(y)
                zs.push(z)
              }
            }
          }
        }

        const code = generator.generateFromVoxels(xs, ys, zs, scale)
        setGCode(code)
      }

      setIsGenerating(false)
    }, 500)
  }

  const downloadGCode = () => {
    if (!gCode) return

    const blob = new Blob([gCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bioprint_${selectedModel}_${Date.now()}.gcode`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const preview = useMemo(() => {
    if (!gCode) {
      return {
        totalLines: 0,
        layerCount: 0,
      }
    }

    // Count lines and extract key information
    const lines = gCode.split('\n')
    const totalLines = lines.length
    const layerCount = (gCode.match(/Layer \d+/g) || []).length
    
    return {
      totalLines,
      layerCount,
    }
  }, [gCode])

  return (
    <section id="gcode" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">G-Code Generator</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Generate 3D printer G-code from your bioprinting models. Export and
            print your personalized tissue scaffolds on compatible 3D bioprinters.
          </p>
        </motion.div>

        {/* Configuration Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Print Settings</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Model Type
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="bioprinting">3D Bioprinting</option>
                <option value="biomimetic">Biomimetic Scaffold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scale Factor: {scale}mm
              </label>
              <input
                type="range"
                min="5"
                max="20"
                value={scale}
                onChange={(e) => setScale(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Layer Height: {layerHeight}mm
              </label>
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.05"
                value={layerHeight}
                onChange={(e) => setLayerHeight(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Print Speed: {printSpeed}mm/s
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={printSpeed}
                onChange={(e) => setPrintSpeed(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={generateGCode}
              disabled={isGenerating}
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate G-Code'}
            </button>
            
            {gCode && (
              <>
                <button
                  onClick={downloadGCode}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  📥 Download G-Code
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(gCode)
                    alert('G-code copied to clipboard!')
                  }}
                  className="px-8 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  📋 Copy to Clipboard
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* G-Code Preview */}
        {gCode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold gradient-text mb-2">
                {preview.totalLines}
              </div>
              <div className="text-gray-600">Total G-Code Lines</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold gradient-text mb-2">
                {preview.layerCount}
              </div>
              <div className="text-gray-600">Print Layers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold gradient-text mb-2">
                {((preview.totalLines * 0.1) / 60).toFixed(1)} min
              </div>
              <div className="text-gray-600">Estimated Print Time</div>
            </div>
          </motion.div>
        )}

        {/* G-Code Display */}
        {gCode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">G-Code Preview</h3>
              <span className="text-sm text-gray-400">
                {gCode.split('\n').length} lines
              </span>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-green-400 text-xs font-mono">
                {gCode.split('\n').slice(0, 100).join('\n')}
                {gCode.split('\n').length > 100 && (
                  <span className="text-gray-500">
                    {'\n'}... ({gCode.split('\n').length - 100} more lines)
                  </span>
                )}
              </pre>
            </div>
          </motion.div>
        )}

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-primary-100"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            How to Use Generated G-Code
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">1. Download G-Code</h4>
              <p className="text-sm mb-4">
                Click the "Download G-Code" button to save the file to your computer.
              </p>
              
              <h4 className="font-semibold mb-2">2. Transfer to Printer</h4>
              <p className="text-sm mb-4">
                Copy the .gcode file to an SD card or transfer via USB to your 3D bioprinter.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">3. Printer Compatibility</h4>
              <p className="text-sm mb-4">
                This G-code is compatible with most FDM/FFF 3D printers. Adjust temperature
                settings based on your bioprinting material.
              </p>
              
              <h4 className="font-semibold mb-2">4. Safety Check</h4>
              <p className="text-sm mb-4">
                Always verify bed leveling and material compatibility before printing.
                Monitor the first few layers closely.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Printer Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">🌡️</div>
            <h4 className="font-semibold text-gray-800 mb-2">Temperature Settings</h4>
            <p className="text-sm text-gray-600">
              Extruder: 210°C<br />
              Bed: 60°C<br />
              Adjust for your material
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">⚙️</div>
            <h4 className="font-semibold text-gray-800 mb-2">Print Parameters</h4>
            <p className="text-sm text-gray-600">
              Layer Height: {layerHeight}mm<br />
              Print Speed: {printSpeed}mm/s<br />
              Travel Speed: 150mm/s
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl mb-3">📏</div>
            <h4 className="font-semibold text-gray-800 mb-2">Model Scale</h4>
            <p className="text-sm text-gray-600">
              Scale Factor: {scale}x<br />
              Adjust based on your<br />
              printer build volume
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GCodeGenerator

