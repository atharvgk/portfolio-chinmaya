"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { profile } from "@/lib/data";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden border dark:border-white/10 border-black/10 bg-white dark:bg-[#0E0E10] shadow-2xl"
          >
            <div className="flex items-center gap-3 p-4 border-b dark:border-white/10 border-black/10">
              <div className="relative">
                <div className="w-9 h-9 rounded-full dark:bg-white bg-black dark:text-black text-white flex items-center justify-center font-bold">
                  DM
                </div>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 dark:border-[#0E0E10] border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold dark:text-white text-black">
                  {profile.name}
                </p>
                <p className="text-xs dark:text-white/50 text-black/50">
                  Usually replies within 24 hours
                </p>
              </div>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="rounded-2xl rounded-tl-sm px-3 py-2 dark:bg-white/10 bg-black/5 dark:text-white/90 text-black/80 w-fit max-w-[85%]">
                Hi there! 👋 Thanks for stopping by. How can I help you build
                your next product?
              </div>
            </div>
            <div className="p-3 border-t dark:border-white/10 border-black/10">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center gap-2 w-full rounded-full dark:bg-white dark:text-black bg-black text-white py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Send className="w-4 h-4" />
                Send a message
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="h-12 w-12 rounded-full dark:bg-white dark:text-black bg-black text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5" />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
