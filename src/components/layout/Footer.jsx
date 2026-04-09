import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">3D Bioprinting</h3>
            <p className="text-gray-400 leading-relaxed">
              Pioneering personalized tissue scaffolds for the future of regenerative medicine.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Research</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="#technology" className="hover:text-primary-400 transition-colors">Technology</a></li>
              <li><a href="#process" className="hover:text-primary-400 transition-colors">Process</a></li>
              <li><a href="#applications" className="hover:text-primary-400 transition-colors">Applications</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Publications</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Research Papers</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#contact" className="hover:text-primary-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} 3D Bioprinting Research. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


