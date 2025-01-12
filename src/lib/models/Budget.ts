import mongoose, { Model } from 'mongoose';
import { TransactionCategory } from './Transaction';

export interface IBudget {
  _id: string;
  userId: string;
  category: TransactionCategory;
  maximum: number;
  theme: string;
}

const budgetSchema = new mongoose.Schema<IBudget>(
  {
    userId: {
      type: String,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Entertainment',
        'Bills',
        'Groceries',
        'Dining Out',
        'Transportation',
        'Personal Care',
        'Education',
        'Lifestyle',
        'Shopping',
        'General',
      ],
    },
    maximum: {
      type: Number,
      required: true,
      min: 0,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Budget =
  (mongoose.models.Budget as Model<IBudget>) ||
  mongoose.model<IBudget>('Budget', budgetSchema);
