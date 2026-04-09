import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What is 3D bioprinting?',
      answer:
        '3D bioprinting is an additive manufacturing process that uses living cells, biomaterials, and growth factors to create three-dimensional biological structures. It combines 3D printing technology with tissue engineering to produce functional tissues and organs.',
    },
    {
      question: 'How does personalized tissue scaffold bioprinting work?',
      answer:
        'Our process involves collecting patient-derived cells, expanding them in culture, designing a custom scaffold architecture using computational modeling, and then 3D printing the scaffold layer by layer with precise cell placement. The scaffold is then matured in a bioreactor before implantation.',
    },
    {
      question: 'What are the advantages of patient-derived cells?',
      answer:
        'Using patient-derived cells eliminates the risk of immune rejection, ensures perfect biocompatibility, and allows for personalized treatment tailored to each patient\'s specific needs. This approach is particularly important for regenerative medicine applications.',
    },
    {
      question: 'What materials are used in bioprinting?',
      answer:
        'We use a variety of biocompatible materials including hydrogels (Alginate, GelMA), natural proteins (Collagen), and biodegradable polymers (PCL, PLGA). Material selection depends on the specific tissue type and application requirements.',
    },
    {
      question: 'How long does it take to create a personalized scaffold?',
      answer:
        'The timeline varies depending on the complexity, but typically takes 2-4 weeks: cell collection (1 day), cell expansion (1-2 weeks), scaffold design (2-3 days), bioprinting (1 day), and maturation (1 week).',
    },
    {
      question: 'What tissues can be bioprinted?',
      answer:
        'Currently, we can bioprint various tissues including bone, cartilage, skin, vascular networks, and neural tissue. Research is ongoing to expand to more complex organs like liver and kidney tissue.',
    },
    {
      question: 'Is 3D bioprinting safe?',
      answer:
        'Yes, when performed under proper sterile conditions and using FDA-approved materials, 3D bioprinting is safe. All our processes follow strict quality control and regulatory guidelines. However, clinical applications are still in research phases.',
    },
    {
      question: 'Can I use the G-code with any 3D printer?',
      answer:
        'The generated G-code is compatible with most FDM/FFF 3D printers. However, for bioprinting applications, specialized bioprinters with temperature control, sterile environments, and multi-material capabilities are recommended.',
    },
    {
      question: 'What is Voronoi tessellation in scaffold design?',
      answer:
        'Voronoi tessellation creates irregular, cell-like pore structures by dividing space into regions based on proximity to seed points. This mimics natural tissue microstructure and provides optimal conditions for cell growth and nutrient diffusion.',
    },
    {
      question: 'How do I get started with your research?',
      answer:
        'You can contact us through the contact form on this website, email us directly, or reach out to our research team. We welcome collaborations, partnerships, and inquiries from researchers, clinicians, and industry partners.',
    },
  ]

  return (
    <section id="faq" className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about 3D bioprinting, personalized
            tissue scaffolds, and our research.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-lg font-semibold text-gray-800 pr-8">
                  {faq.question}
                </span>
                <svg
                  className={`w-6 h-6 text-primary-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-5 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Still have questions?
            </h3>
            <p className="text-gray-700 mb-6">
              Don't hesitate to reach out to our team for more information.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FAQ




