import React, { useContext, useEffect } from 'react'
import styles from '../styles/Navbar.module.css';
// import InventoryABI from '../build/contracts/SpacePolyInventory.json';
import BigNumber from 'bignumber.js';
import { metadata } from '../pages';
import Web3State from '../lib/Web3State';

const Navbar = () => {
    const {accounts, web3} = useContext(Web3State)
    
    

    useEffect(() => {

    }, [])

    return (
        <div className={styles['navbar-container']}>
            <div className={styles['navbar-button']} onClick={() => {
            }}>{accounts ? accounts[0]?.slice(0, 10) + "..." : `Connect`}</div>
    
        </div>
    )
}

export default Navbar