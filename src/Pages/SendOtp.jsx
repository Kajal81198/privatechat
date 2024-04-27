import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import store from "../custumHooks/useContext";

function SendOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  const inputs = [1, 2, 3, 4, 5, 6];
  const [otp, setOtp] = useState({});
  const [loader, setLoader] = useState(false);
  const { fetchPost, fetchWithPostCredential } = useContext(store.apistore);
  function handleInput(e) {
    setOtp(pre => ({ ...pre, [e.target.id]: e.target.value }));
  }

  function getFullOtp() {
    let fullOtp = "";
    for (let key in otp) {
      if (otp.hasOwnProperty(key)) {
        fullOtp = fullOtp.concat(`${otp[key]}`);
      }
    }
    if (fullOtp.length !== 6) {
      return { error: "Please fill valid code" };
    }
    return fullOtp;
  }

  async function handleVerify() {
    setLoader(true);
    const getOtp = getFullOtp();
    if (getOtp.error) {
      toast.warning(getOtp.error);
      setLoader(false);
    } else {
      const data = await fetchWithPostCredential("verify_account", {
        email: location?.state.email,
        otp: Number(getOtp)
      });

      if (data.status) {
        navigate("/");
      }
      console.log(data);
    }
  }

  

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="position-relative bg-dark">
        <div
          className="card p-2 text-center"
          style={{ backgroundColor: "rgba(28, 28, 28, 0.67)" }}
        >
          <h6 className="text-light">
            Please enter the one time password <br /> to verify your account
          </h6>
          <div>
            {" "}
            <span className="text-light">A code has been sent to</span>{" "}
            <small className="text-success">{location?.state?.email}</small>{" "}
          </div>{" "}
          <div
            id="otp"
            className="inputs d-flex flex-row justify-content-center mt-2"
          >
            {console.log(otp)}
            {inputs.map((data, i) => {
              return (
                <input
                  key={i}
                  className="m-2 text-center form-control rounded"
                  style={{
                    backgroundColor: "rgba(28, 28, 28, 0.67)",
                    border: "1px solid #198754",
                    color: "white"
                  }}
                  type="text"
                  id={`first${i}`}
                  maxlength="1"
                  value={otp[`first${i}`]}
                  onChange={e => handleInput(e)}
                />
              );
            })}{" "}
          </div>{" "}
          <div className="mt-4">
            {" "}
            <button
              className="btn btn-success px-4 validate"
              type="button"
              onClick={() => handleVerify()}
              // disabled={loader}
            >
              {loader ? (
                <div className="text-center mx-4">
                  <div
                    className="spinner-border text-light spinner-border-sm"
                    role="status"
                  ></div>
                </div>
              ) : (
                <>Varify</>
              )}
            </button>{" "}
          </div>{" "}
        </div>{" "}
      </div>
      <ToastContainer />
    </div>
  );
}

export default SendOtp;
