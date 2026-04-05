"use client";

import { AnimatePresence, motion } from "framer-motion";

interface StepWrapperProps {
  children: React.ReactNode;
  step: number;
  direction: number;
}

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

export function StepWrapper({ children, step, direction }: StepWrapperProps) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="w-full flex justify-center"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
