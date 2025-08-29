import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { databaseService } from '../services/database.service';
import { LoginRequest, RegisterRequest, AuthResponse } from '@shared/auth';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export const handleLoginNeon: RequestHandler = async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      } as AuthResponse);
    }

    // Find user by email
    const user = await databaseService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as AuthResponse);
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      } as AuthResponse);
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
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

export const handleRegisterNeon: RequestHandler = async (req, res) => {
  try {
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
    const userExists = await databaseService.userExists(email, username);
    if (userExists) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      } as AuthResponse);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await databaseService.createUser(username, email, hashedPassword, role);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, role: newUser.role },
      JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser.id.toString(),
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.created_at
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

export const handleProfileNeon: RequestHandler = async (req: any, res) => {
  try {
    const user = await databaseService.findUserById(req.user.userId);
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
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.created_at
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

// Initialize database on first import
(async () => {
  try {
    await databaseService.initializeUserTable();
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
})();
