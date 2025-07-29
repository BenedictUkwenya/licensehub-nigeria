// /server/src/server.ts

import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; // Import mongoose
import userRoutes from './routes/user.routes'; 
import serviceRoutes from './routes/service.routes';
import licenseRoutes from './routes/userLicense.routes';
import applicationRoutes from './routes/application.routes'; 
// For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routes ---
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/applications', applicationRoutes);
// --- Database Connection ---
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error('FATAL ERROR: MONGO_URI is not defined.');
    process.exit(1); // Exit the application if DB connection string is not found
}

mongoose.connect(mongoUri)
    .then(() => console.log('✅ MongoDB connection established successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


// A simple test route
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP', message: 'LicenseHub API is running!' });
});

app.listen(port, () => {
    // More generic message for production
    console.log(`Server is running on port ${port}`);
});