"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

interface GuestMessage {
  id: number;
  nama: string;
  kehadiran: "Hadir" | "Tidak Hadir";
  jumlah_tamu: number;
  ucapan: string;
  created_at: string;
}

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<GuestMessage[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // MENGAMBIL DATA RSVP DARI SUPABASE
  const fetchMessages = async () => {
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("rsvp_nicotise")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data RSVP:", error);
      setError("Gagal memuat ucapan. Silakan muat ulang halaman.");
    } else {
      setMessages(data as GuestMessage[]);
    }

    setIsLoading(false);
  };

  // MEMUAT DATA KETIKA KOMPONEN DIBUKA
  useEffect(() => {
    fetchMessages();
  }, []);

  // MENGIRIM RSVP KE SUPABASE
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim() || !attendance || !message.trim()) {
      return;
    }

    if (message.trim().length > 500) {
      setError("Ucapan maksimal 500 karakter.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    const newMessage = {
      nama: name.trim(),
      kehadiran: attendance,
      jumlah_tamu:
        attendance === "Hadir" ? Number(guestCount) : 0,
      ucapan: message.trim(),
    };

    const { error } = await supabase
      .from("rsvp_nicotise")
      .insert([newMessage]);

    if (error) {
      console.error("Gagal mengirim RSVP:", error);

      setError(
        "Konfirmasi gagal dikirim. Silakan coba kembali."
      );

      setIsSubmitting(false);
      return;
    }

    // KOSONGKAN FORMULIR
    setName("");
    setAttendance("");
    setGuestCount("1");
    setMessage("");

    setSuccess("Terima kasih! Konfirmasi dan ucapan Anda berhasil dikirim.");

    // PERBARUI DAFTAR UCAPAN
    await fetchMessages();

    setIsSubmitting(false);
  };

  // FORMAT TANGGAL
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Makassar",
    });
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-container">

        {/* HEADING */}
        <motion.div
          className="rsvp-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="rsvp-title">
            RSVP
          </h2>

          <div className="rsvp-divider">✦</div>

          <p className="rsvp-description">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami
            apabila Bapak/Ibu/Saudara/i berkenan hadir.
            Mohon konfirmasi kehadiran serta berikan ucapan
            dan doa terbaik untuk kami.
          </p>
        </motion.div>

        {/* FORM */}
        <motion.div
          className="rsvp-form-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <form onSubmit={handleSubmit} className="rsvp-form">

            {/* NAMA */}
            <div className="rsvp-field">
              <label htmlFor="guest-name">
                Nama
              </label>

              <input
                id="guest-name"
                type="text"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
              />
            </div>

            {/* KONFIRMASI KEHADIRAN */}
            <div className="rsvp-field">
              <label htmlFor="attendance">
                Konfirmasi Kehadiran
              </label>

              <select
                id="attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                required
              >
                <option value="" disabled>
                  Pilih konfirmasi kehadiran
                </option>

                <option value="Hadir">
                  Ya, saya akan hadir
                </option>

                <option value="Tidak Hadir">
                  Maaf, saya tidak dapat hadir
                </option>
              </select>
            </div>

            {/* JUMLAH TAMU */}
            {attendance === "Hadir" && (
              <motion.div
                className="rsvp-field"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="guest-count">
                  Jumlah Tamu
                </label>

                <select
                  id="guest-count"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                    (number) => (
                      <option key={number} value={number}>
                        {number} Orang
                      </option>
                    )
                  )}
                </select>
              </motion.div>
            )}

            {/* UCAPAN DAN DOA */}
            <div className="rsvp-field">
              <label htmlFor="guest-message">
                Ucapan dan Doa
              </label>

              <textarea
                id="guest-message"
                placeholder="Tuliskan ucapan dan doa terbaik untuk kedua mempelai..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={5}
                required
              />

              <span className="rsvp-character-count">
                {message.length}/500 karakter
              </span>
            </div>

            {/* PESAN STATUS */}
            {error && (
              <p role="alert" style={{ color: "#ff9999" }}>
                {error}
              </p>
            )}

            {success && (
              <p role="status" style={{ color: "#d6b46a" }}>
                {success}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="rsvp-submit"
              disabled={isSubmitting}
            >
              <span>
                {isSubmitting
                  ? "Mengirim..."
                  : "Kirim Konfirmasi"}
              </span>

              <span>✦</span>
            </button>

          </form>
        </motion.div>

        {/* DAFTAR UCAPAN */}
        <div className="rsvp-messages-section">

          <motion.div
            className="rsvp-messages-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rsvp-divider">✦</div>

            <h3>Ucapan & Doa</h3>

            <p>
              Doa dan ucapan hangat dari keluarga serta sahabat.
            </p>
          </motion.div>

          <div className="rsvp-messages-list">

            {isLoading ? (
              <div className="rsvp-empty">
                <p>Memuat ucapan dan doa...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="rsvp-empty">
                <span>✧</span>

                <p>
                  Jadilah yang pertama memberikan ucapan dan doa.
                </p>
              </div>
            ) : (
              messages.map((item) => (
                <motion.div
                  key={item.id}
                  className="rsvp-message-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="rsvp-message-top">
                    <div>
                      <h4>{item.nama}</h4>
                      <span>
                        {formatDate(item.created_at)}
                      </span>
                    </div>

                    <span
                      className={`rsvp-status ${
                        item.kehadiran === "Hadir"
                          ? "status-present"
                          : "status-absent"
                      }`}
                    >
                      {item.kehadiran}
                    </span>
                  </div>

                  {item.kehadiran === "Hadir" && (
                    <p className="rsvp-guest-count">
                      {item.jumlah_tamu} Orang
                    </p>
                  )}

                  <div className="rsvp-message-text">
                    {item.ucapan}
                  </div>

                  <div className="rsvp-message-ornament">
                    ✦
                  </div>
                </motion.div>
              ))
            )}

          </div>
        </div>

      </div>
    </section>
  );
}