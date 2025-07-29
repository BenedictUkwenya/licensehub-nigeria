import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { getUserApplications, createApplication } from '../controllers/application.controller';

const router = Router();

// All these routes are protected and require a logged-in user
router.use(protect);

router.route('/')
    .get(getUserApplications)
    .post(createApplication);

export default router;