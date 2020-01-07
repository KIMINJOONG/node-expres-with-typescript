import express from "express";
import boardController from "./controller";
import { check } from "express-validator";

const router = express.Router();

router.get("/", boardController.index);
router.get("/:id", boardController.detail);
router.post(
  "/",
  [check("title").exists(), check("content").exists()],
  boardController.create
);
router.put("/:id", boardController.update);
router.delete("/:id", boardController.destroy);

export default router;
