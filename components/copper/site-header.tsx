import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

// In-page links to the landing page sections, so plain <a> tags, not <Link>.
const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Copper Plus", href: "#plus" },
  { label: "Privacy", href: "#privacy" },
];

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background sticky top-0 z-50 border-b"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-24 md:w-44" />
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          <nav aria-label="Main" className="flex items-center gap-2 md:gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
