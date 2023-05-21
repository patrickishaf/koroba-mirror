import mongoose from 'mongoose';
import app from './app';
import { config as exposeEnvironmentVariables } from 'dotenv';

exposeEnvironmentVariables();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  mongoose.connect(process.env.DB_URL);
  console.log('server is listening on port,', PORT);
})