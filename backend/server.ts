import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import checkoutRoutes from "./routes/checkoutRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
