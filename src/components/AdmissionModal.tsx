"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Scale } from "lucide-react";

export function AdmissionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "SMA/SMK/MA",
    program: "Sarjana Hukum (S.H.) - Reguler",
    scholarship: "Reguler (Tanpa Beasiswa)",
    notes: "",
  });

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs"
    >
      <div className="bg-white max-w-xl w-full border border-[#E5E1DA] shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-[#5C5854] hover:text-[#1C1B1B] hover:bg-[#F8F7F4]"
          aria-label="Tutup formulir pendaftaran"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-4 border border-[#800000] bg-[#F8F7F4] flex items-center justify-center text-[#800000]">
              <CheckCircle className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-2xl font-normal text-[#1C1B1B] mb-2">
              Registrasi Awal Berhasil
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5854] max-w-md mx-auto mb-6 leading-relaxed font-light">
              Terima kasih, <strong>{formData.fullName}</strong>. Data Anda telah diterima oleh Sekretariat Penerimaan Mahasiswa Baru Fakultas Hukum UPB. Petugas admisi akan menghubungi Anda via WhatsApp atau Email dalam 1x24 jam kerja.
            </p>
            <div className="p-4 bg-[#F8F7F4] border border-[#E5E1DA] text-left text-xs text-[#5C5854] space-y-1 mb-6 font-light">
              <p><strong className="font-semibold text-[#1C1B1B]">Program Dipilih:</strong> {formData.program}</p>
              <p><strong className="font-semibold text-[#1C1B1B]">Jalur Pendaftaran:</strong> {formData.scholarship}</p>
              <p><strong className="font-semibold text-[#1C1B1B]">Nomor Registrasi:</strong> FH-UPB-2026-{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#570000]"
            >
              Selesai &amp; Kembali
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-[#E5E1DA]">
              <div className="w-10 h-10 bg-[#800000] text-white flex items-center justify-center">
                <Scale className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                  PENDAFTARAN MAHASISWA BARU &bull; 2026/2027
                </span>
                <h3 className="font-serif text-xl font-normal text-[#1C1B1B]">
                  Formulir Penerimaan Fakultas Hukum UPB
                </h3>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                  Nama Lengkap Sesuai Ijazah *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Contoh: Rian Pratama, S.H."
                  className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Alamat Email Aktif *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Nomor WhatsApp / HP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Contoh: 08123456789"
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Pilihan Program *
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                  >
                    <option>Sarjana Hukum (S.H.) - Reguler Pagi</option>
                    <option>Sarjana Hukum (S.H.) - Kelas Eksekutif/Karyawan</option>
                    <option>Magister Ilmu Hukum (M.H.) - Pascasarjana</option>
                    <option>Pendidikan Khusus Profesi Advokat (PKPA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                    Jalur Seleksi *
                  </label>
                  <select
                    value={formData.scholarship}
                    onChange={(e) => setFormData({ ...formData, scholarship: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                  >
                    <option>Reguler (Tanpa Beasiswa)</option>
                    <option>Jalur Beasiswa Prestasi Akademik</option>
                    <option>Jalur Beasiswa Tahfiz Al-Qur&apos;an</option>
                    <option>Jalur Kemitraan Korporasi / Karyawan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1B1B] uppercase mb-1">
                  Catatan Tambahan / Asal Sekolah atau Instansi
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tuliskan nama institusi asal atau pertanyaan spesifik seputar program studi..."
                  className="w-full px-3.5 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#F8F7F4]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#800000] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#570000] transition-colors"
                >
                  Kirim Berkas Pendaftaran
                </button>
              </div>

              <p className="text-[11px] text-[#5C5854] text-center font-light">
                Data Anda dilindungi dan hanya digunakan untuk keperluan seleksi resmi Fakultas Hukum Universitas Pelita Bangsa.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
