import express, { Request, Response } from "express";
import CommentController from "../controllers/comment.controller";
import { Comment } from "../models/comment.model";
import HttpStatusCodes from "http-status-codes";

const router = express.Router();
const commentController = new CommentController();

router.get("/comment/:id", async (req: Request, res: Response) => {
  try {
    const comment = await commentController.getById(req.params.id);
    res.send(comment);
  } catch (err) {
    res.status(HttpStatusCodes.NOT_FOUND).send(err.message);
  }
});

export { router as commentRouter };
