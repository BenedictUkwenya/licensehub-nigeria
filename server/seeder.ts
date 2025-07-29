// /server/seeder.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { services } from './data/services';
import Service from './src/models/service.model';

dotenv.config();

const importData = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            console.error('MONGO_URI not found!');
            process.exit(1);
        }
        await mongoose.connect(mongoUri);

        await Service.deleteMany();
        await Service.insertMany(services);

        console.log('✅ Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

importData();