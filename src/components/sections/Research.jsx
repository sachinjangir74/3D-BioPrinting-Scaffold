import { motion } from 'framer-motion'

const Research = () => {
  const publications = [
    {
      title: 'Patient-Derived Cell Bioprinting for Personalized Tissue Scaffolds',
      authors: 'Research Team et al.',
      journal: 'Nature Biotechnology',
      year: 2024,
      doi: '10.1038/nbt.2024.001',
      abstract: 'We present a novel approach to creating personalized tissue scaffolds using patient-derived cells and advanced 3D bioprinting techniques.',
      category: 'Primary Research',
    },
    {
      title: 'Voronoi-Based Biomimetic Scaffold Design for Enhanced Cell Viability',
      authors: 'Research Team et al.',
      journal: 'Advanced Materials',
      year: 2024,
      doi: '10.1002/adma.202400123',
      abstract: 'This study demonstrates how Voronoi tessellation can be used to create scaffolds that mimic natural tissue microstructure.',
      category: 'Methodology',
    },
    {
      title: 'Fractal Vascular Networks in 3D Bioprinted Tissues',
      authors: 'Research Team et al.',
      journal: 'Biomaterials Science',
      year: 2023,
      doi: '10.1039/bm2023.456',
      abstract: 'We explore the use of fractal branching algorithms to create biologically plausible vascular networks in bioprinted tissues.',
      category: 'Vascular Engineering',
    },
    {
      title: 'Computational Modeling for Optimized Scaffold Architecture',
      authors: 'Research Team et al.',
      journal: 'Journal of Biomechanical Engineering',
      year: 2023,
      doi: '10.1115/jbe.2023.789',
      abstract: 'AI-driven design tools for optimizing scaffold architecture and cell distribution in 3D bioprinted constructs.',
      category: 'Computational Design',
    },
  ]

  const researchAreas = [
    {
      icon: '🧬',
      title: 'Cell Biology',
      description: 'Understanding cell behavior and interactions in 3D printed environments',
    },
    {
      icon: '🔬',
      title: 'Material Science',
      description: 'Developing biocompatible materials for tissue engineering applications',
    },
    {
      icon: '💻',
      title: 'Computational Design',
      description: 'AI and machine learning for optimized scaffold architecture',
    },
    {
      icon: '🖨️',
      title: 'Bioprinting Technology',
      description: 'Advancing 3D printing techniques for biological materials',
    },
  ]

  return (
    <section id="research" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Research & Publications</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our latest research findings and publications in the field of
            3D bioprinting and personalized tissue engineering.
          </p>
        </motion.div>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {researchAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-5xl mb-4">{area.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {area.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Publications */}
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
                      {pub.category}
                    </span>
                    <span className="text-gray-500 text-sm">{pub.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{pub.authors}</p>
                  <p className="text-gray-700 italic mb-3">{pub.journal}</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{pub.abstract}</p>
              <div className="flex items-center gap-4">
                <a
                  href={`https://doi.org/${pub.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
                >
                  <span>Read Paper</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <span className="text-gray-400">DOI: {pub.doi}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-lg opacity-90">Publications</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-lg opacity-90">Citations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Patents</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-lg opacity-90">Years Research</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Research




