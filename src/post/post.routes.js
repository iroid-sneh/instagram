import express from "express";
import asyncWrap from "express-async-wrapper";
import postController from "./post.controller";
const router = express.Router();

router.get("/create", asyncWrap(postController));

export default router;
