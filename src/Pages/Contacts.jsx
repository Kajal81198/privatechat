import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import store from "../custumHooks/useContext";

function Contacts() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchPost, fetchWithPostCredential, fetchExternalGet } = useContext(
    store.apistore
  );
  const [connections, setConnections] = useState([]);
  const [search, setSearch] = useState(location?.state ? location.state : "");
  const [emaild, setEmaild] = useState({ delieverable: false, invite: true });
  const [userDetails, setUserDetails] = useState({});
  const [chats, setChats] = useState([]);

  async function getExistsUsers() {
    const data = await fetchWithPostCredential("fetch_users", {});
    if (data.status) {
      setChats(data.msg);
    } else if (data.error === "unauthroized") {
      navigate("/login");
    }
  }

  async function handleData(data) {
    navigate("/invite", {
      state: data
    });
  }

  async function handelChat(data) {
    console.log(data);
    const response = await fetchWithPostCredential("chat/access_chat", {
      userId: data._id
    });

    console.log(response);

    // if (data.status) {
    //   setChats(data.msg);
    // } else if (data.error === "unauthroized") {
    //   navigate("/login");
    // }
    // navigate("/chat-box", {
    //   state: data
    // });
  }
  useEffect(() => {
    getExistsUsers();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      let checkSearch = search.split("@");
      var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const checkEmail = re.test(String(search).toLowerCase().trim());

      if (checkSearch[0].length > 6 && checkEmail) {
        const getData = await fetchExternalGet(
          `https://emailvalidation.abstractapi.com/v1/?api_key=c49437bf0b804d6080b541f14ef89d7e&email=${search}`
        );
        if (getData.deliverability === "DELIVERABLE") {
          const checkUserExists = await fetchPost("check_user_register", {
            email: String(search).toLowerCase().trim()
          });
          if (checkUserExists.msg) {
            setUserDetails(checkUserExists.userDetails);
            setEmaild({ delieverable: true, invite: false });
          } else {
            setEmaild({ delieverable: true, invite: true });
          }
        }
      } else {
        setEmaild({ ...emaild, delieverable: false });
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center position-relative">
        {" "}
        <p
          className="text-light mt-3 text-center "
          style={{ fontWeight: "bold" }}
        >
          New Chat
        </p>
        <div className="d-flex flex-end position-absolute" style={{ right: 0 }}>
          <i
            className="fa fa-times text-light"
            style={{
              fontSize: "10px",
              borderRadius: "50%",
              backgroundColor: "#333234",
              borderRadius: "50%",
              color: "#9E9FA5",
              display: "flex",
              justifyContent: "center",
              width: "25px",
              height: "25px",
              alignItems: "center"
            }}
            aria-hidden="true"
            onClick={() => {
              navigate(-1);
            }}
          ></i>
        </div>
      </div>
      <div className="input-group mb-3" style={{ borderRadius: 0 }}>
        <i
          className="input-group-text fa fa-search border-0"
          style={{
            color: "#7D7D7D",
            backgroundColor: "#323234",
            borderTopLeftRadius: "5px",
            textAlign: "center"
          }}
          id="basic-addon1"
        ></i>
        <input
          type="text"
          className="form-control"
          placeholder="Search Email"
          name="search"
          aria-describedby="basic-addon1"
          style={{
            backgroundColor: "#323234",
            border: "none",
            color: "white"
          }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {emaild.delieverable ? (
        <div className="card border-0">
          <ul
            className="list-group list-group-flush border-0"
            style={{ backgroundColor: "#323234" }}
          >
            <li className="text-light px-1 py-2 d-block d-flex justify-content-start align-items-center  position-relative">
              <img
                src="images/user.png"
                alt="User"
                width="30"
                height="30"
                className="rounded-circle mx-3"
              />

              {emaild.invite ? (
                <div className=" px-2 py-2 d-flex justify-content-start align-items-center">
                  <h6 className="text-light font-weight-bold mb-0">{search}</h6>
                  <p
                    className="text-light mb-0 position-absolute"
                    style={{ fontSize: "13px", right: "15px" }}
                  >
                    <button
                      className="btn btn-success"
                      onClick={() => handleData(search)}
                    >
                      Invite
                    </button>
                  </p>
                </div>
              ) : (
                <div
                  className=" px-2 py-2 d-flex justify-content-start align-items-center"
                  onClick={() => handelChat()}
                >
                  <h6 className="text-light font-weight-bold mb-0">{search}</h6>
                </div>
              )}
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <label className="text-light">People Present On This Chat App</label>
          {search === "" ? (
            <div className="card border-0">
              <ul
                className="list-group list-group-flush border-0"
                style={{ backgroundColor: "#323234" }}
              >
                {chats.length > 0 ? (
                  chats.map((data, i) => {
                    return (
                      <li
                        key={i}
                        className="text-light px-1 py-2 d-block d-flex justify-content-start align-items-center  position-relative"
                      >
                        <img
                          src={data.picture ? data.picture : "images/user.png"}
                          alt="User"
                          width="30"
                          height="30"
                          className="rounded-circle mx-3"
                        />

                        <div
                          className=" px-2 py-2 d-flex justify-content-start align-items-center"
                          onClick={() => handelChat(data)}
                        >
                          <h6 className="text-light font-weight-bold mb-0">
                            {data.name}
                          </h6>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <div className=" d-flex m-5 justify-content-center">
                    <img
                      style={{ opacity: "0.5", width: 100 }}
                      src="images/no_search.svg"
                    />
                  </div>
                )}
              </ul>
            </div>
          ) : (
            <div className="m-5">
              <div className=" d-flex m-5 justify-content-center">
                <img
                  style={{ opacity: "0.5", width: 100 }}
                  src="images/no_search.svg"
                />
                <p className="m-5 p-5 text-center text-light">Invalid Email </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Contacts;
