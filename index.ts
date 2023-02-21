import https from "https";
import http from "http";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const environment = process.env.NODE_ENV?.trim();
const port = environment === "test" ? 7000 : 5000;
const protocol = environment === "test" ? "http" : "https";

function serverFactory() {
  if (environment !== "test") {
    return https.createServer({
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    });
  } else {
    return http.createServer();
  }
}

export const server = serverFactory();

const listening = server.listen(7000);

server.on("listening", () => {
  const info = listening.address();
  if (typeof info === "object") {
    console.log({ ...info, protocol });
  }
});

server.on("request", (request, response) => {
  response.statusCode = 201;
  response.end("hello");
});
