import React from "react";

function NewChat() {
  return (
    <div>
      <div className="card border-0 mb-3">
        <ul
          className="list-group list-group-flush border-0"
          style={{ backgroundColor: "#323234" }}
        >
          <li className="text-light px-1 py-2 d-block d-flex justify-content-start">
            <i
              className="fa fa-users text-success mx-2"
              style={{
                fontSize: "10px",
                borderRadius: "50%",
                backgroundColor: "#424242",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                width: "25px",
                height: "25px",
                alignItems: "center"
              }}
            ></i>
            <span className="text-success font-weight-bold">New Email</span>
          </li>
          <hr
            style={{
              margin: "0",
              color: "#959595",
              width: "90%",
              alignSelf: "center"
            }}
          />
          <li className="text-light px-1 py-2 d-block d-flex justify-content-start align-items-center">
            <i
              className="fa fa-user text-success mx-2"
              style={{
                fontSize: "10px",
                borderRadius: "50%",
                backgroundColor: "#424242",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                width: "25px",
                height: "25px",
                alignItems: "center"
              }}
            ></i>
            <span className="text-success font-weight-bold">New Group</span>
          </li>
        </ul>
      </div>
      <p
        className="text-light m-1"
        style={{ fontSize: "15px", fontWeight: "bold" }}
      >
        Your Contacts
      </p>
      <div className="card border-0">
        <ul
          className="list-group list-group-flush border-0"
          style={{ backgroundColor: "#323234" }}
        >
          {/* {connections.length > 0 ? (
            connections.map((data, i) => {
              return (
                <>
                  <li
                    key={i}
                    className="text-light px-1 py-2 d-block d-flex justify-content-start align-items-center"
                    onClick={() => handleData(data)}
                  >
                    <img
                      src={data.photos[0].url}
                      alt="User"
                      width="30"
                      height="30"
                      className="rounded-circle mx-3"
                    />
                    <div>
                      <p className="text-light font-weight-bold mb-0">
                        {data.names[0].displayName}
                      </p>
                      <p
                        className="text-light mb-0"
                        style={{ fontSize: "13px" }}
                      >
                        {data.phoneNumbers[0].value}
                      </p>
                    </div>
                  </li>
                  <hr
                    style={{
                      margin: "0",
                      color: "#959595",
                      width: "90%",
                      alignSelf: "center"
                    }}
                  />
                </>
              );
            })
          ) : (
            <div className="m-5">
              <p className="m-5 p-5 text-center">Loading... </p>
            </div>
          )} */}
        </ul>
      </div>
    </div>
  );
}

export default NewChat;
