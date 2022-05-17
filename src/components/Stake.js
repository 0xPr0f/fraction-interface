import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FractionWrapperABI } from "../abis/FractionWrapperABI";
import { web3Modal } from "../App";
export const Stake = () => {
  const [unstakeamount, setUnStakeAmount] = useState("");
  const [stakeamount, setStakeAmount] = useState("");
  const [staketype, setStaketype] = useState("");
  const [tokeninwallet, settokeninwallet] = useState("");
  const [tokenstaked, settokenStaked] = useState("");

  const contractaddress = "";
  var Wrappercontract;

  function Minttype(type) {
    if (type === "1") {
      document.getElementById("mintype1").style.backgroundColor = "transparent";
    }
    if (type === "2") {
      document.getElementById("mintype2").style.backgroundColor = "transparent";
    }
    setStaketype(type);
  }
  useEffect(() => {
    loadContract();
  });

  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      Wrappercontract = new ethers.Contract(
        contractaddress,
        FractionWrapperABI,
        library.getSigner()
      );
    }
  }

  function stake() {
    console.log("staking");
  }
  function unstake() {
    console.log("staking");
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
              STAKE
            </button>
            <div style={{ fontSize: "30px" }}>/</div>
            <button
              id="mintype2"
              onClick={() => {
                Minttype("2");
              }}
              className="buttonstandardchoose"
            >
              UNSTAKE
            </button>
          </div>
          <div>
            {staketype === "2" ? (
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
                    Staked FRACTIONLESS tokens : {tokenstaked} FRACTIONLESS
                  </span>
                  <br />
                  <div>
                    <div>
                      <input
                        style={{ fontSize: "18px" }}
                        type="number"
                        className="inputFaucet"
                        placeholder="Unstake Amount"
                        value={unstakeamount}
                        onChange={(e) => {
                          setUnStakeAmount(e.target.value);
                        }}
                      />
                    </div>
                    <div style={{ float: "left" }}>
                      Stake Rewards : you may probably lose all {}
                    </div>
                    <br />
                  </div>
                  <br />
                  <br />
                </div>
                <div className="buttonCard">
                  <button
                    style={{ fontSize: "22px", height: "45px" }}
                    onClick={unstake}
                    className="buttonstandard"
                  >
                    UNSTAKE
                  </button>
                </div>
              </>
            ) : (
              <>
                <br />

                <div>
                  <p className="error"> </p>
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    Wrappable tokens in wallet : {tokeninwallet}
                    FRACTIONLESS
                  </span>
                  <br />
                  <div>
                    <input
                      style={{ fontSize: "18px" }}
                      type="number"
                      className="inputFaucet"
                      placeholder="Stake Amount"
                      value={stakeamount}
                      onChange={(e) => {
                        setStakeAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div style={{ float: "left" }}>Stake Rewards : {}</div>
                  <br />
                </div>
                <br />
                <br />
                <div style={{ marginBottom: "3px" }} className="buttonCard">
                  <button
                    style={{ fontSize: "15px", height: "50px" }}
                    onClick={() => {
                      stake();
                    }}
                    className="buttonstandard"
                  >
                    Allow the Fraction Protocol to uses your FRACT
                  </button>
                </div>
                <div className="buttonCard">
                  <button
                    style={{ fontSize: "22px", height: "45px" }}
                    onClick={() => {
                      stake();
                    }}
                    className="buttonstandard"
                  >
                    STAKE
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
