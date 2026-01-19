import mongoose from 'mongoose';
import {ENV} from './env.js';


export const connectDB = async () => {
  try {
    if(!ENV.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    await mongoose.connect(ENV.DATABASE_URL); 
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};