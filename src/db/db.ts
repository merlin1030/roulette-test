import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const connection = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rouletteDb';
    await mongoose.connect(connection)
    console.log('Conexión a MongoDB exitosa');
  } catch (err) {
    console.error('Error trying to connect with MongoDB', err);
  }
};