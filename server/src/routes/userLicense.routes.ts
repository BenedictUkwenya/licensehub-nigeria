import { Router } from 'express';
import { protect } from '../middleware/auth.middleware'; // We need this to protect routes
import { getUserLicenses, createLicense } from '../controllers/userLicense.controller';

const router = Router();

// Apply the 'protect' middleware to all routes in this file
// Any request to these endpoints MUST include a valid JWT token
router.use(protect);

router.route('/')
    .get(getUserLicenses)
    .post(createLicense);

// Later we could add routes for a single license like:
// router.route('/:id').get(getLicenseById).put(updateLicense).delete(deleteLicense);

export default router;