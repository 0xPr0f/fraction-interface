import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { web3Modal } from "../App";
import { FractionTokenABI } from "../abis/FractionTokenABI ";
import { FractionWrapperABI } from "../abis/FractionWrapperABI";

export const Trade = () => {
  const [unwrapamount, setUnwrapAmount] = useState("");
  const [addressToken, setAddressToken] = useState(
    "0x953f88014255241332d8841C34921572db112D65"
  );
  const [wrapamount, setWrapAmount] = useState("");
  const [wraptype, setWraptype] = useState("");
  const [tokenWrapped, settokenWrapped] = useState();
  var provider;
  //const provider = new ethers.providers.Web3Provider(window.ethereum);

  function Minttype(type) {
    if (type === "1") {
      document.getElementById("mintype1").style.backgroundColor = "transparent";
    }
    if (type === "2") {
      document.getElementById("mintype2").style.backgroundColor = "transparent";
    }
    setWraptype(type);
  }

  const contractaddress = "";
  var NFTcontract;
  var Tokencontract;
  useEffect(() => {
    loadContract();
  });

  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      NFTcontract = new ethers.Contract(
        contractaddress,
        FractionWrapperABI,
        library.getSigner()
      );
      Tokencontract = new ethers.Contract(
        "0xb64845d53a373d35160b72492818f0d2f51292c0",
        FractionTokenABI,
        library.getSigner()
      );
    }
  }
  function wrap() {
    // Tokencontract;
    console.log(wrapamount, addressToken);
  }
  function unwrap() {
    // Tokencontract;
    console.log(unwrapamount, addressToken);
  }

  async function approveERCbeforeTransfer() {}

  return (
    <div>
      <br />
      <br />

      <div
        className="wrapper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="pageboxmint">
          Earn more reward on FRACT tokens
          <br />
          <br />
          <div style={{ display: "flex" }}>
            <button
              id="mintype1"
              onClick={() => {
                Minttype("1");
              }}
              className="buttonstandardchoose"
            >
              WRAP
            </button>
            <div style={{ fontSize: "30px" }}>/</div>
            <button
              id="mintype2"
              onClick={() => {
                Minttype("2");
              }}
              className="buttonstandardchoose"
            >
              UNWRAP
            </button>
          </div>
          <div>
            {wraptype === "2" ? (
              <>
                <br />
                <br />
                <div>
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    Wrapped FRACT tokens in wallet : {tokenWrapped} FRACT
                  </span>
                  <br />
                  <div>
                    <div>
                      <input
                        type="number"
                        className="inputFaucet"
                        placeholder="Amount"
                        value={unwrapamount}
                        onChange={(e) => {
                          setUnwrapAmount(e.target.value);
                        }}
                      />
                    </div>
                    <div style={{ float: "left" }}>Stake Rewards : {}</div>
                    <br />
                  </div>
                  <br />
                  <br />
                </div>
                <div className="buttonCard">
                  <button
                    style={{ fontSize: "22px", height: "45px" }}
                    onClick={unwrap}
                    className="buttonstandard"
                  >
                    UNWRAP
                  </button>
                </div>
              </>
            ) : (
              <>
                <br />

                <div>
                  <br />
                  <div>
                    <input
                      style={{ fontSize: "18px" }}
                      type="text"
                      className="inputFaucet"
                      placeholder="Token Address"
                      value={addressToken}
                      onChange={(e) => {
                        setAddressToken(e.target.value);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    Wrappable Tokens in wallet : {tokenWrapped} FRACT
                  </span>
                  <br />
                  <div>
                    <input
                      style={{ fontSize: "18px" }}
                      type="number"
                      className="inputFaucet"
                      placeholder="Amount"
                      value={wrapamount}
                      onChange={(e) => {
                        setWrapAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div style={{ float: "left" }}>Stake Rewards : {}</div>
                  <br />
                </div>
                <br />
                <br />
                <div className="buttonCard">
                  <button
                    style={{ fontSize: "22px", height: "45px" }}
                    onClick={wrap}
                    className="buttonstandard"
                  >
                    WRAP
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
