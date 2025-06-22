
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';

const PORT = 8000;
dotenv.config();

async function  connectToMongodb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('Connected to Mongodb');
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    })    
  } catch (error) {
    console.log(error);
    
  }
}

connectToMongodb()
