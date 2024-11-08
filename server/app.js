import express from 'express';
import mongoose from 'mongoose';
import bookRouter from './routers/bookRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();

dotenv.config();

app.use(express.json());
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

mongoose.connect(process.env.mongoURI)
.then(() => { 
    console.log('Connected to MongoDB') 
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => console.log(err));