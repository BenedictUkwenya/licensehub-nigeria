import { Schema, model, Document } from 'mongoose';

// Interface defining the document structure
export interface IUserLicense extends Document {
    user: Schema.Types.ObjectId; // A reference to the User who owns this license
    licenseType: string;         // e.g., "Driver's License", "International Passport"
    licenseNumber: string;
    issueDate?: Date;
    expiryDate?: Date;
    status: 'active' | 'expiring_soon' | 'expired';
    // We will add fileUrl later when we handle file uploads
}

// The Mongoose Schema that enforces the structure
const UserLicenseSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId, // This is how we link to another collection
        ref: 'User',                 // The model to link to
        required: true,
    },
    licenseType: {
        type: String,
        required: [true, 'Please specify the type of license'],
    },
    licenseNumber: {
        type: String,
        required: [true, 'Please enter the license number'],
    },
    issueDate: {
        type: Date,
    },
    expiryDate: {
        type: Date,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

UserLicenseSchema.virtual('status').get(function(this: IUserLicense) {
    if (!this.expiryDate) {
        return 'active'; // If there's no expiry date, it's always active
    }

    const now = new Date();
    const expiry = new Date(this.expiryDate);
    const daysUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 3600 * 24);

    if (daysUntilExpiry < 0) {
        return 'expired';
    }
    // Let's define "expiring soon" as within the next 90 days
    if (daysUntilExpiry <= 90) {
        return 'expiring_soon';
    }

    return 'active';
});

// Create and export the Mongoose model
export default model<IUserLicense>('UserLicense', UserLicenseSchema);