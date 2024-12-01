import { Request, Response } from 'express';
import Order from '../models/Order';
import Car from '../models/Car';

// Create Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, car, productId, quantity, totalPrice } = req.body;

    // Validate productId
    if (!productId) {
      res.status(400).json({ message: "Product ID is required", success: false });
      return;
    }

    // Find the car by ID
    const carDoc = await Car.findById(car);
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
    await carDoc.save();

    // Create order
    const order = await Order.create({ email, car, productId, quantity, totalPrice });

    res.status(201).json({ message: "Order created successfully", success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating order", success: false, error: error.message });
  }
};

// Get All Orders
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().populate('car');
    res.status(200).json({ message: "Orders retrieved successfully", success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving orders", success: false, error: error.message });
  }
};

// Calculate Revenue
export const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const revenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } },
    ]);
    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      data: revenue[0]?.totalRevenue || 0,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error calculating revenue", success: false, error: error.message });
  }
};
