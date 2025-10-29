import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  id: number;
  title: string;
  price: number;
  image: string;
  qty: number;
}

const CartItemSchema = new Schema<ICartItem>({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
});

export default mongoose.model<ICartItem>("CartItem", CartItemSchema);
