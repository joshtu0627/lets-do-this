/*
  File: src/index.js
  Author: Josh Tu <joshtu0627@gmail.com>
  Date: October 23, 2023
  Description: Main server file.
  Usage: 
    - Run this file with node/nodemon/PM2/etc.
*/

import fs from "fs";
import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";

import routes from "./routes/index.route.js";

import "./config/passport.config.js";
// import { env } from "./utils/env.js";

const app = express();

// enable session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    name: "database_user",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: false,
      domain: "localhost",
    },
  })
);

// enable cors
app.use(cors());

// const options = {
//   credentials: true,
//   origin: "http://localhost:5173",
//   methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
// };
// app.use(cors(options));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// parse application/json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/1.0", routes);

app.listen(8000, () => {
  // console.log(env.SECRET_KEY);
  console.log("Server is running on port https://127.0.0.1:8000/api/1.0");
});
