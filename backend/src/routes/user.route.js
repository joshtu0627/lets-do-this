import express from "express";
import passport from "passport";

import jwt from "jsonwebtoken";

import userController from "../controllers/user.controller.js";
import projectUserController from "../controllers/project_user.controller.js";
import notificationController from "../controllers/notification.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

import { frontendurl } from "../utils/url.js";
import uploadToS3 from "../utils/uploadToS3.js";
import multer from "multer";
const memoryStorage = multer.memoryStorage();

const upload = multer({ storage: memoryStorage });

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is user route");
});

router.get("/all", userController.getAllUsers);

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

router.post("/isLoggedIn", authMiddleware, userController.isLoggedIn);

router.get("/profileById/:id", userController.profileById);

router.get("/experties/:type", userController.getUserByExpertise);

router.get("/work/:id", userController.getWorkById);

router.get("/:id/projects", projectUserController.getProjectsByUserId);

router.post("/joinProject", projectUserController.joinUserInProject);

router.post(
  "/updateProfile",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "bannerImage", maxCount: 1 },
  ]),
  async (req, res) => {
    if (req.files["image"]) {
      const imageURL = await uploadToS3(req.files["image"]);
      req.body.image = imageURL;
    }
    if (req.files["bannerImage"]) {
      const bannerImageURL = await uploadToS3(req.files["bannerImage"]);
      req.body.bannerImage = bannerImageURL;
    }

    // // upload images to s3, and get the urls
    // let imagesURL = await Promise.all(
    //   req.files["images"].map(async (image) => {
    //     return await uploadToS3(image);
    //   })
    // );

    // // convert imagesURL to string
    // const imagesURLString = JSON.stringify(imagesURL);

    // // set main_image and images in req.body
    // req.body.main_image = mainImageURL;
    // req.body.images = imagesURLString;

    // call createProduct controller
    userController.updateProfile(req, res);
  }
);

router.get(
  "/:id/notifications",
  notificationController.getNotificationByUserId
);

router.post("/joinUserProjectTable", projectUserController.joinUserInProject);

export default router;
