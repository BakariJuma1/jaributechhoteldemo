import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Events from './pages/Events'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#F4F4F2]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </BrowserRouter>
  )
}

export default App
