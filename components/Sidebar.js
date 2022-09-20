import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import network from "../lib/networkEnum";
import { getTokenBalance, mint_by_owner, web3 } from "../lib/web3Adaptor";
import Web3State from "../lib/Web3State";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const { pathname } = useRouter();
  const [balance, setBalance] = useState("0");
  const [TRTBalance, setTRTBalance] = useState("0");
  const [{ wallet }] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.match(re)[0];
}
  useEffect(() => {
    switch (pathname) {
      case "/":
        setActive(0);
        break;
      case "/portfolio":
        setActive(1);
        break;
      case "/playground":
        setActive(2);
    }
  }, [pathname]);

  async function getBalance() {
    const balance = await getTokenBalance();
    setTRTBalance(balance.tokenBalance);
    setBalance(Object.values(wallet.accounts[0].balance)[0]);
  }

  useEffect(() => {
    if (wallet) {
      // if (web3) mint_by_owner();
      setInterval(() => {
        getBalance();
      }, 5000);
    }
  }, [wallet, web3]);

  return (
    <div style={{ flex: 0.18 }} className={styles["sidebar-container"]}>
      <div className={styles["logo-text"]}>Trankers</div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flex: 1,
          alignItems: "flex-end",
          gap: "1.5rem 0",
        }}
      >
        <Link href={"/"}>
          <div
            className={
              styles["sidebar-button"] +
              (active == 0 ? ` ${styles["active"]}` : "")
            }
          >
            <img src="/icons/Menu.svg" width={20} />
            <div style={{ flex: 1 }}>Inventory</div>
            <div className={styles["sidebar-block"]} />
          </div>
        </Link>
        {/* <Link href={'portfolio'}>
          <div className={styles['sidebar-button'] + (active == 1 ? ` ${styles['active']}` : "")}>
            <img src="/icons/Star.svg" width={20} />
            <div style={{ flex: 1 }}>Portfolio</div>
            <div className={styles['sidebar-block']} />
          </div>
        </Link> */}
        <Link href={"playground"}>
          <div
            className={
              styles["sidebar-button"] +
              (active == 2 ? ` ${styles["active"]}` : "")
            }
          >
            <img src="/icons/Game.svg" width={20} />
            <div style={{ flex: 1 }}>Playground</div>
            <div className={styles["sidebar-block"]} />
          </div>
        </Link>
      </div>
      <div className={styles["sidebar-balance-container"]}>
        <div style={{ fontSize: "20px" }}>Balance</div>
        <div>
          {toFixed(balance, 3)}{" "}
          {connectedChain ? network[connectedChain.id].symbol : ""}
        </div>
        <div>{TRTBalance} TRT</div>
      </div>
    </div>
  );
};

export default Sidebar;
