import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { removeFromCart, updateCartQty } from "../api";
import { useCart } from "../context/CartContext";
import type { Product } from "@/types";

export default function CartItemRow({ item }: { item: Product }) {
  const { refreshCart } = useCart();

  const handleRemove = async () => {
    if (!item._id) return
    await removeFromCart(item._id);
    refreshCart();
  };

  const handleQtyChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!item._id) return
    await updateCartQty(item._id, Number(e.target.value));
    refreshCart();
  };

  return (
    <div className="flex justify-between items-center py-3 border-b">
      <div className="flex items-center gap-3">
        <img src={item.image} className="w-12 h-12 object-contain" />
        <span>{item.title}</span>
      </div>
      <div className="flex items-center gap-3">
        <Input
          type="number"
          value={item.qty}
          min={1}
          onChange={handleQtyChange}
          className="w-16 text-center"
        />
        <span className="font-medium">${item.price}</span>
        <Button variant="destructive" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}
