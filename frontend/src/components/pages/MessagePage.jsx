import React, { useEffect, useState, useRef } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { useUser } from "../../contexts/UserContext";

import { getMessagesByUserId } from "../../utils/Apis";
import { getUserDataById } from "../../utils/Apis";

import { getTimeDiff } from "../../utils/tools";

import { IoMdSend } from "react-icons/io";

import webSocket from "socket.io-client";

import Button from "@mui/material/Button";
import { generateTimestamp } from "../../../../backend/src/utils/tools";
import { setMessagesByChatId } from "../../utils/Apis";
import { backendurl } from "../../constants/urls";
import { socketurl } from "../../constants/urls";

export default function MessagePage() {
  const scrollRef = useRef(null);

  const [ws, setWs] = useState(null);

  const { user, login, logout } = useUser();
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageUsers, setMessageUsers] = useState(null);

  const [messagesMap, setMessagesMap] = useState(null); // [id, messages]
  const [nowMessage, setNowMessage] = useState("");
  const [nowMessageUser, setNowMessageUser] = useState(null);

  const [userMessage, setUserMessage] = useState("");

  const [updateMessage, setUpdateMessage] = useState(false);
  const [nowChatId, setNowChatId] = useState(null);

  const [joinRoom, setJoinRoom] = useState(false);

  const changeRoom = (id) => {
    let room = id;
    console.log("change room", room);
    if (room !== "") {
      ws.emit("joinRoom", room);
    }
  };

  const sendMessage = (name, message) => {
    ws.emit(name, message);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleGetMessage = (message) => {
    message = JSON.parse(message);
    let id = message.to;
    let chatId = message.chatId;
    console.log(message);
    console.log(chatId);

    setMessagesMap((prev) => {
      let newMessagesMap = { ...prev };
      let currentMessages = [...prev[id]];
      console.log(currentMessages);
      let newMessage = [...currentMessages, message];
      newMessagesMap[id] = newMessage;

      console.log(id, newMessage);
      setMessagesByChatId(chatId, newMessage);
      return newMessagesMap;
    });
    setUpdateMessage(!updateMessage);
    // console.log(message);
  };
  // useEffect(() => {
  //   // if (!messages) return;

  // }, []);
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
        console.log("get message");
        console.log(message);
        handleGetMessage(message);
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
      if (!user || !nowMessageUser) return;
      // 較小的id在前面
      if (user.id < nowMessageUser.id) {
        changeRoom(String(user.id) + "_" + String(nowMessageUser.id));
      } else {
        changeRoom(String(nowMessageUser.id) + "_" + String(user.id));
      }
    }
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  useEffect(() => {
    console.log("success join room");
  }, [ws]);

  useEffect(() => {
    if (!ws || !user || !nowMessageUser) return;
    console.log("change room");
    if (user.id < nowMessageUser.id) {
      changeRoom(String(user.id) + "_" + String(nowMessageUser.id));
    } else {
      changeRoom(String(nowMessageUser.id) + "_" + String(user.id));
    }
    setNowMessage(messagesMap[nowMessageUser.id]);
  }, [nowMessageUser]);

  useEffect(() => {
    if (!ws || !user || !nowMessageUser) return;
    console.log(messagesMap);
    setNowMessage(messagesMap[nowMessageUser.id]);
  }, [messagesMap]);

  useEffect(() => {
    if (!user) return;
    const connectWebSocket = () => {
      //開啟
      console.log("start connect");
      setWs(webSocket(socketurl));
      setJoinRoom(!joinRoom);
    };

    connectWebSocket();
    const getData = async () => {
      let data = await getMessagesByUserId(user.id);
      // console.log(data);
      setChat(data);
      let newMessages = [];

      let newMessageUsers = [];
      for (let i = 0; i < data.length; i++) {
        newMessages.push(data[i].messages);
        let otherUserId;
        if (data[i].id_1 === user.id) {
          otherUserId = data[i].id_2;
        } else {
          otherUserId = data[i].id_1;
        }
        console.log(otherUserId);
        let otherUser = await getUserDataById(otherUserId);
        newMessageUsers.push(otherUser);
        setMessagesMap((messagesMap) => ({
          ...messagesMap,
          [otherUserId]: data[i].messages,
        }));
      }
      setNowMessageUser(newMessageUsers[0]);
      setNowMessage(newMessages[0]);
      setMessageUsers(newMessageUsers);
      setMessages(newMessages);
      setNowChatId(data[0].id);
    };
    getData();
  }, [user]);

  // useEffect(() => {
  //   console.log(nowMessageUser);
  //   if (!nowMessageUser) return;
  //   setNowMessage(messagesMap[nowMessageUser.id]);
  // }, [nowMessageUser]);

  useEffect(() => {
    console.log(nowMessage);
    scrollToBottom();
  }, [nowMessage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A171D]">
      <Header />
      <div className="flex-grow">
        <div className="flex justify-center h-full text-white">
          <div className="flex w-5/6 m-10 text-white">
            <div className="w-1/5 mx-10 h-[800px] bg-[#2c2830] rounded-xl overflow-hidden">
              {/* 123 */}
              {/* {chat &&
                chat.map((message) => {
                  <div className="">123546</div>;
                })} */}
              {chat &&
                messageUsers &&
                chat.map((chatMessages, index) => (
                  <div
                    className={
                      "flex items-center w-full h-20" +
                      (nowMessageUser &&
                      nowMessageUser.id === messageUsers[index].id
                        ? " bg-[#4E4755]"
                        : " bg-[#2c2830]")
                    }
                    onClick={() => {
                      console.log(messageUsers);
                      console.log(messageUsers[index]);
                      setNowMessageUser(messageUsers[index]);
                      setNowChatId(chatMessages.id);
                    }}
                    key={chatMessages.id}
                  >
                    <div className="ml-3 h-14 w-14">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={messageUsers[index].image}
                        alt=""
                      />
                    </div>
                    <div className="flex-col ml-5 font-bold">
                      <div>{messageUsers[index].name}</div>
                      <div className="text-gray-400">
                        {chatMessages.messages &&
                          chatMessages.messages.length > 0 &&
                          chatMessages.messages[
                            chatMessages.messages.length - 1
                          ].text}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="w-4/5 mx-10 h-[800px] bg-[#2c2830]  rounded-xl overflow-hidden">
              <div className=" h-[720px] overflow-y-scroll " ref={scrollRef}>
                {/* {chat &&
                  chat.map((chatMessages) => (
                    <div>{chatMessages.messages[0].text}</div>
                  ))} */}
                <div className="p-5">
                  {nowMessage && nowMessage.length === 0 && (
                    <div className="text-center text-gray-400">
                      Say anything!
                    </div>
                  )}
                  {nowMessage &&
                    nowMessage.map((message, index) =>
                      user.id === message.id ? (
                        <div
                          className="flex flex-col w-full my-6"
                          key={nowMessageUser.id + index}
                        >
                          {" "}
                          {/* 確保添加了唯一的 key */}
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
                        <div
                          className="flex flex-col w-full my-6"
                          key={nowMessageUser.id + index}
                        >
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
                      )
                    )}
                </div>
              </div>
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
                      to: nowMessageUser.id,
                      chatId: nowChatId,
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
        </div>
      </div>
      <Footer />
    </div>
  );
}
