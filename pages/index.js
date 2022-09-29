import Head from "next/head";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Upgrades from "../components/Upgrades";
import Tank from "../components/Tank";
import { getContractData, getPrices, getURI, web3 } from "../lib/web3Adaptor";
import styles from "../styles/Home.module.css";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import network from "../lib/networkEnum";
import contractAddress from "../lib/getContract";

export default function Home() {
  const [ships, setShips] = useState([]);
  const [upgrades, setUpgrades] = useState([]);
  const [{ connectedChain }] = useSetChain();
  const [{ wallet }] = useConnectWallet();
  const [loadPercent, setLoadPercent] = useState(0);

  const getData = async () => {
    console.log("getData");
    const data = await getContractData();
    const ids = [];
    if (network[connectedChain.id].name === "Mumbai") {
      const json = (
        await (
          await fetch(
            `https://api.covalenthq.com/v1/80001/tokens/${
              contractAddress[connectedChain.id].inventory
            }/nft_token_ids/?quote-currency=USD&format=JSON&key=${
              process.env.NEXT_PUBLIC_COVALENT_API_KEY
            }`
          )
        ).json()
      ).data.items;

      ids = json.map((e) => e.token_id);
    } else {
      ids = data.map((e) => e.returnValues).map((e) => e.id);
    }
    console.log(ids);
    ids = [...new Set(ids)];
    console.log(ids);
    let _ships = [],
      _upgrades = [];
    for (const i = 0; i < ids.length; i++) {
      setLoadPercent((i / ids.length) * 100);
      const id = ids[i];
      const IPFSurl = await getURI(id);
      const cid = IPFSurl.split("/")[2];
      var token_meta = await (
        await fetch(`https://gateway.pinata.cloud/ipfs/${cid}/${id}.json`)
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
    
    const owners = data
      .map((e) => e.returnValues)
      .filter((e) => e.id === id)
      .map((e) => e.to);
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
  }, [web3, connectedChain]);
  return (
    <div className={styles["home-container"]}>
      {ships.length == 0 || upgrades.length == 0 ? (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <h1>{!wallet ? "Please Connect to your wallet" : "Loading..."}</h1>
          {wallet && <progress value={loadPercent} max="100"></progress>}
        </span>
      ) : (
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
      )}
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
