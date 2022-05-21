import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { web3Modal } from "../App";
import { FractionTokenABI } from "../abis/FractionTokenABI ";
import { FractionWrapperABI } from "../abis/FractionWrapperABI";
import "../styles/Trade.css";
import { FractionlessWrapperAddress, FractTokenAddress } from "../utils/utils";
import { getTokenBalance } from "../utils/covalentDataSource";
import { useNotification } from "web3uikit";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

export const Trade = () => {
  const dispatch = useNotification();
  const [unwrapamount, setUnwrapAmount] = useState("");
  const [addressToken, setAddressToken] = useState(
    "0x953f88014255241332d8841C34921572db112D65"
  );
  const [allowance, setAllowance] = useState();
  const [wrapamount, setWrapAmount] = useState("");
  const [wraptype, setWraptype] = useState("");
  const [tokenWrapped, settokenWrapped] = useState();
  const [tokenWWrapped, settokenWWrapped] = useState();
  const [checked, setChecked] = useState(false);

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
    setWraptype(type);
  }

  var FractionlessWrapperContract;
  var Tokencontract;
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
      Tokencontract = new ethers.Contract(
        FractTokenAddress,
        FractionTokenABI,
        library.getSigner()
      );
      const allow = await Tokencontract.allowance(
        await library.getSigner().getAddress(),
        FractionlessWrapperAddress
      );
      setAllowance(allow);
      const _wrap = await FractionlessWrapperContract.wrappedAssets(
        await library.getSigner().getAddress()
      );

      settokenWWrapped(_wrap.toString());
      settokenWrapped(
        ethers.utils.formatEther(
          await getTokenBalance(
            await library.getSigner().getAddress(),
            "80001",
            FractTokenAddress
          )
        )
      );
    }
  }

  async function approveERCbeforeTransfer() {
    try {
      const tx = await Tokencontract.approve(
        FractionlessWrapperAddress,
        "1000000000000000000000000000000000000000000000000000000000000"
      );
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `<a target="_blank" href="https://mumbai.polygonscan.com/tx/${txhash.transactionHash}" >Completed Transaction hash</a>`
      );
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
    }
  }
  useEffect(() => {
    const lsallowance = window.localStorage.getItem("showallowance") === "true";
    setChecked(lsallowance);
  });
  const handleChange = (event) => {
    setChecked(event.target.checked);
    window.localStorage.setItem("showallowance", event.target.checked);
  };
  async function wrap() {
    try {
      const tx = await FractionlessWrapperContract.wrap(
        wrapamount,
        addressToken
      );
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `<a target="_blank" href="https://mumbai.polygonscan.com/tx/${txhash.transactionHash}" >Completed Transaction hash</a>`
      );
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
    }
  }
  async function unwrap() {
    try {
      const tx = await FractionlessWrapperContract.unwrap(
        unwrapamount,
        addressToken
      );
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `<a target="_blank" href="https://mumbai.polygonscan.com/tx/${txhash.transactionHash}" >Completed Transaction hash</a>`
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
              WRAP
            </button>
            <div style={{ fontSize: "30px" }}>/</div>
            <button
              id="mintype2"
              onClick={() => {
                Minttype("2");
              }}
              className="buttonstandardchoose"
            >
              UNWRAP
            </button>
          </div>
          <div>
            {wraptype === "2" ? (
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
                    Wrapped FRACT tokens in wallet : {tokenWWrapped} FRACT
                  </span>
                  <br />
                  <div>
                    <div>
                      <input
                        type="number"
                        className="inputFaucet"
                        placeholder="Amount"
                        value={unwrapamount}
                        onChange={(e) => {
                          setUnwrapAmount(e.target.value);
                        }}
                      />
                    </div>
                    <div style={{ float: "left" }}>
                      Wrap Rewards : {tokenWWrapped} - {unwrapamount} ={" "}
                      {tokenWWrapped - unwrapamount}
                    </div>
                    <br />
                    <br />
                    <div style={{ float: "left" }}>
                      Stream : {(tokenWWrapped - unwrapamount) * 60 * 60 * 24}{" "}
                      wei/day
                    </div>
                    <br />
                  </div>
                  <br />
                  <br />
                </div>
                <div className="buttonCard">
                  <button
                    style={{ fontSize: "22px", height: "45px" }}
                    onClick={unwrap}
                    className="buttonstandard"
                  >
                    UNWRAP
                  </button>
                </div>
              </>
            ) : (
              <>
                <br />

                <div>
                  <br />
                  <div>
                    <input
                      style={{ fontSize: "18px" }}
                      type="text"
                      className="inputFaucet"
                      placeholder="Token Address"
                      value={addressToken}
                      onChange={(e) => {}}
                    />
                  </div>
                  <span
                    style={{
                      // marginTop: "0px",
                      fontSize: "14px",
                      float: "left",
                    }}
                  >
                    Fract Tokens in wallet : {tokenWrapped} FRACT
                  </span>
                  <Tooltip
                    title="show/hide contract allowance"
                    arrow
                    placement="top-start"
                  >
                    <Switch
                      checked={checked}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </Tooltip>
                  <br />
                  {!checked ? null : (
                    <>
                      <span
                        style={{
                          // marginTop: "0px",
                          fontSize: "14px",
                          float: "left",
                        }}
                      >
                        FRACT Contract allowance :&nbsp;
                        {allowance ? allowance / 10 ** 18 : null}
                        &nbsp;FRACT
                      </span>
                      <br />
                      <br />
                    </>
                  )}
                  <div>
                    <input
                      style={{ fontSize: "18px" }}
                      type="number"
                      className="inputFaucet"
                      placeholder="Amount"
                      value={wrapamount}
                      onChange={(e) => {
                        setWrapAmount(e.target.value);
                      }}
                    />
                  </div>
                  <div style={{ float: "left" }}>
                    Wrap Rewards : {wrapamount} x 100,000 + 1 ={" "}
                    {wrapamount * 100000 + 1}
                  </div>
                  <br />
                  <br />
                  <div style={{ float: "left" }}>
                    Stream : {wrapamount * (100000 + 1) * 60 * 60 * 24} wei/day
                  </div>
                </div>
                <br />
                <br />
                {allowance / 10 ** 18 < wrapamount ? (
                  <div style={{ marginBottom: "3px" }} className="buttonCard">
                    <button
                      style={{ fontSize: "15px", height: "50px" }}
                      onClick={() => {
                        approveERCbeforeTransfer();
                      }}
                      className="buttonstandard"
                    >
                      Allow the Fraction Protocol to uses your FRACT
                    </button>
                  </div>
                ) : null}
                <div className="buttonCard">
                  {allowance / 10 ** 18 >= wrapamount ? (
                    <button
                      style={{ fontSize: "22px", height: "45px" }}
                      onClick={wrap}
                      className="buttonstandard"
                    >
                      WRAP
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
