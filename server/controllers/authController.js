import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';




export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: 'Wrong password' });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user: { username: user.username, email: user.email } });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'User already exists' });
  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hash });
  await newUser.save();
  res.status(201).json({ message: 'Registered successfully' });
};