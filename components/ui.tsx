import Link from "next/link";

export function PillButton({ href, onClick, children, disabled }: {
  href?: string; onClick?: () => void; children: React.ReactNode; disabled?: boolean;
}) {
  const cls =
    "flex w-full items-center justify-between rounded-full bg-white py-2 pl-6 pr-2 text-left font-semibold text-space transition hover:bg-violet disabled:opacity-40 disabled:hover:bg-white";
  const arrow = (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-space text-white" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12L12 4M5 4h7v7" />
      </svg>
    </span>
  );
  if (href) return <Link href={href} className={cls}>{children}{arrow}</Link>;
  return <button onClick={onClick} disabled={disabled} className={cls}>{children}{arrow}</button>;
}

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-line bg-panel/70 px-3 py-1.5 text-xs font-medium text-mist">
      <span className="h-1.5 w-1.5 rounded-full bg-violet" />
      {children}
    </span>
  );
}

export function Option({ selected, onClick, title, desc }: {
  selected: boolean; onClick: () => void; title: string; desc?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`w-full rounded-2xl border p-4 text-left transition ${
        selected ? "border-violet bg-violet/10" : "border-line bg-panel/70 hover:border-mist"
      }`}
    >
      <div className="font-semibold">{title}</div>
      {desc && <div className="mt-1 text-sm text-mist">{desc}</div>}
    </button>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-line" role="progressbar" aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-violet transition-all" style={{ width: `${value}%` }} />
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold tracking-widest">
      <span className="grid h-6 w-6 place-items-center rounded-full border border-white"><span className="h-2 w-2 rounded-full bg-white" /></span>
      ASTERIA
    </div>
  );
}
