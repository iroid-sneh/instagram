import express from "express";
import authRoutes from "../src/auth/auth.routes";
import postRoutes from "../src/post/post.routes";
import auth from "../src/common/middleware/auth";
const router = express.Router();

router.use("/auth", authRoutes);

router.use("/post", auth, postRoutes);

export default router;
