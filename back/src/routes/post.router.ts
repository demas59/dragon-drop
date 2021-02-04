import express, { Request, Response } from "express";
import { Post } from "../models/post.model";
import HttpStatusCodes from "http-status-codes";

const router = express.Router();

router.get("/post", async (req: Request, res: Response) => {
  const posts = await Post.find({});
  return res.send(posts);
});

router.post("/post", async (req: Request, res: Response) => {
  const newPost = new Post(req.body);

  try {
    const createdPost = await newPost.save();
    res.status(HttpStatusCodes.ACCEPTED).send(createdPost);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

export { router as postRouter };
