// /server/src/models/user.model.ts

import { Schema, model, Document } from 'mongoose'; 
import bcrypt from 'bcryptjs';

// TypeScript interface for a User document
export interface IUser extends Document {
    name: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin';
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Mongoose middleware to hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password_hash')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password_hash = await bcrypt.hash(this.password_hash, salt);
    next();
});

 
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password_hash);
};

export default model<IUser>('User', UserSchema);