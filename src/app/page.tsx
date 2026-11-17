"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

import OpeningCover from "@/components/OpeningCover";
import HeroSection from "@/components/HeroSection";
import WeddingDetails from "@/components/WeddingDetails";
import PetalFall from "@/components/PetalFall";
import CoupleSection from "@/components/CoupleSection";
import PhotoGallery from "@/components/PhotoGallery";
import RSVPSection from "@/components/RSVPSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [guestName, setGuestName] = useState("Bapak/Ibu/Saudara/i");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");

    if (name?.trim()) {
      setGuestName(name.trim());
    }
  }, []);

  // Membuka undangan dan memutar musik
  const handleOpen = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.log("Musik belum dapat diputar:", error);
          setIsPlaying(false);
        });
    }

    setOpened(true);
  };

  // Mengaktifkan dan menonaktifkan musik
  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Musik gagal diputar:", error);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <main>
      {/* Background Music */}
      <audio
        ref={audioRef}
        src="/audio/wedding-music.mp3"
        loop
        preload="auto"
      />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="cover"
            exit={{
              opacity: 0,
              scale: 1.1,
              filter: "blur(10px)",
            }}
            transition={{ duration: 1 }}
          >
            <OpeningCover
              onOpen={handleOpen}
              guestName={guestName}
            />
          </motion.div>
        ) : (
          <motion.div
            key="invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Falling Petals */}
            <PetalFall />

            <HeroSection />
            <CoupleSection />
            <WeddingDetails />
            <PhotoGallery />
            <RSVPSection />
            <FooterSection />

          </motion.div>
        )}
      </AnimatePresence>


      {/* Floating Music Button */}
      {opened && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
          onClick={toggleMusic}
          aria-label={isPlaying ? "Matikan musik" : "Putar musik"}
          title={isPlaying ? "Matikan musik" : "Putar musik"}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "25px",
            zIndex: 9999,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            border: "1px solid rgba(212, 175, 55, 0.8)",
            background: "linear-gradient(135deg, #800020, #4a0012)",
            color: "#f5d88b",
            fontSize: "23px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 15px rgba(0,0,0,0.25)",
          }}
        >
          <motion.span
            animate={{
              rotate: isPlaying ? 360 : 0,
            }}
            transition={{
              rotate: isPlaying
                ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }
                : {
                    duration: 0.3,
                  },
            }}
            style={{
              display: "inline-block",
            }}
          >
            ♫
          </motion.span>
        </motion.button>
      )}
    </main>
  );
}