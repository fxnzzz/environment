import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Leaf, 
  Wind, 
  Sun, 
  Recycle, 
  Droplets, 
  Globe2, 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight,
  Factory,
  AlertTriangle,
  Flame
} from 'lucide-react';

// --- Reusable Animation Wrappers ---

const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={{
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.15
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Mission', 'Crisis', 'Solutions', 'Impact'];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-gray-200/50 py-4 shadow-sm' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Leaf className={`w-6 h-6 ${isScrolled ? 'text-emerald-600' : 'text-white'}`} />
          <span className={`text-xl font-bold tracking-tighter ${isScrolled ? 'text-zinc-900' : 'text-white'}`}>
            Environment
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${
                isScrolled ? 'text-zinc-600' : 'text-zinc-200'
              }`}
            >
              {link}
            </a>
          ))}
          <button className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            isScrolled 
              ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
              : 'bg-white text-zinc-900 hover:bg-zinc-100'
          }`}>
            Take Action
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={isScrolled || mobileMenuOpen ? 'text-zinc-900' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-zinc-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-zinc-800 py-2 border-b border-gray-50"
            >
              {link}
            </a>
          ))}
          <button className="mt-4 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold text-center w-full">
            Take Action
          </button>
        </motion.div>
      )}
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-zinc-950">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=2560" 
          alt="Lush green forest" 
          className="w-full h-full object-cover scale-105"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          style={{ opacity }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md text-sm font-semibold tracking-wide mb-6">
            A SUSTAINABLE FUTURE
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
            Nature's resilience <br className="hidden md:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-200">
              powered by technology.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-300 mb-10 font-light leading-relaxed">
            We are engineering intelligent solutions to reverse ecological damage. 
            Join the movement toward a zero-waste, carbon-negative society.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group">
              Explore Solutions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 font-semibold transition-all duration-300">
              Our Impact Report
            </button>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/50"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="mission" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-50 -z-10 rounded-l-[100px] hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
                We believe <span className="text-emerald-600">sustainability</span> is not a compromise.
              </h2>
              <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
                Our mission is to decouple human progress from environmental destruction. By leveraging advanced recycling technologies, AI-driven waste management, and renewable energy grids, we are building an ecosystem where economic growth actually heals the planet.
              </p>
            </FadeUp>

            <StaggerContainer className="grid sm:grid-cols-2 gap-8 mb-8">
              {[
                { number: "2.5M+", label: "Tons of plastic recycled globally" },
                { number: "100%", label: "Carbon neutral operations since 2021" },
                { number: "450+", label: "Partner cities using our smart grids" },
                { number: "Zero", label: "Waste-to-landfill policy by 2030" }
              ].map((stat, i) => (
                <StaggerItem key={i} className="border-l-2 border-emerald-500 pl-4">
                  <div className="text-3xl font-bold text-zinc-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="relative">
            <FadeUp delay={0.2}>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1200" 
                  alt="Sunlight through forest" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl shadow-zinc-200/50 max-w-xs hidden md:block">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div className="font-semibold text-zinc-900">Global Reach</div>
                </div>
                <p className="text-sm text-zinc-600">Operating in over 40 countries, driving systemic change on a global scale.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const problems = [
    { icon: <Factory />, title: "Industrial Emissions", desc: "Heavy industries account for 30% of global greenhouse gases, accelerating climate change at unprecedented rates." },
    { icon: <AlertTriangle />, title: "Plastic Crisis", desc: "Over 8 million tons of plastic enter our oceans annually, destroying marine ecosystems and entering the food chain." },
    { icon: <Flame />, title: "Resource Depletion", desc: "We are consuming Earth's natural resources 1.7 times faster than the planet's ecosystems can regenerate." }
  ];

  return (
    <section id="crisis" className="py-24 md:py-32 bg-zinc-950 text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Cost of Inaction</h2>
          <p className="text-lg text-zinc-400">
            We are at a critical juncture. The traditional linear economy of "take, make, dispose" is pushing our planetary boundaries to the breaking point.
          </p>
        </FadeUp>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {problems.map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 h-full group">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {React.cloneElement(item.icon, { className: "w-7 h-7" })}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

const Solutions = () => {
  const features = [
    {
      title: "Smart Waste Sorting",
      desc: "AI-powered robotic facilities that sort recyclables with 99.8% accuracy, diverting millions of tons from landfills.",
      icon: <Recycle />,
      img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
      span: "md:col-span-2 md:row-span-2"
    },
    {
      title: "Clean Energy Grids",
      desc: "Decentralized solar and wind networks providing resilient, zero-emission power.",
      icon: <Wind />,
      img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800",
      span: "md:col-span-1 md:row-span-1"
    },
    {
      title: "Water Purification",
      desc: "Next-gen filtration systems restoring polluted waterways.",
      icon: <Droplets />,
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
      span: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section id="solutions" className="py-24 md:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">Innovation for Earth</h2>
          <p className="text-lg text-zinc-600 max-w-2xl">
            We don't just point out the problems. We engineer the solutions. Our vertically integrated technologies tackle environmental degradation at the source.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          {features.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`group relative rounded-3xl overflow-hidden isolate ${item.span}`}
            >
              <img 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 -z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent -z-10" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                  {React.cloneElement(item.icon, { className: "w-6 h-6" })}
                </div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800", // Wind turbines
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800", // Solar panel
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800", // Nature/Plant
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800", // Mountains
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">A Glimpse of Tomorrow</h2>
        </FadeUp>
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {images.map((src, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="min-w-[85vw] md:min-w-[400px] aspect-[4/3] rounded-3xl overflow-hidden snap-center relative group shrink-0"
            >
              <img 
                src={src} 
                alt="Eco gallery" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  return (
    <section id="impact" className="py-24 md:py-32 bg-zinc-900 text-white border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Measurable Impact.</h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              We track our success not just in revenue, but in megatons of carbon offset, hectares of forest preserved, and megawatts of clean energy generated. Transparency is core to our methodology.
            </p>
            
            <div className="space-y-8">
              {[
                { label: "Carbon Offset", value: "85%", target: "100M Tons" },
                { label: "Renewable Energy Deployment", value: "62%", target: "500 GW" },
                { label: "Water Restored", value: "90%", target: "2B Gallons" },
              ].map((bar, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2 font-medium">
                    <span>{bar.label}</span>
                    <span className="text-emerald-400">{bar.target}</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="relative">
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
            <div className="relative bg-zinc-800/50 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
              <Sun className="w-12 h-12 text-lime-400 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Join the 2030 Initiative</h3>
              <p className="text-zinc-400 mb-8">
                Partner with us to transform your corporate infrastructure into a net-positive ecosystem. Together we can reach zero emissions by 2030.
              </p>
              <button className="flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors group">
                View partnership details
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-emerald-900">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-900/50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <FadeUp>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">
            Ready to change the world?
          </h2>
          <p className="text-xl text-emerald-100/80 mb-12 max-w-2xl mx-auto">
            Whether you're an individual making lifestyle changes or a corporation looking to overhaul your supply chain, the time to act is now.
          </p>
          <button className="px-10 py-5 rounded-full bg-lime-400 text-emerald-950 text-lg font-bold hover:bg-lime-300 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(163,230,53,0.3)]">
            Start Your Journey
          </button>
        </FadeUp>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-6 h-6 text-emerald-500" />
            <span className="text-xl font-bold tracking-tighter text-white">Environment</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Building the infrastructure for a sustainable tomorrow. Engineering clean tech solutions for a resilient planet.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Platform</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Smart Grids</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Waste Analytics</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Carbon Tracking</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Water Systems</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Impact Report</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© 2026 Environment Technologies Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problem />
        <Solutions />
        <Gallery />
        <Impact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}