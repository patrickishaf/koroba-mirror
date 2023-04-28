import mongoose from 'mongoose';
import app from './app';

app.listen(3000, () => {
  mongoose.connect(process.env.DB_URL);
  console.log('server is listening on port 3000');
})