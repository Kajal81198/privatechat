import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import store from "../custumHooks/useContext";

function Chats() {
  const navigate = useNavigate();
  const { chats, user } = useContext(store.store);
  return (
    <div className="mt-6 mx-1 overflow-auto">
      {chats.length > 0 ? (
        chats.map((conversation, i) => {
          var chatname = "";
          if (conversation.isGroupChat) {
            chatname = conversation.chatName;
          } else {
            conversation.users.map(User => {
              if (User._id !== user) {
                chatname = User.name;
              }
            });
          }
          // console.log(conversation);
          return (
            <div key={i} className=" ">
              <div
                className="card w-100"
                style={{
                  borderBottom: "1px solid ",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderColor: "rgb(60, 61, 62)"
                }}
              >
                <div
                  className="d-flex align-items-center bg-dark"
                  onClick={() => {
                    navigate(
                      "/chat-box/" +
                        conversation._id +
                        "&" +
                        chatname +
                        "&" +
                        user
                    );
                  }}
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
                    alt="User"
                    width="50"
                    height="50"
                    className="rounded-circle mx-3"
                  />
                  <div className="card-body text-light">
                    <h5 className="card-title">{chatname}</h5>
                    {!conversation.latestMessage ? (
                      <p className="card-text" style={{ fontSize: "11px" }}>
                        No previous messages, Click here to start a new chat
                      </p>
                    ) : (
                      <p className="card-text" style={{ fontSize: "11px" }}>
                        {conversation.latestMessage.content}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="m-5">
          <p className="m-5 p-5 text-center text-light">No data </p>
        </div>
      )}
    </div>
  );
}

export default Chats;
