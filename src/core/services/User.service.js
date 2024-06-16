import {compareHashPassword} from "../helpers/authHelpers.js";

export class UserService {
    constructor(UserRepository) {
        this.userRepo = new UserRepository();
    }

    async loginUser(username, password) {
            const user = await this.userRepo.getUserByUsername(username);
            if (!user) throw new Error('User not found');
            const checkPassword = await compareHashPassword(user.password, password);

            if(checkPassword) {
                return {
                    bearerToken: '',
                    refreshToken: ''
                }
            }
            console.log(user)
    }
}