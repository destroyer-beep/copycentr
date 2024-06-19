import {compareHashPassword, createJwtTokens} from "../helpers/authHelpers.js";

export class UserService {
    constructor(userRepository) {
        this.userRepo = userRepository;
    }

    async getUserById(userId) {
        const user = await this.userRepo.getUserById(userId);
        return user;
    }

    async getRefreshTokenById(userId) {
        const refreshToken = await this.userRepo.getRefreshTokenById(userId);
        return refreshToken;
    }

    createBearerToken(userId, role) {
        const {bearerToken} = createJwtTokens(userId, role);
        return bearerToken;
    }

    async loginUser(username, password) {
            const user = await this.userRepo.getUserByUsername(username);
            if (!user) throw new Error('User not found');

            const checkPassword = await compareHashPassword(user.password, password);
            if (!checkPassword) throw new Error('Incorrect login and/or password');

            const {bearerToken, refreshToken} = createJwtTokens(user.id, user.role);
            await this.userRepo.insertToken(refreshToken, user.id);

            return {
                bearerToken, refreshToken
            };
    }
}