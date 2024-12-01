import { Schema, model, Document } from "mongoose";

interface ICar extends Document {
  brand: string;
  model: string;
  year: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity: number;
  inStock: boolean;
}

const carSchema = new Schema<ICar>({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true });

const Car = model<ICar>("Car", carSchema);

export default Car;
