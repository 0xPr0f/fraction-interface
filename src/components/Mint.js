import React, { useState } from "react";
import "../styles/Mint.css";

export const Mint = () => {
  const [minttype, setMintype] = useState();
  function mint() {}
  function Minttype(type) {
    if (minttype === type) {
      setMintype("3");
      console.log(minttype);
    }
    setMintype(type);
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
          <h2> choose mint type </h2>
          <button
            id="mintype1"
            onClick={() => {
              Minttype("1");
            }}
            className="buttonstandardchoose"
          >
            Customise
          </button>
          <br />
          <button
            id="mintype2"
            onClick={() => {
              Minttype("2");
            }}
            className="buttonstandardchoose"
          >
            Defualt
          </button>
          <div>
            {minttype === "1" ? (
              <>
                <br />
                <br />
                custom mint
                <div>
                  <p className="error"> error Lorem isplurm lol balh blah </p>

                  <div className="accountDetails">
                    <h5>Account</h5>
                    <p>address Lorem isplurm lol balh blah </p>
                    <h5>Balance</h5>
                    <p>balance Lorem isplurm lol balh blah </p>
                    <h5>Trasactions</h5>

                    <p> Lorem isplurm lol balh blah </p>
                  </div>
                </div>
                <div className="buttonCard">
                  <button className="buttonstandard">
                    Lorem isplurm lol balh blah
                  </button>
                </div>
              </>
            ) : null}
            {minttype === "2" ? (
              <>
                <br />

                <div>
                  <p className="error"> </p>

                  <div
                    style={{ fontWeight: "bold" }}
                    className="accountDetails"
                  >
                    - Mint with defualt settings -
                  </div>
                </div>
                <br />
                <div className="buttonCard">
                  <button
                    onClick={() => {
                      mint();
                    }}
                    className="buttonstandard"
                  >
                    Mint
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
