import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experiences from "./sections/Experiences";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import { TerminalDemo } from "./sections/animatedTerminal";
import LoadingScreen from "./components/LoadingScreen";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Preload critical resources in background
    const preloadResources = async () => {
      const images = [
        '/assets/sky.jpg', // Priority: Load sky first
        '/assets/mountain-1.png',
        '/assets/mountain-2.png',
        '/assets/mountain-3.png',
        '/assets/planets.png',
        '/assets/projects/saas.png',
        '/assets/projects/ecommerce.png',
        '/assets/projects/health.png',
        '/assets/projects/travel.png'
      ];

      const imagePromises = images.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Continue even if image fails
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
    };

    preloadResources();
  }, []);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    // Small delay before showing main content for smooth transition
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  };

  // Enhanced scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      // Add any scroll-based effects here if needed
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main App Content */}
      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="smooth-scroll"
          >
            {/* Full-bleed hero section */}
            <motion.div variants={sectionVariants}>
              <Hero />
            </motion.div>
            <div className="container mx-auto max-w-7xl">
              <motion.div variants={sectionVariants}>
                <About />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <Experiences />
              </motion.div>
              {/* <Projects /> */}
            </div>
            {/* Full-bleed terminal section */}
            <motion.div variants={sectionVariants}>
              <TerminalDemo />
            </motion.div>
            <div className="container mx-auto max-w-7xl">
              <motion.div variants={sectionVariants}>
                <Contact />
              </motion.div>
              <motion.div variants={sectionVariants}>
                <Footer/>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
