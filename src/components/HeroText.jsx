import { FlipWords } from "./FlipWords";
import { motion } from "framer-motion";

const HeroText = () => {
  const words = ["Secure", "Modern", "Scalable"];

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="z-10 mt-20 md:mt-40 rounded-3xl bg-clip-text">
      {/* Desktop View */}
      <div className="hidden md:flex flex-col space-y-6 text-left">
        <motion.h1
          className="text-4xl font-semibold text-white"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I&apos;m Ashish
        </motion.h1>

        <motion.p
          className="text-5xl font-medium text-neutral-300 leading-snug"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          A Software Developer specialized in <br />
          <span className="text-white">MERN Stack, Golang, App Development, and Cloud.</span>
        </motion.p>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          <FlipWords words={words} className="text-8xl font-extrabold text-white" />
        </motion.div>

        <motion.p
          className="text-3xl font-medium text-neutral-100 leading-relaxed"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
        >
          Building RESTful APIs, Cloud-native Microservices, and Serverless Applications.
        </motion.p>
      </div>

      {/* Mobile View */}
      <div className="flex flex-col space-y-6 md:hidden text-center">
        <motion.h1
          className="text-3xl font-semibold text-white"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          Hi, I&apos;m Ashish
        </motion.h1>

        <motion.p
          className="text-4xl font-bold text-neutral-300 leading-snug"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          Software Developer
        </motion.p>

        <motion.div
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.5 }}
        >
          <FlipWords words={words} className="text-6xl font-extrabold text-white" />
        </motion.div>

        <motion.p
          className="text-2xl font-medium text-neutral-300 leading-relaxed"
          variants={variants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.8 }}
        >
          Microservices & APIs with Golang, AWS Lambda, and Cloud.
        </motion.p>
      </div>
    </div>
  );
};

export default HeroText;
