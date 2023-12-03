import jwt from "jsonwebtoken";

// import { OAuth2Client } from "google-auth-library";
import axios from "axios";

import userModel from "../models/user.model.js";

const signup = async (req, res) => {
  if (!req.is("application/json")) {
    return res.status(400).send("only accept application/json");
  }

  // get user information from request body
  const user = req.body;

  try {
    // create user
    user.id = await userModel.signup(user);

    // create and assign token
    const token = jwt.sign({ _id: user.id }, process.env.JWTSECRET, {
      expiresIn: 60 * 60,
    });

    const responsePayload = {
      data: {
        access_token: token,
        access_expired: 3600,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
    };

    console.log("send");
    res.status(200).send(responsePayload);
  } catch (err) {
    if (err === "user already exists") {
      console.log(err);
      res.status(409).send(err);
    } else {
      console.log(err);
      res.status(500).send("server error");
    }
    console.log(err);
  }
};

const isLoggedIn = async (req, res) => {
  // only accept application/json

  res.status(200).send(
    JSON.stringify({
      message: "success",
      data: req.user,
    })
  );
};

const signin = async (req, res) => {
  // only accept application/json
  // res.message = "success";
  // const payload = {
  //   status: "success",
  //   user: req.user,
  // };

  // res.status(200).send(payload);
  if (!req.is("application/json")) {
    return res.status(400).send("only accept application/json");
  }

  // get user information from request body
  const user = req.body;
  const { email, password, access_token } = user;

  // // only accept native or google provider
  // if (provider !== "native" && provider !== "google") {
  //   return res.status(400).send("only accept native or google provider");
  // }

  try {
    // TODO: Implement google signin authentication in userModel
    // get user information from database
    const userFromDatabase = await userModel.signin(email, password);

    // use algorithm HS256
    const token = jwt.sign(
      { _id: userFromDatabase.id },
      process.env.JWTSECRET,
      {
        expiresIn: 60 * 60,
      }
    );

    // get user information from database
    const userProfile = await userModel.getUserById(userFromDatabase.id);

    // construct response payload
    const responsePayload = {
      data: {
        access_token: token,
        access_expired: 300000,
        user: {
          ...userProfile,
        },
      },
    };
    res.status(200).send(responsePayload);
  } catch (err) {
    if (err === "user not found" || err === "wrong password") {
      console.log(err);
      return res.status(403).send(err);
    } else {
      console.log(err);
      return res.status(500).send("server error");
    }
  }
};

const profile = async (req, res) => {
  // get user information from request body
  const user = req.user;

  // construct response payload
  const responsePayload = {
    data: {
      provider: user.provider,
      name: user.name,
      email: user.email,
      picture: user.picture,
    },
  };
  res.status(200).send(responsePayload);
};

const profileById = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.getUserById(id);
  res.status(200).send(user);
};

const getUserByExpertise = async (req, res) => {
  const { type } = req.params;
  const users = await userModel.getUserByExpertise(type);
  console.log(users);
  res.status(200).send(users);
};

const getAllUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.status(200).send(users);
};

const getWorkById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const work = await userModel.getWorkById(id);
  res.status(200).send(work);
};

// export controller functions
const userController = {
  signup,
  signin,
  isLoggedIn,
  profile,
  profileById,
  getUserByExpertise,
  getAllUsers,
  getWorkById,
};

export default userController;
