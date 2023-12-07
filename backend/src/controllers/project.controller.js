import jwt from "jsonwebtoken";

// import { OAuth2Client } from "google-auth-library";
import axios from "axios";

import projectModel from "../models/project.model.js";
import projectUserModel from "../models/project_user.model.js";

import { generateTimestamp } from "../utils/tools.js";

const getProjectById = async (req, res) => {
  try {
    const project = await projectModel.getProjectById(req.params.id);
    const members = await projectUserModel.getUserByProjectId(req.params.id);
    // console.log(project);
    console.log(members);
    project.members = members;
    res.status(200).send(project);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

const createProject = async (req, res) => {
  try {
    // get timestamp
    const timestamp = generateTimestamp();
    req.body.createAt = timestamp;

    const projectId = await projectModel.createProject(req.body);
    console.log(projectId);
    const payload = {
      projectId,
      message: "success",
    };
    res.status(200).send(payload);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

const getMessagesByProjectId = async (req, res) => {
  try {
    console.log(req.query.id);
    const messages = await projectModel.getMessagesByProjectId(req.query.id);
    res.status(200).send(messages);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

const setMessagesByProjectId = async (req, res) => {
  try {
    console.log(req.body);
    const messages = await projectModel.setMessagesByProjectId(
      req.body.id,
      req.body.messages
    );
    res.status(200).send(messages);
  } catch (err) {
    console.log(err);
    res.status(500).send("server error");
  }
};

// export controller functions
const projectController = {
  getProjectById,
  createProject,
  getMessagesByProjectId,
  setMessagesByProjectId,
};

export default projectController;
