import React from "react";
import { useState } from "react";
export const Stake = () => {
  const [unstakeamount, setUnStakeAmount] = useState("");
  const [stakeamount, setStakeAmount] = useState("");
  const [staketype, setStaketype] = useState("");
  const [tokeninwallet, settokeninwallet] = useState(20);
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
                  <div className="accountDetails">
                    <h5>Name</h5>

                    <h5>Description</h5>

                    <h5>Image</h5>
                  </div>
                </div>
                <div className="buttonCard">
                  <button className="buttonstandard">UNSTAKE</button>
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
