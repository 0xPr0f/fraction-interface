import "./styles/App.css";
import User from "./components/User";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Stake } from "./components/Stake";
import { Link } from "react-router-dom";
import { Mint } from "./components/Mint";
import { Analytics } from "./components/Analytics";
import { Trade } from "./components/Trade";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./utils/providerOptions";
import { getEllipsisTxt } from "./utils/utils";
import { Faucet } from "./components/Faucet";
import { getBlockHeight } from "./utils/covalentDataPool";
import { redirect } from "./utils/utils";

export const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});
function App() {
  const [provider, setProvider] = useState();
  const [block, setblock] = useState("");
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState();
  const [barposition, setBarposition] = useState();

  const [tab, setTab] = useState();
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      window.localStorage.setItem("connected", "true");
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    web3Modal.clearCachedProvider();
    window.localStorage.setItem("connected", "false");
    console.log("nice");
    refreshState();
  };
  /*
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);
*/
  useEffect(() => {
    loadStuff();
  });
  async function loadStuff() {
    setblock(await getBlockHeight(80001));
  }
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);
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
  useEffect(() => {
    setBarposition(window.localStorage.getItem("sidebar"));
  });
  function closeNav() {
    if (window.localStorage.getItem("sidebar") !== "closed") {
      document.getElementById("mySidenav").style.width = "100px";
      document.getElementById("main").style.marginLeft = "50px";
      window.localStorage.setItem("sidebar", "closed");
      setBarposition(window.localStorage.getItem("sidebar"));
      console.log("pull");
    } else {
      document.getElementById("mySidenav").style.width = "260px";
      document.getElementById("main").style.marginLeft = "260px";
      window.localStorage.setItem("sidebar", "open");
      setBarposition(window.localStorage.getItem("sidebar"));
      console.log("push");
    }
    // document.getElementById("mySidenav").style.display = "none";
  }
  return (
    <div id="mainog">
      <Router>
        <div>
          <div id="mySidenav" className="sidenav">
            <span
              style={{ fontSize: "35px", marginLeft: "50px" }}
              onClick={() => {
                closeNav();
              }}
              className="close1"
            >
              {barposition === "open" ? (
                <FontAwesomeIcon icon="fa-solid fa-arrow-left-long fa-7x" />
              ) : (
                <FontAwesomeIcon icon="fa-solid fa-arrow-right-long fa-7x" />
              )}
            </span>
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
            <br />
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
            <Link to="/faucet">
              <button
                onClick={() => {
                  updateTheme("btn6");
                }}
                className="btn btn6"
                id="btn6"
              >
                <span className="txt">
                  <FontAwesomeIcon icon="fa-solid fa-faucet-drip" />{" "}
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

            <div id="loginholder">
              <button className="login">
                <span className="logintxt">Dropdown</span>
              </button>
              {window.localStorage.getItem("connected") === "false" ? null : (
                <button className="login">
                  <span className="logintxt">{getEllipsisTxt(account)}</span>
                </button>
              )}
              <button className="login">
                <span
                  className="logintxt"
                  onClick={() => {
                    if (window.localStorage.getItem("connected") === "false") {
                      connectWallet();
                    } else {
                      console.log();
                      disconnect();
                      console.log(
                        network,
                        window.localStorage.getItem("connected")
                      );
                    }
                  }}
                >
                  {window.localStorage.getItem("connected") === "false"
                    ? "Connect Wallet"
                    : "Disconnect"}
                </span>
              </button>
            </div>

            {/*Add extra stuff here below */}

            {/*end of add extra stuff here below */}
            <div
              onClick={() => {
                redirect(`https://mumbai.polygonscan.com/block/${block}`);
              }}
              style={{ fontSize: "13px" }}
              id="block"
            >
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
