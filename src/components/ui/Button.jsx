import clsx from 'clsx';

export function Button({ children, variant = 'primary', size = 'sm', onClick, className, disabled }) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-150 cursor-pointer select-none';
  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 shadow-sm',
    secondary: 'bg-surface-100 text-ink-700 hover:bg-surface-200 border border-surface-200',
    ghost:     'text-ink-500 hover:bg-surface-100 hover:text-ink-700',
    danger:    'bg-red-500 text-white hover:bg-red-600',
    outline:   'border border-surface-300 text-ink-700 hover:bg-surface-50',
  };
  const sizes = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(base, variants[variant], sizes[size], disabled && 'opacity-40 cursor-not-allowed', className)}
    >
      {children}
    </button>
  );
}
