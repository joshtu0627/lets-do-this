/*
  File: src/middlewares/auth.middleware.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Middleware for JWT token authentication.
  Usage: 
    - Import this middleware into the route handlers to protect routes with JWT token validation.
    - This middleware will add the user object to the request if the token is valid.
*/

import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import { env } from "../utils/env.js";

/**
 * Handles JWT token authentication and add the user to the request.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 */
const authMiddleware = async (req, res, next) => {
  // check if there is authorization header
  if (!req.headers.authorization) {
    return res.status(401).send("no token");
  }
  // console.log(req.headers.authorization);
  // get token from header
  const token = req.headers.authorization.split(" ")[1];

  console.log(token);

  // check if not token
  if (!token) {
    console.log("no token");
    return res.status(401).send("no token");
  }

  // verify token
  try {
    const decoded = jwt.verify(token, env.JWTSECRET);

    // check if the token can be decoded
    if (!decoded) {
      console.log("wrong token");
      return res.status(401).send("no token");
    }
    console.log("aaa");
    // add user to request for later use
    req.user = await userModel.getUserById(decoded._id);
    console.log(req.user);
    next();
  } catch (err) {
    if (err === "wrong token") {
      return res.status(200).send("wrong token");
    }
  }
};

export default authMiddleware;
