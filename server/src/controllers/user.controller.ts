// /server/src/controllers/user.controller.ts

import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken'; 

const generateToken = (id: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT_SECRET is not defined!");
        process.exit(1);
    }
    return jwt.sign({ id }, secret, {
        expiresIn: '30d', // Token expires in 30 days
    });
};
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // 1. Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // 2. Create new user (password will be hashed by the pre-save hook)
        const newUser = new User({
            name,
            email,
            password_hash: password // We assign the plain password here, the model hashes it
        });

        await newUser.save();

        // 3. Respond (Don't send the password back!)
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            message: "User registered successfully!"
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Server error during user registration.' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Check for user
        const user = await User.findOne({ email }) as { _id: string, comparePassword: (password: string) => Promise<boolean>, name: string, email: string, role: string };

        // 2. If user exists and password is correct
        if (user && (await user.comparePassword(password))) {
            // 3. Send back user data and a token
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id.toString()),
            });
        } else {
            // 4. If authentication fails
            res.status(401).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};