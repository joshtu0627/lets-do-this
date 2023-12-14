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

// app.listen(8000, () => {
//   // console.log(env.SECRET_KEY);
//   console.log("Server is running on port https://127.0.0.1:8000/api/1.0");
// });

// use require
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const server = require("http")
  .Server(app)
  .listen(8000, () => {
    console.log("open server!");
  });

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //經過連線後在 console 中印出訊息
  console.log("success connect!");
  //監聽透過 connection 傳進來的事件
  socket.on("getMessage", (message) => {
    //回傳 message 給發送訊息的 Client
    socket.emit("getMessage", message);
  });

  socket.on("getMessageAll", (message) => {
    io.sockets.emit("getMessageAll", message);
  });

  socket.on("getMessageLess", (message) => {
    socket.broadcast.emit("getMessageLess", message);
  });

  socket.on("getMessageRoom", (message) => {
    //取得房間名稱
    console.log(message);
    console.log(socket.rooms);
    let nowRoom;
    for (let room of socket.rooms) {
      if (room !== socket.id) {
        nowRoom = room;
        break;
      }
    }
    console.log(nowRoom);
    //回傳 message 給發送訊息的 Client
    io.sockets.in(nowRoom).emit("getMessageRoomReceive", message);
  });

  socket.on("addRoom", (room) => {
    //加入前檢查是否已有所在房間
    const nowRoom = Object.keys(socket.rooms).find((room) => {
      return room !== socket.id;
    });
    //有的話要先離開
    if (nowRoom) {
      console.log("leaving room", nowRoom);
      socket.leave(nowFoom);
    }
    //再加入新的
    socket.join(room);
    io.sockets.in(room).emit("addRoom", "已有新人加入聊天室！");
  });

  socket.on("joinRoom", (room) => {
    //加入前檢查是否已有所在房間
    console.log(room);
    const nowRoom = Object.keys(socket.rooms).find((room) => {
      return room !== socket.id;
    });
    //有的話要先離開
    if (nowRoom) {
      socket.leave(nowFoom);
    }
    //再加入新的
    socket.join(room);
    io.sockets.in(room).emit("joinRoom", "已有新人加入聊天室！");
  });
});
