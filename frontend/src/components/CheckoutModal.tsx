import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkout } from "../api";
import { useCart } from "../context/CartContext";
import type { Receipt } from "@/types";
import { useNavigate } from "react-router-dom";

export default function CheckoutModal() {
  const navigate = useNavigate();
  const { cart, total, refreshCart } = useCart();
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  const handleCheckout = async () => {
    const res = await checkout({ ...form, cartItems: cart });
    setReceipt(res.data);
    setForm({ name: "", email: "" });
    setTimeout(() => {
      refreshCart();
      navigate("/");
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 w-full">
          Proceed to Checkout (${total.toFixed(2)})
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
        </DialogHeader>

        {!receipt ? (
          <div className="space-y-3">
            <Input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Button onClick={handleCheckout} className="w-full">
              Confirm & Checkout
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Receipt</h3>
            <p>Name: {receipt.name}</p>
            <p>Email: {receipt.email}</p>
            <p>Total: ${receipt.total}</p>
            <p className="text-gray-500 text-sm">
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
