/*
  File: src/routes/index.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Main route file.
  Usage: 
    - Import this file into the main server file (src/index.js)
*/

import express from "express";

import userRouter from "./user.route.js";
// import projectRouter from "./project.route.js";

const router = express.Router();

// this route is unused, but it's here for future use, maybe?
// router.use("/docs", docsRouter);

// for health check
router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

router.use("/user", userRouter);

export default router;
