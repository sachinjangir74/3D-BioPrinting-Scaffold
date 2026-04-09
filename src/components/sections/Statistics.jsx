import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const Statistics = () => {
  const [counts, setCounts] = useState({
    scaffolds: 0,
    patients: 0,
    success: 0,
    research: 0,
  })

  const stats = [
    {
      value: 500,
      label: 'Scaffolds Created',
      suffix: '+',
      icon: '🖨️',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      value: 250,
      label: 'Patients Served',
      suffix: '+',
      icon: '👥',
      color: 'from-purple-500 to-pink-500',
    },
    {
      value: 95,
      label: 'Success Rate',
      suffix: '%',
      icon: '✅',
      color: 'from-green-500 to-emerald-500',
    },
    {
      value: 50,
      label: 'Research Papers',
      suffix: '+',
      icon: '📄',
      color: 'from-orange-500 to-red-500',
    },
  ]

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const interval = duration / steps
    const timers = []

    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.value / steps
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setCounts((prev) => ({
          ...prev,
          [index === 0 ? 'scaffolds' : index === 1 ? 'patients' : index === 2 ? 'success' : 'research']: Math.floor(current),
        }))
      }, interval)
      timers.push(timer)
    })

    return () => {
      timers.forEach((timer) => clearInterval(timer))
    }
  }, [])

  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Tracking our progress in advancing personalized regenerative medicine
            through 3D bioprinting technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className={`text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {index === 0
                  ? counts.scaffolds
                  : index === 1
                  ? counts.patients
                  : index === 2
                  ? counts.success
                  : counts.research}
                {stat.suffix}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold mb-2">24hr</div>
            <div className="opacity-90">Average Scaffold Production Time</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold mb-2">99%+</div>
            <div className="opacity-90">Cell Viability Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold mb-2">50μm</div>
            <div className="opacity-90">Print Resolution</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics
