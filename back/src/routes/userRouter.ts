import express, { Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/user", async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, (err, doc) => {
      console.log("err", err);
      console.log("doc", doc);
    });
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
  }
});

// router.post("/api/user", [], async (req: Request, res: Response) => {});

export { router as userRouter };
