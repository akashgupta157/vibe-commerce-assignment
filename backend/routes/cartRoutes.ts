import express from "express";
import CartItem from "../models/CartItem";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const cart = await CartItem.find();
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    res.json({ cart, total });
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id: productId, title, price, image, qty } = req.body;

    if (!productId || !title || !price) {
      return res.status(400).json({ message: "Missing product data" });
    }

    const existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.qty += qty || 1;
      await existing.save();
      return res.json(existing);
    }

    const newItem = new CartItem({
      id: productId,
      title,
      price,
      image,
      qty: qty || 1,
    });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add to cart:", error.message);
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    } else {
      console.error("Failed to add to cart:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await CartItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item removed" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to delete from cart:", error.message);
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    } else {
      console.error("Failed to delete from cart:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;
    if (qty <= 0) return res.status(400).json({ message: "Invalid quantity" });

    const item = await CartItem.findById(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.qty = qty;
    await item.save();
    res.json(item);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Failed to add to cart:", error.message);
      res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    } else {
      console.error("Failed to add to cart:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
});

export default router;
