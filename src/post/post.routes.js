import express from "express";
import asyncWrap from "express-async-wrapper";
import postController from "./post.controller";
const router = express.Router();

router.post("/create", asyncWrap(postController.create));

router.get("/feed", asyncWrap(postController.feed));

router.post("/like", asyncWrap(postController.likePost));

export default router;
