import connectDB from './config/db.js';

const checkDB = async () => {
  const conn = await connectDB();
  if (!conn) {
    console.log('Database status: disconnected');
    process.exit(1);
  }

  console.log('Database status:', conn.readyState === 1 ? 'connected' : 'not connected');
  console.log('Database name:', conn.name);
  await conn.close();
};

checkDB().catch((error) => {
  console.error(error);
  process.exit(1);
});
