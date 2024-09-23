import React from "react";

const Header = () => {
  return (
    <div className="bg-blue-500 p-4  rounded-b-2xl shadow-lg mb-6">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
        Tic-Tac-Toe
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-gray-200 mt-2">
        A customizable Tic-Tac-Toe game. Set your grid size and win streak!
      </p>
    </div>
  );
};

export default Header;
