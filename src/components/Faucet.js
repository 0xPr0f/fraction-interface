import React, { useEffect, useState } from "react";
import { web3Modal } from "../App";
import { ethers } from "ethers";
import { FractionTokenABI } from "../abis/FractionTokenABI ";
import "../styles/Faucet.css";
import { useNotification } from "web3uikit";
export const Faucet = () => {
  const dispatch = useNotification();
  const [address, setAddress] = useState("");
  const [tokenLeft, setTokenLeft] = useState("");
  const contractaddress = "0x953f88014255241332d8841C34921572db112D65";
  var Tokencontract;
  useEffect(() => {
    loadContract();
  });

  const handleNewNotification = (type, title, message) => {
    dispatch({
      type: type,
      message: message,
      title: title,
      icon: undefined,
      duration: 40,
      position: "topR",
    });
  };
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
    try {
      const tx = await Tokencontract.Faucetmint(address);
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `<a target="_blank" href="https://mumbai.polygonscan.com/tx/${txhash.transactionHash}" >Completed Transaction hash</a>`
      );
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
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
            <div style={{ display: "flex", justifyContent: "center" }}>
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
    </div>
  );
};
