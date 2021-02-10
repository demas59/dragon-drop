import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import HttpStatusCodes from "http-status-codes";

const router = express.Router();

router.get("/user", async (req: Request, res: Response) => {
  const users = await User.find({});
  return res.send(users);
});

router.get("/user/:id", async (req: Request, res: Response) => {
  const user = await User.findById({ _id: req.params.id });
  return res.send(user);
});

router.post("/user", async (req: Request, res: Response) => {
  const newUser = new User(req.body);

  try {
    const createdUser = await newUser.save();
    res.status(HttpStatusCodes.ACCEPTED).send(createdUser);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

export { router as userRouter };
