import { useSetChain } from "@web3-onboard/react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import network from "../lib/networkEnum";
import { mint, mintWithToken } from "../lib/web3Adaptor";
import styles from "../styles/Upgrades.module.css";

const Upgrades = ({ upgrade, index, updateOwner }) => {
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const handleBuyWithtNative = async () => {
    await mint(upgrade.id, upgrade.price);
    updateOwner(upgrade.id);
  };

  const handleByWithTRT = async () => {
    console.log("buy with TRT");
    await mintWithToken(upgrade.id);
    updateOwner(upgrade.id);
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        <span>
          <img src={upgrade.image} className={styles["image"]} />
          {upgrade.name}
        </span>
      </td>
      <td className={styles.center}>{upgrade.attributes[1]['value']}% Damage</td>
      <td className={styles.center}>{upgrade.attributes[1]['value']}</td>
      <td className={styles["action-bar"]}>
        <div className={styles["action-button"]} onClick={handleBuyWithtNative}>
          {(upgrade.price / 10 ** 18).toFixed(2)}{" "}
          {network[connectedChain.id].symbol}
        </div>
        <div className={styles["action-button"]} onClick={handleByWithTRT}>
          {upgrade.trt} TRT
        </div>
      </td>
      <td className={styles.center}>{upgrade.owners.length}</td>
    </tr>
  );
};

export default Upgrades;
