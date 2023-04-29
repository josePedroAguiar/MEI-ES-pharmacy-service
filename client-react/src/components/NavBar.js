import React from "react";
import { Clock } from "react-feather";

const Banner = ({ userName }) => {
  return (
    <div className="bg-primary text-white py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">Welcome, {userName}!</div>
        <div className="flex items-center">
          <Clock className="mr-2" />
          <div>{new Date().toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default Banner;