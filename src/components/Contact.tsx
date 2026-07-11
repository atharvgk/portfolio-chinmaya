"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, User, MessageSquare } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!form.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      tempErrors.message = "Message should be at least 10 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    if (!accessKey) {
      setStatus("error");
      setErrorMessage("Web3Forms API key is missing. Please configure NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New Portfolio Message from ${form.name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An unexpected error occurred. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="transition-all duration-300">
      <SectionHeader
        icon={<Mail className="w-5 h-5" />}
        title="Get in Touch"
        subtitle="Feel free to reach out for M&A analysis, research collaborations, or opportunities"
      />

      <div className="relative overflow-hidden rounded-2xl border dark:bg-[#0B0B0C]/90 dark:border-white/5 bg-white border-black/5 p-6 sm:p-8 shadow-lg transition-all duration-300">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center text-center py-12 space-y-4"
            >
              <div className="p-3 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full">
                <CheckCircle2 className="w-12 h-12 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold dark:text-white text-gray-900">
                Message Sent Successfully!
              </h3>
              <p className="max-w-md text-sm sm:text-base dark:text-gray-400 text-gray-600">
                Thank you for reaching out! Your message has been received, and Chinmaya will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2.5 rounded-full dark:bg-white dark:text-black bg-black text-white hover:bg-black/90 dark:hover:bg-white/90 font-medium transition-all duration-200"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
              noValidate
            >
              {status === "error" && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Submission Error:</span>{" "}
                    {errorMessage}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name field */}
                <div className="space-y-1">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-white/40 text-black/40" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      placeholder="Your Name"
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-transparent text-sm sm:text-base transition-all duration-300 focus:outline-none focus:ring-1 
                        ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/40 focus:dark:border-white/20 focus:dark:ring-white/10 bg-black/5 border-black/10 text-black placeholder-black/40 focus:border-black/20 focus:ring-black/5"
                        }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 pl-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="space-y-1">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-white/40 text-black/40" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      placeholder="Your Email"
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl border bg-transparent text-sm sm:text-base transition-all duration-300 focus:outline-none focus:ring-1 
                        ${
                          errors.email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/40 focus:dark:border-white/20 focus:dark:ring-white/10 bg-black/5 border-black/10 text-black placeholder-black/40 focus:border-black/20 focus:ring-black/5"
                        }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1 pl-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message field */}
              <div className="space-y-1">
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 dark:text-white/40 text-black/40" />
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    placeholder="What's on your mind?"
                    className={`w-full pl-12 pr-4 pt-3.5 pb-4 rounded-xl border bg-transparent text-sm sm:text-base transition-all duration-300 focus:outline-none focus:ring-1 resize-none h-32
                      ${
                        errors.message
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder-white/40 focus:dark:border-white/20 focus:dark:ring-white/10 bg-black/5 border-black/10 text-black placeholder-black/40 focus:border-black/20 focus:ring-black/5"
                      }`}
                  />
                </div>
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1 pl-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group flex items-center justify-center gap-2 px-6 py-3 rounded-2xl dark:bg-white dark:text-black bg-black text-white hover:bg-black/90 dark:hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01]"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
