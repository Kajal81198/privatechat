import React from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import store from "../custumHooks/useContext";

function Invite() {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchPost } = useContext(store.apistore);
  console.log(location);
  function handleBack() {
    navigate("/contacts", { state: location.state });
  }
  return (
    <div>
      <div className="card text-center bg-dark border-0">
        <div className=" text-light" onClick={() => handleBack()}>
          {"<- "}
          Go Back
        </div>

        <div className="card-body">
          <h5 className="card-title text-light">
            Invite Your Friend{" "}
            <span className="text-success">{location?.state}</span>
          </h5>

          <p className="card-text">
            <img
              className=" avatar mx-2 "
              src="images/user.png"
              alt="..."
              style={{ borderRadius: "50%" }}
            />
          </p>
          <p className=" text-light">{location?.state}</p>
          <p className="text-light">
            share your invite link to get your people on board. Click on invite
            button for sending invite mail
          </p>

          <button
            className="btn btn-success"
            // onClick={() => handleInvite()}
          >
            INVITE
          </button>
        </div>
      </div>
    </div>
  );
}

export default Invite;
