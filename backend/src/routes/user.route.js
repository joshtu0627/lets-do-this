import express from "express";
import passport from "passport";

import userController from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is user route");
});

router.get("/all", userController.getAllUsers);

router.post("/signup", userController.signup);

router.post("/signin", passport.authenticate("local"), userController.signin);

router.get("/profile", authMiddleware, userController.profile);

router.get("/profileById/:id", userController.profileById);

router.get("/experties/:type", userController.getUserByExpertise);

router.get("/work/:id", userController.getWorkById);

export default router;
