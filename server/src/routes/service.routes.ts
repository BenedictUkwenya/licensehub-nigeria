// /server/src/routes/service.routes.ts

import { Router } from 'express';
import { getRecommendations } from '../controllers/service.controller';

const router = Router();

// @route   POST /api/services/recommend
// @desc    Get license recommendations based on a description
// @access  Public
router.post('/recommend', getRecommendations);

export default router;