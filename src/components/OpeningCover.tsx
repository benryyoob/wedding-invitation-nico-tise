"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/data";

interface Props {
  onOpen: () => void;
  guestName: string;
}

export default function OpeningCover({ onOpen, guestName }: Props) {
  return (
    <section className="opening-cover">

      <div className="cover-border">
        <div className="cover-inner">

          {/* Ornamen atas */}
          <motion.div
            className="cover-flower flower-top"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ❀
          </motion.div>

          {/* Konten undangan */}
          <motion.div
            className="cover-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <p className="cover-subtitle">
              THE WEDDING OF
            </p>

            <h1 className="cover-names">
              {weddingData.groom}
              <span>&</span>
              {weddingData.bride}
            </h1>

            <div className="gold-divider">
              <span>✦</span>
            </div>

            <p className="cover-date">
              {weddingData.date}
            </p>

            {/* Nama Tamu Undangan */}
            <motion.div
              className="cover-guest"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <p>Kepada Yth.</p>
              <h3>{guestName}</h3>
            </motion.div>

            {/* Tombol Buka Undangan */}
            <motion.button
              onClick={onOpen}
              className="open-button"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>✉</span>
              BUKA UNDANGAN
            </motion.button>
          </motion.div>

          {/* Ornamen bawah */}
          <motion.div
            className="cover-flower flower-bottom"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
            }}
          >
            ❀
          </motion.div>

        </div>
      </div>

      <div className="cover-grain" />

    </section>
  );
}