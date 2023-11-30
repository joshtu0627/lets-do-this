import express from "express";
import passport from "passport";

import userController from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import { frontendurl } from "../utils/url.js";

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is user route");
});

router.get("/all", userController.getAllUsers);

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.get("/isLoggedIn", authMiddleware, (req, res) => {
  res.status(200).send(
    JSON.stringify({
      message: "success",
      data: req.user,
    })
  );
});

router.get("/profileById/:id", userController.profileById);

router.get("/experties/:type", userController.getUserByExpertise);

router.get("/work/:id", userController.getWorkById);

export default router;
