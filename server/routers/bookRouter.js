import express from 'express';
const app = express.Router();
import {postBook, getBooks, getBookbyId, putBook, deleteBook} from '../controllers/bookController.js';

app.post('/', postBook);

app.get('/', getBooks);

app.get('/:id', getBookbyId);

app.put('/:id', putBook);

app.delete('/:id', deleteBook); 

export default app;