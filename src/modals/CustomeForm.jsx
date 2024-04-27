import React from "react";
import { ToastContainer } from "react-toastify";

function CustomeForm({
  heading,
  inputs,
  buttonName,
  handleButton,
  details,
  handleChanges,
  loader,
  setLoader
}) {
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
                    {heading}
                  </p>

                  <form className="mx-1 mx-md-4">
                    {inputs.length > 0 ? (
                      inputs.map((data, i) => {
                        return (
                          <div
                            key={i}
                            className="d-flex flex-row align-items-center mb-4"
                          >
                            <i
                              className={`fa ${data.icon} fa-lg me-3 fa-fw`}
                            ></i>
                            <div className="form-outline flex-fill mb-0">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={`Your ${data.name}`}
                                name={`${data.name}`}
                                style={{
                                  backgroundColor: "#2c2b2b54",
                                  border: "none",
                                  color: "#fff"
                                }}
                                value={details[`${data.name}`]}
                                onChange={e => handleChanges(e)}
                                required
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                    <div
                      className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                      style={{ cursor: loader ? "not-allowed" : "" }}
                    >
                      <button
                        type="button"
                        className="btn btn-success btn-lg"
                        onClick={() => handleButton()}
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
                          <>{buttonName}</>
                        )}
                      </button>
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

export default CustomeForm;
