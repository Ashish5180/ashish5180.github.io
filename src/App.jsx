import React from "react";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import Footer from './sections/Footer';
import { TerminalDemo } from "./sections/animatedTerminal";

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Hero />
      <About />
      <Experiences />
      <Projects />
      <TerminalDemo/>
      <Testimonial />
      <Contact />
      <Footer/>
    </div>
  );
};

export default App;
