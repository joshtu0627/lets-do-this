import express from "express";

import userController from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is user route");
});

router.get("/all", (req, res) => {});

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.get("/profile", authMiddleware, userController.profile);

router.get("/experties/:type", userController.getUserByExpertise);

export default router;
