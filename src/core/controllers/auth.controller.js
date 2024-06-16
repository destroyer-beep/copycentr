import {UserService} from "../services/User.service.js";
import {UserRepository} from "../repositories/User.repository.js";

class AuthController {

    check(req, res) {
        console.log(req, res)
    }
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const service = new UserService(UserRepository);
            const tokens = await service.loginUser(username, password);

            res.send(tokens).end();
        } catch (e) {
            res.status(403).send({ message: e.message });
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

export default new AuthController();