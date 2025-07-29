// /server/src/routes/user.routes.ts

import { Router } from 'express';
import { getUserProfile, loginUser, registerUser } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);
router.post('/login', loginUser); 
router.get('/profile', protect, getUserProfile);  

export default router;