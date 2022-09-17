import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { mint, mintWithToken } from "../lib/web3Adaptor";
import styles from "../styles/Upgrades.module.css";

const Upgrades = ({ upgrade, index, updateOwner }) => {
  const handleBuyWithtEVMOS = async () => {
    await mint(upgrade.id, upgrade.price);
    updateOwner(upgrade.id);
  };

  const handleByWithSPZ = async () => {
    console.log("buy with spz");
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
      <td className={styles.center}>20% Damage</td>
      <td className={styles["action-bar"]}>
        <div className={styles["action-button"]} onClick={handleBuyWithtEVMOS}>
          {upgrade.price / 10 ** 18} tEVMOS
        </div>
        <div className={styles["action-button"]} onClick={handleByWithSPZ}>
          {upgrade.priceSPZ} SPT
        </div>
      </td>
      <td className={styles.center}>{upgrade.owners.length}</td>
    </tr>
  );
};

export default Upgrades;
