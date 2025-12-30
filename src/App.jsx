import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Context
import { CartProvider } from './context/CartContext';

// Components
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import TextMarquee from './components/TextMarquee/TextMarquee';
import InteractiveSlider from './components/InteractiveSlider/InteractiveSlider';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/Cart/CartDrawer';

// Styles
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll after loading
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, [isLoading]);

  // Toggle cart
  const handleCartOpen = () => {
    setIsCartOpen(true);
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <CartProvider>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={`app ${isLoading ? 'app-loading' : 'app-loaded'}`}>
        {/* Custom Cursor */}
        <CustomCursor />

        {/* Navigation */}
        <Navbar onCartClick={handleCartOpen} />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Text Marquee */}
          <TextMarquee text="Crunch jo roz yaad aaye ✦ Premium Snacks Since 1999" />

          {/* Interactive Product Slider - Main Product Display */}
          <InteractiveSlider />

          {/* Another Marquee */}
          <TextMarquee text="Authentic Maharashtrian Flavors ✦ Est. 1999" speed={40} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Cart Drawer */}
        <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
      </div>
    </CartProvider>
  );
}

export default App;
