import React, { useEffect } from 'react';
import { useAuthContext } from '../../../backend/src/context/authContext';
import { useConversationContext } from '../../../backend/src/context/conversationContext';
import axios from 'axios';

const MessageContainer = ({ targetId }) => {
    const { authUser } = useAuthContext();
    const { currentConversation, setCurrentConversation } = useConversationContext();

    console.log(currentConversation);

    // useEffect(() => {
    //     const fetchConversation = async () => {
    //         const res = await axios.get(`http://localhost:8080/api/message/${currentConversation.id}`, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
    //     }

    //     fetchConversation()
    // })
    
    return (
        <div className="flex flex-col h-screen w-full">
        {/* Chat Header */}
        <div className="p-4 bg-gray-800 text-white flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center space-x-3">
            <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <img src={authUser.displayPic}/>
                </div>
            </div>
            <div>
                <h3 className="text-md font-sans">{authUser.firstName} {authUser.lastName}</h3>
                {/* <p className="text-sm text-gray-400">Last seen at 2:30 PM</p> */}
            </div>
            </div>
            <div className="flex items-center space-x-3">
            <button className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553 4.553M19.553 14.553L15 10m0 0L5 20M5 10l4.553 4.553" />
                </svg>
            </button>
            <button className="btn btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        </div>

        {/* Chat Body - Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
            {/* Outgoing Message */}
            <div className="chat chat-end mb-4">
            <div className="chat-bubble" style={{ backgroundColor: '#D1C4E9', color: '#000000' }}>
                Hey Alice, how are you doing?
            </div>
            <p className="text-xs text-gray-500 text-right">2:32 PM</p>
            </div>

            {/* Incoming Message */}
            <div className="chat chat-start mb-4">
            <div className="chat-bubble" style={{ backgroundColor: '#E1F5FE', color: '#000000' }}>
                Hi! I’m doing great, thank you! How about you?
            </div>
            <p className="text-xs text-gray-500">2:35 PM</p>
            </div>

            {/* Another Outgoing Message */}
            <div className="chat chat-end mb-4">
            <div className="chat-bubble" style={{ backgroundColor: '#D1C4E9', color: '#000000' }}>
                I’m good, just working on a project right now.
            </div>
            <p className="text-xs text-gray-500 text-right">2:36 PM</p>
            </div>

            {/* Incoming Message */}
            <div className="chat chat-start mb-4">
            <div className="chat-bubble" style={{ backgroundColor: '#E1F5FE', color: '#000000' }}>
                That sounds awesome! Let’s catch up later this week.
            </div>
            <p className="text-xs text-gray-500">2:37 PM</p>
            </div>

            {/* Add more messages here */}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-gray-800 border-gray-300 flex items-center space-x-3">
            <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
            />
            <button className="btn">Send</button>
        </div>
        </div>
    );
};

export default MessageContainer;
