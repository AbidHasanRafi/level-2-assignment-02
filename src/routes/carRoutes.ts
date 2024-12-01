import { Router } from 'express';
import { createCar, getAllCars, getCarById, updateCar, deleteCar } from '../controllers/carController';

const router = Router();

router.post('/', createCar);
router.get('/', getAllCars);
router.get('/:carId', getCarById);
router.put('/:carId', updateCar);
router.delete('/:carId', deleteCar);

export default router;