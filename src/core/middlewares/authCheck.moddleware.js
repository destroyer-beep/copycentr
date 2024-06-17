import {verifyJwtTokens} from "../helpers/authHelpers.js";

export default function authCheckMiddleware(req, res, next) {
    try {
        const bearerTokenInHeaders = req.headers['authorization'];
        if(!bearerTokenInHeaders) {
            res.status(400).send({message: 'Unauthorized!'});
            return;
        }

        const bearerToken = bearerTokenInHeaders.replace('Bearer ', '');

        const userId = verifyJwtTokens(bearerToken);

        if(userId) next();
        else res.status(401).send({message: 'Invalid token!'});
    } catch (e) {
        res.status(401).send({message: e.message});
    }


}