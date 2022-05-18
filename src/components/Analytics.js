import React, { useEffect } from "react";
import { useState } from "react";
import { web3Modal } from "../App";
import "../styles/Analytics.css";
import { getTokenHolders } from "../utils/covalentDataPool";
import { getTokenBalance } from "../utils/covalentDataPool";
import { getNFTholders } from "../utils/covalentDataPool";
import { ethers } from "ethers";
import {
  FractionlessWrapperAddress,
  FractionNFTAddress,
  FractTokenAddress,
  FractxTokenAddress,
} from "../utils/utils";

export const Analytics = () => {
  const [tokenholders, setTokenholders] = useState("");
  const [FractTokenBalance, setFractTokenBalance] = useState("");
  const [FractxTokenBalance, setFractxTokenBalance] = useState("");
  const [nftholders, setnftHolders] = useState("");
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
    if (chainId === 80001) {
      console.log("mumbai, testnet");
      setTokenholders(await getTokenHolders(FractTokenAddress, "80001"));

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
      setnftHolders(await getTokenHolders(FractionNFTAddress, "80001"));
    }
  }
  return (
    <div>
      <div className="pageboxanalytics">
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <button id="mintype1" className="buttonstandardchooseanalytics">
            Polygon Mumbai
          </button>
        </div>
        <br />
        <br />
        <div>
          <div style={{ width: "750px" }}>
            Polyogn mumbai chain
            <br />
            <span>probably a graph</span>
            <div>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bolder",
                  marginRight: "600px",
                }}
              >
                Fractionless
              </span>
            </div>
            <div className="grid-container">
              <div className="grid-item">
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Total Wrapped Amount
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
                  Total Staked Amount
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
                  Current Token Id
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
                  Total FRACTx Token Reserve
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
                  Total FRACT Token Reserve
                  <br />
                </span>
                <span style={{ fontSize: "23px" }}>
                  {FractTokenBalance / 10 ** 18} FRACT
                </span>
              </div>
            </div>
            <br />
            <div>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bolder",
                  marginRight: "600px",
                }}
              >
                Fraction&nbsp;Token
              </span>
            </div>
            <div className="grid-container">
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Total Supply
                  <br />
                </span>
                1
              </div>
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Total Holders
                  <br />
                </span>
                {tokenholders} Addresses
              </div>
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Decimal
                  <br />
                </span>
                18
              </div>
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Decimal
                  <br />
                </span>
                18
              </div>
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Super Token reward
                  <br />
                </span>
                Super Fraction Token
                <br />
                <span>(FRACTx)</span>
              </div>
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Type
                  <br />
                </span>
                ERC20
              </div>
            </div>
            <br />
            <div>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bolder",
                  marginRight: "600px",
                }}
              >
                Fraction&nbsp;NFT
              </span>
            </div>
            <div className="grid-container">
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  NFT holders
                  <br />
                </span>
                {nftholders}
              </div>
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
                2
              </div>
              <div className="grid-item">
                {" "}
                <span
                  style={{
                    fontSize: "15px",
                  }}
                >
                  Type
                  <br />
                </span>
                ERC721
              </div>
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
        </div>
      </div>
    </div>
  );
};
