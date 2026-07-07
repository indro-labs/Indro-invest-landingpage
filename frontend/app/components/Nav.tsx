import CrystalLogo from "./CrystalLogo";
import HomeLink from "./HomeLink";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#founding", label: "Pricing" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex h-15 items-center gap-0 bg-[#0c0d0c]/85 px-6 backdrop-blur-md">
      <HomeLink className="mr-10 flex shrink-0 items-center gap-2.5 text-ink">
        <CrystalLogo size={22} />
        <span className="text-base font-semibold tracking-tight">Selnite</span>
      </HomeLink>
      <div className="hidden flex-1 items-center gap-9 sm:flex">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-ink-soft transition-colors hover:text-ink"
          >
            {link.label}
          </a>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3 sm:ml-0">
        <a
          href="/join"
          className="btn-solid inline-flex items-center px-5 py-2.5 text-[13px]"
        >
          Sign up
        </a>
      </div>
    </nav>
  );
}
