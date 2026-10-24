import { Hero } from "@/components/copper/hero";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col">
        <Hero />
      </main>
      <SiteFooter />
    </>
  );
}
