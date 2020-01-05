import express, { Request, Response, NextFunction } from "express";
import userController from "./controller";
import { check } from "express-validator";

const router = express.Router();

router.get("/", userController.index);

router.get("/:id", userController.detail);

router.post(
  "/",
  [check("name").exists(), check("password").exists()],
  userController.create
);

router.put("/:id", userController.update);

router.delete("/:id", userController.destroy);

export default router;
