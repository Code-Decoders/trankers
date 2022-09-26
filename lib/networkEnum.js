const network = Object.freeze({
  "0x13881": {
    name: "Mumbai",
    rpc: "https://rpc-mumbai.maticvigil.com/",
    explorer: "https://mumbai.polygonscan.com",
    symbol: "MATIC",
    decimals: 2,
  },
  "0x1a4": {
    name: "Optimism Goerli Testnet",
    rpc: "https://goerli.optimism.io/",
    explorer: "https://goerli-optimism.etherscan.io/",
    symbol: "ETH",
    decimals: 2,
  },
  "0x2696efe5": {
    name: "SKALE Testnet",
    rpc: "https://eth-online.skalenodes.com/v1/hackathon-complex-easy-naos",
    explorer:
      "https://hackathon-complex-easy-naos.explorer.eth-online.skalenodes.com/",
    symbol: "SFUEL",
    decimals: 2,
  },
  "0x152": {
    name: "Cronos Testnet",
    rpc: "https://evm-t3.cronos.org	",
    explorer: "https://testnet.cronoscan.com/",
    symbol: "TCRO",
    decimals: 2,
  },
  "0x4e454153": {
    name: "Aurora Testnet",
    rpc: "https://testnet.aurora.dev/",
    explorer: "https://testnet.aurorascan.dev/",
    symbol: "ETH",
    decimals: 9,
  },
});
export default network;
