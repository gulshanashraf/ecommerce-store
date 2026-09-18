export default function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-maroon/20 bg-pink-soft/40 px-6 py-20 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-maroon shadow-sm">
          <Icon size={26} strokeWidth={1.5} />
        </div>
      )}
      <p className="font-display text-2xl text-maroon-deep">{title}</p>
      {subtitle && <p className="max-w-sm text-sm text-ink/60">{subtitle}</p>}
      {action}
    </div>
  );
}
