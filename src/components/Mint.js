import React, { useState } from "react";
import "../styles/Mint.css";

export const Mint = () => {
  const [minttype, setMintype] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);
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
                <div>
                  <div className="accountDetails">
                    <h5>Name</h5>
                    <input
                      type="text"
                      className="inputFaucet"
                      placeholder="NFT man"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <h5>Description</h5>
                    <input
                      type="text"
                      className="inputFaucet"
                      placeholder="An nft to showcase my fraction"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <h5>Image</h5>

                    <input
                      type="file"
                      className="inputFaucet"
                      placeholder="An nft to showcase my fraction"
                      value={image}
                      onChange={(e) => {
                        setImage(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="buttonCard">
                  <button className="buttonstandard">Mint</button>
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
