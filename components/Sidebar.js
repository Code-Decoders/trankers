import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { getTokenBalance, mint_by_owner } from "../lib/web3Adaptor";
import Web3State from "../lib/Web3State";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const { pathname } = useRouter();
  const [balance, setBalance] = useState("0");
  const [sptBalance, setSptBalance] = useState("0");
  const { web3 } = useContext(Web3State);

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
    setSptBalance(balance.tokenBalance);
    setBalance(balance.nativeBalance);
  }

  useEffect(() => {
    if (web3) {
      // mint_by_owner()
      setInterval(() => {
        getBalance();
      }, 5000);
    }
  }, [web3]);

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
        <div>{parseFloat(balance).toFixed(2)} tEVMOS</div>
        <div>{sptBalance} SPT</div>
      </div>
    </div>
  );
};

export default Sidebar;
