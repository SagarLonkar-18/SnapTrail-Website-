import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cookieParser());

// importing routes 
import userRoutes from './routes/userRoutes.js';

// using routes
app.use("/api/user", userRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
    connectDb();
});