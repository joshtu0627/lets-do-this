import React, { useState, useEffect } from "react";

import {
  getMessagesByProjectId,
  setMessagesByProjectId,
} from "../../../utils/Apis";

import webSocket from "socket.io-client";

import Button from "@mui/material/Button";
import { generateTimestamp } from "../../../../../backend/src/utils/tools";

export default function ProjectChat({ project, members, user }) {
  const [ws, setWs] = useState(null);
  const connectWebSocket = () => {
    //開啟
    setWs(webSocket("http://localhost:8000"));
  };

  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const changeRoom = (id) => {
    let room = id;
    if (room !== "") {
      ws.emit("joinRoom", room);
    }
  };

  const sendMessage = (name, message) => {
    ws.emit(name, message);
  };

  useEffect(() => {
    const initWebSocket = () => {
      //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
      ws.on("getMessage", (message) => {
        console.log(message);
        message = JSON.parse(message);
        setMessages((messages) => [...messages, message]);
      });
      ws.on("getMessageAll", (message) => {
        console.log(message);
      });
      ws.on("getMessageLess", (message) => {
        console.log(message);
      });
      ws.on("getMessageRoomReceive", (message) => {
        let comingMessage = JSON.parse(message);
        setMessages((messages) => [...messages, comingMessage]);
        console.log(message);
      });
      ws.on("addRoom", (message) => {
        console.log(message);
      });
      ws.on("joinRoom", (message) => {
        console.log(message);
      });
    };
    if (ws) {
      //連線成功在 console 中打印訊息
      console.log("success connect!");
      //設定監聽
      initWebSocket();
      changeRoom(project.id);
    }
  }, [ws]);

  useEffect(() => {
    getMessagesByProjectId(project.id).then((data) => {
      console.log(data[0].messages);
      setMessages(data[0].messages);
      connectWebSocket();
    });
    console.log(user);
  }, [project.id]);

  useEffect(() => {
    setMessagesByProjectId(project.id, messages);
  }, [messages]);

  return (
    <div>
      <div className="w-full my-5 h-80 gray-bg bg-[#3c3a41]">
        {messages &&
          messages.map((message) => {
            return (
              <div className="flex justify-between" key={message.timestamp}>
                <div className="flex flex-col">
                  <div className="text-white">{message.name}</div>
                  <div className="text-white">{message.text}</div>
                </div>
                <div className="text-white">{message.timestamp}</div>
              </div>
            );
          })}
        <input
          type="text"
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
          className="text-black"
          id="text"
        />
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            let payload = {
              name: user.name,
              text: userMessage,
              image: user.image,
              timestamp: generateTimestamp(),
            };

            sendMessage("getMessageRoom", JSON.stringify(payload));
          }}
        >
          send
        </Button>
      </div>
    </div>
  );
}
