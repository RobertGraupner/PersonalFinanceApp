import { connect } from 'mongoose';
import { loadEnvConfig } from '@next/env';
import { User } from '@/lib/models/User';
import { Transaction } from '@/lib/models/Transaction';
import { Budget } from '@/lib/models/Budget';
import { Pot } from '@/lib/models/Pot';
import bcrypt from 'bcryptjs';
import data from '@/data/example_data.json';

async function seed() {
  loadEnvConfig(process.cwd());
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }

    // Connect to the database
    await connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Transaction.deleteMany({});
    await Budget.deleteMany({});
    await Pot.deleteMany({});
    console.log('🧹 Cleared old data');

    // Create a test user
    const hashedPassword = await bcrypt.hash('test123', 10);
    const user = await User.create({
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
      balance: {
        current: data.balance.current,
        income: data.balance.income,
        expenses: data.balance.expenses
      }
    });
    console.log('👤 Created test user');

    // Add transactions
    const transactions = data.transactions.map(transaction => ({
      ...transaction,
      userId: user._id.toString(),
      date: new Date(transaction.date)
    }));
    await Transaction.insertMany(transactions);
    console.log(`💰 Added ${transactions.length} transactions`);

    // Add budgets
    const budgets = data.budgets.map(budget => ({
      ...budget,
      userId: user._id.toString(),
      maximum: Number(budget.maximum)
    }));
    await Budget.insertMany(budgets);
    console.log(`📊 Added ${budgets.length} budgets`);

    // Add savings goals
    const pots = data.pots.map(pot => ({
      ...pot,
      userId: user._id.toString(),
      target: Number(pot.target),
      total: Number(pot.total)
    }));
    await Pot.insertMany(pots);
    
    console.log(`🏺 Added ${pots.length} savings goals`);

    console.log('✨ Successfully seeded data!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

seed();