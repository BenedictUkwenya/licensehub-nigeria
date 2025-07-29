import { Request, Response } from 'express';
import UserLicense from '../models/userLicense.model';

// The getUserLicenses function is likely fine, but let's review it for safety
export const getUserLicenses = async (req: Request, res: Response) => {
    try {
        const licenses = await UserLicense.find({ user: req.user?._id }).sort({ createdAt: -1 });
        res.status(200).json(licenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

/**
 * @desc    Create a new license for the logged-in user
 * @route   POST /api/licenses
 * @access  Private
 */
export const createLicense = async (req: Request, res: Response) => {
    try {
        const { licenseType, licenseNumber, issueDate, expiryDate } = req.body;

        if (!licenseType || !licenseNumber) {
            return res.status(400).json({ message: 'License type and number are required' });
        }

        const newLicense = new UserLicense({
            user: req.user?._id,
            licenseType,
            licenseNumber,
            issueDate,
            expiryDate,
        });

        const savedLicense = await newLicense.save();

        // --- THIS IS THE FIX ---
        // Instead of returning the 'savedLicense' object directly,
        // we find it again by its ID. This ensures all virtual properties are populated.
        const populatedLicense = await UserLicense.findById(savedLicense._id);

        res.status(201).json(populatedLicense);
        // ------------------------

    } catch (error) {
        console.error("Error in createLicense controller:", error);
        res.status(500).json({ message: 'Server Error', error });
    }
};