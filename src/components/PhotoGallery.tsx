"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Images } from "lucide-react";

const photos = Array.from({ length: 16 }, (_, index) => ({
  image: `/images/gallery-${index + 1}.jpeg`,
}));

export default function PhotoGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // SWIPE LIGHTBOX
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0].screenX;
    touchStartY.current = event.changedTouches[0].screenY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;

    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Abaikan gerakan vertikal
    if (
      Math.abs(diffX) < 50 ||
      Math.abs(diffX) < Math.abs(diffY)
    ) {
      return;
    }

    if (diffX > 0) {
      // Swipe ke kiri: foto berikutnya
      setSelected((current) =>
        current === null
          ? null
          : (current + 1) % photos.length
      );
    } else {
      // Swipe ke kanan: foto sebelumnya
      setSelected((current) =>
        current === null
          ? null
          : (current - 1 + photos.length) % photos.length
      );
    }
  };

  // OTOMATIS MENGGESER SLIDER
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const firstSlide = slider.querySelector(
        ".gallery-slide"
      ) as HTMLElement | null;

      if (!firstSlide) return;

      const sliderStyle = window.getComputedStyle(slider);
      const gap = parseFloat(sliderStyle.gap) || 0;

      const slideWidth = firstSlide.offsetWidth + gap;

      const maxScroll =
        slider.scrollWidth - slider.clientWidth;

      if (slider.scrollLeft >= maxScroll - 10) {
        slider.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        slider.scrollBy({
          left: slideWidth,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // TUTUP LIGHTBOX
  const closeLightbox = () => setSelected(null);

  // FOTO SEBELUMNYA
  const showPrevious = () => {
    setSelected((current) =>
      current === null
        ? null
        : (current - 1 + photos.length) % photos.length
    );
  };

  // FOTO BERIKUTNYA
  const showNext = () => {
    setSelected((current) =>
      current === null
        ? null
        : (current + 1) % photos.length
    );
  };

  // KEYBOARD NAVIGATION LIGHTBOX
  useEffect(() => {
    if (selected === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="gallery-section">
      <div className="gallery-container">

        {/* HEADING */}
        <motion.div
          className="gallery-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >

          <h2 className="section-title">
            Gallery
          </h2>

          <div className="gallery-heading-divider">
            <span>✦</span>
          </div>
        </motion.div>

        {/* PHOTO SLIDER */}
        <div
          className="gallery-slider"
          ref={sliderRef}
        >
          {photos.map((photo, index) => (
            <motion.button
              type="button"
              key={photo.image}
              className="gallery-slide"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: (index % 4) * 0.08,
              }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(index)}
              aria-label={`Lihat foto ${index + 1}`}
            >
              <div className="gallery-photo-frame">
                <img
                  src={photo.image}
                  alt={`Foto pernikahan ${index + 1}`}
                  className="gallery-image"
                  loading="lazy"
                />

                <div className="gallery-overlay">
                  <Images size={24} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

      </div>

      {/* FULLSCREEN LIGHTBOX */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* TOMBOL TUTUP */}
            <button
              type="button"
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Tutup galeri"
            >
              <X size={25} />
            </button>

            {/* FOTO FULLSCREEN */}
            <motion.div
              key={selected}
              className="lightbox-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={photos[selected].image}
                alt={`Foto pernikahan ${selected + 1}`}
                className="lightbox-image"
                draggable={false}
              />

              {/* NOMOR FOTO */}
              <span className="lightbox-counter">
                {selected + 1} / {photos.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}