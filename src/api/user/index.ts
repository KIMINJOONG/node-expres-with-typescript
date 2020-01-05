import express, { Request, Response, NextFunction } from "express";
import userController from "./controller";

const router = express.Router();

router.get("/", userController.index);

router.get("/:id", userController.detail);

router.post("/", userController.create);

router.put("/:id", userController.update);

router.delete("/:id", userController.destroy);

export default router;
