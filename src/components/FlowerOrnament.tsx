"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
  delay?: number;
}

export default function FlowerOrnament({
  className = "",
  delay = 0,
}: Props) {
  return (
    <motion.div
      className={`flower-ornament ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        opacity: { duration: 1.5, delay },
        scale: { duration: 1.5, delay },
        rotate: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <svg
        viewBox="0 0 220 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#D6B46A" strokeWidth="1.5">
          <path d="M110 245 C105 180 125 125 110 65" />

          <path d="M110 180 C75 160 55 130 35 105" />
          <path d="M85 155 C60 145 45 145 25 155" />

          <path d="M110 145 C145 130 165 100 185 75" />
          <path d="M120 185 C150 170 175 175 195 160" />

          <path d="M35 105 C10 75 5 110 35 105Z" />
          <path d="M35 105 C65 90 65 120 35 105Z" />

          <path d="M25 155 C5 125 5 155 25 155Z" />
          <path d="M25 155 C50 135 55 165 25 155Z" />

          <path d="M185 75 C165 40 150 70 185 75Z" />
          <path d="M185 75 C210 55 215 85 185 75Z" />

          <path d="M195 160 C175 125 165 155 195 160Z" />
          <path d="M195 160 C220 140 220 170 195 160Z" />

          <g transform="translate(110 65)">
            {[0, 72, 144, 216, 288].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-23"
                rx="13"
                ry="24"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="9" fill="#D6B46A" />
          </g>

          <g transform="translate(35 105)">
            {[0, 90, 180, 270].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-7"
                rx="4"
                ry="8"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle r="3" fill="#D6B46A" />
          </g>
        </g>
      </svg>
    </motion.div>
  );
}