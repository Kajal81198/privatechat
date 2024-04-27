import React from "react";
import { useNavigate } from "react-router-dom";

function FloatButton() {
  const navigate = useNavigate();
  function fetchContacts() {
    navigate("/contacts");
  }
  return (
    <div className="position-fixed bottom-0 end-0 m-3">
      <button
        className="btn btn-success rounded-circle"
        type="button"
        onClick={() => fetchContacts()}
      >
        +
      </button>
    </div>
  );
}

export default FloatButton;
