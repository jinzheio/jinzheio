export function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 right-[-10%] h-[28rem] w-[32rem] rounded-full bg-[radial-gradient(circle_at_top,_var(--brand)_0%,_transparent_62%)] opacity-50 blur-2xl" />
      <div className="absolute left-[-15%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_top,_var(--ember)_0%,_transparent_65%)] opacity-20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,_oklch(1_0_0/0.5)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_oklch(1_0_0/0.7),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,_oklch(0.85_0.02_260/0.22)_1px,_transparent_1px),_linear-gradient(to_bottom,_oklch(0.85_0.02_260/0.22)_1px,_transparent_1px)] bg-[size:64px_64px] opacity-40" />
    </div>
  );
}
