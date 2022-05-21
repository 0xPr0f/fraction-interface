import React from "react";
import { useState, useEffect } from "react";
import "../styles/User.css";
import { web3Modal } from "../App";
import { ethers } from "ethers";
import { getTokenBalance } from "../utils/covalentDataSource";
import { FractionWrapperABI } from "../abis/FractionWrapperABI";
import {
  FractionlessWrapperAddress,
  FractTokenAddress,
  FractxTokenAddress,
  redirect,
} from "../utils/utils";

const User = () => {
  const [FractTokenBalance, setFractTokenBalance] = useState("");
  const [FractxTokenBalance, setFractxTokenBalance] = useState("");
  const [wrap, setWrapped] = useState();
  const [stake, setStake] = useState();
  const [address, setAddress] = useState();
  const [chainId, setChainId] = useState("");
  useEffect(() => {
    loadContract();
  });
  var FractionlessWrapperContract;
  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      setChainId(await library.getSigner().getChainId());
      setAddress(await library.getSigner().getAddress());
      loadCovalentData(await library.getSigner().getAddress());
      FractionlessWrapperContract = new ethers.Contract(
        FractionlessWrapperAddress,
        FractionWrapperABI,
        library.getSigner()
      );
    }
  }

  async function loadCovalentData(address) {
    setFractTokenBalance(
      ethers.utils.formatEther(
        await getTokenBalance(address, "80001", FractTokenAddress)
      )
    );
    setFractxTokenBalance(
      ethers.utils.formatEther(
        await getTokenBalance(address, "80001", FractxTokenAddress)
      )
    );
    const _wrap = await FractionlessWrapperContract.wrappedAssets(address);

    setWrapped(_wrap.toString());

    const _stake = await FractionlessWrapperContract.stakedWrappedFLTokens(
      address
    );
    setStake(_stake.toString());
  }
  return (
    <div>
      <div>
        <div className="pageboxanalytics">
          <br />
          <br />
          <span style={{ fontSize: "60px" }}>Your Stats</span>
          <>
            <br />
            <div style={{ width: "750px" }}>
              <div className="grid-container">
                <div className="grid-item">
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Wrapped FRACT Token balance
                    <br />
                  </span>
                  {wrap}
                </div>
                <div className="grid-item">
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Staked Balance
                    <br />
                  </span>
                  {stake}
                </div>
                <div className="grid-item">
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    Fraction NFT
                    <br />
                  </span>
                  1
                </div>
                <div className="grid-item">
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    FRACTx Token Balance
                    <br />
                  </span>
                  <span style={{ fontSize: "23px" }}>
                    {FractxTokenBalance} FRACTx{" "}
                  </span>
                </div>
                <div className="grid-item">
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    FRACT Token Balance
                    <br />
                  </span>
                  <span style={{ fontSize: "23px" }}>
                    {FractTokenBalance} FRACT{" "}
                  </span>
                </div>
                <br />

                <div className="grid-item">
                  {" "}
                  <span
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    NFT Token Id
                    <br />
                  </span>
                  1
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    redirect(
                      `https://console.superfluid.finance/mumbai/supertokens/0xbcC35477b5b360713C8CE874EE936a0FB14b5E3c?tab=streams`
                    );
                  }}
                  className="grid-item"
                >
                  Check your Streams
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default User;
