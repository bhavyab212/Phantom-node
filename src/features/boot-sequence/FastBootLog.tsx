'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const FAST_LOG_LINES = [
  { time: "0.0000", status: "OK", text: "Booting kernel..." },
  { time: "0.0123", status: "OK", text: "Initializing CPU subsystems" },
  { time: "0.0234", status: "OK", text: "Initializing core kernel modules" },
  { time: "0.0451", status: "OK", text: "Mounting devtmpfs on /dev" },
  { time: "0.0620", status: "OK", text: "Starting udev Kernel Device Manager" },
  { time: "0.0891", status: "OK", text: "Mounting filesystem: /sys" },
  { time: "0.1002", status: "OK", text: "Starting systemd-udevd version 249" },
  { time: "0.1120", status: "OK", text: "Populating /dev with existing devices" },
  { time: "0.1255", status: "OK", text: "Checking memory architecture compatibility" },
  { time: "0.1456", status: "OK", text: "Loading security drivers" },
  { time: "0.1550", status: "OK", text: "Applying kernel variables" },
  { time: "0.1601", status: "OK", text: "Found device /dev/sda1" },
  { time: "0.1805", status: "OK", text: "Mounting /boot/efi" },
  { time: "0.2013", status: "OK", text: "Starting network interface eth0" },
  { time: "0.2104", status: "OK", text: "Reaching target Network" },
  { time: "0.2450", status: "OK", text: "Booting containerized services:", highlight: "Docker" },
  { time: "0.2501", status: "OK", text: "Listening on Load/Save RF Kill Switch Status" },
  { time: "0.2788", status: "OK", text: "Starting Network Name Resolution" },
  { time: "0.3012", status: "OK", text: "Starting User Login Management" },
  { time: "0.3340", status: "OK", text: "Started D-Bus System Message Bus" },
  { time: "0.3601", status: "OK", text: "Mounting Application Layer" },
  { time: "0.3800", status: "OK", text: "Starting Authorization Manager" },
  { time: "0.4102", status: "OK", text: "Establishing CI/CD pipeline:", highlight: "GitHub Actions" },
  { time: "0.4255", status: "OK", text: "Starting Modem Manager" },
  { time: "0.4420", status: "OK", text: "Started Network Manager" },
  { time: "0.4501", status: "OK", text: "Reaching target Network is Online" },
  { time: "0.4705", status: "OK", text: "Starting OpenSSH server daemon" },
  { time: "0.4900", status: "OK", text: "Connecting workflow engine:", highlight: "n8n" },
  { time: "0.5200", status: "OK", text: "Mounting cloud infrastructure endpoints" },
  { time: "0.5501", status: "OK", text: "Started LSB: Start daemon at boot time" },
  { time: "0.5804", status: "OK", text: "Started System Logging Service" },
  { time: "0.6100", status: "OK", text: "Reaching target Multi-User System" },
  { time: "0.6402", status: "OK", text: "Activating memory swap profiles" },
  { time: "0.6800", status: "OK", text: "Initializing LLM orchestration:", highlight: "OpenAI / Gemini API" },
  { time: "0.7100", status: "OK", text: "Initializing graphics subsystem" },
  { time: "0.7501", status: "OK", text: "Starting user environment" },
  { time: "0.7804", status: "OK", text: "Connecting telemetry agents" },
  { time: "0.8000", status: "OK", text: "Verifying checksums for secure boot" },
  { time: "0.8500", status: "OK", text: "Loading vector database:", highlight: "Pinecone" },
  { time: "0.8900", status: "OK", text: "Mounting virtual file systems" },
  { time: "0.9200", status: "OK", text: "Synchronizing system clock" },
  { time: "0.9500", status: "OK", text: "Starting scheduled tasks supervisor" },
  { time: "1.0020", status: "OK", text: "Deploying automation pipeline:", highlight: "Zapier Layer" },
  { time: "1.0500", status: "OK", text: "Checking thermal subsystem" },
  { time: "1.1000", status: "OK", text: "Optimizing power management" },
  { time: "1.1500", status: "OK", text: "Linking CRM sync module:", highlight: "HubSpot / WhatsApp" },
  { time: "1.2000", status: "OK", text: "Starting local DNS cache" },
  { time: "1.2500", status: "OK", text: "Establishing root permissions" },
  { time: "1.3000", status: "OK", text: "Activating penetration testing suite:", highlight: "Metasploit / Burp" },
  { time: "1.3250", status: "OK", text: "Loading user interface assets" },
  { time: "1.3400", status: "OK", text: "Initializing window manager configuration" },
  { time: "1.3551", status: "OK", text: "Mounting persistent local storage" },
  { time: "1.3702", status: "OK", text: "Starting audio subsystems" },
  { time: "1.3910", status: "OK", text: "Connecting edge caching layer:", highlight: "Cloudflare / Vercel Edge" },
  { time: "1.4120", status: "OK", text: "Pre-warming serverless functions" },
  { time: "1.4350", status: "OK", text: "Configuring environment variables" },
  { time: "1.4501", status: "OK", text: "Starting cron job scheduler" },
  { time: "1.4800", status: "OK", text: "Validating SSL/TLS certificates" },
  { time: "1.5050", status: "OK", text: "Establishing secure WebSockets connection" },
  { time: "1.5200", status: "OK", text: "Loading custom font rendering engine" },
  { time: "1.5450", status: "OK", text: "Deploying frontend analytics payload:", highlight: "PostHog / Google Analytics" },
  { time: "1.5601", status: "OK", text: "Initializing GraphQL resolvers" },
  { time: "1.5800", status: "OK", text: "Warming up PostgreSQL connection pool" },
  { time: "1.6105", status: "OK", text: "Starting distributed tracing" },
  { time: "1.6300", status: "OK", text: "Mapping route manifest" },
  { time: "1.6550", status: "OK", text: "Prefetching critical application chunks" },
  { time: "1.6800", status: "OK", text: "Verifying OAuth2 authentication strategy:", highlight: "NextAuth / Clerk" },
  { time: "1.7100", status: "OK", text: "Synchronizing state management trees" },
  { time: "1.7450", status: "OK", text: "Activating hardware acceleration" },
  { time: "1.7700", status: "OK", text: "Applying custom user theme preferences" },
  { time: "1.8000", status: "OK", text: "Running final pre-flight checks" },
  { time: "1.8500", status: "OK", text: "Startup finished in 1.8500s (kernel) + 0.1402s (userspace)" },
];

