import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import * as UAuthWeb3Modal from "@uauth/web3modal";
import UAuthSPA from "@uauth/js";

// These options are used to construct the UAuthSPA instance.
export const uauthOptions = {
  clientID: "63d984f1-2c8a-4f8c-958f-cca9edba3c6e",
  redirectUri: "https://frac-tion.vercel.app/",
  // Must include both the openid and wallet scopes.
  scope: "openid wallet",
};

export const providerOptions = {
  "custom-uauth": {
    // The UI Assets
    display: UAuthWeb3Modal.display,

    // The Connector
    connector: UAuthWeb3Modal.connector,

    // The SPA libary
    package: UAuthSPA,

    // The SPA libary options
    options: uauthOptions,
  },
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Fraction", // Required
      infuraId: "5843244e30ef4b68b2a0cede1813a327", // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "5843244e30ef4b68b2a0cede1813a327", // required
    },
  },
};
