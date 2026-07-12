"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, LogIn, AlertCircle, Loader2 } from "lucide-react";
import { login } from "../actions";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await login(password);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 dark:bg-[#0E0E10] bg-[#FAFAFA] transition-colors duration-500">
      {/* Grid background */}
      <div
        className="absolute inset-0 z-0 dark:opacity-10 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "rgb(209, 213, 219)",
        }}
      />

      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-2xl border dark:bg-[#0B0B0C] dark:border-white/5 bg-white border-black/5 shadow-2xl transition-all duration-300">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 bg-red-500/10 text-red-500 rounded-full mb-3">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900 tracking-wide">
            Portfolio Administration
          </h1>
          <p className="text-sm dark:text-gray-400 text-gray-600 mt-1">
            Please enter your admin password to edit website content
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold dark:text-gray-300 text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-white/40 text-black/40" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-transparent text-sm sm:text-base transition-all duration-300 focus:outline-none focus:ring-1 
                  dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/20 focus:dark:border-white/20 focus:dark:ring-white/10 
                  bg-black/5 border-black/10 text-black placeholder-black/20 focus:border-black/20 focus:ring-black/5"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full group flex items-center justify-center gap-2 px-6 py-3 rounded-xl dark:bg-white dark:text-black bg-black text-white hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
