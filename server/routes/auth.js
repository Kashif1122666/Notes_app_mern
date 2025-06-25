import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

export default router;
