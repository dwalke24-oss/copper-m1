import Image from "next/image";
import { cn } from "@/lib/utils";
import { getProducts } from "@/lib/copper/catalog";

// The catalog lists each product's lifestyle photos; their sizes, alt text and
// captions live here, keyed by image path.
const PHOTOS: Record<
  string,
  { width: number; height: number; alt: string; caption: string }
> = {
  "/assets/lifestyle/copper-home-desert-light.png": {
    width: 1672,
    height: 941,
    alt: "Copper Home smart speaker on a stone kitchen counter, its screen showing the time and 92 degrees, with a desert sunset outside the window",
    caption:
      "Copper Home brings everyday AI assistance to the kitchen counter, sunrise to sunset.",
  },
  "/assets/lifestyle/copper-notes-stone-desk.png": {
    width: 1672,
    height: 941,
    alt: "Brushed copper Copper Notes recorder standing on a stone counter beside its round charging pad",
    caption: "Copper Notes charges on its pad between meetings and lectures.",
  },
  "/assets/lifestyle/copper-notes-golden-hour.png": {
    width: 1536,
    height: 1024,
    alt: "Person writing in a notebook at a café table with Copper Notes clipped to their shirt pocket, its amber ring lit",
    caption:
      "Clipped to a pocket, Copper Notes lights its amber ring when it's recording.",
  },
};

export function Showcase() {
  const shots = getProducts().flatMap((product) =>
    product.lifestyle.map((src) => ({ product, src, photo: PHOTOS[src] })),
  );

  return (
    <section data-testid="showcase" id="showcase" className="bg-secondary w-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-16 md:py-24">
        <h2 className="text-secondary-foreground text-3xl font-bold md:text-4xl">
          Made for Arizona life
        </h2>
        {shots.map(({ product, src, photo }, index) =>
          photo ? (
            <figure
              key={src}
              className={cn(
                "flex flex-col items-center gap-6 md:flex-row md:gap-10",
                index % 2 === 1 && "md:flex-row-reverse",
              )}
            >
              <Image
                src={src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 580px, (min-width: 768px) 60vw, 100vw"
                className="h-auto w-full rounded-xl md:w-3/5"
              />
              <figcaption className="flex flex-col gap-2 md:w-2/5">
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  {product.name}
                </span>
                <p className="text-secondary-foreground text-lg">
                  {photo.caption}
                </p>
              </figcaption>
            </figure>
          ) : null,
        )}
      </div>
    </section>
  );
}
