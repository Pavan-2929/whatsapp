import axios from "axios";
import React, { useEffect, useState } from "react";

const OnlineUsersModal = ({ isOnlineUsers, toggleOnlineModal }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async (id) => {
      try {
        const response = await axios.get(
          `https://whatsapp-server-2929.onrender.com/api/user/get/${id}`
        );

        setUsers((prevUsers) => {
          if (!prevUsers.some((user) => user._id === response.data._id)) {
            return [...prevUsers, response.data];
          }
          return prevUsers;
        });
      } catch (error) {
        console.log(error);
      }
    };

    isOnlineUsers.forEach((user) => fetchUserData(user.userId));
  }, [isOnlineUsers]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 backdrop-filter backdrop-blur-sm flex items-center justify-center">
        <div className="bg-[#444] bg-opacity-75 rounded-lg p-8 max-w-md w-full relative border border-black">
          <span
            className="absolute top-0 right-0 mt-4 mr-4 cursor-pointer text-white hover:text-gray-200"
            onClick={toggleOnlineModal}
          >
            &#10005;
          </span>
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-bold text-white mb-4">
              Add Participants
            </h2>
            <div className="overflow-y-auto max-h-60">
              {users.map((user) => (
                <div key={user._id} className="flex items-center space-x-2 py-2">
                  <img
                    src={user.profilePicture}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-white">{user.username}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={toggleOnlineModal}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnlineUsersModal;
