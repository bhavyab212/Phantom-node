"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useIsDark } from '../hooks/useIsDark';

/**
 * LiquidCursor — A self-contained, portable liquid water-drop cursor.
 *
 * DROP-IN USAGE:
 *   1. Render <LiquidCursor /> anywhere in your app (e.g. inside your root layout).
 *   2. Add `data-liquid-cursor` to any element you want it to activate on.
 *
 * THEME:
 *   - Dark mode → bright cyan glowing drop (reflects light)
 *   - Light mode → dark shadow bead (inverted, like a water bead on bright surface)
 *   - Automatically reads `data-theme` attr on <html> or Tailwind's `.dark` class.
 *   - Override: pass `isDark` prop to control manually.
 *
 * BEHAVIOUR:
 *   - Only appears over [data-liquid-cursor] elements
 *   - Organic wobble animation (CSS blob keyframes)
 *   - Stretches in the direction of movement based on velocity
 *   - Lags a soft trail behind main drop
 *   - On click → squishes and emits a water splash ring ripple
 *
 * EXAMPLE:
 *   ```tsx
 *   // app/layout.tsx
 *   import LiquidCursor from '@/components/LiquidCursor';
 *
 *   export default function RootLayout({ children }) {
 *       return (
 *           <html>
 *               <body>
 *                   <LiquidCursor />
 *                   {children}
 *               </body>
 *           </html>
 *       )
 *   }
 *
 *   // some-page.tsx
 *   <div data-liquid-cursor>
 *       Hovering here activates the cursor!
 *   </div>
 *   ```
 */

interface LiquidCursorProps {
    /** Override dark mode detection. Leave undefined for auto-detect. */
    isDark?: boolean;
    /** Size of the main water drop in px. Default: 28 */
    dropSize?: number;
}

interface Ripple {
    id: number;
    x: number;
    y: number;
}

