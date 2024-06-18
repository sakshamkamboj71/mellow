import React from "react";

const Albums = () => {
  return (
    <div className="flex-grow flex flex-wrap enableScroll justify-center mb-24">
      <div className="flex flex-wrap w-11/12 border-2 justify-center">
        {/* Album CARD */}
        <div className="w-52 h-64 m-2 flex flex-col select-none cursor-pointer">
          <div className="w-full h-52">
            <img
              src="finalLogo.jpg"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-grow text-sm flex flex-col justify-center px-2">
            <div>AlbumsName</div>
            <div>AlbumsBy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
