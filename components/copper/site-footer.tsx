import { Logo } from "@/components/copper/logo";

// The "dark" class keeps the footer Night Sky in both themes, and makes the
// Logo show its Desert Sand wordmark.
export function SiteFooter() {
  return (
    <footer
      data-testid="site-footer"
      className="dark bg-background text-foreground"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <Logo className="w-36" />
        <p className="text-muted-foreground text-sm">
          Fictional — for educational use.
        </p>
      </div>
    </footer>
  );
}
