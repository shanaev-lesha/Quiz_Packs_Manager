import dotenv from "dotenv";
import http from "http";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// корректное завершение
function shutdown(signal) {
  console.log(`Received ${signal}. Shutting down...`);
  server.close(() => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
