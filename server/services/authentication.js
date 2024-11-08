import dotenv from 'dotenv';
dotenv.config();

import JWT from 'jsonwebtoken';
const secret = process.env.SECRET;

export function createTokenForUser(user) {
    const payload = {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    };
    const token = JWT.sign(payload, secret);
    return token;
}

export function validateToken(token) {
    const payload = JWT.verify(token, secret);
    return payload;
}