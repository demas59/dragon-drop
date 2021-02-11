import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { userRouter } from "./routes/user.router";
import { postRouter } from "./routes/post.router";
import mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

const app = express();
const swaggerOption = {
  explorer: true,
};
try {
  const swaggerDocument = require("../swagger.json");
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, swaggerOption)
  );
} catch (err) {
  console.error("Unable to read swagger.json", err);
}

app.use(cors());
app.use(json());

//Implementation des routes
app.use(userRouter);
app.use(postRouter);

//Configuration connexion mongoDb
mongoose
  .connect(
    // "mongodb://localhost:27017/dragondrop",
    "mongodb+srv://ademas:ademas@cluster0.pr6cz.mongodb.net/dragondrop?retryWrites=true&w=majority",
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
