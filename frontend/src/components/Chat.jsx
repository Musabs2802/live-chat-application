import React from 'react'

const Chat = ({ message, incoming, isNew }) => {
    const formattedTime = new Date(message.createdAt).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

    return incoming ? (
                <div className={`chat chat-start mb-4 ${isNew ? 'animate-shake' : ''}`}>
                    <div className="chat-bubble" style={{ backgroundColor: '#161b26', color: '#FFFFFF' }}>
                        <p className='text-sm'>{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500">{formattedTime}</p>
                </div>
    ) : (
                <div className={`chat chat-end mb-4 ${isNew ? 'animate-shake' : ''}`}>
                    <div className="chat-bubble" style={{ backgroundColor: '#5542f6', color: '#FFFFFF' }}>
                        <p className='text-sm'>{message.message}</p>
                    </div>
                    <p className="text-xs text-gray-500 text-right">{formattedTime}</p>
                </div>
    );
}

export default Chat
