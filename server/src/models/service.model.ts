// /server/src/models/service.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IService extends Document {
    name: string;
    description: string;
    category: string;
    keywords: string[];
}

const ServiceSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    keywords: [{ type: String, required: true }],
});

export default model<IService>('Service', ServiceSchema);