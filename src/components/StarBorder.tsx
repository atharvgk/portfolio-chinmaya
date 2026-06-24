import type { ReactNode } from "react";

export function StarBorder({
  children,
  speed = "6s",
}: {
  children: ReactNode;
  speed?: string;
}) {
  return (
    <button
      type="button"
      className="relative inline-block overflow-hidden rounded-[20px]"
      style={{ padding: "1px 0" }}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: "radial-gradient(circle, white, transparent 10%)",
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: "radial-gradient(circle, white, transparent 10%)",
          animationDuration: speed,
        }}
      />
      <div className="relative z-[1] bg-gradient-to-b dark:from-black dark:to-black/80 from-white to-gray-50 border dark:border-white/40 border-gray-300 dark:text-white text-gray-900 text-center text-[14px] py-[6px] px-[20px] rounded-[20px] transition-colors duration-300">
        {children}
      </div>
    </button>
  );
}
