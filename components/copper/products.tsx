import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

// Both cutouts are square PNGs on transparent backgrounds.
const CUTOUT_SIZE = 1254;

export function Products() {
  const products = getProducts();

  return (
    <section data-testid="products" id="products" className="w-full">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold md:text-4xl">
          Meet the Copper family
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((product) => (
            <Card
              key={product.id}
              data-testid="product-card"
              data-product={product.id}
            >
              <CardContent>
                <Image
                  src={product.cutout}
                  alt={`${product.name} ${product.type}`}
                  width={CUTOUT_SIZE}
                  height={CUTOUT_SIZE}
                  sizes="(min-width: 1024px) 480px, (min-width: 768px) 45vw, 90vw"
                  className="mx-auto aspect-square h-auto w-full max-w-xs object-contain"
                />
              </CardContent>
              <CardHeader>
                <CardTitle>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                </CardTitle>
                <CardDescription>{product.type}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-primary text-2xl font-bold">
                  {formatUsd(product.priceUsd)}
                </p>
                <ul className="flex flex-col gap-3">
                  {product.features.map((feature) => (
                    <li key={feature.name}>
                      <span className="font-semibold">{feature.name}.</span>{" "}
                      <span className="text-muted-foreground">
                        {feature.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
