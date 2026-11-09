"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { changePasswordAction } from "@/lib/actions/auth";
import {
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

interface ChangePasswordClientProps {
  mustChangePassword: boolean;
  userName: string;
}

export function ChangePasswordClient({
  mustChangePassword,
  userName,
}: ChangePasswordClientProps) {
  const router = useRouter();
  const { update } = useSession();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword.length < 10) {
      setErrorMessage("Kata sandi baru wajib minimal 10 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await changePasswordAction({
        currentPassword,
        newPassword,
        confirmPassword,
      });

      if (!result.success) {
        setErrorMessage(result.error || "Gagal memperbarui kata sandi.");
      } else {
        await update({ mustChangePassword: false });
        setSuccessMessage("Kata sandi berhasil diperbarui. Mengalihkan...");
        router.push(result.redirectTo || "/dashboard");
        router.refresh();
      }
    } catch {
      setErrorMessage("Terjadi kesalahan saat memperbarui kata sandi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white border border-[#E2D9C8] p-6 sm:p-8 shadow-xs">
      <div className="h-1 w-16 bg-[#570000] mb-5" />

      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#570000]/10 border border-[#570000]/20 text-[#570000] text-[10px] font-bold uppercase tracking-widest mb-3">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>KEAMANAN KREDENSIAL SIVITAS</span>
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-2">
        Perbarui Kata Sandi
      </h1>

      <p className="text-xs sm:text-sm text-[#544942] leading-relaxed mb-6">
        {mustChangePassword ? (
          <>
            Halo <strong>{userName}</strong>, akun Anda masih menggunakan kata
            sandi sementara. Anda wajib membuat kata sandi baru (minimal{" "}
            <strong>10 karakter</strong>) sebelum melanjutkan ke portal.
          </>
        ) : (
          <>
            Pastikan kata sandi baru Anda memiliki panjang minimal{" "}
            <strong>10 karakter</strong> dan tidak digunakan pada layanan lain.
          </>
        )}
      </p>

      {errorMessage && (
        <div
          role="alert"
          className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0D0D0D] mb-1.5"
          >
            Kata Sandi Saat Ini
          </label>
          <div className="relative">
            <input
              id="currentPassword"
              type={showCurrent ? "text" : "password"}
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Masukkan kata sandi saat ini"
              className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-[#E2D9C8] focus:outline-none focus:border-[#570000]"
            />
            <Lock className="w-4 h-4 text-[#73655D] absolute left-3 top-3" />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-2.5 text-[#73655D] hover:text-[#0D0D0D] p-0.5"
              aria-label={
                showCurrent ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
            >
              {showCurrent ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="newPassword"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0D0D0D] mb-1.5"
          >
            Kata Sandi Baru (Minimal 10 Karakter)
          </label>
          <div className="relative">
            <input
              id="newPassword"
              type={showNew ? "text" : "password"}
              required
              minLength={10}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 10 karakter"
              className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-[#E2D9C8] focus:outline-none focus:border-[#570000]"
            />
            <Lock className="w-4 h-4 text-[#73655D] absolute left-3 top-3" />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-2.5 text-[#73655D] hover:text-[#0D0D0D] p-0.5"
              aria-label={
                showNew ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
            >
              {showNew ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="mt-1 text-[11px] text-[#73655D]">
            Panjang saat ini: {newPassword.length} / 10 karakter minimum.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-xs font-semibold uppercase tracking-wider text-[#0D0D0D] mb-1.5"
          >
            Konfirmasi Kata Sandi Baru
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirm ? "text" : "password"}
              required
              minLength={10}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi kata sandi baru"
              className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border border-[#E2D9C8] focus:outline-none focus:border-[#570000]"
            />
            <Lock className="w-4 h-4 text-[#73655D] absolute left-3 top-3" />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-2.5 text-[#73655D] hover:text-[#0D0D0D] p-0.5"
              aria-label={
                showConfirm ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
              }
            >
              {showConfirm ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-6 bg-[#570000] hover:bg-[#410000] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-70"
        >
          {isLoading ? "Menyimpan Kata Sandi..." : "Simpan Kata Sandi Baru"}
        </button>
      </form>
    </div>
  );
}

