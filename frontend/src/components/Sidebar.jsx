import React, { useEffect, useState } from 'react';
import { PiSignOutBold } from "react-icons/pi";
import SearchBar from './SearchBar';
import Conversation from './Conversation';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSocketContext } from '../context/socketContext';

const Sidebar = () => {
    const navigate = useNavigate();
    
    const { authUser, setAuthUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const [ conversations, setConversations ] = useState([]);
    const [ searchUsers, setSearchUsers ] = useState([]);
    
    console.log(conversations);

    const handleSearch = async (e) => {
        const query = e.target.value

        if (query) {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/user/search/${query}`, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
            .then((res) => {
                setSearchUsers(res.data)
            })
            .catch((error) => {
                if(error.response.status === 500) {
                    toast.error("Something is wrong!")
                }
                else {
                    toast.error(error.response.data.message)
                }
            })
        }
        else {
            setSearchUsers([]);
        }
    }

    useEffect(() => {
        const getConversations = async () => {
            axios.get(`${import.meta.env.VITE_SERVER_URL}/user/all`, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
            .then((res) => {
                setConversations(res.data?.users)
            })
            .catch((error) => {
                if(error.response.status === 500) {
                    toast.error("Something is wrong!")
                }
                else {
                    toast.error(error.response.data.message)
                }
            })            
        }
        getConversations();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("authUser")
        setAuthUser(null);

        toast.success("User Logged out")
        navigate("/login")
    }

    return (
        <div className="w-1/4 sm:w-1/2 h-screen bg-gray-900 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between bg-gray-800 border-gray-700">
            <h2 className="card-title text-center">Chats</h2>

            <div className="flex items-center justify-between space-x-4">
                <div>
                    <button className="btn btn-ghost btn-circle">
                        <PiSignOutBold className='text-xl' onClick={handleLogout}/>
                    </button>
                    {/* <button className="btn btn-ghost btn-circle">
                        <IoMdAddCircle className='text-xl'/>
                    </button> */}
                </div>
            </div>
        </div>

        <SearchBar handleSearch={handleSearch}/>

        <div className="flex-1 overflow-y-auto bg-gray-900">
            <ul className="divide-y divide-gray-700">
                {searchUsers.length > 0 ? searchUsers.map((u, id) => (
                    <Conversation key={u._id} user={u} isOnline={onlineUsers.includes(u._id)}/>
                )) : conversations.length > 0 ? conversations.map((convo, id) => (
                    <Conversation key={convo.user._id} user={convo.user} message={convo.message} isSent={convo.message.senderId == authUser.id} isOnline={onlineUsers.includes(convo.user._id)}/>
                )) : <div className="p-3 hover:bg-gray-800 cursor-pointer">
                        <span className='text-sm text-gray-400 mx-3'>No available chats</span>
                    </div>}
            </ul>
        </div>
        </div>
    );
};

export default Sidebar;

