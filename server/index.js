import express from 'express'
import cors from 'cors'
import connectDB from './db/db.js';
import authRouter from './routes/auth.js'
import dotenv from 'dotenv';
dotenv.config();

const app= express();
app.use(cors())
app.use(express.json()); 
app.use('/api/auth',authRouter)


app.listen(5000,() =>{
    connectDB();
    console.log("server is running")
})


