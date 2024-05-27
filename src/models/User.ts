import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  lastVisit: Date;
  credits: number;
  prizes: string[];
}

const UserSchema = new Schema({
  lastVisit: { type: Date, required: true },
  credits: { type: Number, required: true },
  prizes: [],
});



export const User = model<IUser>('User', UserSchema);