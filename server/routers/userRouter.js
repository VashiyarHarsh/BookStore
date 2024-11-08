import express from 'express';
const app = express.Router();
import {createUser, getUsers, getUserById, updateUser, deleteUser} from '../controllers/userController.js';

app.post('/', createUser);

app.get('/', getUsers);

app.get('/:id', getUserById);

app.put('/:id', updateUser);

app.delete('/:id', deleteUser);

export default app;