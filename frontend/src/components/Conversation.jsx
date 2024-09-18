import React from 'react'

const Conversation = () => {
	return (
		<li className="p-3 hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="w-12 rounded-full bg-blue-500 flex items-center justify-center">
                    <img src='https://avatar.iran.liara.run/public'/>
                </div>
              </div>
              <div className='flex flex-col items-stretch justify-between'>
                <h3 className="text-md font-sans">Alice</h3>
                <p className="text-sm text-gray-400">Hey, how’s it going?</p>
              </div>
            </div>
          </li>
	);
};
export default Conversation;