import express from "express";
import asyncWrap from "express-async-wrapper";
import authController from "./auth.controller";
const router = express.Router();

router.post("/signup", asyncWrap(authController.signup));

export default router;
