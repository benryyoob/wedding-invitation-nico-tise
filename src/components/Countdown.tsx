"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { weddingData } from "@/lib/data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTime(): TimeLeft {
  const difference =
    new Date(weddingData.dateISO).getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTime());

    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: "DAYS", value: timeLeft?.days ?? "--" },
    { label: "HOURS", value: timeLeft?.hours ?? "--" },
    { label: "MINUTES", value: timeLeft?.minutes ?? "--" },
    { label: "SECONDS", value: timeLeft?.seconds ?? "--" },
  ];

  return (
    <section className="countdown-section">
      <motion.div
        className="countdown-content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <p className="section-subtitle">
          SAVE THE DATE
        </p>

        <h2 className="section-title">
          Counting Our Moments
        </h2>

        <div className="countdown-divider">
          ✦
        </div>

        <div className="countdown-grid">
          {items.map((item) => (
            <div className="countdown-item" key={item.label}>
              <div className="countdown-number">
                {item.value}
              </div>

              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <h2 className="hero-title countdown-couple-name">
          Nico & Tise
        </h2>

        <motion.div
          className="countdown-ring"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Image
            src="/images/ring.webp"
            alt="Wedding Ring"
            width={80}
            height={80}
            priority={false}
            className="countdown-ring-image"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}