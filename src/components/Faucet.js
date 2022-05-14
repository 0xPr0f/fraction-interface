import React, { useState } from "react";
import "../styles/Faucet.css";

export const Faucet = () => {
  const [address, setAddress] = useState("");
  const [tokenLeft, setTokenLeft] = useState("1000000");
  return (
    <div>
      {" "}
      <div>
        <br />
        <br />

        <div
          className="wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="pagebox">
            <h2> Receive FRACT Tokens</h2>
            <span
              style={{
                // marginTop: "0px",
                fontSize: "14px",
                float: "left",
              }}
            >
              Tokens left in Faucet : {tokenLeft} FRACT
            </span>
            <br />
            <div>
              <input
                type="text"
                className="inputFaucet"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />

              <span
                style={{
                  // marginTop: "0px",
                  marginLeft: "60px",
                  fontSize: "14px",
                  float: "left",
                }}
              >
                Tokens to recieve : 1000 FRACT
              </span>
            </div>
            <br />
            <div className="buttonCard">
              <button className="buttonstandardFaucet">Receive</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
