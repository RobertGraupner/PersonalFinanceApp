import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Missing MONGODB_URI in environment variables');
}

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return;
    
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
}