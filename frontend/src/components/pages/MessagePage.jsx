import React, { useEffect, useState } from "react";

import Header from "../common/Header";
import Footer from "../common/Footer";

import { useUser } from "../../contexts/UserContext";

import { getMessagesByUserId } from "../../utils/Apis";
import { getUserDataById } from "../../utils/Apis";

export default function MessagePage() {
  const { user, login, logout } = useUser();
  const [messagingUserId, setMessagingUserId] = useState(null);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [messageUsers, setMessageUsers] = useState(null);

  useEffect(() => {
    if (!user) return;
    const getData = async () => {
      let data = await getMessagesByUserId(user.id);
      console.log(data);
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
      }
      setMessageUsers(newMessageUsers);
      setMessages(newMessages);
    };
    getData();
  }, [user]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log(chat);
  }, [chat]);

  return (
    <div className="min-h-screen flex flex-col bg-[#1A171D]">
      <Header />
      <div className="flex-grow">
        <div className="flex justify-center h-full text-white">
          <div className="flex w-5/6 m-10 text-white">
            <div className="w-1/5 mx-10 h-[800px] bg-[#2c2830]">
              {/* 123 */}
              {/* {chat &&
                chat.map((message) => {
                  <div className="">123546</div>;
                })} */}
              {chat &&
                messageUsers &&
                chat.map((chatMessages, index) => (
                  <div className="w-full h-20 bg-white">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={messageUsers[index].image}
                      alt=""
                    />
                    {messageUsers[index].name}
                  </div>
                ))}
            </div>
            <div className="w-4/5 mx-10 h-[800px] bg-[#2c2830]">
              <div>MessagePage</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
