import React, { useContext, useEffect } from "react";
import styles from "../styles/Navbar.module.css";
import { useConnectWallet } from "@web3-onboard/react";

const Navbar = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  if (wallet) return <></>; 

  return (
    <div className={styles["navbar-container"]}>
      <div
        className={styles["navbar-button"]}
        onClick={() =>
          !connecting &&
          (wallet ? disconnect({ label: wallet.label }) : connect())
        }
      >
        {connecting
          ? "Connecting.."
          : wallet
          ? wallet.accounts[0]?.address.slice(0, 10) + "..."
          : "Connect"}
      </div>
    </div>
  );
};

export default Navbar;
