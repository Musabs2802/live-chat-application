import React from 'react';
import { IoAddCircle } from 'react-icons/io5';
import SearchBar from './SearchBar';
import Conversation from './Conversation';

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
      <SearchBar />

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-gray-900">
        <ul className="divide-y divide-gray-700">
          {/* Chat List Item */}
          <Conversation displayPic={'https://avatar.iran.liara.run/public'} name={'Alice'} lastMessage={"Hey, how’s it going?"}/>
          <Conversation displayPic={'https://avatar.iran.liara.run/public'} name={'Bob'} lastMessage={"Are you coming today?"}/>
          <Conversation displayPic={'https://avatar.iran.liara.run/public'} name={'Catherine'} lastMessage={"Let’s catch up later."}/>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

