import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../custumHooks/useContext";

function Register() {
  const navigate = useNavigate();
  const { fetchPost } = useContext(store.apistore);
  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPass: ""
  });

  const [loader, setLoader] = useState(false);

  function handleChanges(e) {
    setRegisterDetails(pre => ({ ...pre, [e.target.name]: e.target.value }));
  }

  async function handleRegister() {
    setLoader(true);
    if (
      registerDetails.email === "" ||
      registerDetails.name === "" ||
      registerDetails.password === "" ||
      registerDetails.reEnterPass === ""
    ) {
      toast.warning("Please Fill All the details");
      setLoader(false);
    }
    if (registerDetails.password !== registerDetails.reEnterPass) {
      toast.warning("Password and Repeat password must be same");
      setLoader(false);
    }
    const data = await fetchPost("register", registerDetails);
    if (data.status) {
      toast.success(data.msg);
      setLoader(false);
      setRegisterDetails({
        name: "",
        email: "",
        password: "",
        reEnterPass: ""
      });
    } else {
      toast.error(data.msg);
      setLoader(false);
    }
    console.log(data);
  }
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center mt-5">
        <div className="col-lg-12 col-xl-11">
          <div
            className="card text-light"
            style={{
              borderRadius: "25px",
              backgroundColor: "rgb(28 28 28 / 67%)"
            }}
          >
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12 col-xl-5 order-1 order-lg-1 text-center mt-4">
                  <img
                    src="/images/logo.png"
                    className="img-fluid"
                    alt="Sample image"
                    width={"50%"}
                  />
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Register
                  </p>

                  <form className="mx-1 mx-md-4">
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fa fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          name="name"
                          style={{
                            backgroundColor: "#2c2b2b54",
                            border: "none",
                            color: "#fff"
                          }}
                          value={registerDetails.name}
                          onChange={e => handleChanges(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fa fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          name="email"
                          style={{
                            backgroundColor: "#2c2b2b54",
                            border: "none",
                            color: "#fff"
                          }}
                          value={registerDetails.email}
                          onChange={e => handleChanges(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fa fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          style={{
                            backgroundColor: "#2c2b2b54",
                            border: "none",
                            color: "#fff"
                          }}
                          value={registerDetails.password}
                          onChange={e => handleChanges(e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fa fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Repeat your password"
                          name="reEnterPass"
                          style={{
                            backgroundColor: "#2c2b2b54",
                            border: "none",
                            color: "#fff"
                          }}
                          value={registerDetails.reEnterPass}
                          onChange={e => handleChanges(e)}
                          required
                        />
                      </div>
                    </div>
                    <div
                      className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      style={{ cursor: loader ? "not-allowed" : "" }}
                    >
                      <button
                        type="button"
                        className="btn btn-success btn-lg"
                        onClick={() => handleRegister()}
                        disabled={loader}
                      >
                        {loader ? (
                          <div className="text-center mx-4">
                            <div
                              className="spinner-border text-light spinner-border-sm"
                              role="status"
                            ></div>
                          </div>
                        ) : (
                          <>Register</>
                        )}
                      </button>
                    </div>

                    <div className="form-check d-flex justify-content-center mb-5">
                      <label className="form-check-label" for="form2Example3">
                        Already Registered!{" "}
                        <span
                          className="text-success"
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          Login
                        </span>
                      </label>
                    </div>
                  </form>
                </div>
                {/* <div className="d-none d-sm-block d-lg-block d-flex text-center justify-content-center col-md-10 col-lg-6 col-xl-7  order-2 order-lg-2">
                  <img
                    src="/images/register.svg"
                    className="img-fluid "
                    alt="Sample image"
                    width={"50%"}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
