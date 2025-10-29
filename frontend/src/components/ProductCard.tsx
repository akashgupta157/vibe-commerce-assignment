import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addToCart, getCart } from "../api";
import { useCart } from "../context/CartContext";
import { Star } from "lucide-react";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { refreshCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    getCart().then((res) => {
      const found = res.data.cart?.find((i: Product) => i.id === product.id);
      setIsAdded(!!found);
    });
  }, [product.id]);

  const handleAddRemove = async () => {
    if (!isAdded) {
      await addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        qty: 1,
      });
      setIsAdded(true);
    }
    refreshCart();
  };

  return (
    <Card className="flex flex-col justify-between hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="font-medium text-sm line-clamp-2">
          {product.title}
        </CardTitle>
        <p className="text-gray-500 text-xs capitalize">{product.category}</p>
      </CardHeader>

      <CardContent className="flex flex-col items-center space-y-3">
        <img
          src={product.image}
          alt={product.title}
          className="h-40 object-contain"
        />

        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={
                i < Math.round(product.rating.rate) ? "currentColor" : "none"
              }
              stroke="currentColor"
            />
          ))}
          <span className="ml-1 text-gray-500 text-xs">
            ({product.rating.count})
          </span>
        </div>

        <p className="font-semibold text-gray-800">${product.price}</p>

        <p className="text-gray-600 text-xs text-center line-clamp-2">
          {product.description}
        </p>

        <Button
          onClick={handleAddRemove}
          variant={isAdded ? "secondary" : "default"}
          className={`w-full transition-all ${
            isAdded ? "bg-green-600 hover:bg-green-700 text-white" : ""
          }`}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}
