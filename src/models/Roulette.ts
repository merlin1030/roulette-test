import mongoose, { Document, Schema } from 'mongoose';
import { Prize } from '../interfaces/Prize';

export interface IRoulette extends Document {
  name: string;
  cost: number;
  prizes: Prize[];
}

const RouletteSchema: Schema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  prizes: []
});

export const Roulette = mongoose.model<IRoulette>('Roulette', RouletteSchema);