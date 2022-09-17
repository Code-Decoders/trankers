const getContractInstance = async (web3, contractDefinition, address) => {
    // get network ID and the deployed address
  
    // create the instance
    const instance = new web3.eth.Contract(
      contractDefinition.abi,
      address
    )
    return instance
  }
  
  export default getContractInstance