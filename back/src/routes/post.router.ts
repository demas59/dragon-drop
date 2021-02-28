import express, { Request, Response } from "express";
import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";
import HttpStatusCodes from "http-status-codes";

import PostController from "../controllers/post.controller";
import CommentController from "../controllers/comment.controller";
import UserController from "../controllers/user.controller";
import { UploadedFile } from "express-fileupload";

const router = express.Router();
const postController = new PostController();
const userController = new UserController();
const commentController = new CommentController();

router.get("/post", async (req: Request, res: Response) => {
  res.send(await postController.getAll());
});

router.get("/post/id", async (req: Request, res: Response) => {
  let posts = await postController.getAll();
  res.send(posts.map((post: { _id: String }) => post._id));
});

router.get("/post/:id", async (req: Request, res: Response) => {
  res.send(await postController.getById(req.params.id));
});

router.get("/post/tags/:tag", async (req: Request, res: Response) => {
  res.send(await postController.getByTag(req.params.tag));
});

router.get("/post/creator/:login", async (req: Request, res: Response) => {
  res.send(await postController.getByCreator(req.params.login));
});

router.delete(
  "/post/comment/:idPost/:idComment",
  async (req: Request, res: Response) => {
    const idPost = req.params.idPost;
    const idComment = req.params.idComment;

    const filter = idPost;
    const update = {
      $pull: {
        comments: idComment,
      },
    };

    await commentController.deleteById(idComment);

    const result = await postController.updateOne(filter, update);
    res.send(result);
  }
);

router.put("/post/comment/:id", async (req: Request, res: Response) => {
  const sentComment = {
    userName: req.body.userName,
    value: req.body.value,
    creation: -1,
  };
  sentComment.creation = Date.now();

  const createdComment = await commentController.saveComment(
    new Comment(sentComment)
  );

  const filter = req.params.id;
  const update = {
    $push: {
      comments: [createdComment._id],
    },
  };

  const result = await postController.updateOne(filter, update);
  res.send(result);
});

router.put("/post/like/:id", async (req: Request, res: Response) => {
  const userName = req.body.userName;
  const likeValue = req.body.likeValue;
  var existingUser = false;

  const post = await postController.getById(req.params.id);

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

// file upload api
router.post("/upload", async (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.file as UploadedFile;
  const format = myFile.name.split(".")[1];

  const post = {
    format: format,
    creator: req.body.creator,
    tags: req.body.tags,
    visibility: req.body.visibility,
    caption: req.body.caption,
  };

  const newPost = new Post(post);

  // Use the mv() method to place the file somewhere on your server

  try {
    const createdPost = await newPost.save();
    myFile.name = createdPost._id;
    const uploadPath =
      __dirname + "\\..\\..\\public\\" + myFile.name + "." + format;
    myFile.mv(uploadPath);
    res.status(HttpStatusCodes.ACCEPTED).send(createdPost);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

export { router as postRouter };
