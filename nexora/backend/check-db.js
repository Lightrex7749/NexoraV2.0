import connectDB from './config/db.js';

const checkDB = async () => {
  const conn = await connectDB();
  console.log('Connection state:', conn.readyState);
  console.log('Database name:', conn.name);
  await conn.close();
};

checkDB().catch((err) => {
  console.error(err);
  process.exit(1);
});
