export const modalVariants = {
  open: {
    opacity: 1,
    scale: 1,
    display: "block",
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};
