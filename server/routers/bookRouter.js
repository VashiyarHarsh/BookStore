import express from 'express';
const app = express.Router();
import {Book} from '../models/bookModel.js';


app.post('/', async (req, res) => {
    try{
        const body = req.body;
        if(!body.title || !body.author || !body.publishYear){
            return res.status(400).send({ message: 'Missing required fields' });
        }
        const newBook = {
            title: body.title,
            author: body.author,
            publishYear: body.publishYear,
        };
        const book = await Book.create(newBook);
        res.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

app.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        res.status(200).send({
            count: books.length,
            data: books,
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

app.get('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).send(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

app.put('/:id', async (req, res) => {
    try{
        const body = req.body;
        if(!body.title || !body.author || !body.publishYear){
            return res.status(400).send({ message: 'Missing required fields' });
        }
        const id = req.params.id;
        const result = await Book.findByIdAndUpdate(id, body);
        if(!result){
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book updated' });
    }
    catch(error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

app.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).send({ message: 'Book not found' });
        }
        return res.status(200).send({ message: 'Book deleted' });
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}); 

export default app;