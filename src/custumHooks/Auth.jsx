import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import store from "./useContext";

function Auth({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [chat, setChat] = useState({});
  const [chats, setChats] = useState([]);

  const [selectedChat, setSelectedChat] = useState({});
  // useEffect(() => {
  //   let getUser = localStorage.getItem("userDetails");
  //   getUser = JSON.parse(getUser);
  //   if (getUser) {
  //     setUser(getUser);
  //   }
  // }, []);

  return (
    <store.store.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        chat,
        setChat,
        chats,
        setChats,
        selectedChat,
        setSelectedChat
      }}
    >
      {children}
    </store.store.Provider>
  );
}

export default Auth;
