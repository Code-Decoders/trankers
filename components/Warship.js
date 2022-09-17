import React, { useEffect } from "react";
import styles from "../styles/Warship.module.css";
import ReactBlockies from "react-blockies";
import BigNumber from "bignumber.js";
// import Inventory from '../build/contracts/SpacePolyToken.json'
import { toast } from "react-toastify";
import { mint, mintWithToken } from "../lib/web3Adaptor";

const Warship = ({ ship, updateOwner }) => {
  const handleBuyWithtEVMOS = async () => {
    await mint(ship.id, ship.price);
    updateOwner(ship.id);
  };

  const handleByWithSPZ = async () => {
    console.log("buy with spz");
    await mintWithToken(ship.id);
    updateOwner(ship.id);
  };

  return (
    <div className={styles["warship-container"]}>
      <img src={ship.image} className={styles["warship-image"]} />
      <div className={styles["warship-title"]}>{ship.name}</div>
      <div className={styles["warship-owners"]}>
        <div style={{ fontSize: "15px" }}>Owners: {ship.owners.length}</div>
        <div style={{ display: "flex", gap: "0 5px", alignItems: "center" }}>
          {ship.owners.slice(0, 3).map((e, i) => {
            return (
              <ReactBlockies
                key={i}
                seed={e}
                size={7}
                className={styles["warship-owner"]}
              />
            );
          })}
          {ship.owners.length > 3 && <div>...More</div>}
        </div>
      </div>
      <div className={styles["action-bar"]}>
        <div className={styles["action-button"]} onClick={handleBuyWithtEVMOS}>
          {ship.price / 10 ** 18} tEVMOS
        </div>
        <div className={styles["action-button"]} onClick={handleByWithSPZ}>
          {ship.priceSPZ} SPT
        </div>
      </div>
    </div>
  );
};

export default Warship;
