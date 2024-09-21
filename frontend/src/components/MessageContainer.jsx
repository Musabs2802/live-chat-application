import React, { useEffect, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useAuthContext } from '../../../backend/src/context/authContext';
import { useConversationContext } from '../../../backend/src/context/conversationContext';
import imgGuyWithDepression from '../assets/guy-with-depression.png';
import axios from 'axios';
import Chat from './Chat';

const MessageContainer = () => {
    const { authUser } = useAuthContext();
    const { currentConversation } = useConversationContext();
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const fetchConversation = async () => {
            if (currentConversation) {
                const res = await axios.get(`http://localhost:8080/api/message/${currentConversation._id}`, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
                if (res.status == 200) {
                    const data = await res.data.conversation
                    setMessages(data)
                }
                else {
                    toast.error("Cannot fetch conversations !")
                }
            }
        }

        fetchConversation()
    }, [currentConversation]);
    
    console.log(messages);

    return currentConversation ? (
        <div className="flex flex-col h-screen w-full">
        {/* Chat Header */}
        <div className="p-4 bg-gray-800 text-white flex justify-between items-center border-b border-gray-700">
            <div className="flex items-center space-x-3">
            <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <img src={currentConversation.displayPic}/>
                </div>
            </div>
            <div>
                <h3 className="text-md font-sans">{currentConversation.firstName} {currentConversation.lastName}</h3>
                {/* <p className="text-sm text-gray-400">Last seen at 2:30 PM</p> */}
            </div>
            </div>
            <div className="flex items-center space-x-3">

            </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
            {messages?.messages?.map((m) => (
                <Chat key={m._id} message={m} incoming={m.receiverId==authUser.id} />
            ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-gray-800 border-gray-300 flex items-center space-x-3 px-10 gap-5">
            <input
            type="text"
            placeholder="Type a message..."
            className="input input-bordered w-full"
            />
            <IoSend className='w-8 h-8 text-gray-500'/>
        </div>
        </div>
    ) : 
    <div className="flex flex-col h-screen w-full">
        <div className='flex flex-col p-4 h-screen bg-gray-800 text-white justify-center items-center border-b border-gray-700'>
            <img src={imgGuyWithDepression} className='w-52 h-52'/>
            <span className='text-sm text-gray-400'>No conversations to show</span>
        </div>
    </div>
};

export default MessageContainer;
