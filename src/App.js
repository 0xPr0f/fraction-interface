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
import { ethers, providers } from "ethers";
import { getEllipsisTxt } from "./utils/ utils";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { Faucet } from "./components/Faucet";
import { stringify, parse } from "flatted";

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

  const [ConnectionStatus, setConnectionStatus] = useState();
  ///
  const [WalletCount, setWalletCount] = useState();
  /// Wallet bools checks
  const [isConnected, setIsConnected] = useState(false);
  /////
  const [currentChain, setcurrentChain] = useState();
  //  var modalClose = document.getElementsByClassName("close")[0];
  const [chain, setChain] = useState();
  const [block, setBlock] = useState();

  useEffect(() => {
    const connected = window.localStorage.getItem("isConnected") === "true";
    setChain(window.localStorage.getItem("chainid"));
    checkChain();
    setIsConnected(connected);
    if (window.localStorage.getItem("isConnected") === "true") {
      setChain(window.localStorage.getItem("chainid"));
      setAddress(getEllipsisTxt(window.localStorage.getItem("address")));
    }
  });
  useEffect(() => {});
  useEffect(() => {
    checkChain();
  });
  async function checkChain() {
    if (chain === "4" || chain === "0x4") {
      // JSON.stringify((await provider.getNetwork()).chainId)
      const provider = ethers.getDefaultProvider();
      provider.getBlockNumber().then((result) => {
        setBlock(result);
      });
      setcurrentChain("Rinkeby");
    } else if (chain === "0x13881" || chain === "80001") {
      const res = await fetch(
        "https://api.covalenthq.com/v1/80001/block_v2/latest/?quote-currency=USD&format=JSON&key=ckey_e22bfa8a9c734c1e816244b1529"
      );
      const data = await res.json();
      setBlock(JSON.parse(JSON.stringify(data)).data.items[0].height);
      setcurrentChain("Mumbai");
    } else if (chain === "0x66eeb" || chain === "421611") {
      const res = await fetch(
        "https://api.covalenthq.com/v1/421611/block_v2/latest/?quote-currency=USD&format=JSON&key=ckey_e22bfa8a9c734c1e816244b1529"
      );
      const data = await res.json();
      setBlock(JSON.parse(JSON.stringify(data)).data.items[0].height);
      setcurrentChain("Arbitrum Testnet");
    } else {
      setcurrentChain("chain not supported");
    }
  }

  useEffect(() => {
    if (window.location.pathname === "/") {
      document.getElementById("btn1").style.color = "#0363ff";
      document.getElementById("btn1").style.boxShadow =
        "inset 4px 0 0 0 RGB(3, 99, 255)";
    } else if (window.location.pathname === "/fraction") {
      document.getElementById("btn2").style.color = "#0363ff";
      document.getElementById("btn2").style.boxShadow =
        "inset 4px 0 0 0 RGB(3, 99, 255)";
    } else if (window.location.pathname === "/mint") {
      document.getElementById("btn5").style.color = "#0363ff";
      document.getElementById("btn5").style.boxShadow =
        "inset 4px 0 0 0 RGB(3, 99, 255)";
    } else if (window.location.pathname === "/stake") {
      document.getElementById("btn3").style.color = "#0363ff";
      document.getElementById("btn3").style.boxShadow =
        "inset 4px 0 0 0 RGB(3, 99, 255)";
    } else if (window.location.pathname === "/analytics") {
      document.getElementById("btn4").style.color = "#0363ff";
      document.getElementById("btn4").style.boxShadow =
        "inset 4px 0 0 0 RGB(3, 99, 255)";
    } else if (window.location.pathname === "/faucet") {
      document.getElementById("btn6").style.color = "#0363ff";
      document.getElementById("btn6").style.boxShadow =
        "inset 4px 0 0 0 RGB(3, 99, 255)";
    }
  });

  ///////////// Wallet connection events ////////////////

  // wallet connect
  useEffect(() => {
    window.ethereum.on("accountsChanged", (accounts) => {
      // If user has locked/logout from MetaMask, this resets the accounts array to empty
      setAddress(getEllipsisTxt(accounts));
      window.localStorage.setItem("address", accounts);
      if (!accounts.length) {
        window.localStorage.setItem("isConnected", false);
        setIsConnected(false);
        // logic to handle what happens once MetaMask is locked
      }
      if (accounts.length === 0) {
        window.localStorage.setItem("isConnected", false);
      }
    });

    window.ethereum.on("chainChanged", (chainId) => {
      window.localStorage.setItem("chainid", chainId);
      setChain(window.localStorage.getItem("chainid"));
      checkChain();
    });
    // Subscribe to accounts change
    walletconnectprovider.on("accountsChanged", (accounts) => {
      setAddress(accounts[0]);
      window.localStorage.setItem("address", accounts[0]);
    });

    // Subscribe to chainId change
    walletconnectprovider.on("chainChanged", (chainId) => {
      window.localStorage.setItem("chainid", chainId);
      setChain(window.localStorage.getItem("chainid"));
      checkChain();
    });

    // Subscribe to session disconnection
    walletconnectprovider.on("disconnect", (code, reason) => {
      console.log(code, reason);
      setIsConnected(false);
      window.localStorage.setItem("isConnected", false);
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
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  async function connectWithMetamask() {
    try {
      setConnectionStatus(true);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      setAddress(await signer.getAddress());
      //  console.log(JSON.stringify(JSON.parse(provider)));
      // window.localStorage.setItem("signer", JSON.stringify(provider));
      console.log(JSON.stringify((await provider.getNetwork()).chainId));
      setSigner(signer);
      setIsConnected(true);
      window.localStorage.setItem("signer", stringify(signer));
      window.localStorage.setItem("connection", "metamask");
      window.localStorage.setItem("isConnected", true);
      window.localStorage.setItem(
        "chainid",
        JSON.stringify((await provider.getNetwork()).chainId)
      );
      window.localStorage.setItem("address", await signer.getAddress());
      setWalletCount(1);
      setAddress(await signer.getAddress());
      document.getElementById("myModal1").style.display = "none";
    } catch (e) {
      setConnectionStatus(false);
      console.log(e);
    }
  }

  //////////////Wallet connect login /////////////////////////
  const walletconnectprovider = new WalletConnectProvider({
    infuraId: "5843244e30ef4b68b2a0cede1813a327",
  });
  async function connectWithWalletConnect() {
    try {
      setConnectionStatus(true);
      await walletconnectprovider.enable();
      const provider = new ethers.providers.Web3Provider(walletconnectprovider);
      const signer = provider.getSigner();
      setAddress(await signer.getAddress());
      setWalletCount(2);
      // window.localStorage.setItem("signer", JSON.stringify(signer));
      setSigner(signer);
      window.localStorage.setItem("address", await signer.getAddress());

      window.localStorage.setItem("signer", stringify(signer));
      window.localStorage.setItem(
        "chainid",
        JSON.stringify((await provider.getNetwork()).chainId)
      );
      setIsConnected(true);
      window.localStorage.setItem("connection", "walletconnect");
      window.localStorage.setItem("isConnected", true);
      console.log(Signer);
      document.getElementById("myModal1").style.display = "none";
    } catch (e) {
      setConnectionStatus(false);
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
      setConnectionStatus(true);
      // Initialize a Web3 Provider object
      const ethereum = coinbaseWallet.makeWeb3Provider();
      //  DEFAULT_ETH_JSONRPC_URL,
      // DEFAULT_CHAIN_ID

      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setSigner(signer);

      // window.localStorage.setItem("signer", JSON.stringify(signer));
      setWalletCount(3);
      setIsConnected(true);
      setAddress(await signer.getAddress());
      window.localStorage.setItem("address", await signer.getAddress());
      window.localStorage.setItem("connection", "coinbase");
      window.localStorage.setItem("signer", stringify(signer));
      window.localStorage.setItem(
        "chainid",
        JSON.stringify((await provider.getNetwork()).chainId)
      );
      window.localStorage.setItem("isConnected", true);
      document.getElementById("myModal1").style.display = "none";
    } catch (e) {
      setConnectionStatus(false);
      console.log(e);
    }
  }
  /////////// end Connecting to wallets code ////////////////////
  /////////// end Connecting to wallets code ////////////////////
  /////////// end Connecting to wallets code ////////////////////
  /////////// end Connecting to wallets code ////////////////////

  /////////LOGOUT ////////////
  async function logoutWallet() {
    setConnectionStatus(true);
    if (WalletCount === 1) {
      coinbaseWallet.disconnect();
    } else if (WalletCount === 2) {
      await walletconnectprovider.disconnect();
    } else if (WalletCount === 3) {
      coinbaseWallet.disconnect();
    } else if (WalletCount === 4) {
    }
    document.getElementById("disconnect").style.display = "none";
    setIsConnected(false);
    console.log("logged out");
    window.localStorage.setItem("address", "");
    window.localStorage.setItem("signer", "");
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

            <Link to="/fraction">
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
                  &nbsp;Fraction
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
            <br />
            <br />
            <br />
            <Link to="/faucet">
              <button
                onClick={() => {
                  updateTheme("btn6");
                }}
                className="btn btn6"
                id="btn6"
              >
                <span className="txt">
                  <FontAwesomeIcon icon="fa-solid fa-faucet-drip" />
                  &nbsp;Faucet
                </span>
              </button>
            </Link>
          </div>

          <div id="main" className="main App">
            <Routes>
              <Route path="/" element={<User />} />
              <Route path="/stake" element={<Stake />} />
              <Route path="/mint" element={<Mint />} />
              <Route path="/fraction" element={<Trade />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/faucet" element={<Faucet />} />
            </Routes>
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
                    onClick={async () => {
                      setcurrentChain("Rinkeby");
                      await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x4" }],
                      });
                    }}
                    className="walletchange"
                  >
                    Rinkeby
                  </button>
                  <button
                    onClick={async () => {
                      setcurrentChain("Mumbai");
                      await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x13881" }],
                      });
                    }}
                    className="walletchange"
                  >
                    Mumbai
                  </button>

                  <button
                    onClick={async () => {
                      setcurrentChain("Arbitrum Tetnet");
                      await window.ethereum.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x66eeb" }],
                      });
                    }}
                    className="walletchange"
                  >
                    Arbitrum Testnet
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
            {/*/////////////////////////////////////////////////////////////////////////*/}
            {/*/////////////////////////////////////////////////////////////////////////*/}
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
                      {ConnectionStatus === true ? (
                        "Conecting..."
                      ) : (
                        <>
                          Connection failed
                          <span
                            onClick={() => {
                              connectWithMetamask();
                            }}
                            className="tryagain"
                            style={{
                              fontSize: "19px",
                              marginLeft: "20px",
                              width: "30px",
                              borderStyle: "solid",
                              borderWidth: "2px",
                              borderColor: "red",
                            }}
                          >
                            TRY AGAIN
                          </span>
                        </>
                      )}
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
                      {ConnectionStatus === true ? (
                        "Conecting..."
                      ) : (
                        <>
                          Connection failed
                          <span
                            onClick={() => {
                              connectWithWalletConnect();
                            }}
                            className="tryagain"
                            style={{
                              fontSize: "19px",
                              marginLeft: "20px",
                              width: "30px",
                              borderStyle: "solid",
                              borderWidth: "2px",
                              borderColor: "red",
                            }}
                          >
                            TRY AGAIN
                          </span>
                        </>
                      )}
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
                      {ConnectionStatus === true ? (
                        "Conecting..."
                      ) : (
                        <>
                          Connection failed
                          <span
                            onClick={() => {
                              connectWithCoinbase();
                            }}
                            className="tryagain"
                            style={{
                              fontSize: "19px",
                              marginLeft: "20px",
                              width: "30px",
                              borderStyle: "solid",
                              borderWidth: "2px",
                              borderColor: "red",
                            }}
                          >
                            TRY AGAIN
                          </span>
                        </>
                      )}
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
            <div className="block">
              {" "}
              Made by 0xpr0f for the HackMoney Hackathon 2022 : Alpha test
              version
            </div>
            <div style={{ fontSize: "13px" }} id="block">
              <span>{block}</span>
              &nbsp;
              <FontAwesomeIcon
                style={{
                  color: "rgb(37,174,97)",
                  marginBottom: "3px",
                  width: "7px",
                  height: "7px",
                }}
                icon="fa-solid fa-circle"
              />
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
