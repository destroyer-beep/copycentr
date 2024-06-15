export default function authCheckMiddleware(req, res, next) {
    console.log(req, res)
    next();
}