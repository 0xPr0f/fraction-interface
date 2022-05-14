import "./styles/App.css";
import User from "./components/User";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Stake } from "./components/Stake";
import { Link } from "react-router-dom";
import { Mint } from "./components/Mint";
import { Analytics } from "./components/Analytics";
import { Trade } from "./components/Trade";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ethers } from "ethers";
import { getEllipsisTxt } from "./utils/ utils";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

function App() {
  const APP_NAME = "Fraction Protocol";
  const APP_LOGO_URL = "https://example.com/logo.png";
  // const DEFAULT_ETH_JSONRPC_URL =
  // "https://mainnet.infura.io/v3/5843244e30ef4b68b2a0cede1813a327";
  //const DEFAULT_CHAIN_ID = 1;

  const [tab, setTab] = useState();
  // Metamask signer
  const [Signer, setSigner] = useState();
  // Adddress
  const [Address, setAddress] = useState();
  ///
  const [WalletCount, setWalletCount] = useState();
  /// Wallet bools checks
  const [isConnected, setIsConnected] = useState(false);
  /////
  const [currentChain, setcurrentChain] = useState();
  //  var modalClose = document.getElementsByClassName("close")[0];

  /////////////// CoinBase Wallet ////////////////////
  useEffect(() => {
    // setIsConnected(window.localStorage.getItem("isConnected"));
    if (isConnected !== false || isConnected !== undefined) {
      setAddress(window.localStorage.getItem("address"));
      //   JSON.parse(window.localStorage.getItem("signer"))?.getAddress()
    }
  }, [isConnected]);

  ///////////// Wallet connection events ////////////////

  // wallet connect
  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      setAddress(accounts);
      if (!accounts.length) {
        // logic to handle what happens once MetaMask is locked
      }
    });

    // Subscribe to accounts change
    walletconnectprovider.on("accountsChanged", (accounts) => {
      setAddress(accounts);
    });

    // Subscribe to chainId change
    walletconnectprovider.on("chainChanged", (chainId) => {
      console.log(chainId);
    });

    // Subscribe to session disconnection
    walletconnectprovider.on("disconnect", (code, reason) => {
      console.log(code, reason);
    });
  });

  ///////////// end of Wallet connection events ////////////////

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
    } else {
      document.getElementById("disconnect").style.display = "none";
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

  function secondaryWalletSection() {
    document.getElementById("metamask").style.display = "none";
    document.getElementById("walletconnect").style.display = "none";
    document.getElementById("coinbase").style.display = "none";
    document.getElementById("unstoppable").style.display = "none";
  }

  /////////// Connecting to wallets code ////////////////////
  /////////// Connecting to wallets code ////////////////////
  /////////// Connecting to wallets code ////////////////////
  /////////// Connecting to wallets code ////////////////////

  async function connectWithMetamask() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setAddress(await signer.getAddress());
      //  console.log(JSON.stringify(JSON.parse(provider)));
      console.log(signer);
      // window.localStorage.setItem("signer", JSON.stringify(provider));
      setSigner(signer);
      setIsConnected(true);
      window.localStorage.setItem("isConnected", true);
      window.localStorage.setItem("address", await signer.getAddress());
      setWalletCount(1);
      setAddress(await signer.getAddress());
      console.log(Signer);
      document.getElementById("myModal1").style.display = "none";
    } catch (e) {
      console.log(e);
    }
  }

  //////////////Wallet connect login /////////////////////////
  const walletconnectprovider = new WalletConnectProvider({
    infuraId: "5843244e30ef4b68b2a0cede1813a327",
  });
  async function connectWithWalletConnect() {
    try {
      await walletconnectprovider.enable();
      const provider = new ethers.providers.Web3Provider(walletconnectprovider);
      const signer = provider.getSigner();
      setAddress(await signer.getAddress());
      setWalletCount(2);
      // window.localStorage.setItem("signer", JSON.stringify(signer));
      setSigner(signer);
      window.localStorage.setItem("address", await signer.getAddress());
      setIsConnected(true);
      window.localStorage.setItem("isConnected", true);
      console.log(Signer);
      document.getElementById("myModal1").style.display = "none";
    } catch (e) {
      console.log(e);
    }
  }

  //////////////Coinbase connect login /////////////////////////
  const coinbaseWallet = new CoinbaseWalletSDK({
    appName: APP_NAME,
    appLogoUrl: APP_LOGO_URL,
    darkMode: false,
  });

  async function connectWithCoinbase() {
    try {
      // Initialize a Web3 Provider object
      const ethereum = coinbaseWallet
        .makeWeb3Provider
        //  DEFAULT_ETH_JSONRPC_URL,
        // DEFAULT_CHAIN_ID
        ();
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);
      // window.localStorage.setItem("signer", JSON.stringify(signer));
      setWalletCount(3);
      setIsConnected(true);
      setAddress(await signer.getAddress());
      window.localStorage.setItem("address", await signer.getAddress());
      console.log(Signer);
      window.localStorage.setItem("isConnected", true);
      document.getElementById("myModal1").style.display = "none";
    } catch (e) {
      console.log(e);
    }
  }
  /////////// end Connecting to wallets code ////////////////////
  /////////// end Connecting to wallets code ////////////////////
  /////////// end Connecting to wallets code ////////////////////
  /////////// end Connecting to wallets code ////////////////////

  /////////LOGOUT ////////////
  async function logoutWallet() {
    if (WalletCount === 1) {
    } else if (WalletCount === 2) {
      await walletconnectprovider.disconnect();
    } else if (WalletCount === 3) {
      coinbaseWallet.disconnect();
    } else if (WalletCount === 4) {
    }
    document.getElementById("disconnect").style.display = "none";
    setIsConnected(false);
    console.log("logged out");
    window.localStorage.setItem("isConnected", false);
  }
  /////////LOGOUT ////////////

  function personalWalletSection(id) {
    closeWalletModal();
    secondaryWalletSection();
    if (id === "1") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("metamask").style.display = "block";
      connectWithMetamask();
    } else if (id === "2") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("walletconnect").style.display = "block";
      connectWithWalletConnect();
    } else if (id === "3") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("coinbase").style.display = "block";
      connectWithCoinbase();
    } else if (id === "4") {
      document.getElementById("myModal1").style.display = "block";
      document.getElementById("unstoppable").style.display = "block";
    }
  }
  function ToggleDisconnectModal() {
    if (isConnected === true) {
      document.getElementById("disconnect").style.display = "block";
    }
  }

  return (
    <div id="mainscreen">
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
              <div className="connectedwalletdropdown">
                <button
                  style={{ marginRight: "50px", width: "200px" }}
                  className="swtichNetwork connectedwalletdropdowndropbtn"
                >
                  <span className="logintxt">
                    {currentChain} &nbsp;
                    <FontAwesomeIcon
                      style={{ float: "right", marginRight: "20px" }}
                      icon="fa-solid fa-angle-down"
                    />
                  </span>
                </button>
                <div className="connectedwalletdropdown-content">
                  <button
                    onClick={() => {
                      setcurrentChain("Rinkeby");
                    }}
                    className="walletchange"
                  >
                    Rinkeby
                  </button>

                  <button
                    onClick={() => {
                      setcurrentChain("Mumbai");
                    }}
                    className="walletchange"
                  >
                    Mumbai
                  </button>

                  <button
                    onClick={() => {
                      setcurrentChain("Arbitrum TN");
                    }}
                    className="walletchange"
                  >
                    Arbitrum TN
                  </button>

                  <button
                    onClick={() => {
                      setcurrentChain("ZK sync");
                    }}
                    className="walletchange"
                  >
                    ZK sync
                  </button>
                </div>
              </div>

              <button
                onMouseEnter={() => {
                  if (isConnected === true) {
                    document.getElementById("disconnect").style.display =
                      "block";
                  }
                }}
                className="login"
              >
                <span
                  className="logintxt"
                  onClick={() => {
                    if (isConnected === false) {
                      displayWalletModal();
                    }
                  }}
                >
                  {isConnected === false ? (
                    "Connect Wallet"
                  ) : (
                    <span>
                      {getEllipsisTxt(Address)}
                      &nbsp;
                      <FontAwesomeIcon icon="fa-solid fa-angle-down" />
                      <br />
                    </span>
                  )}
                </span>
              </button>
              <div
                onMouseLeave={() => {
                  if (isConnected === true) {
                    document.getElementById("disconnect").style.display =
                      "none";
                  }
                }}
                id="disconnect"
                style={{ marginLeft: "200px", display: "none" }}
              >
                <br />
                <div>
                  <button
                    onClick={() => {
                      logoutWallet();
                    }}
                    className="walletlogout"
                    style={{
                      cursor: "pointer",
                      width: "140px",
                      height: "37px",
                      borderRadius: "7px",
                    }}
                  >
                    Logout
                  </button>
                </div>
                <br />
              </div>
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
            {/*Connected Wallet accesories*/}

            {/*end of Connected Wallet accesories*/}

            {/*Add extra stuff here below */}
            {/*end of add extra stuff here below */}
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
