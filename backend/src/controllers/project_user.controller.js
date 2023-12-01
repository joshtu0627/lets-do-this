import jwt from "jsonwebtoken";

// import { OAuth2Client } from "google-auth-library";
import axios from "axios";

import projectUserModel from "../models/project_user.model.js";

const getProjectsByUserId = async (req, res) => {
  try {
    const project = await projectUserModel.getProjectsByUserId(req.params.id);
    console.log(project);
    res.status(200).send(project);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// export controller functions
const projectUserController = {
  getProjectsByUserId,
};

export default projectUserController;
