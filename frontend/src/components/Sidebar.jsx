import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import SearchBar from './SearchBar';
import Conversation from './Conversation';
import { useAuthContext } from '../context/authContext';
import { useSocketContext } from '../context/socketContext';
import notificationSound from '../assets/audios/notification.mp3';
import { useConversationContext } from '../context/conversationContext';

const Sidebar = () => {
    const { authUser } = useAuthContext();
    const { onlineUsers, socket } = useSocketContext();
    const { setProfilePage } = useConversationContext();
    const [conversations, setConversations] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);

    const handleSearch = async (e) => {
        const query = e.target.value;
        if (query) {
            axios
                .get(`${import.meta.env.VITE_SERVER_URL}/user/search/${query}`, {
                    headers: { Authorization: `Bearer ${authUser.accessToken}` },
                })
                .then((res) => setSearchUsers(res.data))
                .catch((error) => {
                    if(error.response.status === 500) {
                        toast.error("Something is wrong!")
                    }
                    else {
                        toast.error(error.response.data.message)
                    }    
                });
        } else {
            setSearchUsers([]);
        }
    };

    const getConversations = async () => {
        axios
            .get(`${import.meta.env.VITE_SERVER_URL}/user/all`, {
                headers: { Authorization: `Bearer ${authUser.accessToken}` },
            })
            .then((res) => setConversations(res.data?.users))
            .catch((error) => {
                if(error.response.status === 500) {
                    toast.error("Something is wrong!")
                }
                else {
                    toast.error(error.response.data.message)
                }
            });
    };

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            if (conversations.some((c) => c.user._id === newMessage.senderId)) {
                setConversations((prev) =>
                    prev.map((c) =>
                        c.user._id === newMessage.senderId
                            ? { ...c, message: newMessage }
                            : c
                    )
                );
            } else {
                getConversations();
            }

            new Audio(notificationSound).play();
        });

    }, [socket, conversations]);

    useEffect(() => {
        getConversations();
    }, []);

    return (
        <div className="w-1/4 sm:w-1/2 h-screen bg-gray-900 text-white flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 flex items-center justify-between bg-gray-800 border-gray-700">
                <h2 className="card-title text-center">Chats</h2>
                <div className="flex items-center justify-between space-x-4">
                    <div
                        className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center cursor-pointer"
                        onClick={() => setProfilePage(true)}
                    >
                        <img
                            src={authUser.displayPic}
                            alt="Profile"
                        />
                    </div>
                </div>
            </div>

            <SearchBar handleSearch={handleSearch} />

            <div className="flex-1 overflow-y-auto bg-gray-900">
                <ul className="divide-y divide-gray-700">
                    {searchUsers.length > 0
                        ? searchUsers.map((u) => (
                              <Conversation
                                  key={u._id}
                                  user={u}
                                  isOnline={onlineUsers.includes(u._id)}
                              />
                          ))
                        : conversations.length > 0
                        ? conversations.map((convo) => (
                              <Conversation
                                  key={convo.user._id}
                                  user={convo.user}
                                  message={convo.message}
                                  isSent={convo.message.senderId === authUser.id}
                                  isOnline={onlineUsers.includes(convo.user._id)}
                              />
                          ))
                        : (
                            <div className="p-3 hover:bg-gray-800 cursor-pointer">
                                <span className="text-sm text-gray-400 mx-3">
                                    No available chats
                                </span>
                            </div>
                          )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
