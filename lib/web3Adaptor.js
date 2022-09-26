import React from "react";
import getContract from "./getContract";
import Inventory from "../build/contracts/TrankersInventory.json";
import TrankersToken from "../build/contracts/TrankersToken.json";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import contractAddress from "./getContract";
import Web3 from "web3";
import network from "./networkEnum";

let web3, account, inventory, token, chainId;

const errorMsg = (message) => {
  toast.error(message);
};

const successMsg = (message) => {
  toast.success(message);
};

const setWeb3 = (_web3, account_, chainId_) => {
  web3 = _web3;
  account = account_;
  chainId = chainId_;
  setContracts();
};

async function setContracts() {
  try {
    const _inventory = await new web3.eth.Contract(
      Inventory.abi,
      contractAddress[chainId].inventory
    );
    const _token = await new web3.eth.Contract(
      TrankersToken.abi,
      contractAddress[chainId].token
    );

    inventory = _inventory;
    token = _token;
    return { inventory, token };
  } catch (error) {
    errorMsg(
      `Failed to load web3, account, or contract. Check console for details.`
    );
    console.log(error);
  }
}

async function getTokenBalance() {
  try {
    var tokenBalance = await token.methods.balanceOf(account).call();
    return { tokenBalance };
  } catch (error) {
    errorMsg(error?.message ?? error);
  }
}

async function mint(token_id, price) {
  console.log("mint");
  successMsg("Transaction Started");
  try {
    await inventory.methods
      .mint(token_id)
      .send({ from: account, value: BigNumber(price) });
    successMsg("Transaction Successfully");
  } catch (error) {
    errorMsg(error?.data?.message ?? error.message);
  }
}

async function mintWithToken(token_id) {
  successMsg("Transaction Started");
  try {
    console.log("mint with token");
    await inventory.methods.mint(token_id).send({ from: account });
    successMsg("Transaction Successfully");
  } catch (error) {
    errorMsg(error?.data?.message ?? error.message);
  }
}

async function mintToken(val) {
  const web3_ = new Web3(network[chainId].rpc);
  const _token = new web3_.eth.Contract(
    TrankersToken.abi,
    contractAddress[chainId].token
  );
  const privateKey = process.env.NEXT_PUBLIC_ADMIN_PRIVATE_KEY;
  const admin = web3_.eth.accounts.privateKeyToAccount("0x" + privateKey);
  web3_.eth.accounts.wallet.add(admin);

  await _token.methods
    .mint(account, val)
    .send({
      from: admin.address,
      gas: "0xF4240",
      gasPrice: undefined,
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getContractData() {
  console.log(inventory);
  try {
    if (network[chainId].name === "Mumbai") {
      const latest = await web3.eth.getBlockNumber();
      var events = await inventory.getPastEvents("TransferSingle", {
        fromBlock: latest - 2000,
        toBlock: latest,
      });
    } else {
      var events = await inventory.getPastEvents("TransferSingle", {
        fromBlock: 0,
        toBlock: "latest",
      });
    }
  } catch (error) {
    const latest = await web3.eth.getBlockNumber();
    var events = await inventory.getPastEvents("TransferSingle", {
      fromBlock: latest - 2000,
      toBlock: latest,
    });
  }
  console.log(events);
  return events;
}

async function getURI(token_id) {
  var uri = await inventory.methods.uri(token_id).call();
  return uri;
}
async function getPrices(token_id) {
  var prices = await inventory.methods.getPrice(token_id).call();
  return prices;
}

const mint_by_owner = async () => {
  console.log("mint by owner");

  for (let index = 0; index < 13; index++) {
    let value = Math.random();
    let price = value * 10 * 10 ** 18;
    let trt = 100 * value;
    if (index < 9) {
      console.log("minting tank", index + 1);
    } else {
      price /= 10;
      trt /= 10;
      console.log("minting bullet", index + 1 - 9);
    }
    var transaction = await inventory.methods
      .mint(BigNumber(Math.round(price).toString()), Math.round(trt).toString())
      .send({
        from: "0x39DcD1f4512E67baC39089642Bb320b6FfB55d17",
        gas: "0xF4240",
        gasPrice: undefined,
      });
    await new Promise((r) => setTimeout(r, 2000));
    console.log(transaction);
  }
};

export {
  web3,
  setWeb3,
  mint,
  mintWithToken,
  getTokenBalance,
  mint_by_owner,
  getContractData,
  account,
  mintToken,
  getURI,
  getPrices,
};
