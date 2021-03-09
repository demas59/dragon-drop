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
const ExifImage = require("exif").ExifImage;

var exif = require("exif");

router.put("/post", async (req: Request, res: Response) => {
  const post = await postController.getById(req.body._id);
  if (post) {
    for (const element in req.body) {
      post[element] = req.body[element];
    }
  } else {
    res.status(HttpStatusCodes.NOT_FOUND).send("post not found");
  }

  const savedPost = await post.save();
  return res.send(savedPost);
});

router.get("/post/exif/:id", async (req: Request, res: Response) => {
  const post = await postController.getById(req.params.id);

  try {
    new ExifImage(
      { image: `public\\${post._id}.${post.format}` },
      function (error: { message: string }, exifData: any) {
        if (error) {
          res.status(401).send("Error: " + error.message);
        } else {
          res.send(exifData); // Do something with your data!
        }
      }
    );
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

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

router.delete("/post/:id", async (req: Request, res: Response) => {
  const post = await postController.getById(req.params.id);
  post.comments.forEach(async (element: String) => {
    await commentController.deleteById(element);
  });
  postController.deleteById(req.params.id);
  res.send("deleted");
});

router.delete(
  "/post/comment/:idPost/:idComment",
  async (req: Request, res: Response) => {
    const idPost = req.params.idPost;
    const idComment = req.params.idComment;

    const update = {
      $pull: {
        comments: idComment,
      },
    };

    await commentController.deleteById(idComment);

    const result = await postController.updateOne(idPost, update);
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
  const body = req.body;

  const newPost = new Post(body);

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

  const body = req.body;

  if (body && body.tags) {
    body.tags = body.tags.split(",");
  }

  body.format = format;

  const newPost = new Post(body);

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
