import { easeInOut, easeOut, easeIn, circOut } from 'framer-motion';

type AnimationVariant = {
  hidden: Record<string, any>;
  visible: Record<string, any>;
};

export const commonVariants: Record<string, AnimationVariant> = {
  fadeIn: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: easeInOut },
    },
  },
  slideIn: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: easeInOut },
    },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  },
};

export const advancedVariants: Record<string, AnimationVariant> = {
  bounceIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: circOut,
        type: 'spring',
        stiffness: 150,
      },
    },
  },

  rotateIn: {
    hidden: { opacity: 0, rotate: -90 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  },
  scalePulse: {
    hidden: { scale: 0.8 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.3,
        ease: easeInOut,
        type: 'spring',
        damping: 8,
      },
    },
  },

  textReveal: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeIn,
        keyframes: [
          { opacity: 0, y: 10 },
          { opacity: 0.5, y: 5 },
          { opacity: 1, y: 0 },
        ],
      },
    },
  },

  cardFlip: {
    hidden: { rotateY: 180, opacity: 0 },
    visible: {
      rotateY: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: easeInOut },
    },
  },
};

export const generateFadeIn = (
  duration: number = 0.3,
  delay: number = 0
): AnimationVariant => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: easeInOut },
  },
});

export const generateSlideIn = (
  direction: 'left' | 'right' | 'up' | 'down' = 'left',
  duration: number = 0.4
): AnimationVariant => {
  const offsets = { left: -20, right: 20, up: -10, down: 10 };
  return {
    hidden: {
      opacity: 0,
      x: direction === 'up' || direction === 'down' ? 0 : offsets[direction],
      y: direction === 'up' || direction === 'down' ? offsets[direction] : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: easeInOut },
    },
  };
};

export default {
  commonVariants,
  advancedVariants,
  generateFadeIn,
  generateSlideIn,
};
