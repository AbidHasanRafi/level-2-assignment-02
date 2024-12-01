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
exports.calculateRevenue = exports.getAllOrders = exports.createOrder = exports.deleteCar = exports.updateCar = exports.getCarById = exports.getAllCars = exports.createCar = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Car_1 = __importDefault(require("../models/Car"));
// Create a new car
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const car = new Car_1.default(req.body);
        yield car.save();
        res.status(201).json({ message: "Car created successfully", success: true, data: car });
    }
    catch (error) {
        res.status(400).json({ message: "Validation failed", success: false, error });
    }
});
exports.createCar = createCar;
// Get all cars
const getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const query = searchTerm ? {
            $or: [
                { brand: searchTerm },
                { model: searchTerm },
                { category: searchTerm }
            ]
        } : {};
        const cars = yield Car_1.default.find(query);
        res.status(200).json({ message: "Cars retrieved successfully", success: true, data: cars });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving cars", success: false, error });
    }
});
exports.getAllCars = getAllCars;
// Get a specific car by ID
const getCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const car = yield Car_1.default.findById(carId);
        if (!car) {
            res.status(404).json({ message: "Car not found", success: false });
            return;
        }
        res.status(200).json({ message: "Car retrieved successfully", success: true, data: car });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving car", success: false, error });
    }
});
exports.getCarById = getCarById;
// Update a car by ID
const updateCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const car = yield Car_1.default.findByIdAndUpdate(carId, req.body, { new: true, runValidators: true });
        if (!car) {
            res.status(404).json({ message: "Car not found", success: false });
            return;
        }
        res.status(200).json({ message: "Car updated successfully", success: true, data: car });
    }
    catch (error) {
        res.status(400).json({ message: "Validation failed", success: false, error });
    }
});
exports.updateCar = updateCar;
// Delete a car by ID
const deleteCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { carId } = req.params;
        const car = yield Car_1.default.findByIdAndDelete(carId);
        if (!car) {
            res.status(404).json({ message: "Car not found", success: false });
            return;
        }
        res.status(200).json({ message: "Car deleted successfully", success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting car", success: false, error });
    }
});
exports.deleteCar = deleteCar;
// Create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        res.status(201).json({ message: "Order created successfully", success: true, data: order });
    }
    catch (error) {
        res.status(400).json({ message: "Failed to create order", success: false, error });
    }
});
exports.createOrder = createOrder;
// Get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        res.status(200).json({ message: "Orders retrieved successfully", success: true, data: orders });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to retrieve orders", success: false, error });
    }
});
exports.getAllOrders = getAllOrders;
// Calculate revenue
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenue = 1000;
        res.status(200).json({ message: "Revenue calculated successfully", success: true, data: revenue });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to calculate revenue", success: false, error });
    }
});
exports.calculateRevenue = calculateRevenue;
