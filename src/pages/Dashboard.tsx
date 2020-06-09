import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { signOut } = useAuthContext();

  return (
    <div className="w-full">
      <div className="flex justify-center items-center mt-5">
        <div className="m-3">Logged In</div>
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