export default function LiquidCursor({ isDark: isDarkProp, dropSize = 28 }: LiquidCursorProps) {
    const isDarkAuto = useIsDark();
    const isDark = isDarkProp !== undefined ? isDarkProp : isDarkAuto;

    const [visible, setVisible] = useState(false);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const rippleId = useRef(0);

    // ─── Spring Physics ────────────────────────────────────────────────────────

    // Main cursor — instant (no delay)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Stretch/squish from velocity
    const scaleX = useSpring(1, { stiffness: 300, damping: 15 });
    const scaleY = useSpring(1, { stiffness: 300, damping: 15 });
    const rotation = useSpring(0, { stiffness: 200, damping: 20 });

    // Click squish
    const clickScale = useSpring(1, { stiffness: 400, damping: 12 });

    const lastPos = useRef({ x: 0, y: 0 });
    const rafRef = useRef<number>(0);

    // ─── Ripple Helper ─────────────────────────────────────────────────────────

    const addRipple = useCallback((x: number, y: number) => {
        const id = ++rippleId.current;
        setRipples(prev => [...prev, { id, x, y }]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== id));
        }, 700);
    }, []);

    // ─── Event Listeners ───────────────────────────────────────────────────────

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const zoomStr = document.documentElement.style.getPropertyValue('--desktop-zoom');
            const zoom = zoomStr ? parseFloat(zoomStr) : 1;
            
            const x = e.clientX / zoom;
            const y = e.clientY / zoom;

            mouseX.set(x);
            mouseY.set(y);

            // Velocity → stretch
            const dx = x - lastPos.current.x;
            const dy = y - lastPos.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);
            const stretchFactor = Math.min(speed * 0.008, 0.3);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            scaleX.set(1 + stretchFactor);
            scaleY.set(1 - stretchFactor * 0.5);
            rotation.set(angle);

            lastPos.current = { x, y };

            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                setTimeout(() => {
                    scaleX.set(1);
                    scaleY.set(1);
                    rotation.set(0);
                }, 80);
            });

            // Only show cursor when over a [data-liquid-cursor] element
            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target) {
                setVisible(!!target.closest('[data-liquid-cursor]'));
            }
        };

        const handleClick = (e: MouseEvent) => {
            const zoomStr = document.documentElement.style.getPropertyValue('--desktop-zoom');
            const zoom = zoomStr ? parseFloat(zoomStr) : 1;
            
            const x = e.clientX / zoom;
            const y = e.clientY / zoom;

            const target = document.elementFromPoint(e.clientX, e.clientY);
            if (target && target.closest('[data-liquid-cursor]')) {
                clickScale.set(0.6);
                setTimeout(() => clickScale.set(1.2), 100);
                setTimeout(() => clickScale.set(1), 250);
                addRipple(x, y);
            }
        };

        const handleMouseLeave = () => setVisible(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleClick);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleClick);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, [mouseX, mouseY, scaleX, scaleY, rotation, clickScale, addRipple]);

    // ─── Theme-aware Colours ───────────────────────────────────────────────────

    const opacity = visible ? 1 : 0;

    const dropGradient = isDark
        ? 'rgba(0, 50, 80, 0.05)'
        : 'rgba(255, 255, 255, 0.1)';

    const dropShadow = isDark
        ? 'inset 3px 3px 6px rgba(255,255,255,0.4), inset -4px -4px 8px rgba(0,0,0,0.6), 2px 6px 12px rgba(0,0,0,0.3)'
        : 'inset 3px 3px 6px rgba(255,255,255,0.9), inset -4px -4px 8px rgba(0,0,0,0.2), 2px 6px 12px rgba(0,0,0,0.15)';

    const backdropFilter = 'blur(6px) saturate(140%) brightness(110%)';

    const specularColor = isDark
        ? 'rgba(255, 255, 255, 0.7)'
        : 'rgba(255, 255, 255, 0.9)';

    const rippleColor = isDark
        ? 'rgba(0, 120, 180, 0.4)'
        : 'rgba(80, 100, 130, 0.3)';

    // ─── Render ────────────────────────────────────────────────────────────────

    return (
        <>
            {/* Hide native cursor only over tagged elements */}
            <style>{`
                [data-liquid-cursor] { cursor: none !important; }
                [data-liquid-cursor] * { cursor: none !important; }
            `}</style>

            {/* Splash ripples on click */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        style={{
                            position: 'fixed',
                            left: ripple.x,
                            top: ripple.y,
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            border: `2px solid ${rippleColor}`,
                            pointerEvents: 'none',
                            zIndex: 9997,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Main liquid drop */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: mouseX,
                    y: mouseY,
                    width: dropSize,
                    height: dropSize,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    opacity,
                    translateX: '-50%',
                    translateY: '-50%',
                    scaleX,
                    scaleY,
                    rotate: rotation,
                    scale: clickScale,
                    transition: 'opacity 200ms ease',
                }}
            >
                {/* Outer glow halo */}
                <div style={{
                    position: 'absolute',
                    inset: isDark ? '-8px' : '-6px',
                    borderRadius: '50%',
                    background: isDark
                        ? 'radial-gradient(circle, rgba(0,120,180,0.3) 0%, transparent 70%)'
                        : 'none',
                    boxShadow: isDark ? 'none' : '4px 4px 12px rgba(163,177,198,0.3)',
                    filter: isDark ? 'blur(6px)' : 'none',
                    transition: 'all 350ms ease',
                }} />

                {/* Water drop body — organic blob wobble */}
                <motion.div
                    animate={{
                        borderRadius: [
                            '60% 40% 50% 50% / 50% 60% 40% 50%',
                            '50% 50% 40% 60% / 60% 40% 50% 50%',
                            '40% 60% 50% 50% / 50% 50% 60% 40%',
                            '60% 40% 50% 50% / 50% 60% 40% 50%',
                        ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    style={{
                        width: '100%',
                        height: '100%',
                        background: dropGradient,
                        boxShadow: dropShadow,
                        backdropFilter: backdropFilter,
                        WebkitBackdropFilter: backdropFilter,
                        transition: 'background 350ms ease, box-shadow 350ms ease',
                    }}
                >
                    {/* Primary specular highlight */}
                    <div style={{
                        position: 'absolute',
                        top: '12%',
                        left: '18%',
                        width: '35%',
                        height: '25%',
                        borderRadius: '50%',
                        background: specularColor,
                        filter: 'blur(1px)',
                        transform: 'rotate(-25deg)',
                        transition: 'background 350ms ease',
                    }} />
                    
                    {/* Secondary bottom bounce reflection */}
                    <div style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '15%',
                        width: '25%',
                        height: '15%',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.25)',
                        filter: 'blur(2px)',
                        transform: 'rotate(-20deg)',
                    }} />
                </motion.div>
            </motion.div>
        </>
    );
}
