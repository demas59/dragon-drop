import express from "express";
import logger from "morgan";
import path from "path";
import http from "http";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use('/',"router")

app.set("port", 3000);

const server = http.createServer(app);
server.listen(3000);
server.on("listening", () => console.log("listening on 3000"));
server.on("error", (error: NodeJS.ErrnoException) => {
  //: NodeJS.ErrnoException nécessaire car par défaut nodeJS ne récupère pas la bonne classe d'Error
  if (error.syscall !== "listen") {
    throw error;
  }

  switch (error.code) {
    case "EACCES":
      console.error(`3000 requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`3000 is already in use`);
      process.exit(1);
    default:
      throw error;
  }
});
