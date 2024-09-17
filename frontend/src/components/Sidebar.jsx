import React from 'react';
import { IoAddCircle } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <div className="w-1/4 h-screen bg-gray-900 text-white flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between bg-gray-800 border-gray-700">
        <h2 className="card-title text-center">Chats</h2>

        <div className="flex items-center space-x-4">
          <button className="btn btn-ghost btn-circle">
            <IoAddCircle className='text-xl'/>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-gray-800">
        <input
          type="text"
          placeholder="Search"
          className="input h-10 input-bordered w-full bg-gray-700 text-gray-200 placeholder-gray-400"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <ul className="divide-y divide-gray-700">
          {/* Chat List Item */}
          <li className="p-3 hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="w-12 rounded-full bg-blue-500 flex items-center justify-center">
                <img src='https://avatar.iran.liara.run/public'/>
                </div>
              </div>
              <div className='flex flex-col items-stretch justify-between'>
                <h3 className="text-md font-sans">Alice</h3>
                <p className="text-sm text-gray-400">Hey, how’s it going?</p>
              </div>
            </div>
          </li>

          <li className="p-3 hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="w-12 rounded-full bg-green-500 flex items-center justify-center">
                  <img src='https://avatar.iran.liara.run/public'/>
                </div>
              </div>
              <div className='flex flex-col items-stretch justify-between'>
                <h3 className="text-md font-sans">Bob</h3>
                <p className="text-sm text-gray-400">Are you coming today?</p>
              </div>
            </div>
          </li>

          <li className="p-3 hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="w-12 rounded-full bg-red-500 flex items-center justify-center">
                <img src='https://avatar.iran.liara.run/public'/>
                </div>
              </div>
              <div className='flex flex-col items-stretch justify-between'>
                <h3 className="text-md font-sans">Catherine</h3>
                <p className="text-sm text-gray-400">Let’s catch up later.</p>
              </div>
            </div>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

