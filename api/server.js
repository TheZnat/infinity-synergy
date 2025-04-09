import jsonServer from "json-server";
import dotenv from "dotenv";
dotenv.config();
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on http://localhost:${PORT}`);
});
