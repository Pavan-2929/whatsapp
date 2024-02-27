// ChatBox.js
import React from "react";
import RegisterImage from "../assets/RegisterImage.png";

const ChatBox = ({ own }) => {
  return (
    <>
      {own ? (
        <>
          <div className="flex mt-4 items-center justify-end">
            <div className="bg-[#444] rounded-lg p-3 max-w-[600px]">
              <p className="text-sm">Hello guys, chai pi</p>
            </div>
            <img
              src={RegisterImage}
              alt=""
              className="w-10 h-10 rounded-full ml-4"
            />
          </div>
          <div className="text-xs text-gray-500 ml-2 flex justify-end">
            1 Hour ago
          </div>
        </>
      ) : (
        <>
          <div className="flex mt-4 items-center justify-start">
            <img
              src={RegisterImage}
              alt=""
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="bg-[#444] rounded-lg p-3 max-w-[600px]">
              <p className="text-sm">Hello guys, chai pi</p>
            </div>
          </div>
          <div className="text-xs text-gray-500 ml-2 flex justify-start">
            1 Hour ago
          </div>
        </>
      )}
    </>
  );
};

export default ChatBox;
