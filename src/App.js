import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApiContext from "./custumHooks/ApiCustomHook";
import Auth from "./custumHooks/Auth";
import ChatBox from "./Pages/ChatBox";
import Contacts from "./Pages/Contacts";
import Emojicheck from "./Pages/Emojicheck";
import HomePage from "./Pages/HomePage";
import Invite from "./Pages/Invite";
import LoginPage from "./Pages/LoginPage";
import NewChat from "./Pages/NewChat";
import Register from "./Pages/Register";
import SendEmail from "./Pages/SendEmail";
import SendOtp from "./Pages/SendOtp";
function App() {
  return (
    <BrowserRouter>
      <Auth>
        <ApiContext>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/chat-box/:id" element={<ChatBox />} />
            <Route path="/otp" element={<SendOtp />} />
            <Route path="/emoji" element={<Emojicheck />} />

            {/* <Route path="/new-chat" element={<NewChat />} /> */}

            {/* <Route path="/send" element={<SendEmail />} /> */}
          </Routes>
        </ApiContext>
      </Auth>
    </BrowserRouter>
  );
}

export default App;
