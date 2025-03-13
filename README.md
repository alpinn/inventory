# Inventory Management System

A full-stack inventory management system with role-based access control (RBAC) built using modern web technologies.

## Features

### Authentication & Authorization
- User registration with role selection (Admin/Staff)
- Secure login with JWT authentication
- Role-based access control
- Protected routes
- Automatic token management

### Inventory Management
- Complete CRUD operations for inventory items
- Real-time inventory updates
- Role-based permissions:
  - Admin: Full access (Create, Read, Update, Delete)
  - Staff: Read-only access
- Responsive grid layout for inventory items
- Confirmation dialogs for destructive actions

### User Interface
- Modern, responsive design
- Mobile-first approach
- Loading states and animations
- Form validation
- Error handling
- Toast notifications
- Modal dialogs
- Reusable UI components

## Tech Stack

### Frontend
- React
- React Router DOM
- React Hook Form
- Yup (form validation)
- Tailwind CSS
- React Hot Toast
- Axios

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JSON Web Tokens (JWT)
- bcryptjs
- Express Validator

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Project Structure

```
inventory/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/      # React context providers
│   │   ├── pages/        # Page components
│   │   └── services/     # API service layer
│   └── package.json
│
└── backend/               # Node.js backend application
    ├── src/
    │   ├── config/       # Database configuration
    │   ├── controllers/  # Route controllers
    │   ├── middleware/   # Express middleware
    │   ├── models/       # Sequelize models
    │   └── routes/       # Express routes
    └── package.json
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   DB_NAME=inventory_db
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_HOST=localhost
   JWT_SECRET=your_jwt_secret
   ```

4. Initialize the database:
   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Register a new account (you can choose between Admin and Staff roles)
2. Log in with your credentials
3. If you're an Admin:
   - View all inventory items
   - Add new items
   - Edit existing items
   - Delete items
4. If you're a Staff member:
   - View all inventory items

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Inventory
- `GET /inventory` - Get all inventory items
- `POST /inventory` - Create new item (Admin only)
- `PUT /inventory/:id` - Update item (Admin only)
- `DELETE /inventory/:id` - Delete item (Admin only)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/) 