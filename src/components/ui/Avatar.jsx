export function Avatar({ initials, color, size = 'md', src }) {
  const sizes = {
    xs:  'w-6 h-6 text-xs',
    sm:  'w-8 h-8 text-xs',
    md:  'w-9 h-9 text-sm',
    lg:  'w-11 h-11 text-base',
    xl:  'w-14 h-14 text-lg',
  };
  return (
    <div
      className={`avatar ${sizes[size]}`}
      style={{ backgroundColor: color || '#4361ee' }}
    >
      {src ? <img src={src} alt={initials} className="w-full h-full rounded-full object-cover" /> : initials}
    </div>
  );
}
