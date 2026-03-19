export default function logger(_req, _res, next) {
  console.warn('запрос получен');
  next();
}
