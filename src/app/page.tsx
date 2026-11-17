"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");

    if (name?.trim()) {
      setGuestName(name.trim());
    }
  }, []);

  return (
    <main>
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
              onOpen={() => setOpened(true)}
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
    </main>
  );
}