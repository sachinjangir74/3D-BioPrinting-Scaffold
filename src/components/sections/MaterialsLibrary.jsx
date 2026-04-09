import { useState } from 'react'
import { motion } from 'framer-motion'

const MaterialsLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const materials = [
    {
      name: 'Alginate',
      category: 'hydrogel',
      description: 'Natural polysaccharide derived from seaweed, excellent for cell encapsulation',
      properties: ['Biocompatible', 'Gel-forming', 'Low toxicity'],
      temperature: 'Room temp',
      viscosity: 'Low',
      applications: ['Cell encapsulation', 'Soft tissue scaffolds'],
      color: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'Gelatin Methacryloyl (GelMA)',
      category: 'hydrogel',
      description: 'Photocrosslinkable hydrogel derived from gelatin, supports cell adhesion',
      properties: ['Photocrosslinkable', 'Cell-adhesive', 'Tunable stiffness'],
      temperature: '37°C',
      viscosity: 'Medium',
      applications: ['Cartilage repair', 'Skin grafts', 'Vascular networks'],
      color: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'Polycaprolactone (PCL)',
      category: 'polymer',
      description: 'Biodegradable polyester with excellent mechanical properties',
      properties: ['Biodegradable', 'High strength', 'Flexible'],
      temperature: '60-80°C',
      viscosity: 'High',
      applications: ['Bone scaffolds', 'Load-bearing structures'],
      color: 'bg-green-100 text-green-800',
    },
    {
      name: 'Collagen Type I',
      category: 'protein',
      description: 'Natural extracellular matrix protein, most abundant in human body',
      properties: ['Native ECM', 'Cell-adhesive', 'Biodegradable'],
      temperature: '4-37°C',
      viscosity: 'Low',
      applications: ['Tissue regeneration', 'Wound healing'],
      color: 'bg-purple-100 text-purple-800',
    },
    {
      name: 'Hyaluronic Acid',
      category: 'hydrogel',
      description: 'Natural glycosaminoglycan, important for tissue hydration and lubrication',
      properties: ['High water content', 'Lubricating', 'Anti-inflammatory'],
      temperature: 'Room temp',
      viscosity: 'Low-Medium',
      applications: ['Cartilage repair', 'Ocular tissue'],
      color: 'bg-blue-100 text-blue-800',
    },
    {
      name: 'Poly(lactic-co-glycolic acid) (PLGA)',
      category: 'polymer',
      description: 'Biodegradable copolymer with tunable degradation rates',
      properties: ['Biodegradable', 'FDA approved', 'Tunable degradation'],
      temperature: '180-220°C',
      viscosity: 'High',
      applications: ['Drug delivery', 'Bone scaffolds'],
      color: 'bg-green-100 text-green-800',
    },
  ]

  const categories = ['all', 'hydrogel', 'polymer', 'protein']

  const filteredMaterials =
    selectedCategory === 'all'
      ? materials
      : materials.filter((m) => m.category === selectedCategory)

  return (
    <section id="materials" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Materials Library</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our comprehensive library of biocompatible materials used in
            3D bioprinting and tissue engineering applications.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-400'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{material.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${material.color}`}>
                  {material.category}
                </span>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">{material.description}</p>

              <div className="space-y-3 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Properties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {material.properties.map((prop, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                      >
                        {prop}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Temperature:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {material.temperature}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Viscosity:</span>
                    <span className="ml-2 font-semibold text-gray-800">
                      {material.viscosity}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Applications:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {material.applications.map((app, i) => (
                      <li key={i}>{app}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 border border-primary-100"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Material Selection Guide
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">For Soft Tissues</h4>
              <p className="text-sm">
                Use hydrogels like Alginate, GelMA, or Collagen for soft tissue
                applications requiring high cell viability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Load-Bearing</h4>
              <p className="text-sm">
                Choose polymers like PCL or PLGA for structures requiring
                mechanical strength and durability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Vascular Networks</h4>
              <p className="text-sm">
                GelMA and Hyaluronic Acid work well for creating perfusable
                vascular channels.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MaterialsLibrary




