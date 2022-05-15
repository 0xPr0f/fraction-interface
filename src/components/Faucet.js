import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FractionTokenABI } from "../utils/Fraction Token";
import "../styles/Faucet.css";

export const Faucet = () => {
  const [address, setAddress] = useState("");
  const [tokenLeft, setTokenLeft] = useState("");
  const contractaddress = "0x953f88014255241332d8841C34921572db112D65";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const Tokencontract = new ethers.Contract(
    contractaddress,
    FractionTokenABI,
    provider
  );

  useEffect(() => {
    updateUI();
    console.log(parse(window.localStorage.getItem("signer")));
  });
  async function updateUI() {
    if (
      window.localStorage.getItem("signer") !== null ||
      window.localStorage.getItem("signer") !== ""
    ) {
      const x = await Tokencontract.balanceOf(
        "0x953f88014255241332d8841C34921572db112D65"
      );
      console.log(x);
    }
  }
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
              <button
                onClick={() => {
                  login();
                }}
                className="buttonstandardFaucet"
              >
                Receive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
