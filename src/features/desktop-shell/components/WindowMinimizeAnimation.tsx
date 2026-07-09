import { motion } from 'framer-motion';

export function WindowMinimizeAnimation({ children, isMinimized, targetRect, style = 'scale' }: any) {
  if (style === 'genie') {
    return (
      <motion.div
        animate={isMinimized ? { 
          opacity: 0, 
          scaleY: 0,
          scaleX: 0.2,
          y: targetRect?.y || 1000,
          x: targetRect?.x || 0
        } : { 
          opacity: 1, 
          scaleY: 1,
          scaleX: 1,
          y: 0,
          x: 0
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        style={{ originY: 1 }} // Bottom origin for genie
        className="w-full h-full"
      >
        {children}
      </motion.div>
    );
  }

  // Default Scale style
  return (
    <motion.div
      animate={isMinimized ? { 
        opacity: 0, 
        scale: 0.1,
        y: targetRect?.y ? targetRect.y / 2 : 50, // Move roughly towards taskbar
        x: targetRect?.x ? targetRect.x / 2 : 0
      } : { 
        opacity: 1, 
        scale: 1,
        y: 0,
        x: 0
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
