import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#1f1f1f] flex justify-center items-center z-50">
      <div className="text-2xl sm:text-4xl p-14 sm:p-32 bg-[#030101] rounded-lg text-white text-center">
        LOADING
      </div>
    </div>
  );
};

export default Loading;
