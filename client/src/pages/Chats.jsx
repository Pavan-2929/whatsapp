import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import Conversation from "../components/Conversation";
import { useSelector } from "react-redux";
import axios from "axios";

const Chats = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/conversation/get/${currentUser._id}`
        );

        setConversations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
  }, [currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/message/get/${currentChat?._id}`
        );
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [currentChat]);

  console.log(messages);

  return (
    <div className="w-[80vw] h-auto  mx-auto flex ">
      <div className="flex flex-col w-[20vw] bg-[#444]">
        <h1 className="text-center flex justify-center mt-5 text-3xl h-[2rem]">
          Users
        </h1>
        {conversations &&
          conversations.map((c) => (
            <div onClick={() => setCurrentChat(c)} key={c._id}>
              <Conversation conversation={c} currentUser={currentUser} />
            </div>
          ))}
      </div>
      {currentChat ? (
        <>
          <div className="flex flex-col gap-2 p-4 bg-[#282828] w-[100%]">
            {
              messages && messages.map((m) => (
                <div key={m._id}>
                  <ChatBox message={m} own={m.senderId === currentUser._id}/>
                </div>
              ))
            }
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 p-4 bg-[#282828] w-[100%] text-center text-4xl ">
          No chat found
        </div>
      )}
    </div>
  );
};

export default Chats;
