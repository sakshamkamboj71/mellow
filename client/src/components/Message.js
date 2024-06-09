import React from "react";

const Message = ({ text }) => {
  return (
    <div className="fixed inset-0 bg-[#1f1f1f] flex justify-center items-center z-50">
      <div className="text-xl p-24 bg-[#030101] rounded-lg text-white text-center">
        {text}
      </div>
    </div>
  );
};

export default Message;
