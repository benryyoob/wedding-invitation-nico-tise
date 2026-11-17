"use client";

import { motion } from "framer-motion";

export default function PetalFall() {
  const petals = Array.from({ length: 18 });

  return (
    <div className="petal-container">
      {petals.map((_, index) => (
        <motion.div
          key={index}
          className="petal"
          initial={{
            y: -50,
            x: `${Math.random() * 100}vw`,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "110vh",
            x: [
              `${Math.random() * 100}vw`,
              `${Math.random() * 100}vw`,
              `${Math.random() * 100}vw`,
            ],
            opacity: [0, 0.8, 0.8, 0],
            rotate: 360,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}