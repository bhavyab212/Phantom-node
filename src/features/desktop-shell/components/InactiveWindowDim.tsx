export function InactiveWindowDim({ isFocused, isDragging }: { isFocused: boolean, isDragging: boolean }) {
  if (isFocused || isDragging) return null;
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none rounded-[inherit] z-40 transition-opacity duration-200"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      }}
    />
  );
}
