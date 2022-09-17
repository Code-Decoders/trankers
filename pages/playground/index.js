import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl';
import Web3 from 'web3';
import { metadata } from '..';
import { getContractData, getTokenBalance, mintToken } from '../../lib/evmosAdaptor';
import Web3State from '../../lib/Web3State';

const Playground = () => {
    const { web3, accounts, token } = useContext(Web3State)
    const {
        unityProvider,
        isLoaded,
        unload,
        loadingProgression,
        addEventListener,
        removeEventListener,
        sendMessage,
    } = useUnityContext({
        loaderUrl: "build/Build.loader.js",
        dataUrl: "build/Build.data",
        frameworkUrl: "build/Build.framework.js",
        codeUrl: "build/Build.wasm",
        productName: "SpaceOz",
        companyName: "CodeDecoders",
    });

    const [coins, setCoins] = useState(0);

    const [ships, setShips] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (web3)
            getData();
    }, [web3]);

    const getData = async () => {
        setLoading(true);
        const balance = await getTokenBalance()
        const data = await getContractData()
        const ids = (data.map(e => e.returnValues).filter(e => e.to == accounts[0]).map(e => e.id))
        ids.forEach(async (id) => {
            if (metadata.find(e => e.id.toString() === id).type === "Warship") {
                setShips(val => [...val, id])
            }
            else {
                setBullets(val => [...val, id])
            }
        })
        setCoins(parseInt(balance.tokenBalance));
        setLoading(false);
    };


    const handleCoins = useCallback((val) => {
        console.log(val)
        mintToken(val)
    }, []);

    const OnAppReady = useCallback(() => {

        sendMessage("Coins", "GetUserCoins", coins);
        sendMessage("Coins", "GetShips", ships.join(","));
        sendMessage("Coins", "GetBullets", bullets.join(","));
    }, [sendMessage]);

    useEffect(() => {

        addEventListener("MintTokens", handleCoins);
        addEventListener("OnAppReady", OnAppReady);
        return () => {
            unload();
            removeEventListener("MintTokens", handleCoins);
            removeEventListener("OnAppReady", OnAppReady);
        };
    }, [addEventListener, removeEventListener, handleCoins, OnAppReady, unload]);

    // We'll round the loading progression to a whole number to represent the
    // percentage of the Unity Application that has loaded.
    const loadingPercentage = Math.round(loadingProgression * 100);

    return (
        <div>
            {isLoaded === false && (
                // We'll conditionally render the loading overlay if the Unity
                // Application is not loaded.
                <div className="loading-overlay">
                    <p>Loading... ({loadingPercentage}%)</p>
                </div>
            )}
            {!loading && (
                <Unity
                    className="unity"
                    unityProvider={unityProvider}
                    style={{
                        width: "calc(100% - 5rem)",
                        aspectRatio: "16/9",
                        overflow: "hidden",
                    }}
                />
            )}
        </div>
    )
}

export default Playground