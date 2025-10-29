import { getProducts } from "@/api";
import type { Product } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-6">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        : products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
