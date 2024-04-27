import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ApiContext from "../custumHooks/ApiCustomHook";
import store from "../custumHooks/useContext";
import FloatButton from "../Shared/FloatButton";
import Modal from "../Shared/Modal";
import Navbar from "../Shared/Navbar";
import ChatBox from "./ChatBox";
import Chats from "./Chats";

function HomePage() {
  const navigate = useNavigate();
  const { setChats, setUser } = useContext(store.store);
  const { fetchPost, fetchWithPostCredential } = useContext(store.apistore);

  async function getChatsData() {
    const data = await fetchWithPostCredential("chat/fetch_chats", {});
    console.log("data", data)
    if (data.status) {
      setChats(data.msg.results);
      setUser(data.msg.reqUser);
    } else if (data.error === "unauthroized") {
      navigate("/login");
    }
  }

  useEffect(() => {
    getChatsData();
  }, []);

  return (
    <div>
      <Navbar />
      <Chats />

      <FloatButton />
      {/* <ChatBox /> */}
    </div>
  );
}

export default HomePage;
