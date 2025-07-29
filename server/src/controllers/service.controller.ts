// /server/src/controllers/service.controller.ts

import { Request, Response } from 'express';
import Service from '../models/service.model';

// In /server/src/controllers/service.controller.ts
export const getRecommendations = async (req: Request, res: Response) => {
    try {
        console.log("--- Recommendation request received ---");
        const allServices = await Service.find({});
        console.log(`Found ${allServices.length} total services.`);
        res.status(200).json(allServices);
    } catch (error) {
        console.error("Error in getRecommendations:", error);
        res.status(500).json({ message: 'Server Error' });
    }
};