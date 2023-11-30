import express from "express";

import projectController from "../controllers/project.controller.js";
import jobController from "../controllers/job.controller.js";

// import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// for health check
router.get("/", (req, res) => {
  res.send("this is project route");
});

router.get("/:id", projectController.getProjectById);

router.get("/job/allJob", jobController.getAllJob);

export default router;
