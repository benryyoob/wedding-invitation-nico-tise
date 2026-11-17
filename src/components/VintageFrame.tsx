"use client";

import { motion } from "framer-motion";

interface Props {
  image?: string;
  alt?: string;
}

export default function VintageFrame({
  image,
  alt = "Wedding Photo",
}: Props) {
  return (
    <motion.div
      className="vintage-frame"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      <div className="frame-outer">
        <div className="frame-inner">

          {image ? (
            <img
              src={image}
              alt={alt}
              className="frame-image"
            />
          ) : (
            <div className="frame-placeholder">
              <span>OUR PHOTO</span>
            </div>
          )}

        </div>

        <div className="frame-top-ornament">✦</div>
        <div className="frame-bottom-ornament">✦</div>
      </div>
    </motion.div>
  );
}