// netlify/functions/json-server.js
import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "../../db.json"));
const middlewares = jsonServer.defaults();

// Настройка CORS заголовков
server.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  next();
});

server.use(middlewares);
server.use(router);

// Экспортируем обработчик для Netlify
export const handler = server;
