import {verifyJwtTokens} from "../helpers/authHelpers.js";

export default function authInRoleCheckMiddleware(req, res, next) {
    try {
        const bearerTokenInHeaders = req.headers['authorization'];
        if(!bearerTokenInHeaders) {
            res.status(400).send({message: 'Unauthorized!'});
            return;
        }

        const bearerToken = bearerTokenInHeaders.replace('Bearer ', '');

        const {userId, role} = verifyJwtTokens(bearerToken);

        if(userId && role === 'admin') next();
        else if(role !== 'admin') res.status(403).send({message: 'Forbidden!'});
        else res.status(401).send({message: 'Invalid token!'});
    } catch (e) {
        res.status(401).send({message: e.message});
    }


}