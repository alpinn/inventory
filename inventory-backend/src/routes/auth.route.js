import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').optional().isIn(['admin', 'staff']).withMessage('Invalid role'),
], register);

router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
], login);

export default router;