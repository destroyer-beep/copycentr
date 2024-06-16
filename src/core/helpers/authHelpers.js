import argon2 from "argon2";

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