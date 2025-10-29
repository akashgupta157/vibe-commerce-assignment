import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "../context/CartContext";
import CartItemRow from "../components/CartItemRow";
import CheckoutModal from "../components/CheckoutModal";

export default function Cart() {
  const { cart, total } = useCart();

  return (
    <div className="mx-auto p-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
              <div className="mt-4 font-semibold text-right">
                Total: ${total.toFixed(2)}
              </div>
              <CheckoutModal />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
