import { Router, Request, Response } from "express";
import ImagesController from "../controllers/ImagesController";

const controller = new ImagesController();
const router = Router();

router.get("/", async (req: Request, res: Response) =>
  controller.getAll(req, res)
);

export default router;
