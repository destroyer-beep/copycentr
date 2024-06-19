import argon2 from "argon2";
import jwt from "jsonwebtoken";
import ConfigService from "../config/config.service.js";

export async function getHashPassword(password) {
    try {
        return await argon2.hash(password);
    } catch (err) {
        console.error('Error get hash password!');
        throw new Error(err.message);
    }
}

export async function compareHashPassword(hash, password) {
    return await argon2.verify(hash, password);
}

export function createJwtTokens(userId, role) {
    const configService = new ConfigService();
    const jwtSecret = configService.get('JWT_SECRET');

    const bearerToken = jwt.sign({userId, role}, jwtSecret, {expiresIn: '7d'});
    const refreshToken = jwt.sign({userId, role}, jwtSecret, {expiresIn: '7d'});

    return {
        bearerToken,
        refreshToken
    }
}

export function verifyJwtTokens(token) {
    try {
        const configService = new ConfigService();
        const jwtSecret = configService.get('JWT_SECRET');

        const {userId, role} = jwt.verify(token, jwtSecret);
        return {userId, role};

    } catch (e) {
        throw new Error('Error verify jwt!');
    }
}