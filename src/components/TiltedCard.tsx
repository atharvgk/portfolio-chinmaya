"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export function TiltedCard({
  src,
  alt,
  caption,
  size = 144,
  rotateAmplitude = 12,
  scaleOnHover = 1.08,
}: {
  src: string;
  alt: string;
  caption: string;
  size?: number;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const captionRotate = useSpring(0, { stiffness: 350, damping: 30, mass: 1 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    captionRotate.set(-offsetX * 0.4);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    scale.set(1);
    opacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
    captionRotate.set(0);
  }

  return (
    <figure
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative [perspective:800px] flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{ width: size, height: size, rotateX, rotateY, scale }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority
          className="absolute top-0 left-0 object-cover rounded-full will-change-transform [transform:translateZ(0)]"
          style={{ width: size, height: size }}
        />
      </motion.div>

      <motion.figcaption
        className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] z-[3] hidden sm:block"
        style={{ x, y, opacity, rotate: captionRotate }}
      >
        {caption}
      </motion.figcaption>
    </figure>
  );
}
