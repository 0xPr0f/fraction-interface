import React, { useState, useEffect } from "react";
import "../styles/Mint.css";
import { ethers } from "ethers";
import { web3Modal } from "../App";
import { NFTRegistryABI } from "../abis/NFTRegistryABI";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { FractionNFTAddress, NFTRegistryAddress } from "../utils/utils";
import { useNotification } from "web3uikit";
import { FractionNFTABI } from "../abis/FractionNFTABI";
import { NFTStorage } from "nft.storage/dist/bundle.esm.min.js";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const Mint = () => {
  const dispatch = useNotification();
  const [minttype, setMintype] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [name, setName] = useState("");
  const [ensname, setEnsName] = useState("");
  const [udname, setUdName] = useState("");
  const [twittersocial, setTwittersocial] = useState("");
  const [github, setGithub] = useState("");
  const [description, setDescription] = useState("");
  const [balance, setbalance] = useState(0);
  const [file, setFile] = useState();

  var NFTRegistry;
  var FractionNFT;

  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQwNDRjNDhkN2U5M0RkQjlhODA5MTQ1MzlEQWZiNjg4RWIyNzI4NDEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MjczNjUzMTA1NSwibmFtZSI6IkZyYWN0aW9uIn0.ZOS37Ide4XE-1pp_W6V89IPpIVI-iNqYtaIGqRs9sa4";
  const NFTstorage = new NFTStorage({ token: apiKey });
  useEffect(() => {
    loadContract();
  });

  async function loadContract() {
    if (window.localStorage.getItem("connected") !== "false") {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      NFTRegistry = new ethers.Contract(
        NFTRegistryAddress,
        NFTRegistryABI,
        library.getSigner()
      );

      FractionNFT = new ethers.Contract(
        FractionNFTAddress,
        FractionNFTABI,
        library.getSigner()
      );
      const _balance = await FractionNFT.balanceOf(
        await library.getSigner().getAddress()
      );
      setbalance(Number.parseInt(_balance));
    }
  }

  async function mint() {
    if (!name || !description) return;
    if (name.length < 2 || description.length < 5) return;
    try {
      const metadata = await NFTstorage.store({
        name: name,
        description: description,
        image: file,
      });
      console.log(metadata.url);
      handleNewNotification(
        "success",
        "Metadata Uploaded",
        `<a target="_blank" href="${metadata.url}" >View NFT metadata</a>`
      );
      const tx = await NFTRegistry.setName(name, metadata.url, {
        value: ethers.utils.parseEther("0.3"),
      });
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `<a target="_blank" href="https://mumbai.polygonscan.com/tx/${txhash.transactionHash}" >Completed Transaction hash</a>`
      );
      console.log("mint with normal");
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
    }
  }

  async function mintdefault() {
    try {
      if (!name) return;
      const data = JSON.stringify({
        name: name,
        description:
          "Fraction NFT to determine your Fraction and earnings on wrapped erc20 and semi-fungible stakes",
        image:
          "https://ipfs.infura.io/ipfs/QmcdCYBWj2yjZmxPczDrW5V79XN3KiUZgpH7gUqJAuHSRH",
      });
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log(url);
      const tx = await NFTRegistry.setName(name, url, {
        value: ethers.utils.parseEther("0.3"),
      });
      const txhash = await tx.wait();
      handleNewNotification(
        "success",
        "Trasaction completed",
        `<a target="_blank" href="https://mumbai.polygonscan.com/tx/${txhash.transactionHash}" >Completed Transaction hash</a>`
      );
      console.log("mint with defualt");
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
    }
  }
  async function onChange(e) {
    const _file = e.target.files[0];
    setFile(_file);
    console.log(_file);
    try {
      const added = await client.add(_file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      handleNewNotification(
        "success",
        "Upload completed",
        `<a target="_blank" href="https://ipfs.infura.io/ipfs/${added.path}" > View image and uploaded url</a>`
      );
      console.log(url);
      setFileUrl(url);
    } catch (e) {
      handleNewNotification("error", "Error", `${e.message}`);
      console.log("Error uploading file: ", e);
    }
  }
  async function setensname() {
    try {
      if (ensname.length < 2) return;
      const tx = await NFTRegistry.setEnsName(ensname);
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
  async function setudname() {
    try {
      if (udname.length < 2) return;
      const tx = await NFTRegistry.setEnsName(udname);
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
  async function settwitter() {
    try {
      if (twittersocial.length < 3) return;
      const tx = await NFTRegistry.setEnsName(twittersocial);
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
  async function setgithub() {
    try {
      if (github.length < 3) return;
      const tx = await NFTRegistry.setEnsName(github);
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
    if (minttype === type) {
      setMintype("3");
      console.log(minttype);
    }
    setMintype(type);
  }

  return (
    <div>
      <div
        className="wrapper"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="pageboxmint1">
          {balance === 0 ? (
            <>
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
                        {fileUrl ? (
                          <img alt="" width="400" height="320" src={fileUrl} />
                        ) : null}

                        <label htmlFor="upload-photo">Browse...</label>
                        <br />
                        <input
                          type="file"
                          id="upload-photo"
                          onChange={onChange}
                        />
                        <br />
                      </div>
                    </div>
                    <div className="buttonCard">
                      <button
                        style={{ fontSize: "22px", height: "45px" }}
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
                        style={{ fontSize: "22px", height: "45px" }}
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
            </>
          ) : (
            <>
              <h2>configure NFT</h2>
              <div style={{ display: "flex", width: "390px" }}>
                <input
                  type="text"
                  className="inputFaucet"
                  placeholder="ENS name"
                  value={ensname}
                  onChange={(e) => {
                    setEnsName(e.target.value);
                  }}
                />
                &nbsp;
                <button
                  style={{ width: "80px", height: "40px" }}
                  onClick={() => {
                    setensname();
                  }}
                  className="buttonstandardmint"
                >
                  Set EnsName
                </button>
              </div>
              <br />
              {/*/////////////////////////////////////////// */}
              <div style={{ display: "flex", width: "390px" }}>
                <input
                  type="text"
                  className="inputFaucet"
                  placeholder="UD name"
                  value={udname}
                  onChange={(e) => {
                    setUdName(e.target.value);
                  }}
                />
                &nbsp;
                <button
                  style={{ width: "80px", height: "40px" }}
                  onClick={() => {
                    setudname();
                  }}
                  className="buttonstandardmint"
                >
                  Set EnsName
                </button>
              </div>
              <br />
              {/*/////////////////////////////////////////// */}
              <div style={{ display: "flex", width: "390px" }}>
                <input
                  type="text"
                  className="inputFaucet"
                  placeholder="Twitter handle"
                  value={twittersocial}
                  onChange={(e) => {
                    setTwittersocial(e.target.value);
                  }}
                />{" "}
                &nbsp;
                <button
                  style={{ width: "80px", height: "40px" }}
                  onClick={() => {
                    settwitter();
                  }}
                  className="buttonstandardmint"
                >
                  Set Twitter
                </button>
              </div>
              <br />
              {/*/////////////////////////////////////////// */}
              <div style={{ display: "flex", width: "390px" }}>
                <input
                  type="text"
                  className="inputFaucet"
                  placeholder="Github"
                  value={github}
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                />
                &nbsp;
                <button
                  style={{ width: "80px", height: "40px" }}
                  onClick={() => {
                    setgithub();
                  }}
                  className="buttonstandardmint"
                >
                  Set Github
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
