import { motion } from 'framer-motion'

const Process = () => {
  const steps = [
    {
      number: '01',
      title: 'Cell Collection',
      description: 'Patient-derived cells are collected through minimally invasive procedures.',
      icon: '🔬',
    },
    {
      number: '02',
      title: 'Cell Culture & Expansion',
      description: 'Cells are cultured and expanded in controlled laboratory conditions.',
      icon: '🧪',
    },
    {
      number: '03',
      title: 'Scaffold Design',
      description: 'Custom scaffold architecture is designed using computational modeling.',
      icon: '💻',
    },
    {
      number: '04',
      title: '3D Bioprinting',
      description: 'Cells and biomaterials are precisely deposited to create the scaffold.',
      icon: '🖨️',
    },
    {
      number: '05',
      title: 'Maturation',
      description: 'Scaffolds are cultured to allow tissue maturation and development.',
      icon: '⏱️',
    },
    {
      number: '06',
      title: 'Quality Assurance',
      description: 'Rigorous testing ensures scaffold quality and biocompatibility.',
      icon: '✅',
    },
  ]

  return (
    <section id="process" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive workflow from cell collection to final scaffold
            production, ensuring quality and personalization at every step.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 via-primary-400 to-accent-200"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} md:w-5/12`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="text-4xl mb-4">{step.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg md:text-xl">
                    {step.number}
                  </span>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1 md:w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process


