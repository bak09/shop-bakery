import React from "react";
import MainContent from "../components/MainContent";

export default function Home({ products, onAddToCart }) {
  return <MainContent products={products} onAddToCart={onAddToCart} />;
}