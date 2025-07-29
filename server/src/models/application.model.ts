// /server/src/models/application.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IApplication extends Document {
    user: Schema.Types.ObjectId;      // Who applied
    service: Schema.Types.ObjectId;     // What they applied for
    status: 'Pending' | 'In Review' | 'Queried' | 'Approved' | 'Rejected'; // The application status
    formData: Map<string, any>;         // The data from the application form
}

const ApplicationSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    status: {
        type: String,
        enum: ['Pending', 'In Review', 'Queried', 'Approved', 'Rejected'],
        default: 'Pending',
    },
    // Using a Map allows us to store flexible, key-value data from different forms.
    formData: {
        type: Map,
        of: Schema.Types.Mixed,
        required: true,
    },
}, { timestamps: true });

// We want to automatically populate the 'service' and 'user' fields when we fetch applications
ApplicationSchema.pre(/^find/, function(this: any, next) {
    this.populate('service', 'name category'); // Populate service with its name and category
    this.populate('user', 'name email');     // Populate user with their name and email
    next();
});

export default model<IApplication>('Application', ApplicationSchema);