import React, { useEffect, useState } from "react";
import RegisterImage from "../assets/RegisterImage.png";
import axios from "axios";
import {format} from 'timeago.js'

const ChatBox = ({message, own }) => {

  const [user, setUser] = useState({})

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/get/${message.senderId}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [])

  return (
    <>
      {own ? (
        <>
          <div className="flex mt-4 items-center justify-end">
            <div className="bg-[#444] rounded-lg p-3 max-w-[600px]">
              <p className="text-sm">{message.text}</p>
            </div>
            <img
              src={user?.profilePicture}
              alt=""
              className="w-10 h-10 rounded-full ml-4"
            />
          </div>
          <div className="text-xs text-gray-500 ml-2 flex justify-end">
            {format(message.createdAt)}
          </div>
        </>
      ) : (
        <>
          <div className="flex mt-4 items-center justify-start">
            <img
              src={user?.profilePicture}
              alt=""
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="bg-[#444] rounded-lg p-3 max-w-[600px]">
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 ml-2 flex justify-start">
            {format(message.createdAt)}
          </div>
        </>
      )}
    </>
  );
};

export default ChatBox;