// src/services/usdtService.js
import Web3 from "web3";
import abi from "../utils/contractABI.json" // Import the ABI for USDT
// Connect to Ethereum
const web3 = new Web3(window.ethereum);

// USDT contract address (Ethereum Mainnet)
const usdtAddress = "0x29938D84F99aC1b70432cf20756b8758E51984A4";

// ERC-20 ABI with only transfer method
// const usdtAbi = [
//   {
//     "constant": false,
//     "inputs": [
//       { "name": "_to", "type": "address" },
//       { "name": "_value", "type": "uint256" }
//     ],
//     "name": "transfer",
//     "outputs": [
//       { "name": "", "type": "bool" }
//     ],
//     "type": "function"
//   }
// ];

// Create contract instance
const usdtContract = new web3.eth.Contract(abi, usdtAddress);

// Transfer USDT function
export const transferUSDT = async (toAddress, amountInUSDT) => {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  const senderAddress = accounts[0];
  console.log("transferlog", senderAddress);
  

  // USDT uses 6 decimals
  const amount = web3.utils.toWei(amountInUSDT * (10 ** 6));
  console.log("transfer amount log", amount);
  const tx = await usdtContract.methods.transfer(toAddress, amount).send({
    from: senderAddress
  });
  

  return tx;
};
