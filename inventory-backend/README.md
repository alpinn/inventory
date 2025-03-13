# Inventory Management System

A simple inventory management system with role-based access control (RBAC) built using Node.js, Express, and PostgreSQL.

## Features

- User Authentication with JWT
- Role-Based Access Control (Admin/Staff)
- CRUD Operations for Inventory Management
- Input Validation
- PostgreSQL Database Integration

## Role Permissions

- **Admin**: Full access (Create, Read, Update, Delete inventory items)
- **Staff**: Read-only access (View inventory items)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd inventory-backend
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
    "username": "string",
    "password": "string (min 6 characters)",
    "role": "admin" | "staff"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
    "username": "string",
    "password": "string"
}
```

### Inventory Management

All inventory endpoints require authentication via JWT token in the Authorization header:
```http
Authorization: Bearer <your_jwt_token>
```

#### Get All Inventory Items
```http
GET /inventory
```
- Accessible by both admin and staff

#### Create Inventory Item (Admin Only)
```http
POST /inventory
Content-Type: application/json

{
    "name": "string",
    "quantity": "number (min 0)",
    "price": "number (min 0)"
}
```

#### Update Inventory Item (Admin Only)
```http
PUT /inventory/:id
Content-Type: application/json

{
    "name": "string",
    "quantity": "number (min 0)",
    "price": "number (min 0)"
}
```

#### Delete Inventory Item (Admin Only)
```http
DELETE /inventory/:id
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200`: Success
- `201`: Resource created
- `400`: Bad request / Invalid input
- `401`: Unauthorized (missing or invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Resource not found
- `500`: Server error

## Security Features

- Password hashing
- JWT-based authentication
- Role-based access control
- Input validation
- Protected routes middleware