interface FastBootLogProps {
  onComplete?: () => void;
  /** When true, renders inline (no fixed positioning) for embedding inside BootSequence */
  embedded?: boolean;
}

export default function FastBootLog({ onComplete, embedded = false }: FastBootLogProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Line spawner
  useEffect(() => {
    if (visibleLines >= FAST_LOG_LINES.length) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
    const delay = Math.random() * 30 + 50; // 50-80ms — slightly slower, more deliberate
    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, delay);
    return () => clearTimeout(timer);
  }, [visibleLines, onComplete]);

  // Smooth continuous scroll loop
  useEffect(() => {
    let animationFrameId: number;
    const smoothScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const targetScroll = container.scrollHeight - container.clientHeight;
        const currentScroll = container.scrollTop;
        if (currentScroll < targetScroll) {
          container.scrollTop += (targetScroll - currentScroll) * 0.2 + 1;
        }
      }
      animationFrameId = requestAnimationFrame(smoothScroll);
    };
    smoothScroll();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const wrapperClass = embedded
    ? 'w-full h-full bg-[#000000] text-[#D1D5DB] font-mono text-[13px] leading-tight overflow-hidden relative'
    : 'fixed inset-0 bg-[#000000] text-[#D1D5DB] font-mono text-[13px] leading-tight overflow-hidden';

  return (
    <div className={wrapperClass}>
      {/* CRT Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)'
        }}
      />
      {/* Scrollable Container */}
      <div className="h-full w-full overflow-y-auto px-4 py-2 sm:px-6 relative z-10 no-scrollbar" ref={containerRef}>
        <div className="flex flex-col">
          {FAST_LOG_LINES.slice(0, visibleLines).map((line, idx) => (
            <div key={idx} className="flex space-x-3 mb-[2px]">
              <span className="text-[#4ADE80] flex-shrink-0 whitespace-pre">
                [{line.time.padStart(7, ' ')}s ]  {line.status}
              </span>
              <span className="break-words w-full">
                {line.text}
                {line.highlight && (
                  <span className="text-cyan-400 font-bold ml-2">
                    {line.highlight}
                  </span>
                )}
              </span>
            </div>
          ))}

          {visibleLines >= FAST_LOG_LINES.length && (
            <div className="mt-6 mb-4 flex items-center font-sans font-medium text-white text-base sm:text-lg tracking-wide">
              Launching workspace
              <span className="flex ml-[2px]">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}>.</motion.span>
              </span>
            </div>
          )}
          <div className="h-16 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
