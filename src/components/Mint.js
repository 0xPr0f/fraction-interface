import React, { useState } from "react";
import "../styles/Mint.css";
import { ethers } from "ethers";
import { FractionNFTABI } from "../utils/FractionNFT";
import WalletConnectProvider from "@walletconnect/web3-provider";
//import { NFTStorage, File } from "nft.storage";

export const Mint = () => {
  const NFT_STORAGE_KEY = "REPLACE_ME_WITH_YOUR_KEY";
  const [minttype, setMintype] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const contractaddress = "";
  var provider;

  const walletconnectprovider = new WalletConnectProvider({
    infuraId: "5843244e30ef4b68b2a0cede1813a327",
  });
  if (window.localStorage.getItem("connection") !== "metamask") {
    provider = new ethers.providers.Web3Provider(window.ethereum);
  } else if (window.localStorage.getItem("connection") === "walletconnect") {
    provider = new ethers.providers.Web3Provider(walletconnectprovider);
  }
  const NFTcontract = new ethers.Contract(
    contractaddress,
    FractionNFTABI,
    provider.getSigner()
  );

  async function storeNFT() {
    // create a new NFTStorage client using our API key
    // const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    // call client.store, passing in the image & metadata
    /* return nftstorage.store({
      image,
      name,
      description,

    }); */
  }

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      /*  const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      }); */
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      // setImage(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function mint() {
    console.log("mint with custom");
  }
  function mintdefault() {
    console.log("mint with defualt");
  }
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
          <h2> Mint Fraction NFT </h2>
          <div style={{ display: "flex" }}>
            <button
              id="mintype1"
              onClick={() => {
                Minttype("1");
              }}
              className="buttonstandardchoose"
            >
              Customise
            </button>
            <div style={{ fontSize: "30px" }}>/</div>
            <button
              id="mintype2"
              onClick={() => {
                Minttype("2");
              }}
              className="buttonstandardchoose"
            >
              Defualt
            </button>
          </div>
          <div>
            {minttype === "1" ? (
              <>
                <div>
                  <div className="accountDetails">
                    <br />
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
                    <textarea
                      style={{
                        maxWidth: "375px",
                        minWidth: "374px",
                        minHeight: "30px",
                      }}
                      type="text"
                      className="inputFaucet"
                      placeholder="An nft to showcase my fraction"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <h5>Image</h5>
                    <img src={image} alt="" />

                    <label htmlFor="upload-photo">Browse...</label>
                    <br />
                    <input
                      type="file"
                      id="upload-photo"
                      placeholder="An nft to showcase my fraction"
                      onClick={onChange}
                    />
                    <br />
                  </div>
                </div>
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
            {minttype === "2" ? (
              <>
                <br />

                <div>
                  <p className="error"> </p>

                  <div
                    style={{ fontWeight: "bold" }}
                    className="accountDetails"
                  >
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
                    <br />- Mint with defualt settings -
                  </div>
                </div>
                <br />
                <div className="buttonCard">
                  <button
                    onClick={() => {
                      mintdefault();
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
