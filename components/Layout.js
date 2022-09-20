import Head from 'next/head';
import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styles from '../styles/Home.module.css'


const Main = ({ children }) => {

    return (
      <div>
      <Head>
      <meta name = "viewport" content = "width=device-width, initial-scale=1"/>
      <title> Trankers Game </title>
      </Head>
      <div style={{ display: 'flex', }}>
        <Sidebar />
        <div style={{flex: 0.18}}/>
        <div className={styles['page-container']} style={{flex: 0.82,}}>
          <Navbar />
          <main style={{ backgroundColor: "var(--secondary)", height: "Calc(100vh - 80px)",marginTop: "80px" }}>
            {children}
          </main>
        </div>
      </div>
      </div>
    )
  }
  
  export default Main;
  