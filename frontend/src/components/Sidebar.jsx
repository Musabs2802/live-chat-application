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
    
    const handleSearch = async (e) => {
        try {
            const query = e.target.value

            if (query) {
                const res = await axios.get(`http://localhost:8080/api/user/search/${query}`, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
                if (res.status == 200) {
                    setSearchUsers(res.data)
                }
                else {
                    toast.error("Cannot fetch users !")
                }
            }
            else {
                setSearchUsers([]);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/user/all', { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
                if (res.status == 200) {
                    setConversations(res.data?.users)
                }
                else {
                    toast.error("Cannot fetch conversations !")
                }
            }
            catch(error) {
                toast.error("Cannot fetch conversations !", error)
            }
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
                        <span className='text-sm text-gray-400'>No available chats</span>
                    </div>}
            </ul>
        </div>
        </div>
    );
};

export default Sidebar;

