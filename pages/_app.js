import Main from "../components/Layout";
import "../styles/globals.css";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Web3State from "../lib/Web3State";
import { initWeb3Onboard } from "../lib/services";
import {
  useAccountCenter,
  useConnectWallet,
  useNotifications,
  useSetChain,
  useWallets,
  useSetLocale,
} from "@web3-onboard/react";
import Web3 from "web3";
import { setWeb3 } from "../lib/web3Adaptor";

let provider;

function MyApp({ Component, pageProps }) {
  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
    useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const [notifications, customNotification, updateNotify] = useNotifications();
  const connectedWallets = useWallets();
  const updateAccountCenter = useAccountCenter();

  const [state, setState] = useState({
    web3: null,
    accounts: null,
    inventory: null,
    token: null,
  });

  const [web3Onboard, setWeb3Onboard] = useState(null);

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
  }, []);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets, wallet]);

  useEffect(() => {
    if (!wallet?.provider) {
      provider = null;
    } else {
      provider = new Web3(wallet.provider);
      setWeb3(provider, wallet.accounts[0].address, wallet.chains[0].id);
    }
  }, [wallet]);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets")
    );

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        const walletConnected = await connect({
          autoSelect: previouslyConnectedWallets[0],
        });
        console.log("connected wallets: ", walletConnected);
      }
      setWalletFromLocalStorage();
    }
  }, [connect]);

  return (
    <Web3State.Provider value={state}>
      <Main>
        <Component {...pageProps} />
        <ToastContainer />
      </Main>
    </Web3State.Provider>
  );
}

export default MyApp;
