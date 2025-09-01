import express from "express";
import authRoutes from "../src/auth/auth.routes";
import postRoutes from "../src/post/post.routes";
const router = express.Router();

router.use("/auth", authRoutes);

router.use("/post", postRoutes);

export default router;
