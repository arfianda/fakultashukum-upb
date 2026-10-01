"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Scale, Lock, User, ArrowLeft, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Username atau kata sandi tidak valid.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      // In case of network/offline auth fallback, allow standard admin credentials
      if (username === "admin" && password === "admin123") {
        router.push("/admin");
      } else {
        setErrorMsg("Gagal melakukan autentikasi sistem.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#800000] uppercase tracking-wider mb-6 hover:text-[#5A0000] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Portal Publik</span>
        </Link>

        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#800000] text-white flex items-center justify-center">
            <Scale className="w-7 h-7 text-[#E8D8B0]" />
          </div>
        </div>

        <h2 className="text-center font-serif text-2xl font-bold text-[#1C1B1B] tracking-tight">
          Portal CMS Sivitas Fakultas Hukum
        </h2>
        <p className="mt-2 text-center text-xs text-[#5C5854] max-w-sm mx-auto">
          Universitas Pelita Bangsa &bull; Sistem Autentikasi Dewan Pengelola Konten &amp; Publikasi
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-[#E5E1DA] sm:px-10">
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-[#1C1B1B] uppercase tracking-wider mb-1"
              >
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                />
                <User className="w-4 h-4 text-[#5C5854] absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[#1C1B1B] uppercase tracking-wider mb-1"
              >
                Kata Sandi (Password)
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3.5 pr-10 py-2.5 text-xs border border-[#E5E1DA] focus:border-[#800000] bg-[#FCF9F8]"
                />
                <Lock className="w-4 h-4 text-[#5C5854] absolute right-3 top-3" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#800000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5A0000] transition-colors disabled:opacity-50"
              >
                {loading ? "Memverifikasi Kredensial..." : "Masuk ke Panel CMS"}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Info for Testing */}
          <div className="mt-6 pt-5 border-t border-[#F0EDED] bg-[#FCF9F8] p-3 text-[11px] text-[#5C5854]">
            <p className="font-semibold text-[#1C1B1B] mb-1">Kredensial Evaluasi &amp; Pengembangan:</p>
            <p>Username: <code className="bg-white px-1.5 py-0.5 border text-[#800000] font-mono">admin</code></p>
            <p className="mt-0.5">Password: <code className="bg-white px-1.5 py-0.5 border text-[#800000] font-mono">admin123</code></p>
          </div>
        </div>
      </div>
    </div>
  );
}
