import * as mongoose from 'mongoose';

const DB_NAME = process.env.DB_NAME;
export default mongoose.connect(DB_NAME, { keepAlive: true, keepAliveInitialDelay: 300000 });
