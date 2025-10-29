import express from "express";
import Cart from "../models/CartItem";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, cartItems } = req.body;

    if (!name || !email || !cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ message: "Missing or invalid checkout data" });
    }

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (sum: number, item: { price: number; qty: number }) =>
        sum + item.price * item.qty,
      0
    );

    const receipt = {
      name,
      email,
      total: total.toFixed(2),
      items: cartItems.map((i) => ({
        title: i.title,
        qty: i.qty,
        price: i.price,
        subtotal: (i.price * i.qty).toFixed(2),
      })),
      timestamp: new Date().toISOString(),
      message: "Checkout successful (mock)",
    };

    await Cart.deleteMany({});
    res.json(receipt);
  } catch (error) {
    console.error("Checkout failed:", error);
    res.status(500).json({ message: "Something went wrong during checkout" });
  }
});

export default router;
