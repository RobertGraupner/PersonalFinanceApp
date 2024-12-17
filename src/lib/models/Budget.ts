import mongoose, { Model } from 'mongoose';
import { TransactionCategory } from './Transaction';

interface IBudget {
  userId: string;
  category: TransactionCategory;
  maximum: number;
  theme: string;
}

const budgetSchema = new mongoose.Schema<IBudget>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
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
      'General'
    ]
  },
  maximum: {
    type: Number,
    required: true,
    min: 0
  },
  theme: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const Budget = (mongoose.models.Budget as Model<IBudget>) || 
  mongoose.model<IBudget>('Budget', budgetSchema);