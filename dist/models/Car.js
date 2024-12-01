"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carSchema = new mongoose_1.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'], required: true },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });
const Car = (0, mongoose_1.model)("Car", carSchema);
exports.default = Car;
