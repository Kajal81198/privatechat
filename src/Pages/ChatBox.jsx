import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import socketClient from "socket.io-client";
import store from "../custumHooks/useContext";
import Picker, { Theme } from "emoji-picker-react";
import { useRef } from "react";
const SERVER = "http://localhost:4000";
var socket = socketClient(SERVER);

function ChatBox() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [messageContent, setMessageContent] = useState("");
  const [chat_id, chat_user, reqUser] = params.id.split("&");
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const { fetchPost, fetchWithPostCredential } = useContext(store.apistore);
  const [showEmojis, setShowEmojis] = useState(false);
  const scroll = useRef();
  function handleBack() {
    navigate(-1);
  }

  async function handelSend() {
    const data = await fetchWithPostCredential("message/", {
      content: messageContent,
      chatId: chat_id
    });
    if (data.status) {
      toast.success("message Fired");
      setMessageContent("");
      setAllMessages([...allMessages, data.msg]);
      socket.emit("new_msg", data.msg);
    } else if (data.error === "unauthroized") {
      navigate("/login");
    }
  }
  async function allMessagesGet() {
    const data = await fetchWithPostCredential("message/" + chat_id, {});
    console.log("data", data);
    if (data.status) {
      setAllMessages(data.msg);
      socket.emit("join_room", chat_id);
    } else if (data.error === "unauthroized") {
      navigate("/login");
    }
  }

  useEffect(() => {
    socket.emit("setup", { data: { _id: reqUser } });
    socket.on("connection", () => {
      console.log(`I'm connected with the back-end`);
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", newMessage => {
      console.log("new messag =====>", newMessage);
      // if (allMessagesCopy || allMessagesCopy._id !== newMessage._id) {
      // } else {
      setAllMessages([...allMessages, newMessage]);
      // }
    });
  });

  useEffect(() => {
    allMessagesGet();
  }, [chat_id]);

  useEffect(() => {
    // window.scrollTo(0, document.body.scrollHeight);
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    emojiNameToUnicode();
  }, [allMessages]);

  function emojiNameToUnicode(name = "alice") {
    console.log(
      "okaay =====>",
      String.fromCodePoint(...name.split("-").map(n => parseInt(n, 16)))
    );
    return String.fromCodePoint(...name.split("-").map(n => parseInt(n, 16)));
  }

  return (
    <section className="chat ">
      <div className="header-chat">
        <i className="icon fa fa-user-o" aria-hidden="true"></i>
        <p className="name">{chat_user}</p>
        <i
          className="icon clickable fa fa-ellipsis-h right"
          aria-hidden="true"
        ></i>
        <h3 style={{ display: "inline" }}>U+1F644;</h3>
      </div>
      <div className="messages-chat">
        {allMessages.length > 0 ? (
          allMessages.slice(0).map((message, index) => {
            const sender = message.sender;
            const selfId = reqUser;
            const messageTime = message.createdAt.split("T")[1].split(".")[0];
            if (sender._id === selfId) {
              return (
                <div
                  className="d-flex flex-row justify-content-end mb-4"
                  ref={scroll}
                >
                  <div
                    className="p-3 me-3 "
                    style={{ borderRadius: "15px", backgroundColor: "#198754" }}
                  >
                    <p className="small mb-0 text-light">{message.content}</p>
                    <div className="d-flex flex-row justify-content-end">
                      <p className="time align-self-end m-0  pt-1">
                        {messageTime}
                      </p>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="d-flex flex-row justify-content-start mb-4"
                  ref={scroll}
                >
                  <div
                    className="p-3 ms-3 mx-3"
                    style={{
                      borderRadius: "15px",
                      backgroundColor: "#3e3e3e7a"
                    }}
                  >
                    <p className="small mb-0 text-light">{message.content}</p>
                    <div className="d-flex flex-row justify-content-end">
                      <p className="time align-self-end m-0 pt-1">
                        {messageTime}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <></>
        )}
      </div>
      <div className="row">
        <div
          className={
            showEmojis
              ? "d-flex align-items-center w-100"
              : "d-flex align-items-center position-fixed bottom-0 w-100"
          }
          style={{
            backgroundColor: "#212529",
            borderTop: "2px solid #48474799",
            position: "relative"
          }}
        >
          <i
            className="icon fa fa-smile-o clickable "
            style={{ fontSize: "25pt" }}
            aria-hidden="true"
            onClick={() => setShowEmojis(!showEmojis)}
          ></i>
          <input
            type="text"
            className="write-message"
            placeholder="Type your message here"
            value={messageContent}
            onChange={e => {
              setMessageContent(e.target.value);
            }}
            onKeyDown={event => {
              console.log(event.code);
              if (event.code == "Enter") {
                handelSend();
              }
            }}
          />
          <i
            className="icon send fa fa-paper-plane-o clickable"
            aria-hidden="true"
            onClick={() => handelSend()}
          ></i>
        </div>
        {showEmojis && (
          <div>
            <Picker
              className="dark"
              onEmojiClick={emoji => {
                console.log("getdata == ", emoji);
                if (emoji.emoji.length > 4) {
                  // const data = emojiNameToUnicode(emoji.emoji);
                  // console.log("data", data);
                  // setMessageContent(
                  //   messageContent + `<img src=${emoji.imageUrl} />`
                  // );
                }
                setMessageContent(messageContent + emoji.emoji);
              }}
              customEmojis={[
                {
                  names: ["Alice", "alice in wonderland"],
                  imgUrl:
                    "https://cdn.jsdelivr.net/gh/ealush/emoji-picker-react@custom_emojis_assets/alice.png",
                  id: "alice"
                }
              ]}
            />
          </div>
        )}
      </div>

      <ToastContainer />
    </section>
  );
}

export default ChatBox;
