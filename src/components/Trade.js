import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ERC20ABI } from "../utils/ERC20";

export const Trade = () => {
  const [unstakeamount, setUnStakeAmount] = useState("");
  const [stakeamount, setStakeAmount] = useState("");
  const [staketype, setStaketype] = useState("");
  const [tokeninwallet, settokeninwallet] = useState();
  const [tokenstaked, settokenStaked] = useState();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  function stake() {
    console.log("staking");
  }
  function Minttype(type) {
    if (type === "1") {
      document.getElementById("mintype1").style.backgroundColor = "transparent";
    }
    if (type === "2") {
      document.getElementById("mintype2").style.backgroundColor = "transparent";
    }
    setStaketype(type);
  }
  /*
  const contractaddress = "";
 
  const Tokencontract = new ethers.Contract(
    contractaddress,
    [],
    provider.getSigner()
  );

  useEffect(() => {
    updateUI();
  });
  async function updateUI() {
    if (
      window.localStorage.getItem("signer") !== null ||
      window.localStorage.getItem("signer") !== ""
    ) {
      const x = await Tokencontract.balanceOf(
        window.localStorage.getItem("address")
      );
      settokeninwallet(Number.parseFloat(x.toString()));
    }
  }
*/
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
                  <button className="buttonstandard">UNWRAP</button>
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
                    FRACT tokens in wallet : {tokeninwallet} FRACT
                  </span>
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
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    FRACT tokens : {tokeninwallet} FRACT
                  </span>
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
