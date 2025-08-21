export default function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-full bg-gradient-to-b from-white to-black/70 shadow-halo" />
          <span className="tracking-[0.18em] text-sm font-semibold">THE SANCTUARY</span>
        </div>
        <nav className="hidden gap-6 text-sm md:flex">
          <a className="opacity-80 hover:opacity-100" href="#about">About</a>
          <a className="opacity-80 hover:opacity-100" href="#tenets">Tenets</a>
          <a className="opacity-80 hover:opacity-100" href="#liturgy">Liturgy</a>
          <a className="opacity-80 hover:opacity-100" href="#visit">Visit</a>
        </nav>
      </div>
    </header>
  );
}
