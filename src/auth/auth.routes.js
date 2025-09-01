import express from "express";
import asyncWrap from "express-async-wrapper";
import authController from "./auth.controller";
import auth from "../common/middleware/auth";
const router = express.Router();

router.post("/signup", asyncWrap(authController.signup));

router.post("/login", asyncWrap(authController.login));
export default router;
