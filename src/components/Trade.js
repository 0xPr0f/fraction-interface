import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ERC20ABI } from "../utils/ERC20";
import { FractionWrapperABI } from "../utils/FractionWrapper";

export const Trade = () => {
  const [unstakeamount, setUnStakeAmount] = useState("");
  const [address, setAddress] = useState(
    " 0x953f88014255241332d8841C34921572db112D65"
  );
  const [stakeamount, setStakeAmount] = useState("");
  const [staketype, setStaketype] = useState("");
  const [tokenstaked, settokenStaked] = useState();
  var provider;
  //const provider = new ethers.providers.Web3Provider(window.ethereum);

  function Minttype(type) {
    if (type === "1") {
      document.getElementById("mintype1").style.backgroundColor = "transparent";
    }
    if (type === "2") {
      document.getElementById("mintype2").style.backgroundColor = "transparent";
    }
    setStaketype(type);
  }

  const contractaddress = "";

  provider = new ethers.providers.Web3Provider(window.ethereum);
  const Tokencontract = new ethers.Contract(
    contractaddress,
    FractionWrapperABI,
    provider.getSigner()
  );

  function stake() {
    // Tokencontract;
  }
  function unstake() {
    // Tokencontract;
  }
  const ERC20 = new ethers.Contract(
    "0xb64845d53a373d35160b72492818f0d2f51292c0",
    ERC20ABI,
    provider.getSigner()
  );

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
                    STAKED FRACT tokens in wallet : {tokenstaked} FRACT
                  </span>
                  <br />
                  <div>
                    <div>
                      <input
                        type="text"
                        className="inputFaucet"
                        placeholder="Amount"
                        value={unstakeamount}
                        onChange={(e) => {
                          setUnStakeAmount(e.target.value);
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
                  <button onClick={unstake} className="buttonstandard">
                    UNWRAP
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
                  ></span>
                  <br />
                  <div>
                    <input
                      style={{ fontSize: "18px" }}
                      type="text"
                      className="inputFaucet"
                      placeholder="Token Address"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  ></span>
                  <br />
                  <div>
                    <input
                      style={{ fontSize: "18px" }}
                      type="text"
                      className="inputFaucet"
                      placeholder="Amount"
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
                <div className="buttonCard">
                  <button
                    onClick={() => {
                      stake();
                    }}
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
