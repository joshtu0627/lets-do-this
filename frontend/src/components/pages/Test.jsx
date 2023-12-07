import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import webSocket from "socket.io-client";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

import { useUser } from "../../contexts/UserContext";

export default function Test() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  const { user, login, logout } = useUser();

  const connectWebSocket = () => {
    //開啟
    setWs(webSocket("http://localhost:8000"));
  };

  useEffect(() => {
    const initWebSocket = () => {
      //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
      ws.on("getMessage", (message) => {
        console.log(message);
      });
      ws.on("getMessageAll", (message) => {
        console.log(message);
      });
      ws.on("getMessageLess", (message) => {
        console.log(message);
      });
      ws.on("getMessageRoomReceive", (message) => {
        console.log(message);
      });
      ws.on("addRoom", (message) => {
        console.log(message);
      });
    };
    if (ws) {
      //連線成功在 console 中打印訊息
      console.log("success connect!");
      //設定監聽
      initWebSocket();
    }
  }, [ws]);

  const sendMessage = (name, message) => {
    ws.emit(name, message);
  };

  const changeRoom = (event) => {
    let room = event.target.value;
    if (room !== "") {
      ws.emit("addRoom", room);
    }
  };
  return (
    <>
      <Header />
      <div className="my-5">
        <select onChange={changeRoom}>
          <option value="">請選擇房間</option>
          <option value="room1">房間一</option>
          <option value="room2">房間二</option>
        </select>
      </div>
      <Button onClick={connectWebSocket} color="primary" variant="contained">
        連線
      </Button>
      <div className="mt-5"></div>

      <input type="text" id="text" className="mr-5 border-2" />

      <Button
        onClick={() => {
          sendMessage("getMessageRoom", document.getElementById("text").value);
        }}
        color="primary"
        variant="contained"
      >
        送出群組訊息
      </Button>
      <div className="mt-5"></div>
      {/* <Button
        onClick={() => {
          sendMessage("getMessageAll");
        }}
        color="primary"
        variant="contained"
      >
        送出訊息，讓所有人收到回傳
      </Button>
      <div className="mt-5"></div>
      <Button
        onClick={() => {
          sendMessage("getMessageLess");
        }}
        color="primary"
        variant="contained"
      >
        送出訊息，讓所有人收到回傳，除了自己
      </Button> */}
    </>
  );
}
