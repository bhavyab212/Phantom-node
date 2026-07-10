'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopPreferences } from '../system/useDesktopPreferences';
import { useWidgetStore } from '../desktop-widgets/useWidgetStore';
import { useInspector } from './useInspector';

interface DevSection {
  id: string;
  label: string;
  target: string;
  icon: string;
  fields: DevField[];
}

interface DevField {
  key: string;
  label: string;
  type: 'number' | 'color' | 'boolean' | 'range';
  min?: number;
  max?: number;
  step?: number;
  getValue: () => number | string | boolean;
  setValue: (v: any) => void;
}

interface HardcodeResult {
  success: boolean;
  message?: string;
  file?: string;
  diff?: Array<{ line: number; from: string; to: string }>;
  error?: string;
}

// ── Live values that mirror useAutoLayout constants ───────────────────────────
// These start at the same defaults as the source file.
const layoutDefaults = {
  GRID_GAP: 16,
  WIDGET_W: 300,
  SYS_H: 380,
  WORKSPACE_H: 380,
  QA_H: 380,
  NOTES_H: 200,
};

export function DevToolsOverlay() {
  const [open, setOpen] = useState(false);
  const [liveLayout, setLiveLayout] = useState({ ...layoutDefaults });
  const [hardcodeResult, setHardcodeResult] = useState<HardcodeResult | null>(null);
  const [hardcodeLoading, setHardcodeLoading] = useState<string | null>(null);
  const [copyHint, setCopyHint] = useState<string | null>(null);
  const [isInspectorActive, setIsInspectorActive] = useState(false);
  const [inspectedTargetId, setInspectedTargetId] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useInspector(isInspectorActive, (targetId) => {
    setIsInspectorActive(false);
    setInspectedTargetId(targetId);
    setOpen(true);
  });

  const {
    desktopZoom, setDesktopZoom,
    accentColor, setAccentColor,
    taskbarAutoHide, setTaskbarAutoHide,
  } = useDesktopPreferences();

  const resetWidgetLayouts = useWidgetStore((s) => s.resetWidgetLayouts);

  // ── Sections definition ─────────────────────────────────────────────────────
  const sections: DevSection[] = [
    {
      id: 'widgetLayout',
      label: 'Widget Layout',
      target: 'widgetLayout',
      icon: '⊞',
      fields: [
        {
          key: 'WIDGET_W', label: 'Widget Width', type: 'range', min: 200, max: 500, step: 10,
          getValue: () => liveLayout.WIDGET_W,
          setValue: (v: number) => setLiveLayout(p => ({ ...p, WIDGET_W: v })),
        },
        {
          key: 'GRID_GAP', label: 'Grid Gap', type: 'range', min: 8, max: 64, step: 4,
          getValue: () => liveLayout.GRID_GAP,
          setValue: (v: number) => setLiveLayout(p => ({ ...p, GRID_GAP: v })),
        },
        {
          key: 'SYS_H', label: 'System Status Height', type: 'range', min: 180, max: 600, step: 10,
          getValue: () => liveLayout.SYS_H,
          setValue: (v: number) => setLiveLayout(p => ({ ...p, SYS_H: v })),
        },
        {
          key: 'WORKSPACE_H', label: 'Workspace Height', type: 'range', min: 180, max: 600, step: 10,
          getValue: () => liveLayout.WORKSPACE_H,
          setValue: (v: number) => setLiveLayout(p => ({ ...p, WORKSPACE_H: v })),
        },
        {
          key: 'QA_H', label: 'Quick Access Height', type: 'range', min: 180, max: 600, step: 10,
          getValue: () => liveLayout.QA_H,
          setValue: (v: number) => setLiveLayout(p => ({ ...p, QA_H: v })),
        },
        {
          key: 'NOTES_H', label: 'Notes Height', type: 'range', min: 100, max: 400, step: 10,
          getValue: () => liveLayout.NOTES_H,
          setValue: (v: number) => setLiveLayout(p => ({ ...p, NOTES_H: v })),
        },
      ],
    },
    {
      id: 'desktopPreferences',
      label: 'Desktop Preferences',
      target: 'desktopPreferences',
      icon: '⚙',
      fields: [
        {
          key: 'desktopZoom', label: 'Default Zoom (%)', type: 'range', min: 50, max: 150, step: 5,
          getValue: () => desktopZoom,
          setValue: (v: number) => setDesktopZoom(v),
        },
        {
          key: 'accentColor', label: 'Accent Color', type: 'color',
          getValue: () => accentColor,
          setValue: (v: string) => setAccentColor(v),
        },
        {
          key: 'taskbarAutoHide', label: 'Auto-hide Taskbar', type: 'boolean',
          getValue: () => taskbarAutoHide,
          setValue: (v: boolean) => setTaskbarAutoHide(v),
        },
      ],
    },
  ];

  // Filter sections if a specific target is inspected
  const visibleSections = inspectedTargetId 
    ? sections.filter(s => {
        if (inspectedTargetId === 'taskbar' && s.id === 'desktopPreferences') return true;
        if (inspectedTargetId === 'desktop' && s.id === 'desktopPreferences') return true;
        if (inspectedTargetId.startsWith('w-') && s.id === 'widgetLayout') return true;
        return false;
      })
    : sections;

  // Fallback if filter matches nothing
  const displaySections = visibleSections.length > 0 ? visibleSections : sections;

  // ── Hardcode action ─────────────────────────────────────────────────────────
  const handleHardcode = useCallback(async (section: DevSection) => {
    setHardcodeLoading(section.id);
    setHardcodeResult(null);
    try {
      const patches: Record<string, string | number> = {};
      for (const field of section.fields) {
        patches[field.key] = field.getValue() as any;
      }
      const res = await fetch('/api/dev-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: section.target, patches }),
      });
      const data = await res.json();
      setHardcodeResult(data);
    } catch (e: any) {
      setHardcodeResult({ success: false, error: e.message });
    } finally {
      setHardcodeLoading(null);
    }
  }, []);

  const handleWidgetHardcode = useCallback(async (widgetId: string) => {
    setHardcodeLoading('widget-override');
    setHardcodeResult(null);
    try {
      const { customLayouts } = useWidgetStore.getState();
      const currentRect = customLayouts[widgetId];
      if (!currentRect) {
        setHardcodeResult({ success: false, error: 'Widget has not been dragged/resized. No custom layout to save.' });
        setHardcodeLoading(null);
        return;
      }
      
      const res = await fetch('/api/dev-tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          target: 'widgetLayout', 
          layoutOverride: { id: widgetId, rect: currentRect } 
        }),
      });
      const data = await res.json();
      setHardcodeResult(data);
    } catch (e: any) {
      setHardcodeResult({ success: false, error: e.message });
    } finally {
      setHardcodeLoading(null);
    }
  }, []);

  // ── Copy snippet ────────────────────────────────────────────────────────────
  const copySnippet = useCallback((section: DevSection) => {
    const lines = section.fields.map(f => `const ${f.key} = ${JSON.stringify(f.getValue())};`);
    navigator.clipboard.writeText(lines.join('\n'));
    setCopyHint(section.id);
    setTimeout(() => setCopyHint(null), 1500);
  }, []);

  // ── Reset widgets ───────────────────────────────────────────────────────────
  const handleResetLayout = () => {
    resetWidgetLayouts();
    setLiveLayout({ ...layoutDefaults });
    setHardcodeResult({ success: true, message: 'Widget positions reset to auto-layout.' });
  };

  return (
    <>
      {/* ── Floating trigger button (styled like Next.js logo) ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-[76px] left-3 z-[9997] w-10 h-10 rounded-full
                   bg-black border border-white/15 shadow-xl
                   flex items-center justify-center
                   hover:border-white/40 hover:shadow-white/10
                   transition-all duration-200 group"
        title="Dev Tools"
        aria-label="Open Dev Tools"
        id="dev-tools-trigger"
      >
        <span className="text-white font-bold text-sm tracking-tight group-hover:opacity-80 transition">
          PN
        </span>
      </button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-[76px] left-16 z-[9998] w-[380px] max-h-[calc(100vh-120px)]
                       flex flex-col
                       bg-[#0a0a0a]/95 backdrop-blur-2xl
                       border border-white/10 rounded-2xl shadow-2xl
                       overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">PN</span>
                <span className="text-sm font-semibold text-white/90">Dev Tools</span>
                <span className="text-[10px] font-medium bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">DEV</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetLayout}
                  className="text-[11px] text-white/40 hover:text-orange-400 transition-colors px-2 py-1 rounded"
                  title="Reset widget positions"
                >
                  Reset Layout
                </button>
                <button
                  onClick={() => {
                    setIsInspectorActive(a => !a);
                    if (!isInspectorActive) setOpen(false); // hide panel while inspecting
                  }}
                  className={`text-[11px] transition-colors px-2 py-1 rounded flex items-center gap-1 ${
                    isInspectorActive ? 'bg-[#10b981]/20 text-[#10b981]' : 'text-white/40 hover:text-[#10b981]'
                  }`}
                  title="Inspect Element"
                >
                  <span className="text-base">⌖</span> Inspect
                </button>
                <button onClick={() => { setOpen(false); setInspectedTargetId(null); }} className="text-white/40 hover:text-white transition w-6 h-6 flex items-center justify-center rounded">
                  ✕
                </button>
              </div>
            </div>

            {/* Inspect Filter Banner */}
            {inspectedTargetId && (
              <div className="px-4 py-2 bg-blue-500/10 border-b border-blue-500/20 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-400 font-medium">Inspecting: <span className="font-mono text-white/80">{inspectedTargetId}</span></span>
                  <button onClick={() => setInspectedTargetId(null)} className="text-[10px] text-white/40 hover:text-white">Clear</button>
                </div>
                
                {inspectedTargetId.startsWith('w-') && (
                  <div className="bg-white/5 rounded-lg p-3 mt-1 border border-white/10">
                    <p className="text-[11px] text-white/60 mb-2 leading-relaxed">
                      You can drag and resize this widget freely on the desktop. 
                      Click below to hardcode its current position permanently.
                    </p>
                    <button
                      onClick={() => handleWidgetHardcode(inspectedTargetId)}
                      disabled={hardcodeLoading === 'widget-override'}
                      className="w-full py-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition"
                    >
                      {hardcodeLoading === 'widget-override' ? 'Saving...' : '📌 Fix Position in Code'}
                    </button>
                    {hardcodeResult && hardcodeResult.success && (
                      <div className="mt-2 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1.5 rounded border border-emerald-500/20 text-center">
                        ✓ Position permanently fixed!
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Sections */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-none">
              {displaySections.map((section) => (
                <SectionBlock
                  key={section.id}
                  section={section}
                  isHardcoding={hardcodeLoading === section.id}
                  copyHint={copyHint}
                  onHardcode={() => handleHardcode(section)}
                  onCopy={() => copySnippet(section)}
                />
              ))}

              {/* Hardcode result banner */}
              <AnimatePresence>
                {hardcodeResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`rounded-xl p-3 text-xs font-mono ${
                      hardcodeResult.success
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}
                  >
                    {hardcodeResult.success ? (
                      <>
                        <div className="font-semibold mb-1">✓ Hardcoded successfully</div>
                        {hardcodeResult.file && <div className="text-white/40">↳ {hardcodeResult.file}</div>}
                        {hardcodeResult.diff && hardcodeResult.diff.length > 0 && (
                          <div className="mt-2 space-y-1 max-h-24 overflow-y-auto">
                            {hardcodeResult.diff.map((d, i) => (
                              <div key={i} className="text-white/50">
                                <span className="text-red-400/70">- L{d.line}: {d.from?.trim()}</span><br />
                                <span className="text-emerald-400">+ {d.to?.trim()}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {hardcodeResult.message && <div>{hardcodeResult.message}</div>}
                      </>
                    ) : (
                      <>
                        <div className="font-semibold">✗ {hardcodeResult.error || hardcodeResult.message}</div>
                      </>
                    )}
                    <button onClick={() => setHardcodeResult(null)} className="mt-2 text-white/30 hover:text-white/60">Dismiss</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer hint */}
            <div className="px-5 py-3 border-t border-white/8 shrink-0">
              <p className="text-[10px] text-white/25 text-center">
                Changes are live. Press <strong className="text-white/40">Hardcode It</strong> to write them into the source.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Sub-component: one collapsible section ────────────────────────────────────
function SectionBlock({
  section, isHardcoding, copyHint, onHardcode, onCopy
}: {
  section: DevSection;
  isHardcoding: boolean;
  copyHint: string | null;
  onHardcode: () => void;
  onCopy: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/8 overflow-hidden">
      {/* Section header */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition"
      >
        <div className="flex items-center gap-2">
          <span className="text-base">{section.icon}</span>
          <span className="text-xs font-semibold text-white/80">{section.label}</span>
        </div>
        <span className="text-white/30 text-xs">{collapsed ? '▸' : '▾'}</span>
      </button>

      {!collapsed && (
        <div className="px-4 pb-4 space-y-3">
          {section.fields.map((field) => (
            <FieldRow key={field.key} field={field} />
          ))}

          {/* Action row */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onHardcode}
              disabled={isHardcoding}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold
                         bg-white text-black hover:bg-white/90 disabled:opacity-50
                         transition-all duration-150 flex items-center justify-center gap-1.5"
            >
              {isHardcoding ? (
                <><span className="animate-spin">⟳</span> Writing…</>
              ) : (
                <><span>⚡</span> Hardcode It</>
              )}
            </button>
            <button
              onClick={onCopy}
              className="py-2 px-3 rounded-lg text-xs font-medium
                         bg-white/8 text-white/60 hover:bg-white/12 hover:text-white/90
                         transition-all duration-150"
              title="Copy as code snippet"
            >
              {copyHint === section.id ? '✓ Copied' : '⎘ Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-component: one field row ──────────────────────────────────────────────
function FieldRow({ field }: { field: DevField }) {
  const value = field.getValue();

  if (field.type === 'range' || field.type === 'number') {
    const num = value as number;
    return (
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <label className="text-[11px] text-white/50">{field.label}</label>
          <span className="text-[11px] font-mono text-white/80 tabular-nums">{num}</span>
        </div>
        <input
          type="range"
          min={field.min ?? 0}
          max={field.max ?? 100}
          step={field.step ?? 1}
          value={num}
          onChange={e => field.setValue(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none bg-white/10 accent-white cursor-pointer"
        />
      </div>
    );
  }

  if (field.type === 'color') {
    return (
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-white/50">{field.label}</label>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-white/60">{value as string}</span>
          <input
            type="color"
            value={value as string}
            onChange={e => field.setValue(e.target.value)}
            className="w-6 h-6 rounded cursor-pointer border border-white/10 bg-transparent"
          />
        </div>
      </div>
    );
  }

  if (field.type === 'boolean') {
    return (
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-white/50">{field.label}</label>
        <button
          onClick={() => field.setValue(!value)}
          className={`relative w-10 h-5 rounded-full transition-colors ${
            value ? 'bg-blue-500' : 'bg-white/15'
          }`}
        >
          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0.5'
          }`} />
        </button>
      </div>
    );
  }

  return null;
}
