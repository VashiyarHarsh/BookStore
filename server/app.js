import express from 'express';
import mongoose from 'mongoose';
import bookRouter from './routers/bookRouter.js';
import userRouter from './routers/userRouter.js';
import { checkForAuthenticationCookie } from './middlewares/authentication.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/books', bookRouter);
app.use('/users', userRouter);

mongoose.connect(process.env.mongoURI)
.then(() => { 
    console.log('Connected to MongoDB') 
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => console.log(err));

export default app;