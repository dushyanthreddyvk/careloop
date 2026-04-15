export const pageTransition = {
  initial: { opacity: 0, y: 26 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 18 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: "0 24px 70px -28px rgba(15,23,42,0.20)",
  },
  hover: {
    scale: 1.02,
    y: -6,
    boxShadow: "0 34px 90px -30px rgba(14,116,144,0.28)",
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export const floatingCard = (delay = 0) => ({
  initial: { opacity: 0, y: 40, rotateX: 10 },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const modalVariant = {
  initial: { opacity: 0, scale: 0.92, y: 18 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 14,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

export const toastVariant = {
  initial: { opacity: 0, x: 80, y: 12 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    x: 80,
    transition: { duration: 0.22, ease: "easeIn" },
  },
};
