import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Technology from './components/sections/Technology'
import BioprintingAnimation from './components/sections/BioprintingAnimation'
import BiomimeticScaffold from './components/sections/BiomimeticScaffold'
import GCodeGenerator from './components/sections/GCodeGenerator'
import Statistics from './components/sections/Statistics'
import MaterialsLibrary from './components/sections/MaterialsLibrary'
import Process from './components/sections/Process'
import Applications from './components/sections/Applications'
import Research from './components/sections/Research'
import Team from './components/sections/Team'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Statistics />
      <Technology />
      <BioprintingAnimation />
      <BiomimeticScaffold />
      <GCodeGenerator />
      <MaterialsLibrary />
      <Process />
      <Applications />
      <Research />
      <Team />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default App

