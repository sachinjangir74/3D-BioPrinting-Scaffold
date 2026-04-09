import { motion } from 'framer-motion'

const About = () => {
  const features = [
    {
      icon: '🧬',
      title: 'Patient-Derived Cells',
      description: 'Utilizing cells directly from patients ensures perfect compatibility and reduces rejection risks.',
    },
    {
      icon: '🎯',
      title: 'Personalized Scaffolds',
      description: 'Custom-designed tissue scaffolds tailored to each patient\'s unique anatomical requirements.',
    },
    {
      icon: '🔬',
      title: 'Advanced Bioprinting',
      description: 'State-of-the-art 3D bioprinting technology for precise cell placement and scaffold construction.',
    },
    {
      icon: '💊',
      title: 'Regenerative Medicine',
      description: 'Pioneering the future of tissue engineering and regenerative medical treatments.',
    },
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Our Project</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are developing cutting-edge 3D bioprinting technology to create
            personalized tissue scaffolds using patient-derived cells, opening
            new possibilities in regenerative medicine.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Transforming Healthcare Through Innovation
            </h3>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              Our research focuses on creating biocompatible tissue scaffolds that
              can be precisely tailored to individual patients, revolutionizing
              how we approach tissue repair and regeneration. By combining
              patient-derived cells with advanced 3D bioprinting techniques, we
              are paving the way for personalized regenerative medicine solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About


