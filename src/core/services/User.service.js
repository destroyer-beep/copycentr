import { UserRepository } from '../repositories/User.repository.js';

export class UserService {
    userRepo = new UserRepository();

    async loginUser(username, password) {
        const user = await this.userRepo.getUserByUsername(username);

        if (!user) throw new Error('User not found');
    }
}