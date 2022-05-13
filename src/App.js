import "./styles/App.css";
import User from "./components/User";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Stake } from "./components/Stake";
import { Link } from "react-router-dom";
import { Mint } from "./components/Mint";
import { Analytics } from "./components/Analytics";
import { Trade } from "./components/Trade";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { ethers } from "ethers";

function App() {
  const [tab, setTab] = useState();
  //  var modalClose = document.getElementsByClassName("close")[0];

  function displayWalletModal() {
    document.getElementById("myModal").style.display = "block";
  }
  function closeWalletModal() {
    document.getElementById("myModal").style.display = "none";
  }
  /* btn.onclick = function() {
    modal.style.display = "block";
  }*/

  window.onclick = function (event) {
    if (event.target === document.getElementById("myModal")) {
      document.getElementById("myModal").style.display = "none";
    } else if (event.target === document.getElementById("myModal1")) {
      document.getElementById("myModal1").style.display = "none";
    }
  };

  function updateTheme(id) {
    if (tab !== undefined) {
      document.getElementById(`${tab}`).style.color = "#040404";
      document.getElementById(`${tab}`).style.boxShadow = "";
    }
    document.getElementById(`${id}`).style.color = "#0363ff";
    document.getElementById(`${id}`).style.boxShadow =
      "inset 4px 0 0 0 RGB(3, 99, 255)";
    setTab(id);
  }

  ///////////////////////////////////////

  /* function displayWalletModalpersonal() {
    document.getElementById("myModal1").style.display = "block";
  }*/
  function closeWalletModalpersonal() {
    document.getElementById("myModal1").style.display = "none";
  }

  function personalWalletSection(id) {
    closeWalletModal();
    document.getElementById("metamask").style.display = "none";
    document.getElementById("walletconnect").style.display = "none";
    document.getElementById("coinbase").style.display = "none";
    document.getElementById("unstoppable").style.display = "none";
    if (id === "1") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("metamask").style.display = "block";
    } else if (id === "2") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("walletconnect").style.display = "block";
    } else if (id === "3") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("coinbase").style.display = "block";
    } else if (id === "4") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("unstoppable").style.display = "block";
    }
  }

  return (
    <div>
      <Router>
        <div>
          <div id="mySidenav" className="sidenav">
            <br />
            <br />
            <br />
            <br />
            <Link to="/">
              <button
                onClick={() => {
                  updateTheme("btn1");
                }}
                className="btn btn1"
                id="btn1"
              >
                <span className="txt">
                  <FontAwesomeIcon icon="fa-solid fa-house" />
                  &nbsp; Home
                </span>
              </button>
            </Link>

            <Link to="/mint">
              <button
                onClick={() => {
                  updateTheme("btn5");
                }}
                className="btn btn5"
                id="btn5"
              >
                <span className="txt">
                  <FontAwesomeIcon icon="fa-solid fa-credit-card" /> &nbsp;Mint
                </span>
              </button>
            </Link>

            <Link to="/trade">
              <button
                onClick={() => {
                  updateTheme("btn2");
                }}
                className="btn btn2"
                id="btn2"
              >
                <span className="txt">
                  {" "}
                  <FontAwesomeIcon icon="fa-solid fa-scale-balanced" />{" "}
                  &nbsp;Trade
                </span>
              </button>
            </Link>

            <Link to="/stake">
              <button
                onClick={() => {
                  updateTheme("btn3");
                }}
                className="btn btn3"
                id="btn3"
              >
                <span className="txt">
                  <FontAwesomeIcon icon="fa-solid fa-handshake-simple" />{" "}
                  &nbsp;Stake
                </span>
              </button>
            </Link>

            <Link to="/analytics">
              <button
                onClick={() => {
                  updateTheme("btn4");
                }}
                className="btn btn4"
                id="btn4"
              >
                <span className="txt">
                  <FontAwesomeIcon icon="fa-solid fa-signal" /> &nbsp;Analytics
                </span>
              </button>
            </Link>
          </div>

          <div id="main" className="main App">
            <Routes>
              <Route path="/" element={<User />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
            <button
              onClick={() => {
                personalWalletSection("2");
              }}
            >
              Test
            </button>
            {/* Connect to wallet primary button */}
            <div className="navbar"></div>
            <div id="loginholder">
              <button className="login">
                <span
                  className="logintxt"
                  onClick={() => {
                    displayWalletModal();
                  }}
                >
                  Connect Wallet
                </span>
              </button>
            </div>

            <div id="myModal" className="modal">
              <div className="modal-content">
                <span
                  onClick={() => {
                    closeWalletModal();
                  }}
                  className="close"
                >
                  <FontAwesomeIcon icon="fa-solid fa-xmark" />
                </span>
                <p>Connect a wallet</p>
                <button
                  className="textcursor"
                  style={{
                    fontSize: "16px",
                  }}
                >
                  By connecting a wallet, you agree to Fraction{" "}
                  <a
                    className="links"
                    style={{ color: "blue" }}
                    target="_about"
                    href="https://etherscan.io/token/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"
                  >
                    Terms of Service
                  </a>{" "}
                  and acknowledge that you have read and understand the Fraction{" "}
                  <a
                    className="links"
                    style={{ color: "blue" }}
                    target="_about"
                    href="https://etherscan.io/token/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"
                  >
                    {" "}
                    Protocol Disclaimer
                  </a>
                  .
                </button>
                <div className="wallettypesholder">
                  <br />
                  <button
                    onClick={() => {
                      personalWalletSection("1");
                    }}
                    style={{ textAlign: "left" }}
                    className="wallet"
                  >
                    Metamask
                    <img
                      className="walletIcons"
                      alt=""
                      width="20px"
                      height="20px"
                      src="https://gateway.pinata.cloud/ipfs/QmPgxeRnkq8UGrsxzUEsowBcUnwnQPd7Dia2v19u6atsHa"
                    />
                  </button>
                  <br />
                  <button
                    style={{ textAlign: "left" }}
                    onClick={() => {
                      personalWalletSection("2");
                    }}
                    className="wallet"
                  >
                    Wallet connect
                    <img
                      className="walletIcons"
                      alt=""
                      src="https://gateway.pinata.cloud/ipfs/QmYsEGVGHdWMA4TzKmHz5CcK3HaTf65C7j3WdSMvzSDQBh"
                    />
                  </button>
                  <br />
                  <button
                    style={{ textAlign: "left" }}
                    onClick={() => {
                      personalWalletSection("3");
                    }}
                    className="wallet"
                  >
                    Coinbase
                    <img
                      alt=""
                      className="walletIcons"
                      src="https://gateway.pinata.cloud/ipfs/QmYFeCsLXNz4orNpMAvgTfGp6ubEMjsU9okv6QsCg8V4ef"
                    />
                  </button>
                  <br />
                  <button
                    style={{ textAlign: "left" }}
                    onClick={() => {
                      personalWalletSection("4");
                    }}
                    className="wallet"
                  >
                    Unstoppable domains
                    <img
                      width="20px"
                      height="20px"
                      alt=""
                      className="walletIcons"
                      src="https://gateway.pinata.cloud/ipfs/QmVu7eRjS4VTtPzSyD6tiqoJNuRqTdLb81nRQc8kYUx4Z9"
                    />
                  </button>
                  <br />
                </div>
              </div>
            </div>

            <div id="myModal1" className="modalwallet">
              <div className="modal-contentwallet">
                <div>
                  <span
                    style={{ fontSize: "29px" }}
                    onClick={() => {
                      closeWalletModalpersonal();
                    }}
                    className="close"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-xmark" />
                  </span>
                  <span
                    style={{ fontSize: "29px" }}
                    onClick={() => {
                      displayWalletModal();
                      closeWalletModalpersonal();
                    }}
                    className="close1"
                  >
                    <FontAwesomeIcon icon="fa-solid fa-arrow-left-long fa-7x" />
                  </span>
                  <br />
                </div>
                <br />
                <button
                  className="textcursor"
                  style={{
                    fontSize: "16px",
                  }}
                >
                  <br />
                  By connecting a wallet, you agree to Fraction{" "}
                  <a
                    className="links"
                    style={{ color: "blue" }}
                    target="_about"
                    href="https://etherscan.io/token/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"
                  >
                    Terms of Service
                  </a>{" "}
                  and acknowledge that you have read and understand the Fraction{" "}
                  <a
                    className="links"
                    style={{ color: "blue" }}
                    target="_about"
                    href="https://etherscan.io/token/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e"
                  >
                    {" "}
                    Protocol Disclaimer
                  </a>
                  .
                </button>
                <div className="wallettypesholder">
                  <br />
                  <div id="metamask">
                    <button
                      id="metamask"
                      style={{
                        textAlign: "left",
                        height: "50px",
                        cursor: "default",
                      }}
                      className="wallet1a"
                    >
                      Conecting...
                    </button>
                    <br />

                    <button
                      id="metamask"
                      style={{
                        textAlign: "left",
                        height: "100px",
                        cursor: "default",
                        fontSize: "20px",
                      }}
                      className="wallet1"
                    >
                      Metamask
                      <img
                        className="walletIcons"
                        alt=""
                        width="40px"
                        height="40px"
                        src="https://gateway.pinata.cloud/ipfs/QmPgxeRnkq8UGrsxzUEsowBcUnwnQPd7Dia2v19u6atsHa"
                      />
                      <br />
                      <span style={{ fontSize: "10px" }}>
                        {" "}
                        Simple and Easy-to-use broswer extension
                      </span>
                    </button>
                  </div>

                  <div id="walletconnect">
                    <button
                      id="walletconnect"
                      style={{
                        textAlign: "left",
                        height: "50px",
                        cursor: "default",
                      }}
                      className="wallet1a"
                    >
                      Connecting...
                    </button>
                    <br />
                    <button
                      id="walletconnect"
                      style={{
                        textAlign: "left",
                        height: "100px",
                        cursor: "default",
                        fontSize: "20px",
                      }}
                      className="wallet1"
                    >
                      Wallet connect
                      <img
                        width="40px"
                        height="40px"
                        className="walletIcons"
                        alt=""
                        src="https://gateway.pinata.cloud/ipfs/QmYsEGVGHdWMA4TzKmHz5CcK3HaTf65C7j3WdSMvzSDQBh"
                      />
                      <br />
                      <span style={{ fontSize: "10px" }}>
                        {" "}
                        Connect to Trust Wallet, Rainbow Wallet and more...
                      </span>
                    </button>
                  </div>

                  <br />
                  <div id="coinbase">
                    <button
                      id="coinbase"
                      style={{
                        textAlign: "left",
                        height: "50px",
                        cursor: "default",
                      }}
                      className="wallet1a"
                    >
                      Connecting...
                    </button>
                    <br />
                    <button
                      id="coinbase"
                      style={{
                        textAlign: "left",
                        height: "100px",
                        cursor: "default",
                        fontSize: "20px",
                      }}
                      className="wallet1"
                    >
                      Coinbase
                      <img
                        alt=""
                        width="40px"
                        height="40px"
                        className="walletIcons"
                        src="https://gateway.pinata.cloud/ipfs/QmYFeCsLXNz4orNpMAvgTfGp6ubEMjsU9okv6QsCg8V4ef"
                      />
                      <br />
                      <span style={{ fontSize: "10px" }}>
                        {" "}
                        Use Coinbase Wallet app on mobile devices
                      </span>
                    </button>
                  </div>
                  <div id="unstoppable">
                    <button
                      id="unstoppable"
                      style={{
                        textAlign: "left",
                        height: "50px",
                        cursor: "default",
                      }}
                      className="wallet1a"
                    >
                      connecting...
                    </button>
                    <br />
                    <button
                      id="unstoppable"
                      style={{
                        textAlign: "left",
                        height: "100px",
                        cursor: "default",
                        fontSize: "20px",
                      }}
                      className="wallet1"
                    >
                      Unstoppable domains
                      <img
                        width="40px"
                        height="40px"
                        alt=""
                        className="walletIcons"
                        src="https://gateway.pinata.cloud/ipfs/QmVu7eRjS4VTtPzSyD6tiqoJNuRqTdLb81nRQc8kYUx4Z9"
                      />
                      <br />
                      <span style={{ fontSize: "10px" }}>
                        {" "}
                        Connect to your Crypto NFT domain.
                      </span>
                    </button>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            {/*Add extra stuff here below */}

            {/*end of add extra stuff here below */}
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
