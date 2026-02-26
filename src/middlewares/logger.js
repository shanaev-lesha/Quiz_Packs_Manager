export default function logger(req, res, next) {
    console.log("запрос получен");
    next();
}
