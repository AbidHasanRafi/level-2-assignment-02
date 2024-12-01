"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/.+@.+\..+/, "Please provide a valid email"],
    },
    car: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)("Order", orderSchema);
exports.default = Order;
