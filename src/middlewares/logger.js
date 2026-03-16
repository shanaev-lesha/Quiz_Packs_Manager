export default function logger(_req, _res, next) {
  console.log('запрос получен');
  next();
}
