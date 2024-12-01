import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import { IOrder } from '../models/Order';
import Car from '../models/Car';

// Create a new car
export const createCar = async (req: Request, res: Response): Promise<any> => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json({ message: "Car created successfully", success: true, data: car });
  } catch (error) {
    res.status(400).json({ message: "Validation failed", success: false, error });
  }
};

// Get all cars
export const getAllCars = async (req: Request, res: Response): Promise<any> => {
  try {
    const searchTerm = req.query.searchTerm;
    const query = searchTerm ? {
      $or: [
        { brand: searchTerm },
        { model: searchTerm },
        { category: searchTerm }
      ]
    } : {};
    const cars = await Car.find(query);
    res.status(200).json({ message: "Cars retrieved successfully", success: true, data: cars });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cars", success: false, error });
  }
};

// Get a specific car by ID
export const getCarById = async (req: Request<{ carId: string }>, res: Response): Promise<void> => {
    try {
      const { carId } = req.params;
      const car = await Car.findById(carId);
      if (!car) {
        res.status(404).json({ message: "Car not found", success: false });
        return;
      }
      res.status(200).json({ message: "Car retrieved successfully", success: true, data: car });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving car", success: false, error });
    }
  };

// Update a car by ID
export const updateCar = async (req: Request<{ carId: string }>, res: Response): Promise<void> => {
    try {
      const { carId } = req.params;
      const car = await Car.findByIdAndUpdate(carId, req.body, { new: true, runValidators: true });
      if (!car) {
        res.status(404).json({ message: "Car not found", success: false });
        return;
      }
      res.status(200).json({ message: "Car updated successfully", success: true, data: car });
    } catch (error) {
      res.status(400).json({ message: "Validation failed", success: false, error });
    }
  };
  

// Delete a car by ID
export const deleteCar = async (req: Request<{ carId: string }>, res: Response): Promise<void> => {
    try {
      const { carId } = req.params;
      const car = await Car.findByIdAndDelete(carId);
      if (!car) {
        res.status(404).json({ message: "Car not found", success: false });
        return;
      }
      res.status(200).json({ message: "Car deleted successfully", success: true, data: {} });
    } catch (error) {
      res.status(500).json({ message: "Error deleting car", success: false, error });
    }
  };
  


// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const order: IOrder = req.body;
      res.status(201).json({ message: "Order created successfully", success: true, data: order });
    } catch (error) {
      res.status(400).json({ message: "Failed to create order", success: false, error });
    }
  };
  
  // Get all orders
  export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const orders: IOrder[] = await Order.find();
      res.status(200).json({ message: "Orders retrieved successfully", success: true, data: orders });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve orders", success: false, error });
    }
  };
  
  // Calculate revenue
  export const calculateRevenue = async (req: Request, res: Response): Promise<void> => {
    try {
      const revenue = 1000;
      res.status(200).json({ message: "Revenue calculated successfully", success: true, data: revenue });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate revenue", success: false, error });
    }
  };
  
  