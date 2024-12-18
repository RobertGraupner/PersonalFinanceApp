import mongoose, { Model } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  name: string;
  balance: {
    current: number;
    income: number;
    expenses: number;
  };
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  balance: {
    current: {
      type: Number,
      required: true,
      default: 0
    },
    income: {
      type: Number,
      required: true,
      default: 0
    },
    expenses: {
      type: Number,
      required: true,
      default: 0
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

export const User = (mongoose.models.User as Model<IUser>) || 
  mongoose.model<IUser>('User', userSchema);