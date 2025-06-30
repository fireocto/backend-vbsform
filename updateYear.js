import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function updateMissingYears() {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log('Connected to MongoDB');

    const result = await mongoose.connection.db.collection('forms').updateMany(
      { year: { $exists: false } },    // filter: docs missing 'year'
      { $set: { year: 2024 } }         // update: set year to 2024
    );

    console.log(`Matched ${result.matchedCount} documents`);
    console.log(`Modified ${result.modifiedCount} documents`);

    await mongoose.disconnect();
    console.log('Disconnected');
  } catch (err) {
    console.error('Error updating documents:', err);
  }
}

updateMissingYears();