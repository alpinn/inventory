import express from 'express';
import { body } from 'express-validator';
import {
  getAllInventory,
  createInventory,
  updateInventory,
  deleteInventory,
} from '../controllers/inventory.controller.js';
import authenticateToken from '../middlewares/auth.middleware.js';
import roleMiddleware from '../middlewares/role.middleware.js';

const router = express.Router();

router.use(authenticateToken);
router.get('/', getAllInventory);
router.post('/', [
  roleMiddleware.isAdmin,
  body('name').notEmpty().withMessage('Name is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive number'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
], createInventory);

router.put('/:id', [
  roleMiddleware.isAdmin,
  body('name').notEmpty().withMessage('Name is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive number'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
], updateInventory);

router.delete('/:id', roleMiddleware.isAdmin, deleteInventory);

export default router; 