import express from 'express';
import "dotenv/config";
import authRouthes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRouthes from './routes/user.route.js';
import chatRouthes from './routes/chat.route.js';
 
const app = express();
const PORT = process.env.PORT ;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/",authRouthes);
app.use("/api/users/", userRouthes);
app.use("/api/chat/", chatRouthes);


app.listen(PORT, () => {
  console.log('Server is running on ${PORT}');
  connectDB();
});