# Book Store API

A RESTful API built using **Express**, **TypeScript**, and **MongoDB** to manage a book store with functionalities for adding books, updating inventory, placing orders, and calculating revenue.

## Features

- **Product Management**: Add, retrieve, update, and delete books.
- **Order Management**: Place orders and manage stock.
- **Revenue Calculation**: Calculate total revenue from all orders.
- **Error Handling**: Handles validation errors, not found resources, and insufficient stock.
- **MongoDB Integration**: Uses MongoDB to store book and order data, ensuring data integrity with Mongoose schema validation.

## API Endpoints

### 1. Create a Book

- **Endpoint**: `POST /api/products`
- **Request Body**:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 10,
    "category": "Fiction",
    "description": "A story about the American dream.",
    "quantity": 100,
    "inStock": true
  }
  ```
- **Response**: Book details and success message.

### 2. Get All Books

- **Endpoint**: `GET /api/products`
- **Query**: `?searchTerm=category` (e.g., `/api/products?searchTerm=Fiction`)
- **Response**: List of books matching the search term.

### 3. Get a Specific Book

- **Endpoint**: `GET /api/products/:productId`
- **Response**: Details of the requested book.

### 4. Update a Book

- **Endpoint**: `PUT /api/products/:productId`
- **Request Body**:
  ```json
  {
    "price": 15,
    "quantity": 25
  }
  ```
- **Response**: Updated book details and success message.

### 5. Delete a Book

- **Endpoint**: `DELETE /api/products/:productId`
- **Response**: Success message confirming deletion.

### 6. Order a Book

- **Endpoint**: `POST /api/orders`
- **Request Body**:
  ```json
  {
    "email": "customer@example.com",
    "product": "productId",
    "quantity": 2,
    "totalPrice": 30
  }
  ```
- **Response**: Order details and success message.

### 7. Calculate Revenue from Orders

- **Endpoint**: `GET /api/orders/revenue`
- **Response**: Total revenue calculated from all orders.

## Technologies Used

- **Express**: Web framework for Node.js.
- **TypeScript**: Strongly typed JavaScript for better development experience.
- **MongoDB**: NoSQL database for storing books and orders.
- **Mongoose**: ODM for MongoDB to define models and interact with the database.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd book-store-api or directory path
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:

   ```env
   MONGODB_URI=<your_mongodb_connection_string>
   ```

4. Run the application:

   ```bash
   npm run start:dev
   ```

5. Access the API on `http://localhost:5000`.

## Error Handling

- **Validation Errors**: Return specific error messages for validation failures (e.g., invalid email, insufficient stock).
- **Resource Not Found**: Return a `404` error if the book or order is not found.
- **Insufficient Stock**: Return a `400` error for insufficient stock during order placement.
