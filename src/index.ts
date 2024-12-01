import express from 'express';
import mongoose from 'mongoose';
import carRoutes from './routes/carRoutes';
import orderRoutes from './routes/orderRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI: string = process.env.DB_URI as string;

if (!mongoURI) {
  console.error("MongoDB URI is not defined in the environment variables!");
  process.exit(1);
}

app.use(express.json());

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
    process.exit(1);
  });

app.use('/api/cars', carRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
