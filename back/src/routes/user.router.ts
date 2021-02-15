import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import HttpStatusCodes from "http-status-codes";
import UserController from "../controllers/user.controller";

const userController = new UserController();
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/user", async (req: Request, res: Response) => {
  const users = await userController.getAll();
  return res.send(users);
});

router.get("/user/:login", async (req: Request, res: Response) => {
  const user = await userController.getByLogin(req.params.login);
  return res.send(user);
});

router.post("/signIn", async (req: Request, res: Response) => {
  const user = await userController.getByLogin(req.body.login);
  const compareRes = await bcrypt.compare(req.body.password, user.password);

  if (compareRes) {
    return res.send(user);
  } else {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .send({ error: "Invalid login or password" });
  }
});

router.post("/signUp", async (req: Request, res: Response) => {
  const user = req.body;

  user.password = await bcrypt.hash(user.password, saltRounds);
  const newUser = new User(user);
  try {
    const createdUser = await newUser.save();
    res.status(HttpStatusCodes.ACCEPTED).send(createdUser);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

export { router as userRouter };
