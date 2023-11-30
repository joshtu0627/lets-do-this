import jwt from "jsonwebtoken";

// import { OAuth2Client } from "google-auth-library";
import axios from "axios";

import jobModel from "../models/job.model.js";

const getAllJob = async (req, res) => {
  try {
    const jobs = await jobModel.allJob();

    res.status(200).send(jobs);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// export controller functions
const jobController = {
  getAllJob,
};

export default jobController;
