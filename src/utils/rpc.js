export const RINKEBY_RPC_URL = "https://mainnet.infura.io/v3/<INFURA_KEY>";

export const networkConfigs = {
  1: {
    chainId: 1,
    chainName: "Ethereum Mainnet",
    currencySymbol: "ETH",
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  3: {
    chainId: 3,
    chainName: "Ropsten",
    currencySymbol: "rETH",
    blockExplorerUrl: "https://ropsten.etherscan.io/",
  },
  4: {
    chainId: 4,
    chainName: "Rinkeby",
    currencySymbol: "rkETH",
    blockExplorerUrl: "https://kovan.etherscan.io/",
  },
  42: {
    chainId: 42,
    chainName: "Kovan",
    currencySymbol: "kETH",
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
  },
  5: {
    chainId: 5,
    chainName: "Gorli",
    currencySymbol: "gETH",
    blockExplorerUrl: "https://goerli.etherscan.io/",
  },
  43114: {
    chainId: 43114,
    chainName: "Avalanche Mainnet",
    currencyName: "AVAX",
    currencySymbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://cchain.explorer.avax.network/",
  },
  421611: {
    chainId: 421611,
    chainName: "Avalanche Rinkeby",
    currencyName: "aETH",
    currencySymbol: "aETH",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://testnet.arbiscan.io/",
  },
  42162: {
    chainId: 42162,
    chainName: "Arbitrum Mainnet",
    currencyName: "aETH",
    currencySymbol: "aETH",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://arbiscan.io/",
  },
  56: {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  97: {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
  },
  137: {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://explorer-mainnet.maticvigil.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  },
  80001: {
    chainId: 80001,
    chainName: "Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today/",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
  },
};
export const networkParams = {
  "0x13881": {
    chainId: "0x13881",
    rpcUrls: ["https://rpc-mumbai.matic.today/"],
    chainName: "Polygon Mumbai",
    nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
    blockExplorerUrl: ["https://mumbai.polygonscan.com"],
    iconUrls: [],
  },
};
export const getNativeByChain = (chain) =>
  networkConfigs[chain]?.currencySymbol || "NATIVE";

export const getChainName = (chain) => networkConfigs[chain]?.chainName || null;

export const getExplorer = (chain) => networkConfigs[chain]?.blockExplorerUrl;

export const getWrappedNative = (chain) =>
  networkConfigs[chain]?.wrapped || null;

const chainToHex = {
  eth: "0x1",
  ropsten: "0x3",
  rinkeby: "0x4",
  goerli: "0x5",
  kovan: "0x2a",
  bsc: "0x38",
  "bsc testnet": "0x61",
  polygon: "0x89",
  mumbai: "0x13881",
  fantom: "0xfa",
  avalanche: "0xa86a",
  "avalanche testnet": "0xa869",
  "0x1": "0x1",
  "0x3": "0x3",
  "0x4": "0x4",
  "0x5": "0x5",
  "0x2a": "0x2a",
  "0x38": "0x38",
  "0x61": "0x61",
  "0x89": "0x89",
  "0x13881": "0x13881",
  "0xfa": "0xfa",
  "0xa86a": "0xa86a",
  "0xa869": "0xa869",
};
export const getChainHex = (chain) => chainToHex[chain];
