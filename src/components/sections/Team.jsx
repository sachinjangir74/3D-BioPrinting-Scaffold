import { motion } from 'framer-motion'

const Team = () => {
  const teamMembers = [
    {
      name: 'Sanket Kumar Mohanty',
      role: 'Principal Investigator',
      expertise: 'Tissue Engineering & Bioprinting',
      email: 'sanket@bioprinting-research.com',
      bio: 'Leading expert in 3D bioprinting with 15+ years of experience in regenerative medicine.',
      image: '👨‍🔬',
    },
    {
      name: 'Pratik Bothra',
      role: 'Senior Research Scientist',
      expertise: 'Computational Biology',
      email: 'pratik@bioprinting-research.com',
      bio: 'Specializes in AI-driven scaffold design and optimization algorithms.',
      image: '👨‍💻',
    },
    {
      name: 'Sachin Jangir',
      role: 'Research Scientist',
      expertise: 'Cell Biology & Culture',
      email: 'e.watson@bioprinting-research.com',
      bio: 'Expert in patient-derived cell isolation and expansion techniques.',
      image: '👨‍🔬',
    },
    {
      name: 'Aditya',
      role: 'Materials Engineer',
      expertise: 'Biomaterials & Polymers',
      email: 'Aditya@bioprinting-research.com',
      bio: 'Develops biocompatible materials for tissue engineering applications.',
      image: '👨‍🔧',
    },
    {
      name: 'Ravi',
      role: 'Clinical Researcher',
      expertise: 'Regenerative Medicine',
      email: 'Ravi@bioprinting-research.com',
      bio: 'Bridges the gap between research and clinical applications.',
      image: '👨‍🔬',
    },
    {
      name: 'Yash',
      role: 'Bioinformatics Specialist',
      expertise: 'Data Analysis & Modeling',
      email: 'Yash@bioprinting-research.com',
      bio: 'Analyzes complex biological data to optimize scaffold designs.',
      image: '👨‍🔬',
    },
  ]

  return (
    <section id="team" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Research Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated scientists and engineers working to advance
            personalized tissue engineering and 3D bioprinting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
            >
              <div className="text-center mb-6">
                <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {member.image}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-1">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.expertise}</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 text-center">
                {member.bio}
              </p>
              <div className="text-center">
                <a
                  href={`mailto:${member.email}`}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
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
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8 border border-primary-100">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Join Our Team
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We're always looking for talented researchers, engineers, and scientists
              to join our mission of advancing personalized regenerative medicine.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              View Open Positions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team




