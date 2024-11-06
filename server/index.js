import express from 'express';
import {PORT,mongoURI} from './config.js';
import mongoose from 'mongoose';
import bookRouter from './routers/bookRouter.js';
import cors from 'cors';

const app = express();

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

mongoose.connect(mongoURI)
.then(() => { 
    console.log('Connected to MongoDB') 
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => console.log(err));