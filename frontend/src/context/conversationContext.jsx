import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

export const useConversationContext = () => {
    return useContext(ConversationContext);
}

export const ConversationContextProvider = ({ children }) => {
    const [currentConversation, setCurrentConversation] = useState(null)

    return <ConversationContext.Provider value={{ currentConversation, setCurrentConversation }}>
        {children}
    </ConversationContext.Provider>
}