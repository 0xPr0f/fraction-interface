import React, { useEffect } from "react";
import { useState } from "react";
import { web3Modal } from "../App";
import "../styles/Analytics.css";
import { getTokenHolders } from "../utils/covalentDataPool";
import { getTokenBalance } from "../utils/covalentDataPool";
import { ethers } from "ethers";
import { FractionWrapperABI } from "../abis/FractionWrapperABI";
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
  const [totalStaked, setTotalstaked] = useState();
  const [totalwrapped, setTotalwrapped] = useState();
  useEffect(() => {
    loadCovalentData();
    loadContract();
  });
  var FractionlessWrapperContract;
  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      setChainId(await library.getSigner().getChainId());
      FractionlessWrapperContract = new ethers.Contract(
        FractionlessWrapperAddress,
        FractionWrapperABI,
        library.getSigner()
      );
      const mwrap = await FractionlessWrapperContract.TotalWrappedFLTokens();
      setTotalwrapped(mwrap.toString());

      const mstake = await FractionlessWrapperContract.TotalStakedFLTokens();
      setTotalstaked(mstake.toString());
    }
  }

  async function loadCovalentData() {
    setTokenholders(await getTokenHolders(FractTokenAddress, "80001"));

    setFractTokenBalance(
      await getTokenBalance(
        FractionlessWrapperAddress,
        "80001",
        FractTokenAddress
      )
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
  return (
    <div>
      <div className="pageboxanalytics">
        <div style={{ display: "flex" }}>
          <button id="mintype1" className="buttonstandardchooseanalytics">
            Polygon Mumbai
          </button>
        </div>
        <div>
          <div style={{ width: "750px" }}>
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
                <span style={{ fontSize: "23px" }}>{totalwrapped} FRACT</span>
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
                <span style={{ fontSize: "23px" }}>
                  {totalStaked} FRACTLESS
                </span>
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
                  {FractxTokenBalance / 10 ** 18} FRACTx
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
                {nftholders} Address
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
                {nftholders + 1}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
