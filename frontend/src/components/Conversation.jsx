import React from 'react'
import { useConversationContext } from '../context/conversationContext';

const Conversation = ({ user, message, isSent, isOnline }) => {
    const { setCurrentConversation } = useConversationContext();

    const handleConvoSelection = (e) => {
        setCurrentConversation(user)
    }

	return (
		<li className="p-3 hover:bg-gray-800 cursor-pointer" onClick={handleConvoSelection}>
            <div className="flex items-center space-x-3">
                <div className="avatar relative">
                <div className="w-12 rounded-full bg-gray-500 flex items-center justify-center relative">
                    <img src={user.displayPic} alt={`${user.firstName} ${user.lastName}`} />
                </div>
                    {isOnline ? <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-800"></div> : <></> }
                </div>
                <div className='flex flex-col items-stretch justify-between'>
                <h3 className="text-md font-sans">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-400">{message ? isSent ? `Sent: ${message.message}` : message.message : user.username}</p>
                </div>
            </div>
        </li>

	);
};
export default Conversation;