import { motion } from 'framer-motion';

export default function AboutApp() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#121212] text-white/90 relative overflow-hidden font-sans select-none">
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none" 
        style={{ backgroundColor: 'rgba(var(--accent-color-rgb), 0.1)' }}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <div 
          className="w-24 h-24 rounded-3xl shadow-2xl mb-6 flex items-center justify-center text-4xl font-bold text-white border border-white/20"
          style={{ backgroundImage: 'linear-gradient(135deg, var(--accent-color), #8b5cf6)' }}
        >
          W
        </div>
        
        <h1 className="text-3xl font-bold tracking-tight mb-2">Agency Web OS</h1>
        <div className="text-white/50 text-sm mb-8 font-mono">Version 1.0 (Build 2026.07)</div>
        
        <div className="flex flex-col items-center gap-2 text-sm text-white/70 mb-8 max-w-sm text-center">
          <p>
            A high-performance desktop shell built with modern web technologies, 
            designed to simulate a complete operating system environment inside the browser.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs border-t border-white/10 pt-6 px-8">
          <div className="text-white/40 text-right">Processor</div>
          <div className="text-white/80">Quantum Core i9 @ 5.8 GHz</div>
          
          <div className="text-white/40 text-right">Memory</div>
          <div className="text-white/80">32 GB Unified RAM</div>
          
          <div className="text-white/40 text-right">Powered By</div>
          <div className="text-white/80">React, Tailwind CSS, Zustand, Framer Motion</div>
        </div>
        
        <div className="mt-12 text-xs text-white/30">
          Created by Agency Engineering Team
        </div>
      </motion.div>
    </div>
  );
}
