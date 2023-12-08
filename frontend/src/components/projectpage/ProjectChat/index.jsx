import React, { useState, useEffect } from "react";

import {
  getMessagesByProjectId,
  setMessagesByProjectId,
} from "../../../utils/Apis";

import { IoMdSend } from "react-icons/io";

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

  function getTimeDiff(timestamp) {
    timestamp = new Date(timestamp).getTime();
    const now = new Date();
    const timeDiff = now - timestamp;

    console.log(timeDiff);

    const minuteDiff = Math.floor(timeDiff / 1000 / 60);
    const hourDiff = Math.floor(minuteDiff / 60);
    const dayDiff = Math.floor(hourDiff / 24);
    const monthDiff = Math.floor(dayDiff / 30);
    const yearDiff = Math.floor(monthDiff / 12);

    // 設定時間顯示格式
    let time = "";
    if (yearDiff > 0) {
      time = `${yearDiff} years ago`;
    } else if (monthDiff > 0) {
      time = `${monthDiff} months ago`;
    } else if (dayDiff > 0) {
      time = `${dayDiff} days ago`;
    } else if (hourDiff > 0) {
      time = `${hourDiff} hours ago`;
    } else if (minuteDiff > 0) {
      time = `${minuteDiff} minutes ago`;
    } else {
      time = "just now";
    }
    return time;
  }

  useEffect(() => {
    const initWebSocket = () => {
      //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
      ws.on("getMessage", (message) => {
        console.log(message);
        message = JSON.parse(message);
        setUserMessage("");
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
    if (messages.length === 0) return;
    setMessagesByProjectId(project.id, messages);
  }, [messages]);

  return (
    <div className="flex items-end justify-center w-full mt-10">
      <div className="w-2/3 gray-bg bg-[#2c2830] rounded-xl min-h-[200px]">
        {messages.length === 0 && <div className="mb-28"></div>}
        {messages &&
          messages.map((message) => {
            return (
              <div
                className="flex justify-between text-white"
                key={message.timestamp}
              >
                <div className="flex w-full p-5">
                  {user.id === message.id ? (
                    <div className="flex flex-col w-full">
                      <div className="flex justify-end w-full">
                        <div className="flex items-center px-5 mr-2 text-white bg-gray-400 rounded-2xl">
                          <div>{message.text}</div>
                        </div>
                        <div className="w-12 h-12">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={message.image}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex justify-end w-full">
                        <div className="mt-2 mr-16 text-xs">
                          {getTimeDiff(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col w-full">
                      <div className="flex w-full justify-begin">
                        <div className="w-12 h-12">
                          <img
                            className="object-cover w-full h-full rounded-full"
                            src={message.image}
                            alt=""
                          />
                        </div>
                        <div className="flex items-center px-5 ml-2 text-white bg-gray-400 rounded-2xl">
                          <div>{message.text}</div>
                        </div>
                      </div>
                      <div className="flex w-full justify-begin">
                        <div className="mt-2 ml-16 text-xs">
                          {getTimeDiff(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <div className="text-white">{message.timestamp}</div> */}
                </div>
              </div>
            );
          })}
        <div className="flex px-5 pt-5 pb-3">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => {
              setUserMessage(e.target.value);
            }}
            className="text-white w-full bg-[#4E4755] h-10 mr-2 rounded-l px-2"
            id="text"
          />
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              let payload = {
                id: user.id,
                name: user.name,
                text: userMessage,
                image: user.image,
                timestamp: generateTimestamp(),
              };

              sendMessage("getMessageRoom", JSON.stringify(payload));
              setUserMessage("");
            }}
            className="h-10"
          >
            <IoMdSend color="white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
