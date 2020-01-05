import express from "express";
import boardController from "./controller";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/",
  [check("title").exists(), check("content").exists()],
  boardController.create
);

export default router;
