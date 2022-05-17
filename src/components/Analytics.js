import React, { useEffect } from "react";
import { useState } from "react";
import "../styles/Analytics.css";
import { getTokenHolders } from "../utils/covalentDataPool";

export const Analytics = () => {
  const [chaintype, setchaintype] = useState("");
  const [tokenholders, setTokenholders] = useState("");

  useEffect(() => {
    loadCovalentData();
  });
  async function loadCovalentData() {
    setTokenholders(
      await getTokenHolders(
        "0x953f88014255241332d8841c34921572db112d65",
        "80001"
      )
    );
  }
  function Chaintype(type) {
    if (chaintype === type) {
      setchaintype("3");
      console.log(chaintype);
    }
    setchaintype(type);
  }
  return (
    <div>
      <div className="pageboxanalytics">
        <br />
        <br />
        <div style={{ display: "flex" }}>
          <button
            id="mintype1"
            onClick={() => {
              Chaintype("1");
            }}
            className="buttonstandardchooseanalytics"
          >
            Polygon Mumbai
          </button>
          <div style={{ fontSize: "30px" }}>/</div>
          <button
            id="mintype2"
            onClick={() => {
              Chaintype("2");
            }}
            className="buttonstandardchooseanalytics"
          >
            Arbitrum Testnet
          </button>
        </div>
        <br />
        <br />
        <div>
          {chaintype === "2" ? (
            <>
              <div style={{ width: "750px" }}>
                <br />
                Arbitrum Testnet chain
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
                    4
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
                    4
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
                    2
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
                    1
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
            </>
          ) : (
            <>
              <br />
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
                    4
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
                    4
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
                    {tokenholders}
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
                    1
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
