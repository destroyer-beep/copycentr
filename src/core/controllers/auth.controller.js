import {UserService} from "../services/User.service.js";
import {UserRepository} from "../repositories/User.repository.js";
import {verifyJwtTokens} from "../helpers/authHelpers.js";

class AuthController {

    async check(req, res) {
        try {
            const userRepository = new UserRepository();
            const service = new UserService(userRepository);

            const bearerTokenInHeaders = req.headers['authorization'];
            const bearerToken = bearerTokenInHeaders.replace('Bearer ', '');

            const userId = verifyJwtTokens(bearerToken);

            const user = await service.getUserById(userId);
            const response = {
                username: user.username,
                userId: user.id
            }
            res.status(200).send(response);
        } catch (e) {
            res.status(400).send({message: e.message});
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const userRepository = new UserRepository();
            const service = new UserService(userRepository);
            const tokens = await service.loginUser(username, password);

            res.send(tokens);
        } catch (e) {
            res.status(403).send({ message: e.message });
        }
    }

    async refreshToken(req, res) {
        try {
            const {refreshToken} = req.body;

            const userRepository = new UserRepository();
            const service = new UserService(userRepository);
            const userId = verifyJwtTokens(refreshToken);

            const {refresh_token} = await service.getRefreshTokenById(userId);

            if(refresh_token !== refreshToken) {
                res.status(400).send({message: 'Invalid refresh token!'});
                return;
            }

            const newToken = service.createBearerToken(userId);

            res.status(200).send({
                refreshToken: newToken
            })

        } catch (e) {
            res.status(400).send(e.message);
        }

    }

    logout(req,  res) {
        res.set('Set-Cookie', '');
        res.redirect('/');
    }

    restorePassword(req, res) {
        const {email} = req.body;
        console.log(email, res)
    }
}

export default new AuthController;