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
  console.log(req.query.token);
  if (req.query.token) {
    try {
      const decoded = jwt.verify(req.query.token, env.JWTSECRET);
      req.user = await userModel.getUserById(decoded._id);
      next();
      return;
    } catch (err) {
      if (err === "wrong token") {
        return res.status(403).send("wrong token");
      }
    }
  }

  if (req.query.user) {
    console.log("query user:", req.query.user);
    req.user = JSON.parse(req.query.user);
  }
  console.log("userrrrrrr:", req.user);
  if (req.user) {
    return next();
  }

  // check if there is authorization header
  if (!req.headers.authorization) {
    return res.status(401).send("no token");
  }

  // get token from header
  const token = req.headers.authorization.split(" ")[1];

  // check if not token
  if (!token) {
    return res.status(401).send("no token");
  }

  // verify token
  try {
    const decoded = jwt.verify(token, env.JWTSECRET);

    // check if the token can be decoded
    if (!decoded) {
      return res.status(401).send("no token");
    }

    // add user to request for later use
    req.user = await userModel.getUserById(decoded._id);

    next();
  } catch (err) {
    if (err === "wrong token") {
      return res.status(403).send("wrong token");
    }
  }
};

export default authMiddleware;
