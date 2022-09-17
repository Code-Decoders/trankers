import Main from '../components/Layout'
import '../styles/globals.css'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { accounts, changeAccount, initializeWeb3 } from '../lib/web3Adaptor';
import Web3State from '../lib/Web3State';


function MyApp({ Component, pageProps }) {
  const [state, setState] = React.useState({
    web3: null,
    accounts: null,
    inventory: null,
    token: null,
  });

  useEffect(() => {
    initializeWeb3().then(val => {
      setState(val)
      changeAccount(
        (accounts) => {
          setState(val => {return { ...val, accounts }})
        }
      )
    })
  }, [])

  return (
    <Web3State.Provider value={state}>
      <Main>
        <Component {...pageProps} />
        <ToastContainer />
      </Main>
    </Web3State.Provider>
  )
}

export default MyApp
