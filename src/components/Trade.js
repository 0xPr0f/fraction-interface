import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { web3Modal } from "../App";
import { FractionTokenABI } from "../abis/FractionTokenABI ";
import { FractionWrapperABI } from "../abis/FractionWrapperABI";
import { FractionlessWrapperAddress, FractTokenAddress } from "../utils/utils";

export const Trade = () => {
  const [unwrapamount, setUnwrapAmount] = useState("");
  const [addressToken, setAddressToken] = useState(
    "0x953f88014255241332d8841C34921572db112D65"
  );
  const [allowance, setAllowance] = useState();
  const [wrapamount, setWrapAmount] = useState("");
  const [wraptype, setWraptype] = useState("");
  const [tokenWrapped, settokenWrapped] = useState();

  function Minttype(type) {
    if (type === "1") {
      document.getElementById("mintype1").style.backgroundColor = "transparent";
    }
    if (type === "2") {
      document.getElementById("mintype2").style.backgroundColor = "transparent";
    }
    setWraptype(type);
  }

  var FractionlessWrapperContract;
  var Tokencontract;
  useEffect(() => {
    loadContract();
  });

  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      FractionlessWrapperContract = new ethers.Contract(
        FractionlessWrapperAddress,
        FractionWrapperABI,
        library.getSigner()
      );
      Tokencontract = new ethers.Contract(
        FractTokenAddress,
        FractionTokenABI,
        library.getSigner()
      );
      console.log(await library.getSigner().getAddress());
      /*
      const allow = await FractTokenAddress.allowance(
        await library.getSigner().getAddress(),
        FractionlessWrapperAddress
      );
      console.log(allow);
      setAllowance(allow);
      */
    }
  }

  async function approveERCbeforeTransfer() {
    Tokencontract.approve(FractionlessWrapperAddress, 10 ** 35);
  }

  async function wrap() {
    const tx = await FractionlessWrapperContract.wrap(wrapamount, addressToken);
    await tx.wait();
    console.log(wrapamount, addressToken);
  }
  async function unwrap() {
    const tx = await FractionlessWrapperContract.unwrap(
      unwrapamount,
      addressToken
    );
    await tx.wait();
    console.log(unwrapamount, addressToken);
  }

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
                      onChange={(e) => {}}
                    />
                  </div>
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    Wrappable Tokens in wallet : {tokenWrapped}
                  </span>
                  <br />
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    FRACT Contract allowance : {allowance}
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
                  <div style={{ float: "left" }}>
                    Wrap Rewards : {wrapamount} x 100,000 + 1 ={" "}
                    {wrapamount * 100000 + 1}
                  </div>
                  <br />
                  <br />
                  <div style={{ float: "left" }}>
                    Stream : {wrapamount * (100000 + 1) * 60 * 60 * 24} wei/day
                  </div>
                </div>
                <br />
                <br />
                {allowance < wrapamount ? (
                  <div style={{ marginBottom: "3px" }} className="buttonCard">
                    <button
                      style={{ fontSize: "15px", height: "50px" }}
                      onClick={() => {
                        approveERCbeforeTransfer();
                      }}
                      className="buttonstandard"
                    >
                      Allow the Fraction Protocol to uses your FRACT
                    </button>
                  </div>
                ) : null}
                <div className="buttonCard">
                  {allowance >= wrapamount ? (
                    <button
                      style={{ fontSize: "22px", height: "45px" }}
                      onClick={wrap}
                      className="buttonstandard"
                    >
                      WRAP
                    </button>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
