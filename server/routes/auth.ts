import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import connectDB from '../lib/database';
import { LoginRequest, RegisterRequest, AuthResponse } from '@shared/auth';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      } as AuthResponse);
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as AuthResponse);
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as AuthResponse);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    } as AuthResponse);

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as AuthResponse);
  }
};

export const handleRegister: RequestHandler = async (req, res) => {
  try {
    await connectDB();
    
    const { username, email, password, role }: RegisterRequest = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      } as AuthResponse);
    }

    if (!['collaborator', 'guest'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Role must be either collaborator or guest'
      } as AuthResponse);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      } as AuthResponse);
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
      role
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
      },
      token
    } as AuthResponse);

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as AuthResponse);
  }
};

export const handleProfile: RequestHandler = async (req: any, res) => {
  try {
    await connectDB();
    
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      } as AuthResponse);
    }

    return res.json({
      success: true,
      message: 'Profile retrieved successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    } as AuthResponse);

  } catch (error) {
    console.error('Profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    } as AuthResponse);
  }
};
