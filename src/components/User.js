import React from "react";
import { useState, useEffect } from "react";
import "../styles/User.css";
import { web3Modal } from "../App";
import { ethers } from "ethers";
import { getTokenBalance } from "../utils/covalentDataPool";
import { getNFTholders } from "../utils/covalentDataPool";
import {
  FractionlessWrapperAddress,
  FractionNFTAddress,
  FractTokenAddress,
  FractxTokenAddress,
} from "../utils/utils";

const User = () => {
  const [FractTokenBalance, setFractTokenBalance] = useState("");
  const [FractxTokenBalance, setFractxTokenBalance] = useState("");
  const [chainId, setChainId] = useState("");
  useEffect(() => {
    loadCovalentData();
    loadContract();
  });
  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      setChainId(await library.getSigner().getChainId());
      console.log(await library.getSigner().getChainId());
    }
  }

  async function loadCovalentData() {
    setFractTokenBalance(
      await getTokenBalance(FractTokenAddress, "80001", FractTokenAddress)
    );
    setFractxTokenBalance(
      await getTokenBalance(
        FractionlessWrapperAddress,
        "80001",
        FractxTokenAddress
      )
    );
  }
  return (
    <div>
      <div>
        <div className="pageboxanalytics">
          <br />
          <br />

          <>
            <br />
            <div style={{ width: "750px" }}>
              Polyogn mumbai chain
              <br />
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
                  1
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
                  2
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
                    {FractxTokenBalance / 10 ** 18} FRACTx{" "}
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
                    {FractTokenBalance / 10 ** 18} FRACT{" "}
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
                    Current Token Id
                    <br />
                  </span>
                  4
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
