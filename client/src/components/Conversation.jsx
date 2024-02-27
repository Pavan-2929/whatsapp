import React, { useEffect, useState } from "react";
import RegisterImage from "../assets/RegisterImage.png";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  const friendId = conversation.members.find((m) => m !== currentUser._id);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/get/${friendId}`
        );

        // console.log(response);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [conversation, currentUser]);

//   console.log(user);
  return (
    user && (
      <div className="flex items-center p-2 border-y-2 border-gray-500 mt-5">
        <img
          src={user.profilePicture}
          alt="Profile"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div className="text-white">{user.username}</div>
      </div>
    )
  );
};

export default Conversation;
