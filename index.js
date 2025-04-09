import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import userroutes from './routes/userroutes.js';
import todoroutes from './routes/todoroutes.js';
import connectTOMongoDB from "./config/dbconnect.js";

dotenv.config();
connectTOMongoDB();

const app = express();

app.use(express.json());
app.use(cors({
    // origin: 'http://localhost:3000', // Adjust based on frontend deployment
    // credentials: true
}));

// Configure session middleware
app.use(session({
    secret: 'your_secret_key',  // Use a secure key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour session
}));

app.use('/api/user', userroutes);
app.use('/api/todo', todoroutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
