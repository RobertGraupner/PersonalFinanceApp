import mongoose, { Model } from 'mongoose';

interface IPot {
  userId: string;
  name: string;
  target: number;
  total: number;
  theme: string;
}

const potSchema = new mongoose.Schema<IPot>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  target: {
    type: Number,
    required: true,
    min: 0
  },
  total: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  theme: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Pot = (mongoose.models.Pot as Model<IPot>) || 
  mongoose.model<IPot>('Pot', potSchema);