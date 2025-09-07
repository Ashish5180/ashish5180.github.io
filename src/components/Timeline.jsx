"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const highlightKeywords = [
    "Next.js",
    "Go",
    "AWS",
    "DynamoDB",
    "Lambda",
    "Performance",
    "Scalability",
    "TypeScript",
    "React Native",
    "R3F",
    "Three.js",
    "Optimized",
    "Reduced",
    "Improved",
    "Latency",
  ];

  const makeHighlighted = (text) => {
    if (!text) return text;
    const pattern = new RegExp(`(${highlightKeywords.join("|")})`, "gi");
    const parts = String(text).split(pattern);
    return parts.map((part, idx) => {
      if (pattern.test(part)) {
        return (
          <span key={idx} className="inline-flex items-baseline">
            <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent font-semibold tracking-tight animate-[shine_3.2s_linear_infinite]">
              {part}
            </span>
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      {/* Main Heading with Enhanced Effects */}
      <motion.h2 
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent relative inline-block"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 200%"
          }}
        >
          From Keyboard to Command: How I Built Myself in Tech
        </motion.span>
        
        {/* Floating particles around heading */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${-10 + (i % 2) * 20}%`,
            }}
            animate={{
              y: [-5, 5, -5],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.h2>
      
      {/* Subheading with Magnetic Effect */}
      <motion.h2 
        className="text-xl md:text-2xl lg:text-3xl font-semibold mb-8 relative group text-center"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        whileHover={{ 
          scale: 1.02
        }}
      >
        <motion.span
          className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent relative inline-block"
          whileHover={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: "200% 200%"
          }}
        >
          From Hacks to Impact: My Journey Through Tech
        </motion.span>
        
        {/* Improved animated underline */}
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "80%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          whileHover={{ 
            width: "100%",
            scaleY: 1.5,
            boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)"
          }}
        />
      </motion.h2>
      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={itemVariants}
            className="flex justify-start pt-10 md:pt-40 md:gap-10 group"
          >
            <div className="sticky z-40 flex flex-col items-center self-start max-w-xs md:flex-row top-40 lg:max-w-sm md:w-full">
              <div className="absolute -left-[15px] flex items-center justify-center w-10 h-10">
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-sky-400/10 group-hover:bg-sky-400/20 transition-colors" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]" />
              </div>
              <div className="flex-col hidden gap-2 md:flex md:pl-20">
                <h3 className="text-xl md:text-4xl text-neutral-300 font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    {item.date}
                  </span>
                </h3>
                <h3 className="text-2xl text-neutral-300 font-semibold">
                  {item.title}
                </h3>
                <div className="flex items-center gap-3">
                  {/* Company Icon */}
                  <motion.div
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg 
                      className="w-5 h-5 text-blue-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Company Name with Website Link */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl text-neutral-500">{item.job}</h3>
                    {item.website && (
                      <motion.a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        whileHover={{ x: 2 }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit Website
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="block mb-4 text-2xl font-bold text-left text-neutral-300 md:hidden">
                <h3>{item.date}</h3>
                <h3 className="text-lg">{item.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  {/* Mobile Company Icon */}
                  <motion.div
                    className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 15px rgba(59, 130, 246, 0.4)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg 
                      className="w-4 h-4 text-blue-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Mobile Company Name with Website */}
                  <div className="flex flex-col">
                    <h3>{item.job}</h3>
                    {item.website && (
                      <motion.a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        whileHover={{ x: 2 }}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit Website
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
              {item.contents.map((content, idx) => (
                <motion.p
                  className="mb-3 font-normal text-neutral-400 leading-relaxed hover:text-neutral-300 transition-colors"
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: 0.04 * (idx + 1) }}
                >
                  {makeHighlighted(content)}
                </motion.p>
              ))}
              {/* subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden>
                <div className="absolute inset-0 bg-[radial-gradient(400px_120px_at_20%_-10%,rgba(56,189,248,0.08),transparent),radial-gradient(300px_100px_at_80%_110%,rgba(168,85,247,0.08),transparent)]" />
              </div>
            </div>
          </motion.div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-sky-400 via-violet-400/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
          {/* moving progress dot */}
          <motion.span
            style={{ y: heightTransform }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]"
          />
        </div>
      </div>

      {/* local styles for shimmer */}
      <style>{`
        @keyframes shine { from { background-position: 0% 50%; } to { background-position: 200% 50%; } }
      `}</style>
    </div>
  );
};
