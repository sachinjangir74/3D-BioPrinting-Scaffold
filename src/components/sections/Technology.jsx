import { motion } from 'framer-motion'

const Technology = () => {
  const technologies = [
    {
      title: '3D Bioprinting Systems',
      description: 'Advanced bioprinting platforms capable of precise cell deposition and scaffold fabrication.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Cell Culture & Isolation',
      description: 'Sophisticated methods for isolating and culturing patient-derived cells with high viability.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Biomaterial Engineering',
      description: 'Development of biocompatible materials that support cell growth and tissue formation.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Computational Modeling',
      description: 'AI-driven design tools for optimizing scaffold architecture and cell distribution.',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section id="technology" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Technology</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Leveraging cutting-edge technologies to create the future of
            personalized regenerative medicine.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <div className="relative p-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tech.color} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-3xl text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {tech.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold gradient-text mb-2">99%+</div>
            <div className="text-gray-600">Cell Viability</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold gradient-text mb-2">50μm</div>
            <div className="text-gray-600">Print Resolution</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold gradient-text mb-2">24hr</div>
            <div className="text-gray-600">Scaffold Production</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Technology


