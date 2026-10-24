import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/copper/catalog";

// Both cutouts are square PNGs on transparent backgrounds.
const CUTOUT_SIZE = 1254;

export function Hero() {
  const products = getProducts();

  return (
    <section data-testid="hero" id="top" className="bg-secondary w-full">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-secondary-foreground text-4xl font-bold md:text-5xl">
            Smart help for your home, notes for every meeting.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            From raw ideas to refined answers.
          </p>
          <Button asChild size="lg">
            <a href="#products">See products</a>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <Image
              key={product.id}
              src={product.cutout}
              alt={`${product.name} ${product.type}`}
              width={CUTOUT_SIZE}
              height={CUTOUT_SIZE}
              sizes="(min-width: 1024px) 240px, (min-width: 768px) 25vw, 45vw"
              loading="eager"
              className="aspect-square h-auto w-full object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
