# Car Store B4A2V3

## Objective

I developed an Express application using TypeScript, integrating MongoDB with Mongoose to manage a Car Store. I ensured data integrity through Mongoose schema validation.

## Project Setup

I followed these steps to set up the project:

1. Created an Express project with TypeScript.
2. Configured a MongoDB database to store Cars and Orders.
3. Utilized Mongoose for schema definition and data operations.
4. Implemented CRUD operations for both Cars and Orders.

## Models

### Car Model

I designed the Car model to define the structure of a car entity in the system:

| Field         | Type      | Description                                                                       |
| ------------- | --------- | --------------------------------------------------------------------------------- |
| `brand`       | `string`  | The brand or manufacturer of the car (e.g., Toyota, BMW, Ford).                   |
| `model`       | `string`  | The model of the car (e.g., Camry, 3 Series, Focus).                              |
| `year`        | `number`  | The year of manufacture.                                                          |
| `price`       | `number`  | Price of the car.                                                                 |
| `category`    | `string`  | The type of car. Must be one of: `Sedan`, `SUV`, `Truck`, `Coupe`, `Convertible`. |
| `description` | `string`  | A brief description of the car's features.                                        |
| `quantity`    | `number`  | Quantity of the car available.                                                    |
| `inStock`     | `boolean` | Indicates if the car is in stock.                                                 |

### Order Model

I designed the Order model to define the structure of an order entity in the system:

| Field        | Type       | Description                                                    |
| ------------ | ---------- | -------------------------------------------------------------- |
| `email`      | `string`   | The email address of the customer.                             |
| `car`        | `ObjectId` | The car ordered. Refers to the `_id` of a car in the database. |
| `quantity`   | `number`   | The quantity of the ordered car.                               |
| `totalPrice` | `number`   | The total price of the order (`car price * quantity`).         |

## Generic Error Response

I standardized error handling by ensuring all errors follow this structure:

| Field     | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| `message` | A brief error message explaining what went wrong.                            |
| `success` | Set to `false` for error responses.                                          |
| `error`   | The error message or object (e.g., "ValidationError", "Resource not found"). |
| `stack`   | The stack trace showing where the error occurred in the code.                |

---

## Features

- **Car Management**: I implemented CRUD operations to manage car inventory, including categories, stock, and pricing.
- **Order Management**: I enabled users to create, view, and manage orders for cars.
- **Validation**: I ensured data integrity through Mongoose schema validation.
- **Error Handling**: I provided detailed and consistent error responses.

## Usage

### Endpoints

1. **Cars**:

   - `POST /cars` - Add a new car.
   - `GET /cars` - Retrieve all cars.
   - `GET /cars/:id` - Retrieve a specific car.
   - `PUT /cars/:id` - Update a car.
   - `DELETE /cars/:id` - Delete a car.

2. **Orders**:
   - `POST /orders` - Create a new order.
   - `GET /orders` - Retrieve all orders.
   - `GET /orders/:id` - Retrieve a specific order.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **TypeScript**: Strongly typed language for improved developer experience

## Running the Project

Here are the steps I followed to run the project:

1. Installed dependencies:
   ```bash
   npm install
   ```
2. Compiled TypeScript:
   ```bash
   npm run build
   ```
3. Started the application:
   ```bash
   npm start
   ```
4. Used an API testing tool (e.g., Postman) to interact with the endpoints.

## Future Enhancements

- I plan to add user authentication and authorization.
- I aim to implement advanced filtering and sorting for car inventory.
- I intend to enhance the order creation process with dynamic car pricing and availability checks.
