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

const joinUserInProject = async (req, res) => {
  try {
    const project = await projectUserModel.joinUserInProject(
      req.body.projectId,
      req.body.userId,
      req.body.role
    );
    res.status(200).send(project);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

const getUserByProjectId = async (req, res) => {
  try {
    const project = await projectUserModel.getUserByProjectId(req.params.id);
    console.log(project);
    res.status(200).send(project);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// export controller functions
const projectUserController = {
  getUserByProjectId,
  getProjectsByUserId,
  joinUserInProject,
};

export default projectUserController;
