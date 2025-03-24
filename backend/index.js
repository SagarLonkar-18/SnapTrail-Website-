import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';

dotenv.config();

const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());

// importing routes 
import userRoutes from './routes/userRoutes.js';

// using routes
app.use("/api/user", userRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port https://localhost:${port}`);
    connectDb();
});