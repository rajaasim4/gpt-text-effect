// New Code

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const textPairs = [
  {
    normalText: "Hello Raja Asim, how are you? Where are you?",
    typewriterText: "This text will use typewriter effect.",
  },
  {
    normalText: "I am a Programmer",
    typewriterText: "Great to hear that you are a programmer",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showText, setShowText] = useState(true);

  const handleComplete = () => {
    setTimeout(() => {
      setShowText(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textPairs.length);
        setShowText(true);
      }, 1000); // Adjust this delay as needed
    }, 2000); // Adjust this delay as needed
  };

  return (
    <div className="flex  items-center justify-start px-4 h-screen bg-gray-900 space-y-4">
      <AnimatePresence>
        {showText && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-xl font-semibold mb-4">
              {textPairs[currentIndex].normalText}
            </div>
            <TypewriterEffect
              text={textPairs[currentIndex].typewriterText}
              speed={50}
              onComplete={handleComplete}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TypewriterEffect = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(intervalId);
        setIsTypingComplete(true);
        onComplete(); // Call onComplete when typing is complete
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return (
    <div className="text-xl font-mono text-white p-4 rounded-md shadow-lg">
      {displayedText}
      {!isTypingComplete && (
        <span className="rounded-full w-5 h-5 bg-white inline-block ml-1 align-bottom"></span>
      )}
    </div>
  );
};

export default App;
