import React, { useEffect, useRef, useState } from 'react';
import { IoSend } from "react-icons/io5";
import { useAuthContext } from '../context/authContext';
import { useConversationContext } from '../context/conversationContext';
import imgGuyWithDepression from '../assets/guy-with-depression.png';
import axios from 'axios';
import Chat from './Chat';
import { useSocketContext } from '../context/socketContext';

const MessageContainer = () => {
    const { authUser } = useAuthContext();
    const { socket } = useSocketContext();
    const { currentConversation, messages, setMessages } = useConversationContext();
    const [ inputMessage, setInputMessage ] = useState();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages(prevMessages => [
                ...prevMessages,
                { ...newMessage, isNew: true }
            ]);
            scrollToBottom();
        });

        return () => socket?.off("newMessage");
    }, [socket, setMessages]);
    
    useEffect(() => {
        const fetchConversation = async () => {
            if (currentConversation) {
                const res = await axios.get(`http://localhost:8080/api/message/${currentConversation._id}`, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
                if (res.status == 200) {
                    const data = await res.data.conversation.messages
                    setMessages(data)
                }
                else {
                    toast.error("Cannot fetch conversations !")
                }
            }
        }

        fetchConversation()
    }, [currentConversation]);

    const handleNewMessageSent = async () => {
        try {
            if(inputMessage.trim() !== '') {
                await axios.post(`http://localhost:8080/api/message/send/${currentConversation._id}`, { message: inputMessage }, { headers: { Authorization: `Bearer ${authUser.accessToken}` } })
            }
        }
        catch (error) {

        }
        finally {
            setInputMessage('');
        }
    }

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
            {messages?.map((m) => (
                <Chat 
                    key={m._id} 
                    message={m} 
                    incoming={m.receiverId === authUser.id}
                    isNew={m.isNew}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-gray-800 border-gray-300 flex items-center space-x-3 px-10 gap-5">
            <textarea
                type="text"
                placeholder="Type a message..."
                className="textarea textarea-bordered w-full text-sm"
                rows={2}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <IoSend className='w-10 h-10 text-gray-500 bg-gray-800 hover:bg-gray-700 p-2 rounded-lg' onClick={handleNewMessageSent}/>
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
