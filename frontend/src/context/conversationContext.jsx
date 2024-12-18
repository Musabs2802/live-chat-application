import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const useConversationContext = () => {
    return useContext(ConversationContext);
}

export const ConversationContextProvider = ({ children }) => {
    const [ currentConversation, setCurrentConversation ] = useState(null)
    const [ isProfilePage, setProfilePage ] = useState(false)
    const [ messages, setMessages ] = useState([]);

    return <ConversationContext.Provider value={{ currentConversation, setCurrentConversation, messages, setMessages, isProfilePage, setProfilePage }}>
        {children}
    </ConversationContext.Provider>
}