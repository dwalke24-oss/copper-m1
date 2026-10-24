"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatUsd, getProducts, type ProductId } from "@/lib/copper/catalog";

// Three two-choice questions, each answer pointing to one product, so the
// result can never tie. Runs in the browser only: nothing is sent or saved.
const QUESTIONS: {
  id: string;
  question: string;
  answers: { label: string; product: ProductId }[];
}[] = [
  {
    id: "where",
    question: "Where would you use Copper most?",
    answers: [
      { label: "At home", product: "copper-home" },
      { label: "At work or on campus", product: "copper-notes" },
    ],
  },
  {
    id: "help",
    question: "What do you want help with?",
    answers: [
      {
        label: "Running the house: lights, sprinklers, reminders",
        product: "copper-home",
      },
      {
        label: "Keeping track of meetings and lectures",
        product: "copper-notes",
      },
    ],
  },
  {
    id: "how",
    question: "How would you like to use it?",
    answers: [
      { label: "Ask out loud with \"Hey Copper\"", product: "copper-home" },
      {
        label: "Clip it on and get a summary afterwards",
        product: "copper-notes",
      },
    ],
  },
];

// Cutouts are square PNGs, like in the hero and product cards.
const CUTOUT_SIZE = 1254;

export function ProductFinder() {
  const [picks, setPicks] = useState<Record<string, ProductId>>({});

  const choices = Object.values(picks);
  const done = choices.length === QUESTIONS.length;
  const homeVotes = choices.filter((id) => id === "copper-home").length;
  const winnerId: ProductId =
    homeVotes > choices.length / 2 ? "copper-home" : "copper-notes";
  const winner = done
    ? getProducts().find((product) => product.id === winnerId)
    : undefined;
  const matches = choices.filter((id) => id === winnerId).length;

  return (
    <section
      data-testid="product-finder"
      id="finder"
      className="w-full border-t"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-16 md:py-24">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold md:text-4xl">
            Which Copper fits you?
          </h2>
          <p className="text-muted-foreground text-lg">
            Answer three quick questions to find your match.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {QUESTIONS.map((q) => (
            <div
              key={q.id}
              role="group"
              aria-labelledby={`finder-${q.id}`}
              className="flex flex-col gap-3"
            >
              <h3 id={`finder-${q.id}`} className="text-lg font-semibold">
                {q.question}
              </h3>
              {q.answers.map((answer) => {
                const selected = picks[q.id] === answer.product;
                return (
                  <Button
                    key={answer.product}
                    type="button"
                    variant={selected ? "default" : "outline"}
                    aria-pressed={selected}
                    onClick={() =>
                      setPicks((current) => ({
                        ...current,
                        [q.id]: answer.product,
                      }))
                    }
                    className="h-auto justify-start py-3 text-left text-base whitespace-normal"
                  >
                    {answer.label}
                  </Button>
                );
              })}
            </div>
          ))}
        </div>
        <div aria-live="polite">
          {winner && (
            <Card data-testid="finder-result">
              <CardContent className="flex flex-col items-center gap-6 md:flex-row">
                <Image
                  src={winner.cutout}
                  alt={`${winner.name} ${winner.type}`}
                  width={CUTOUT_SIZE}
                  height={CUTOUT_SIZE}
                  sizes="(min-width: 768px) 200px, 60vw"
                  className="aspect-square h-auto w-full max-w-50 object-contain"
                />
                <div className="flex flex-col gap-3">
                  <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                    Your match
                  </span>
                  <h3 className="text-2xl font-bold">{winner.name}</h3>
                  <p className="text-muted-foreground">
                    {matches} of {QUESTIONS.length} of your answers point to{" "}
                    {winner.name}.
                  </p>
                  <p className="text-xl font-bold">
                    {winner.type} · {formatUsd(winner.priceUsd)}
                  </p>
                  <ul className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
                    {winner.features.map((feature) => (
                      <li key={feature.name}>{feature.name}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button asChild size="lg">
                      <a href="#products">Compare both</a>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => setPicks({})}
                    >
                      Start over
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
