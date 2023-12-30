"use client";

import React from "react";
import Image from "next/image";
// import { useAuth } from "@/hooks/useAuth";

export default function Sidebar({ setActivePage }) {
  //   const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div className="bg-white border-2 border-gray-200 rounded-[40px] text-black h-full w-56 p-8 ml-4">
      <div className="flex flex-col items-center mb-10">
        <Image
          src="/profile.png"
          alt="User Profile"
          className="rounded-full w-20 h-20 mb-4"
          width={50}
          height={50}
        />

        <p className="font-bold">User 1</p>

        {/* {user && (
          <p className="font-semibold text-gray-800 text-xl">{user.username}</p>
        )}
        {user && <p className="text-gray-600 italic text-sm">{user.email}</p>} */}
      </div>

      <div className="mb-4">
        <button
          onClick={() => setActivePage("devices")}
          className="bg-white border border-black text-black rounded-full p-3 text-sm mb-7 w-full hover:bg-black hover:text-white"
        >
          Dashboard
        </button>
        <button
          onClick={() => setActivePage("addDevice")}
          className="bg-white border border-green-700 text-green-700 rounded-full p-3 text-sm mb-36 w-full hover:bg-green-800 hover:text-white"
        >
          Add Device
        </button>

        <a
          className="flex items-center  ml-4 gap-x-2 font-medium text-gray-500 hover:text-blue-600  md:my-6 md:ps-6 dark:text-gray-400 dark:hover:text-blue-500"
          href="https://www.google.com"
        >
          <svg
            className="flex-shrink-0 w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          Guide
        </a>
        <hr className="my-2 border-gray-400"></hr>

        <button
          onClick={handleLogout}
          className="bg-white border border-red-800 hover:bg-red-800 hover:text-white text-red-800 rounded-full p-3 text-sm mb-2 mt-4 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
