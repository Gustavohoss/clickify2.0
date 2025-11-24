'use client';

import { motion } from 'framer-motion';

export const TypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -4, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="flex space-x-1.5 p-2">
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        style={{ width: 8, height: 8, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%' }}
      />
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        style={{ width: 8, height: 8, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%' }}
        transition={{ delay: 0.2 }}
      />
      <motion.div
        variants={dotVariants}
        initial="initial"
        animate="animate"
        style={{ width: 8, height: 8, backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '50%' }}
        transition={{ delay: 0.4 }}
      />
    </div>
  );
};
