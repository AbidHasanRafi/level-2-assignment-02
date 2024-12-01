import { Schema, model, Document } from "mongoose";


export interface IOrder extends Document {
  email: string;
  car: Schema.Types.ObjectId;
  productId: string;
  quantity: number;
  totalPrice: number;
}

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+@.+\..+/, "Please provide a valid email"],
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: [true, "Car ID is required"],
    },
    productId: {
      type: String,
      required: [true, "Product ID is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: [0, "Total price must be a positive number"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
