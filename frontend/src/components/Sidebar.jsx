import React from 'react';
import { IoMdAddCircle } from 'react-icons/io';
import { PiSignOutBold } from "react-icons/pi";
import SearchBar from './SearchBar';
import Conversation from './Conversation';
import { useAuthContext } from '../../../backend/src/context/authContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authUser")
        setAuthUser(null);
        
        toast.success("User Logged out")
        navigate("/login")
    }

    return (
        <div className="w-1/4 h-screen bg-gray-900 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between bg-gray-800 border-gray-700">
            <h2 className="card-title text-center">Chats</h2>

            <div className="flex items-center justify-between space-x-4">
                <div>
                    <button className="btn btn-ghost btn-circle">
                        <PiSignOutBold className='text-xl' onClick={handleLogout}/>
                    </button>
                    <button className="btn btn-ghost btn-circle">
                        <IoMdAddCircle className='text-xl'/>
                    </button>
                </div>
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

