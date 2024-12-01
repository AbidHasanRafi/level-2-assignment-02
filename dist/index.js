"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const carRoutes_1 = __importDefault(require("./routes/carRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.DB_URI;
if (!mongoURI) {
    console.error("MongoDB URI is not defined in the environment variables!");
    process.exit(1);
}
app.use(express_1.default.json());
mongoose_1.default.connect(mongoURI)
    .then(() => {
    console.log('Connected to MongoDB Atlas');
})
    .catch(err => {
    console.error('Error connecting to MongoDB Atlas', err);
    process.exit(1);
});
app.use('/api/cars', carRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
