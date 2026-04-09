import { motion } from 'framer-motion'

const Applications = () => {
  const applications = [
    {
      title: 'Bone Regeneration',
      description: 'Custom bone scaffolds for fracture repair and bone defect reconstruction.',
      image: '🦴',
      color: 'from-blue-400 to-blue-600',
    },
    {
      title: 'Cartilage Repair',
      description: 'Articular cartilage scaffolds for joint repair and osteoarthritis treatment.',
      image: '🦴',
      color: 'from-purple-400 to-purple-600',
    },
    {
      title: 'Skin Grafts',
      description: 'Personalized skin tissue scaffolds for burn victims and wound healing.',
      image: '🩹',
      color: 'from-pink-400 to-pink-600',
    },
    {
      title: 'Organ Repair',
      description: 'Tissue scaffolds for organ repair and partial organ replacement.',
      image: '❤️',
      color: 'from-red-400 to-red-600',
    },
    {
      title: 'Vascular Grafts',
      description: 'Blood vessel scaffolds for cardiovascular applications.',
      image: '🩸',
      color: 'from-rose-400 to-rose-600',
    },
    {
      title: 'Neural Tissue',
      description: 'Nerve guidance scaffolds for neural regeneration and repair.',
      image: '🧠',
      color: 'from-indigo-400 to-indigo-600',
    },
  ]

  return (
    <section id="applications" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Applications</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our personalized tissue scaffolds have wide-ranging applications
            across multiple medical specialties.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${app.color}`} />
              <div className="p-6">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {app.image}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {app.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {app.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 border border-primary-100">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
              Endless Possibilities
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              As our technology advances, we continue to explore new applications
              and expand the boundaries of what's possible in regenerative medicine.
              The future of personalized healthcare is here.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Applications


