import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import noteRouter from './routes/noteRoutes.js'
import authRouter from './routes/userRoutes.js'
const app=express();

app.use(cors());
app.use(express.json());
connectDB();
const PORT=process.env.PORT;
app.use(cors({
  origin: "http://localhost:5173",  // frontend URL
  credentials: true
}));

app.get('/',()=>{console.log("API is working ")});
app.use("/api/notes",noteRouter);
app.use("/api/auth",authRouter);

app.listen((PORT),()=>{
     console.log("server is running on PORT",+PORT)
});