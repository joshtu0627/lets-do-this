import express from "express";

import projectController from "../controllers/project.controller.js";
import jobController from "../controllers/job.controller.js";

// import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

import uploadToS3 from "../utils/uploadToS3.js";
import multer from "multer";
import projectUserController from "../controllers/project_user.controller.js";
const memoryStorage = multer.memoryStorage();

const upload = multer({ storage: memoryStorage });
// for health check
router.get("/", (req, res) => {
  res.send("this is project route");
});

router.get("/getMessagesByProjectId", projectController.getMessagesByProjectId);

router.post(
  "/setMessagesByProjectId",
  projectController.setMessagesByProjectId
);

router.get("/:id", projectController.getProjectById);

router.get("/:id/users", projectUserController.getUserByProjectId);

router.get("/job/allJob", jobController.getAllJob);

router.post(
  "/createProject",
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

    projectController.createProject(req, res);
  }
);

router.get("/job/:type", jobController.getJobByType);

export default router;
