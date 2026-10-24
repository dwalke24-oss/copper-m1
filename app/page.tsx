import { Hero } from "@/components/copper/hero";
import { Products } from "@/components/copper/products";
import { Showcase } from "@/components/copper/showcase";
import { SiteFooter } from "@/components/copper/site-footer";
import { SiteHeader } from "@/components/copper/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex w-full flex-1 flex-col">
        <Hero />
        <Products />
        <Showcase />
      </main>
      <SiteFooter />
    </>
  );
}
