import SelniteMark from "./SelniteMark";
import HomeLink from "./HomeLink";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#dashboard", label: "Dashboard" },
];

export default function Nav() {
  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-5 sm:px-8"
      style={{
        background: "linear-gradient(to bottom, rgba(5,5,5,0.95) 0%, transparent 100%)",
        backdropFilter: "blur(2px)",
      }}
    >
      <HomeLink className="flex items-center gap-2 text-white">
        <SelniteMark size={20} />
        <span className="text-lg font-bold tracking-tight">Selnite</span>
      </HomeLink>
      <div className="flex items-center gap-8">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden text-sm font-medium text-ink-soft transition-colors hover:text-white sm:inline"
          >
            {link.label}
          </a>
        ))}
        <a href="/onboarding/questions/1" className="btn-solid inline-flex items-center px-5.5 py-2.5 text-sm">
           Get started
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
        </a>
     
      </div>
    </nav>
  );
}
