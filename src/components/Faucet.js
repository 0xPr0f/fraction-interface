import React, { useEffect, useState } from "react";
import { web3Modal } from "../App";
import { ethers } from "ethers";
import { FractionTokenABI } from "../abis/FractionTokenABI ";
import "../styles/Faucet.css";

export const Faucet = () => {
  const [address, setAddress] = useState("");
  const [tokenLeft, setTokenLeft] = useState("");
  const contractaddress = "0x953f88014255241332d8841C34921572db112D65";
  var Tokencontract;
  useEffect(() => {
    loadContract();
  });

  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      Tokencontract = new ethers.Contract(
        contractaddress,
        FractionTokenABI,
        library.getSigner()
      );
      const x = await Tokencontract.balanceOf(
        "0x953f88014255241332d8841C34921572db112D65"
      );
      setTokenLeft(Number.parseFloat(x.toString()));
    }
  }

  async function requestFunds() {
    const tx = await Tokencontract.Faucetmint(address);
    await tx.wait();
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
              Tokens in Faucet : {tokenLeft / 10 ** 18} FRACT
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
                  requestFunds();
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
