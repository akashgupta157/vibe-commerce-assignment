import express from "express";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const products = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
