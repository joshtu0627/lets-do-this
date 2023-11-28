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

import routes from "./routes/index.route.js";

// import { env } from "./utils/env.js";

const app = express();

// enable cors
app.use(cors());

// initialize passport
// app.use(passport.initialize());
// app.use(passport.session());

// parse application/json and urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/1.0", routes);

app.listen(8000, () => {
  // console.log(env.SECRET_KEY);
  console.log("Server is running on port https://127.0.0.1:8000/api/1.0");
});
