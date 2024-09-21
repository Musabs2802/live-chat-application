import React from 'react'
import { useConversationContext } from '../../../backend/src/context/conversationContext';

const Conversation = ({ user, message, isSent }) => {
    const { setCurrentConversation } = useConversationContext();

    const handleConvoSelection = (e) => {
        setCurrentConversation(user)
    }

	return (
		<li className="p-3 hover:bg-gray-800 cursor-pointer" onClick={handleConvoSelection}>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="w-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <img src={user.displayPic}/>
                </div>
              </div>
              <div className='flex flex-col items-stretch justify-between'>
                <h3 className="text-md font-sans">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-400">{isSent ? `Sent: ${message.message}` : message.message}</p>
              </div>
            </div>
          </li>
	);
};
export default Conversation;