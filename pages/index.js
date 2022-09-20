import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import Upgrades from "../components/Upgrades";
import Tank from "../components/Tank";
import { getContractData, getPrices, getURI, web3 } from "../lib/web3Adaptor";
import styles from "../styles/Home.module.css";
import { InventoryAddress } from "./_app";

export default function Home() {
  const [ships, setShips] = React.useState([]);
  const [upgrades, setUpgrades] = React.useState([]);

  const getData = async () => {
    console.log("getData");
    const data = await getContractData();
    const ids = data.map((e) => e.returnValues).map((e) => e.id);
    console.log(ids);
    ids = [...new Set(ids)];
    console.log(ids);
    let _ships = [],
      _upgrades = [];
    for (const i = 0; i < ids.length; i++) {
      const id = ids[i];
      const IPFSurl = await getURI(id);
      const cid = IPFSurl.split("/")[2];
      var token_meta = await (
        await fetch(`https://spheron.infura-ipfs.io/ipfs/${cid}/${id}.json`)
      ).json();
      const owners = data
        .map((e) => e.returnValues)
        .filter((e) => e.id === id)
        .map((e) => e.to);
      const prices = await getPrices(id);
      if (token_meta.name.includes("Tank")) {
        _ships.push({
          ...token_meta,
          id: id,
          owners: owners,
          price: parseInt(prices[0]),
          trt: parseInt(prices[1]),
        });
      } else {
        _upgrades.push({
          ...token_meta,
          id: id,
          owners: owners,
          price: parseInt(prices[0]),
          trt: parseInt(prices[1]),
        });
      }
    }
    setShips(_ships);
    setUpgrades(_upgrades);
    console.log(_ships, _upgrades);
  };

  const updateOwners = async (id) => {
    const data = await getContractData();
    const ids = data.map((e) => e.returnValues).filter((e) => e.id == id);
    const owners = ids.map((e) => e.to);
    console.log(owners);
    if (id in ships.map((e) => e.id)) {
      setShips((val) => {
        return val.map((item) => {
          if (item.id === id) {
            return { ...item, owners: owners };
          }
          return item;
        });
      });
    } else {
      setUpgrades((val) => {
        return val.map((item) => {
          if (item.id === id) {
            return { ...item, owners: owners };
          }
          return item;
        });
      });
    }
  };

  useEffect(() => {
    if (web3) getData();
  }, [web3]);
  return (
    <div className={styles["home-container"]}>
      <div style={{ padding: "2rem" }}>
        <h1>Trending Tanks</h1>
        <div className={styles["horizontal-listview-container"]}>
          <div className={styles["horizontal-listview"]}>
            {ships.map((val, i) => (
              <Tank key={i} ship={val} updateOwner={updateOwners} />
            ))}
          </div>
        </div>
        <h1>Top Upgrades</h1>

        <table className={styles["upgrade-table"]}>
          <thead>
            <tr style={{ padding: "1rem" }}>
              <th></th>
              <th style={{ textAlign: "left" }}>Collection</th>
              <th>Damage</th>
              <th>Speed</th>
              <th>Buy</th>
              <th>Owners</th>
            </tr>
          </thead>
          <tbody>
            {upgrades.map((val, i) => {
              return (
                <Upgrades
                  key={i}
                  index={i + 1}
                  upgrade={val}
                  updateOwner={updateOwners}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Code-Decoders"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by CodeDecoders
        </a>
      </footer>
    </div>
  );
}
