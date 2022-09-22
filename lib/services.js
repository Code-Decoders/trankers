import { init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import coinbaseModule from "@web3-onboard/coinbase";
import polygon from "./icons/polygon";
import optimism from "./icons/optimism";
import skale from "./icons/skale";
import aurora from "./icons/aurora";
const logo = `
<svg id="Layer_1" width="80%" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 790.34 114.51"><defs><style>.cls-1{fill:#262a3d;}.cls-2{fill:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}</style><linearGradient id="linear-gradient" x1="694.45" y1="46.08" x2="741.39" y2="46.08" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#55ccfe"/><stop offset="1" stop-color="#5e93ef"/></linearGradient><linearGradient id="linear-gradient-2" x1="694.45" y1="86.73" x2="788.33" y2="86.73" xlink:href="#linear-gradient"/></defs><polygon class="cls-1" points="710.09 86.73 694.45 59.63 725.74 59.63 725.74 59.63 741.39 86.73 710.09 86.73"/><polygon class="cls-2" points="725.74 59.63 694.45 59.63 710.09 32.53 741.39 32.53 725.74 59.63"/><polygon class="cls-1" points="757.03 59.63 741.39 32.53 710.09 32.53 694.45 5.43 757.03 5.43 788.33 59.63 757.03 59.63"/><polygon class="cls-3" points="757.03 113.83 694.45 113.83 710.09 86.73 741.39 86.73 757.03 59.63 788.33 59.63 757.03 113.83"/><path class="cls-1" d="M70.51,65.77c0,19.47-14.37,34.5-31.88,34.5-9.54,0-16.47-3.53-21.17-9.54v7.71H.6V6.87L17.46,1.68V40.82c4.7-6,11.63-9.54,21.17-9.54C56.14,31.28,70.51,46.3,70.51,65.77Zm-16.86,0c0-11-7.7-18.42-18.16-18.42s-18,7.45-18,18.42,7.71,18.43,18,18.43S53.65,76.75,53.65,65.77Z"/><path class="cls-1" d="M78.09,6.87,94.94,1.68V98.44H78.09Z"/><path class="cls-1" d="M102.39,65.77a34.56,34.56,0,1,1,34.49,34.5A34.13,34.13,0,0,1,102.39,65.77Zm52.26,0c0-10.58-7.71-18-17.77-18s-17.64,7.45-17.64,18,7.71,18,17.64,18S154.65,76.36,154.65,65.77Z"/><path class="cls-1" d="M177.9,65.77c0-19.47,14.63-34.49,34.49-34.49,12.81,0,23.91,6.79,29.27,16.85l-14.5,8.5c-2.62-5.36-8.24-8.76-14.9-8.76-10.06,0-17.51,7.45-17.51,17.9s7.45,17.77,17.51,17.77c6.8,0,12.41-3.26,15-8.62l14.63,8.36a33.47,33.47,0,0,1-29.53,17C192.53,100.27,177.9,85.24,177.9,65.77Z"/><path class="cls-1" d="M290.32,98.44,266.54,68.78V98.44H249.68V6.87l16.86-5.19V61.85L289,33.11h20.12L282.87,65.38l27.05,33.06Z"/><path class="cls-1" d="M377.26,58.32V98.44H360.4v-38c0-8.89-5.35-13.46-12.93-13.46-8.23,0-14.38,4.83-14.38,16.2V98.44H316.24V33.11h16.85v7.31c3.92-5.88,10.72-9.14,19.47-9.14C366.41,31.28,377.26,41,377.26,58.32Z"/><path class="cls-1" d="M454.72,33.11V98.44H437.87V90.73c-4.71,5.88-11.76,9.54-21.3,9.54-17.38,0-31.75-15-31.75-34.5s14.37-34.49,31.75-34.49c9.54,0,16.59,3.66,21.3,9.54V33.11ZM437.87,65.77c0-11-7.71-18.42-18.17-18.42s-18,7.45-18,18.42,7.71,18.43,18,18.43S437.87,76.75,437.87,65.77Z"/><path class="cls-1" d="M498.65,49.31V33.11H483.88V13.9L467,19.09v57.4c0,17.64,8,24.56,31.63,22V83.15c-9.67.53-14.77.39-14.77-6.66V49.31Z"/><path class="cls-1" d="M510.46,33.11h16.85V98.44H510.46Z"/><path class="cls-1" d="M603.13,33.11,578.3,98.44H559.09L534.27,33.11h18.55l15.81,45.73,15.94-45.73Z"/><path class="cls-1" d="M639.2,85c6.53,0,11.76-2.74,14.64-6.53l13.58,7.84c-6.14,8.88-15.94,14-28.48,14-22,0-35.8-15-35.8-34.5s14-34.49,34.49-34.49c19.34,0,33.06,15.29,33.06,34.49A39.11,39.11,0,0,1,670,72.7H620.78C623.13,81.32,630.32,85,639.2,85Zm14.64-25.35c-2.1-9.41-9.15-13.2-16.21-13.2-9,0-15.15,4.84-17.12,13.2Z"/></svg>
`;

const icon = `
<svg id="Layer_1" height="100%" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 380.94 434.03"><defs><style>.cls-1{fill:#262a3d;}.cls-2{fill:url(#linear-gradient);}.cls-3{fill:url(#linear-gradient-2);}</style><linearGradient id="linear-gradient" x1="2.19" y1="163.03" x2="188.9" y2="163.03" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#55ccfe"/><stop offset="1" stop-color="#5e93ef"/></linearGradient><linearGradient id="linear-gradient-2" x1="2.19" y1="324.73" x2="375.61" y2="324.73" xlink:href="#linear-gradient"/></defs><polygon class="cls-1" points="64.42 324.73 2.19 216.93 126.66 216.93 126.66 216.93 188.9 324.73 64.42 324.73"/><polygon class="cls-2" points="126.66 216.93 2.19 216.93 64.42 109.13 188.9 109.13 126.66 216.93"/><polygon class="cls-1" points="251.14 216.93 188.9 109.13 64.42 109.13 2.19 1.33 251.14 1.33 375.61 216.93 251.14 216.93"/><polygon class="cls-3" points="251.14 432.53 2.19 432.53 64.42 324.73 188.9 324.73 251.14 216.93 375.61 216.93 251.14 432.53"/></svg>
`;

const dappId = "1730eff0-9d50-4382-a3fe-89f0d34a2070";

const injected = injectedModule();
const coinbase = coinbaseModule();
export const initWeb3Onboard = init({
  wallets: [injected, coinbase],
  chains: [
    {
      id: "0x13881",
      token: "MATIC",
      label: "Mumbai",
      rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
      blockExplorerUrl: "https://mumbai.polygonscan.com",
      icon: polygon,
    },
    {
      id: "0x1a4",
      token: "ETH",
      label: "Optimism Goerli Testnet",
      rpcUrl: "https://goerli.optimism.io/",
      blockExplorerUrl: "https://goerli-optimism.etherscan.io/",
      icon: optimism,
    },
    {
      id: "0x2696efe5",
      token: "SFUEL",
      label: "SKALE Testnet",
      rpcUrl:
        "https://eth-online.skalenodes.com/v1/hackathon-complex-easy-naos",
      blockExplorerUrl:
        "https://hackathon-complex-easy-naos.explorer.eth-online.skalenodes.com/",
      icon: skale,
    },
    {
      id: "0x4e454153",
      token: "ETH",
      label: "Aurora Testnet",
      rpcUrl: "https://testnet.aurora.dev/",
      blockExplorerUrl: "https://testnet.aurorascan.dev/",
      icon: aurora,
    },
  ],
  appMetadata: {
    name: "Trankers",
    icon: icon,
    logo: logo,
    description: "A community based Tank Game",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
    agreement: {
      version: "1.0.0",
      termsUrl: "https://www.blocknative.com/terms-conditions",
      privacyUrl: "https://www.blocknative.com/privacy-policy",
    },
    gettingStartedGuide: "https://blocknative.com",
    explore: "https://blocknative.com",
  },
  accountCenter: {
    desktop: {
      position: "topRight",
      enabled: true,
      minimal: false,
    },
  },

  apiKey: dappId,
  notify: {
    // transactionHandler: (transaction) => {
    //   console.log({ transaction });
    //   if (transaction.eventCode === "txPool") {
    //     return {
    //       // autoDismiss set to zero will persist the notification until the user excuses it
    //       autoDismiss: 0,
    //       // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
    //       // or you could use onClick for when someone clicks on the notification itself
    //       onClick: () =>
    //         window.open(`https://rinkeby.io/tx/${transaction.hash}`),
    //     };
    //   }
    // },
  },
});