import React from "react";
import { GiMoneyStack } from 'react-icons/gi'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
const QuickStats = () => {
  return (
    <div className="bg-white px-3 py-3 w-full space-y-7 border-2 border-gray-100 rounded-md">
      <div className="flex items-center justify-between">
        <h1>Quick Stats</h1>
        <button className="bg-gray-200 px-2 py-1 rounded-md">view details</button>
      </div>
      <div className="bg-black px-3 py-2 flex justify-between rounded-md">
        <div className="text-white flex space-x-1 items-center justify-center">
          <GiMoneyStack className="text-xl text-sky-400" />
          <div>
            <h2 className="text-gray-500 font-light">Investment</h2>
            <p className="font-semibold text-sm">৳ 23,223</p>
          </div>
        </div>
        <div className="text-white flex space-x-1 items-center justify-center">
          <RiMoneyDollarCircleFill className="text-xl text-green-400" />
          <div>
            <h2 className="text-gray-500 font-light">Profit</h2>
            <p className="font-semibold text-sm">৳ 9,223</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
