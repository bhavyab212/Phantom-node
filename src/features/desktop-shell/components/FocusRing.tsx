export function FocusRing({ isFocused }: { isFocused: boolean }) {
  if (!isFocused) return null;
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none rounded-[inherit] z-50 transition-opacity duration-200"
      style={{
        boxShadow: '0 0 0 1px oklch(from var(--accent-color) l c h / 0.5), inset 0 0 0 1px oklch(from var(--accent-color) l c h / 0.2)'
      }}
    />
  );
}
