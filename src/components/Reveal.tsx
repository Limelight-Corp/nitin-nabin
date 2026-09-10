"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  /**
   * Set to false when the element already carries its own custom `transform`
   * in `style` (e.g. a rotated card) — framer-motion owns the `transform`
   * CSS property once it animates x/y/rotate/scale, which would otherwise
   * clobber that custom transform. With slide=false only opacity animates,
   * leaving `style.transform` untouched.
   */
  slide?: boolean;
  [key: string]: any;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeOnlyVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

/**
 * Fades (+ slides up, unless `slide={false}`) content into place the first
 * time it scrolls into view. Built on framer-motion's `whileInView`, so it's
 * a drop-in replacement for any tag: `<Reveal as="section" data-foo="">`
 * forwards every other prop straight through to the rendered element.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  style,
  as = "div",
  delay = 0,
  slide = true,
  ...rest
}) => {
  const MotionTag = (motion as unknown as Record<string, any>)[as] || motion.div;
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <MotionTag className={className} style={style} {...rest}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      style={style}
      variants={slide ? variants : fadeOnlyVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};
