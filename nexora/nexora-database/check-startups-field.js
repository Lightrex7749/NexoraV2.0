import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nexora';

const run = async () => {
  const conn = await mongoose.connect(uri);
  const docs = await conn.connection.collection('startups').find({}).project({ name: 1, feature: 1, _id: 0 }).toArray();
  console.log(JSON.stringify(docs, null, 2));
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
