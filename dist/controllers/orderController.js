"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRevenue = exports.getAllOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Car_1 = __importDefault(require("../models/Car"));
// Create Order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, car, productId, quantity, totalPrice } = req.body;
        // Find the car by ID
        const carDoc = yield Car_1.default.findById(car);
        if (!carDoc) {
            res.status(404).json({ message: "Car not found", success: false });
            return;
        }
        // Check stock
        if (carDoc.quantity < quantity) {
            res.status(400).json({ message: "Insufficient stock", success: false });
            return;
        }
        // Update stock
        carDoc.quantity -= quantity;
        carDoc.inStock = carDoc.quantity > 0;
        yield carDoc.save();
        // Create order
        const order = yield Order_1.default.create({ email, car, productId, quantity, totalPrice });
        res.status(201).json({ message: "Order created successfully", success: true, data: order });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating order", success: false, error: error.message });
    }
});
exports.createOrder = createOrder;
// Get All Orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find().populate('car');
        res.status(200).json({ message: "Orders retrieved successfully", success: true, data: orders });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving orders", success: false, error: error.message });
    }
});
exports.getAllOrders = getAllOrders;
// Calculate Revenue
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const revenue = yield Order_1.default.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
        ]);
        res.status(200).json({
            message: "Revenue calculated successfully",
            success: true,
            data: ((_a = revenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error calculating revenue", success: false, error: error.message });
    }
});
exports.calculateRevenue = calculateRevenue;
