import Head from 'next/head'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import Upgrades from '../components/Upgrades'
import Warship from '../components/Warship'
import { getContractData } from '../lib/web3Adaptor'
import Web3State from '../lib/Web3State'
import styles from '../styles/Home.module.css'
// import InventoryABI from '../build/contracts/SpacePolyInventory.json'
import { InventoryAddress } from './_app'

export const metadata = [
  {
    id: 1,
    name: "Vanquisher",
    image: "https://i.imgur.com/A4GZGWN.png",
    type: "Warship",
    price: 0.1 *100 * 10 ** 18,
    priceSPZ: 100,
  },
  {
    id: 2,
    name: "Alpha Fire",
    image: "https://i.imgur.com/RjR5hji.png",
    type: "Warship",
    price: 0.1 *100 * 10 ** 18,
    priceSPZ: 100,
  },
  {
    id: 3,
    name: "Turbo Fire",
    image: "https://i.imgur.com/F2JqkIb.png",
    type: "Warship",
    price: 0.1 *100 * 10 ** 18,
    priceSPZ: 100,
  },
  {
    id: 4,
    name: "Nimble",
    image: "https://i.imgur.com/aPnP0PV.png",
    type: "Warship",
    price: 0.1 *100 * 10 ** 18,
    priceSPZ: 100,
  },
  {
    id: 5,
    name: "Combat Ninja",
    image: "https://i.imgur.com/rmEL6Pj.png",
    type: "Warship",
    price: 0.2 *100 * 10 ** 18,
    priceSPZ: 200,
  },
  {
    id: 6,
    name: "Sonic Shot",
    image: "https://i.imgur.com/9h9fVRq.png",
    type: "Upgrades",
    price: 0.05 *100 * 10 ** 18,
    priceSPZ: 50,
  },
  {
    id: 7,
    name: "Fireball",
    image: "https://i.imgur.com/aED8EHe.png",
    type: "Upgrades",
    price: 0.05 *100 * 10 ** 18,
    priceSPZ: 50,
  },
  {
    id: 8,
    name: "Laser Shot",
    image: "https://i.imgur.com/SMkQOPA.png",
    type: "Upgrades",
    price: 0.05 *100 * 10 ** 18,
    priceSPZ: 50,
  }

]

export default function Home() {
  const [ships, setShips] = React.useState([])
  const [upgrades, setUpgrades] = React.useState([])

  const { web3 } = useContext(Web3State)

  const getData = async () => {
    console.log("getData")
    const data = await getContractData()
    const ids = (data.map(e => e.returnValues).map(e => e.id))
    console.log(ids)
    ids = [... new Set(ids)]
    for (const key in ids) {

      const id = ids[key];
      console.log(id)
      var token_meta = metadata.find(e => e.id.toString() === id);
      console.log(token_meta)
      const owners = (data.map(e => e.returnValues).filter(e => e.id === id).map(e => e.to));
      console.log(owners)
      if (token_meta.type === "Warship") {
        setShips(val => {
          val.push({ ...token_meta, owners: owners })
          // remove duplicates from array where id is the same
          return [...new Set(val.map(item => item.id))].map(id => {
            return val.find(item => item.id === id)
          })
        })
      }
      else {
        setUpgrades(val => {
          val.push({ ...token_meta, owners: owners })
          // remove duplicates from array where id is the same
          return [...new Set(val.map(item => item.id))].map(id => {
            return val.find(item => item.id === id)
          })
        })
      }
    }
  }



  const updateOwners = async (id) => {
    const data = await getContractData()
    const ids = (data.map(e => e.returnValues).filter(e => e.id == id))
    var meta = metadata.find(e => e.id === id);
    const owners = ids.map(e => e.to);
    console.log(owners)
    if (meta.type === "Warship") {
      setShips(val => {
        return val.map(item => {
          if (item.id === id) {
            return { ...item, owners: owners }
          }
          return item
        }
        )
      })
    }
    else {
      setUpgrades(val => {
        return val.map(item => {
          if (item.id === id) {
            return { ...item, owners: owners }
          }
          return item
        })
      })
    }

  }

  useEffect(() => {
    if (web3)
      getData()
  }, [web3])
  return (
    <div className={styles['home-container']}>
      <div style={{ padding: "2rem" }}>
        <h1>Trending Warships</h1>
        <div className={styles['horizontal-listview-container']}>
          <div className={styles['horizontal-listview']}>
            {
              ships.map((val, i) => (
                <Warship key={i} ship={val} updateOwner={updateOwners} />))
            }
          </div>
        </div>
        <h1>Top Upgrades</h1>

        <table className={styles['upgrade-table']}>
          <thead>
            <tr style={{ padding: "1rem" }}>
              <th></th>
              <th style={{ textAlign: "left" }}>Collection</th>
              <th>Damage</th>
              <th>Buy</th>
              <th>Owners</th>
            </tr>
          </thead>
          <tbody>
            {
              upgrades.map((val, i) => {
                return <Upgrades key={i} index={i + 1} upgrade={val} updateOwner={updateOwners} />
              })
            }
          </tbody>
        </table>
      </div>
      <footer className={styles.footer}>
        <a
          href="https://github.com/Code-Decoders"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '} CodeDecoders
        </a>
      </footer>
    </div>
  )
}
