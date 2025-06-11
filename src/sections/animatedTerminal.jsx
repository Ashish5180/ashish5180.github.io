import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  { text: "> initializing portfolio.sh", type: "command" },
  { text: "✔ Boot sequence started.", type: "success" },
  { text: "✔ Found Full Stack Developer: MERN", type: "success" },
  { text: "✔ 1 year hands-on experience detected.", type: "success" },
  { text: "✔ Loading projects: 10+ real-world builds", type: "success" },
  { text: "✔ Integrating technologies: React, Node, Express, MongoDB", type: "success" },
  { text: "✔ Styling engine: Tailwind CSS active", type: "success" },
  { text: "✔ Deployments via Vercel & Render configured", type: "success" },
  { text: "✔ GitHub activity: 365+ days streak ☕", type: "success" },
  { text: "✔ Passion modules loaded: Clean code, UI/UX, APIs", type: "success" },
  {
    text: ["ℹ Portfolio ready at:", "  - https://Ashish.dev"],
    type: "info",
  },
  { text: "✅ System check complete. Developer is live.", type: "faded" },
  { text: "📬 Reach out to build something amazing.", type: "faded" },
  { text: "📂 Skills Snapshot:", type: "command" },
  {
    text: "💻 Frontend: React.js, HTML, CSS, JavaScript, Tailwind CSS, Material UI, Redux",
    type: "info",
  },
  {
    text: "🎨 3D/UI Libraries: Spline.js, Three.js, Framer Motion",
    type: "info",
  },
  {
    text: "🛠 Backend: Node.js, Express.js, MongoDB, MySQL, REST APIs, JWT",
    type: "info",
  },
  {
    text: "🧰 Tools: Git, GitHub, Postman, Selenium, Vercel, AWS",
    type: "info",
  },
  {
    text: "🧹 Clean Code & Docs: Consistent formatting, comments, README files",
    type: "info",
  },
  {
    text: "🔄 Methodologies: Agile & SCRUM basics followed",
    type: "info",
  },
];

const getTextColor = (type) => {
  switch (type) {
    case "command":
      return "text-white";
    case "success":
      return "text-green-400";
    case "info":
      return "text-blue-400";
    case "faded":
      return "text-gray-400";
    default:
      return "text-white";
  }
};

export const TerminalDemo = () => {
  const [displayedLines, setDisplayedLines] = useState([]); // Each message fully typed
  const [currentText, setCurrentText] = useState(""); // Text currently typing
  const [currentIndex, setCurrentIndex] = useState(0); // Which message are we typing now
  const [charIndex, setCharIndex] = useState(0); // which char in current message
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef(null);

  // Helper to flatten text if it's array (like multiline message)
  const flattenText = (text) => (Array.isArray(text) ? text.join("\n") : text);

  useEffect(() => {
    if (currentIndex >= messages.length) {
      setIsTyping(false);
      setCurrentText("");
      return;
    }

    const message = messages[currentIndex];
    const fullText = flattenText(message.text);

    if (charIndex < fullText.length) {
      // Type next character after delay
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100); // typing speed, adjust if needed

      return () => clearTimeout(timeout);
    } else {
      // Finished typing current message
      // Add it to displayedLines as fully typed
      setDisplayedLines((prev) => [...prev, message]);
      setCurrentIndex(currentIndex + 1);
      setCharIndex(0);
      setCurrentText("");
    }
  }, [charIndex, currentIndex]);

  // Auto scroll to bottom on new lines
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines, currentText]);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://discussions.apple.com/content/attachment/88de85d5-32c2-4c1f-95b4-4fa5f872600b')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="backdrop-blur-md bg-black/70 rounded-xl shadow-2xl max-w-3xl w-full font-mono text-sm border border-white/20 flex flex-col"
        style={{ height: "600px" }}
      >
        {/* Terminal Header */}
        <div className="flex items-center space-x-2 px-4 py-2 bg-black/30 rounded-t-xl border-b border-white/20">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-white text-xs ml-4">Terminal</span>
        </div>

        {/* Terminal Content */}
        <div
          ref={containerRef}
          className="p-4 overflow-y-auto flex-1 whitespace-pre-wrap"
          style={{ lineHeight: "1.4rem" }}
        >
          {displayedLines.map((msg, idx) => (
            <div key={idx} className={getTextColor(msg.type)}>
              {Array.isArray(msg.text)
                ? msg.text.map((line, i) => (
                    <div key={i} className={i > 0 ? "pl-4" : ""}>
                      {line}
                    </div>
                  ))
                : msg.text}
            </div>
          ))}

          {/* Current typing line with blinking cursor */}
          {currentText && (
            <motion.div
              className={getTextColor(messages[currentIndex]?.type)}
              key="typing"
            >
              {currentText}
              <span className="animate-blink">▋</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Custom blinking cursor animation style */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          display: inline-block;
          animation: blink 1s step-start infinite;
          margin-left: 2px;
          color: #0ff;
        }
      `}</style>
    </div>
  );
};
