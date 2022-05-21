import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FractionWrapperABI } from "../abis/FractionWrapperABI";
import { web3Modal } from "../App";
import {
  FractionlessAddress,
  FractionlessWrapperAddress,
} from "../utils/utils";
import { FractionlessABI } from "../abis/FractionlessABI";
import { useNotification } from "web3uikit";
export const Stake = () => {
  const dispatch = useNotification();
  const [unstakeamount, setUnStakeAmount] = useState("");
  const [stakeamount, setStakeAmount] = useState("");
  const [staketype, setStaketype] = useState("");
  const [tokeninwallet, settokeninwallet] = useState("");
  const [tokenstaked, settokenStaked] = useState("");
  const [approved, setApproved] = useState("");

  var FractionlessWrapperContract;
  var FractionlessContract;

  const handleNewNotification = (type, title, message) => {
    dispatch({
      type,
      message: message,
      title: title,
      icon: undefined,
      duration: 40,
      position: "topR",
    });
  };
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
      FractionlessWrapperContract = new ethers.Contract(
        FractionlessWrapperAddress,
        FractionWrapperABI,
        library.getSigner()
      );
      FractionlessContract = new ethers.Contract(
        FractionlessAddress,
        FractionlessABI,
        library.getSigner()
      );
      const appr = await FractionlessContract.isApprovedForAll(
        await library.getSigner().getAddress(),
        FractionlessWrapperAddress
      );
      setApproved(appr);
      const _wrap = await FractionlessWrapperContract.wrappedAssets(
        await library.getSigner().getAddress()
      );
      settokeninwallet(_wrap.toString());

      const stakedtkn = await FractionlessWrapperContract.stakedWrappedFLTokens(
        await library.getSigner().getAddress()
      );
      settokenStaked(stakedtkn.toString());
    }
  }
  async function approveFRACTIONbeforeTransfer() {
    try {
      const tx = await FractionlessContract.setApprovalForAll(
        FractionlessWrapperAddress,
        "true"
      );
      const txhash = tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `https://mumbai.polygonscan.com/tx/${txhash.transactionHash}`
      );
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
    }
  }

  async function stake() {
    try {
      const tx = await FractionlessWrapperContract.stake(stakeamount);
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `https://mumbai.polygonscan.com/tx/${txhash.transactionHash}`
      );
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
    }
  }
  async function unstake() {
    try {
      const tx = await FractionlessWrapperContract.unstake(unstakeamount);
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `https://mumbai.polygonscan.com/tx/${txhash.transactionHash}`
      );
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
    }
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
                    Wrapped tokens in wallet : {tokeninwallet} &nbsp;
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
                  <div style={{ float: "left" }}>
                    STAKE Rewards : {stakeamount} x 10000 + 20 ={" "}
                    {stakeamount * 100000 + 20}
                  </div>
                  <br />
                  <br />
                  <div style={{ float: "left" }}>
                    Stream : {stakeamount * (100000 + 20) * 60 * 60 * 24}{" "}
                    wei/day
                  </div>
                  <br />
                </div>
                <br />
                <br />
                <div style={{ marginBottom: "3px" }} className="buttonCard">
                  {approved === false ? (
                    <button
                      style={{ fontSize: "15px", height: "50px" }}
                      onClick={() => {
                        approveFRACTIONbeforeTransfer();
                      }}
                      className="buttonstandard"
                    >
                      Allow the Fraction Protocol to uses your FRACTIONLESS
                    </button>
                  ) : null}
                </div>

                <div className="buttonCard">
                  {approved !== false ? (
                    <button
                      style={{ fontSize: "22px", height: "45px" }}
                      onClick={() => {
                        stake();
                      }}
                      className="buttonstandard"
                    >
                      STAKE
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
