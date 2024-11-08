import { Book } from '../models/bookModel.js';

export async function postBook(req, res) {
    try {
        const body = req.body;
        if (!body.title || !body.author || !body.publishYear) {
            return res.status(400).send({ message: 'Missing required fields' });
        }
        const newBook = {
            title: body.title,
            author: body.author,
            publishYear: body.publishYear,
        };
        const book = await Book.create(newBook);
        res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export async function getBooks(req, res) {
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
}

export async function getBookbyId(req, res) {
    try{
        const id = req.params.id;
        const book = await Book.findById(id);
        res.status(200).send(book);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
}

export async function putBook(req, res) {
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
}

export async function deleteBook(req, res) {
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
}