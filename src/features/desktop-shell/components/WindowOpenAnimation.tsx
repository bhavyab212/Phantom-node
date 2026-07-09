import { motion } from 'framer-motion';

export function WindowOpenAnimation({ children, isOpen, originRect }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, ...originRect }}
      animate={isOpen ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
