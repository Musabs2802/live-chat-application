import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const useConversationContext = () => {
    return useContext(ConversationContext);
}

export const ConversationContextProvider = ({ children }) => {
    const [ currentConversation, setCurrentConversation ] = useState(null)
    const [ messages, setMessages ] = useState([]);

    return <ConversationContext.Provider value={{ currentConversation, setCurrentConversation, messages, setMessages }}>
        {children}
    </ConversationContext.Provider>
}