import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FractionTokenABI } from "../utils/Fraction Token";
import "../styles/Faucet.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const Faucet = () => {
  const APP_NAME = "Fraction Protocol";
  const APP_LOGO_URL = "https://example.com/logo.png";
  const [address, setAddress] = useState("");
  const [tokenLeft, setTokenLeft] = useState("");
  var provider;
  const contractaddress = "0x953f88014255241332d8841C34921572db112D65";

  provider = new ethers.providers.Web3Provider(window.ethereum);
  const Tokencontract = new ethers.Contract(
    contractaddress,
    FractionTokenABI,
    provider.getSigner()
  );

  useEffect(() => {
    updateUI();
  });
  async function updateUI() {
    const x = await Tokencontract.balanceOf(
      "0x953f88014255241332d8841C34921572db112D65"
    );
    setTokenLeft(Number.parseFloat(x.toString()));
  }

  async function requestFunds() {
    console.log(address);
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
