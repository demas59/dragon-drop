import express from "express";
import { json } from "body-parser";
import { userRouter } from "./routes/userRouter";
import mongoose from "mongoose";

const app = express();
app.use(json());

//Implementation des routes
app.use(userRouter);

//Configuration connexion mongoDb
mongoose.connect(
  // "mongodb+srv://localhost:27017/dragondrop",
  "mongodb+srv://ademas:elbuy4ZcgodGpeHg@cluster0.pr6cz.mongodb.net/dragondrop?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("connected to database");
  }
);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});