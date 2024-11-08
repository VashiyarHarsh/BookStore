import { User } from '../models/userModel.js';

export async function createUser(req, res) {
    try {
        const body = req.body;
        if (!body.firstName || !body.lastName || !body.userName || !body.email || !body.password) {
            return res.status(400).send({ message: 'Missing required fields' });
        }
        const newUser = {
            firstName: body.firstName,
            lastName: body.lastName,
            userName: body.userName,
            email: body.email,
            password: body.password,
        };
        const user = new User(newUser);
        await user.save();
        return res.status(201).send({ message: 'User created successfully' });
    }
    catch(err) {
        return res.status(500).send({ message: err.message });
    }
}

export async function getUsers(req, res) {
    try {
        const users = await User.find({});
        return res.status(200).send(users);
    }
    catch(err) {
        return res.status(500).send({ message: err.message });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send(user);
    }
    catch(err) {
        return res.status(500).send({ message: err.message });
    }
}

export async function updateUser(req, res) {
    try {
        const body = req.body;
        if (!body.firstName || !body.lastName || !body.userName || !body.email || !body.password) {
            return res.status(400).send({ message: 'Missing required fields' });
        }
        const id = req.params.id;
        const result = await User.findByIdAndUpdate(id, body);
        if(!result){
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User updated' });
    }
    catch(err) {
        return res.status(500).send({ message: err.message });
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User deleted successfully' });
    }
    catch(err) {
        return res.status(500).send({ message: err.message });
    }
}