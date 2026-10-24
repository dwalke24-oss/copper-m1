import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";
import { ProductFinder } from "@/components/copper/product-finder";
import { formatUsd, getProducts } from "@/lib/copper/catalog";

const product = (id: string) => getProducts().find((p) => p.id === id)!;

function answer(...labels: (string | RegExp)[]) {
  for (const label of labels) {
    fireEvent.click(screen.getByRole("button", { name: label }));
  }
}

describe("Which Copper fits you?", () => {
  it("shows no match until all three questions are answered", () => {
    render(<ProductFinder />);
    expect(screen.getAllByRole("group")).toHaveLength(3);
    answer("At home", /Running the house/);
    expect(screen.queryByTestId("finder-result")).toBeNull();
  });

  it("recommends Copper Home with its catalog price when most answers point to it", () => {
    render(<ProductFinder />);
    answer("At home", /Running the house/, /Clip it on/);
    const result = screen.getByTestId("finder-result");
    const home = product("copper-home");
    expect(result).toHaveTextContent(home.name);
    expect(result).toHaveTextContent(formatUsd(home.priceUsd));
    expect(result).toHaveTextContent(`2 of 3 of your answers point to ${home.name}`);
    expect(within(result).getByRole("img")).toHaveAttribute(
      "alt",
      `${home.name} ${home.type}`,
    );
  });

  it("recommends Copper Notes when every answer points to it", () => {
    render(<ProductFinder />);
    answer("At work or on campus", /meetings and lectures/, /Clip it on/);
    const result = screen.getByTestId("finder-result");
    const notes = product("copper-notes");
    expect(result).toHaveTextContent(notes.name);
    expect(result).toHaveTextContent(formatUsd(notes.priceUsd));
    expect(result).toHaveTextContent(`3 of 3 of your answers point to ${notes.name}`);
  });

  it("marks the chosen answer and lets the visitor change it", () => {
    render(<ProductFinder />);
    answer("At home");
    expect(screen.getByRole("button", { name: "At home" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    answer("At work or on campus");
    expect(screen.getByRole("button", { name: "At home" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("Start over clears the answers and the match", () => {
    render(<ProductFinder />);
    answer("At home", /Running the house/, /Hey Copper/);
    expect(
      within(screen.getByTestId("finder-result")).getByRole("link", {
        name: "Compare both",
      }),
    ).toHaveAttribute("href", "#products");
    answer("Start over");
    expect(screen.queryByTestId("finder-result")).toBeNull();
    for (const button of screen.getAllByRole("button")) {
      expect(button).toHaveAttribute("aria-pressed", "false");
    }
  });

  it("sits on the landing page right after the products", () => {
    const { container } = render(<Home />);
    const products = container.querySelector('[data-testid="products"]');
    expect(products?.nextElementSibling).toHaveAttribute(
      "data-testid",
      "product-finder",
    );
  });
});
