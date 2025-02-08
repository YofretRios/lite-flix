const variants = {
  slideBottom: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  slideTop: {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
  slideRight: {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
  slideLeft: {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },
};

export const getAnimationProps = (
  preset: keyof typeof variants,
  delay = 0,
  duration = 0.5,
  ease = 'easeInOut'
) => ({
  variants: variants[preset],
  initial: 'hidden',
  animate: 'visible',
  transition: {
    delay,
    duration,
    ease,
  },
});

export default variants;
