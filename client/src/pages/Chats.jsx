import React, { useEffect, useRef, useState } from "react";
import ChatBox from "../components/ChatBox";
import Conversation from "../components/Conversation";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

const Chats = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");

  const socket = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("localhost:8000");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [currentChat, arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
  useEffect(() => {
    fetchConversations();
  }, [currentUser]);

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

  const receiverId = currentChat?.members.find(
    (member) => member != currentUser._id
  );

  useEffect(() => {
    fetchMessages();
  }, [currentChat]);

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    socket.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/message/create",
        message
      );
      console.log(response);
      setNewMessage("");
      setMessages([...messages, newMessage]);
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchAllusers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/user/allusers"
      );
      setAllUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllusers();
  }, []);

  const handleConversationCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/conversation/create",
        { members: { senderId: currentUser._id, receiverId: selectedUser } }
      );
      fetchConversations();
      toggleModal(false);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[89vh] flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 bg-[#444]">
        <h1 className="text-center mt-5 text-3xl h-[2rem] text-white">Users</h1>
        <div className="overflow-y-auto">
          <div>
            <button
              onClick={toggleModal}
              className="text-white bg-blue-500 py-2 px-4 rounded-md my-4 mx-auto block"
            >
              Create Conversation
            </button>
          </div>
          {conversations.map((c) => (
            <div
              key={c._id}
              onClick={() => setCurrentChat(c)}
              className="cursor-pointer p-2 "
            >
              <Conversation conversation={c} currentUser={currentUser} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-3/4 bg-[#282828] flex flex-col">
        {currentChat ? (
          <>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((m, index) => (
                <div key={index} ref={scrollRef}>
                  <ChatBox message={m} own={m.senderId === currentUser._id} />
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} className="p-4 flex sticky">
              <textarea
                name=""
                id=""
                cols="30"
                rows="1"
                className="flex-1 bg-[#444] rounded-md text-white px-3 py-2 mr-2"
                placeholder="Type your message..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 p-4 text-center text-4xl text-white">
            No chat found
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 backdrop-filter backdrop-blur-sm"></div>
          <div className="bg-[#282828] rounded-lg p-8 max-w-md w-full relative border border-black">
            <span
              className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer text-white hover:text-gray-200"
              onClick={() => setShowModal(false)}
            >
              &#10005;
            </span>
            <form onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-2xl font-bold mb-4">Add Participants</h2>
              <div className="overflow-y-auto max-h-60">
                {allUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-white">{user.username}</span>
                    </div>
                    <input
                      type="radio"
                      className="form-radio h-6 w-6 text-blue-500"
                      name="selectedUser"
                      value={user._id}
                      onChange={() => setSelectedUser(user._id)}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleConversationCreate}
                >
                  Add Participants
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
