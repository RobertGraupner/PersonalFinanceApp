import mongoose, { Model } from 'mongoose';

export type TransactionCategory = 
  | 'Entertainment'
  | 'Bills' 
  | 'Groceries'
  | 'Dining Out'
  | 'Transportation'
  | 'Personal Care'
  | 'Education'
  | 'Lifestyle'
  | 'Shopping'
  | 'General';

export interface ITransaction {
  userId: string;
  avatar: string;
  name: string;
  category: TransactionCategory;
  date: Date;
  amount: number;
  recurring: boolean;
}

const transactionSchema = new mongoose.Schema<ITransaction>({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  avatar: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
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
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  recurring: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  versionKey: false
});

// Indexes for efficient searching and sorting
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });
transactionSchema.index({ userId: 1, name: 'text' });

export const Transaction = (mongoose.models.Transaction as Model<ITransaction>) || 
  mongoose.model<ITransaction>('Transaction', transactionSchema);