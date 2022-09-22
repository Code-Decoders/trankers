import { useConnectWallet } from "@web3-onboard/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import { metadata } from "..";
import {
  getContractData,
  getPrices,
  getTokenBalance,
  getURI,
  mintToken,
  web3,
} from "../../lib/web3Adaptor";

const Playground = () => {
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

  const [{ wallet }] = useConnectWallet();

  const handleCoins = useCallback((val) => {
    console.log(val);
    mintToken(val);
  }, []);

  const OnAppReady = useCallback(async () => {
    const balance = await getTokenBalance();
    const data = await getContractData();
    const ids = data
      .map((e) => e.returnValues)
      .filter(
        (e) => e.to.toLowerCase() == wallet.accounts[0].address.toLowerCase()
      )
      .map((e) => e.id);
    console.log(ids);
    let _ships = [],
      _upgrades = [];
    ids.forEach(async (id) => {
      if (parseInt(id) <= 9) {
        _ships.push(parseInt(id));
      } else {
        _upgrades.push(parseInt(id));
      }
    });
    console.log(_ships, _upgrades);
    sendMessage("Coins", "GetUserCoins", parseInt(balance.tokenBalance));
    sendMessage("Coins", "GetShips", _ships.join(","));
    sendMessage("Coins", "GetBullets", _upgrades.join(","));
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
      {web3 && (
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
  );
};

export default Playground;
