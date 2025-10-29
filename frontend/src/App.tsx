import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function Navbar() {
  const { cart } = useCart();
  const itemCount = cart?.reduce((sum, item) => sum + item.qty, 0) || 0;

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link to="/" className="font-bold text-lg">
        Vibe Commerce
      </Link>

      <Link to="/cart" className="relative">
        <Button variant="outline" className="relative">
          Cart
          {itemCount > 0 && (
            <Badge
              className="-top-2 -right-2 absolute bg-red-500 px-2 py-0.5 rounded-full text-white text-xs"
              variant="secondary"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}
