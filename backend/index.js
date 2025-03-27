import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';

dotenv.config();

// setup cloudinary
cloudinary.v2.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api,
    api_secret: process.env.Cloud_Secret,   
})

const app = express();

const port = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cookieParser());

// importing routes 
import userRoutes from './routes/userRoutes.js';
import trailRoutes from './routes/trailRoutes.js';

// using routes
app.use("/api/user", userRoutes);
app.use("/api/trail", trailRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`);
    connectDb();
});