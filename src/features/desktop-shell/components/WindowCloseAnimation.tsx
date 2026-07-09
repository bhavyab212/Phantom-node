import { motion } from 'framer-motion';

export function WindowCloseAnimation({ children, isClosing, targetRect }: any) {
  return (
    <motion.div
      animate={isClosing ? { opacity: 0, scale: 0.3, ...targetRect } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 1, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
