import { useAuthContext } from "./authContext";
import io from "socket.io-client"
import { createContext, useState, useEffect, useContext } from "react";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [ socket, setSocket ] = useState(null);
    const [ onlineUsers, setOnlineUsers ] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("http://localhost:8080", { query: { userId: authUser.id }, transports : ['websocket'] })

            setSocket(socket)

            socket.on("onlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close();
        }
        else {
            if(socket) {
                socket.close()
                setSocket(null);
            }
        }
    }, [])
    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
}