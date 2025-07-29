import { Request, Response } from 'express';
import Application from '../models/application.model';

// @desc    Get all applications for the logged-in user
// @route   GET /api/applications
export const getUserApplications = async (req: Request, res: Response) => {
    try {
        const applications = await Application.find({ user: req.user?._id }).sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a new business application
// @route   POST /api/applications
export const createApplication = async (req: Request, res: Response) => {
    try {
        const { serviceId, formData } = req.body;

        if (!serviceId || !formData) {
            return res.status(400).json({ message: 'Service ID and form data are required.' });
        }

        const newApplication = new Application({
            user: req.user?._id,
            service: serviceId,
            formData: formData,
        });

        const createdApplication = await newApplication.save();
        res.status(201).json(createdApplication);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};