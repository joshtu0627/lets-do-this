import jwt from "jsonwebtoken";

// import { OAuth2Client } from "google-auth-library";
import axios from "axios";

import projectModel from "../models/project.model.js";

const getProjectById = async (req, res) => {
  try {
    const project = await projectModel.getProjectById(req.params.id);
    console.log(project);
    res.status(200).send(project);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

const createProject = async (req, res) => {
  try {
    const project = await projectModel.createProject(req.body);
    res.status(200).send(project);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// export controller functions
const projectController = {
  getProjectById,
};

export default projectController;
