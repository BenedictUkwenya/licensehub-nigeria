// /server/src/middleware/auth.middleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

// Extend Express's Request interface to include our 'user' property
declare global {
    namespace Express {
        interface Request {
            user?: IUser | null;
        }
    }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // Check for token in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get token from header
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token
            const secret = process.env.JWT_SECRET!;
            const decoded = jwt.verify(token, secret) as JwtPayload;

            // 3. Get user from the token's ID and attach to request object
            // We exclude the password_hash when fetching the user
            req.user = await User.findById(decoded.id).select('-password_hash');

            if (!req.user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next(); // Proceed to the next middleware/controller
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};