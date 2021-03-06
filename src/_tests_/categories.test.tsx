import React from "react";
import { test, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Categories from "@/layout/header/categories";

describe("Categories", () => {
  test("renders learn react link", () => {
    render(<Categories />);
    const showText = screen.getByText(/software/i);
    expect(showText).toBeInTheDocument();
  });
});
