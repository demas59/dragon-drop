import express, { Request, Response } from "express";
import { Post } from "../models/post.model";
import HttpStatusCodes from "http-status-codes";

const router = express.Router();

router.get("/post", async (req: Request, res: Response) => {
  const posts = await Post.find({});
  res.send(posts);
});

router.get("/post/id", async (req: Request, res: Response) => {
  let posts = await Post.find({});
  res.send(posts.map((post: { _id: String }) => post._id));
});

router.get("/post/:id", async (req: Request, res: Response) => {
  const post = await Post.findById({ _id: req.params.id });
  res.send(post);
});

router.put("/post/comment/:id", async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const commentValue = req.body.commentValue;

  const post = await Post.findById({ _id: req.params.id });

  post.comments.push({
    writer: userName,
    value: commentValue,
    creation: Date.now(),
  });

  const updatedPost = new Post(post);

  try {
    const result = await updatedPost.save();
    res.status(HttpStatusCodes.ACCEPTED).send(result);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

router.put("/post/like/:id", async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const likeValue = req.body.likeValue;
  let existingUser: boolean = false;

  const post = await Post.findById({ _id: req.params.id });

  post.likes.forEach((like: any) => {
    if (like.userName === userName) {
      like.value = likeValue;
      existingUser = true;
    }
  });

  if (!existingUser) {
    post.likes.push({ userName: userName, value: likeValue });
  }

  const updatedPost = new Post(post);

  try {
    const result = await updatedPost.save();
    res.status(HttpStatusCodes.ACCEPTED).send(result);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
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
