import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../custumHooks/useContext";
import Modal from "./Modal";

function Navbar() {
  const { user } = useContext(store.store);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  console.log(user)
  const handelLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const openModal = () => {
    setModal(prev => !prev);
  };
  return (
    <nav
      className="navbar navbar-dark bg-dark fixed-top "
      style={{
        borderColor: "#3c3d3e",
        borderStyle: "solid",
        borderWidth: "1px"
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center">
          <img
            src={user.picture ? user.picture : "/images/user.png"}
            alt="Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top rounded-circle"
            onClick={() => openModal()}
          />
          <span className="m-2" style={{fontSize: "15px"}}>{user.name ? user.name : ""}</span>
        </a>
        <button
          className="btn btn-outline-success"
          type="button"
          onClick={() => handelLogout()}
        >
          LogOut
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
