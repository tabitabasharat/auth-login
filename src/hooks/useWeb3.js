import Web3 from "web3";
import { USDT_CONTRACT_ADDRESS } from "../utils/contracts/USDT_ADDRESS";
import USDT_ABI from "../utils/contracts/USDT_ABI.json";

const BSC_TESTNET_CHAIN_ID = "0x61";
const BSC_TESTNET_PARAMS = {
  chainId: BSC_TESTNET_CHAIN_ID,
  chainName: "Binance Smart Chain Testnet",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
};

const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }
  try {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== BSC_TESTNET_CHAIN_ID) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: BSC_TESTNET_CHAIN_ID }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [BSC_TESTNET_PARAMS],
            });
          } catch (addError) {
            throw new Error("Could not add BSC Testnet to MetaMask");
          }
        } else {
          throw new Error("Failed to switch to BSC Testnet");
        }
      }
    }
  } catch (error) {
    console.error("Network error:", error);
    throw new Error("Network configuration failed");
  }
  
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const web3 = new Web3(window.ethereum);
  
  // Initialize the contract
  const contract = new web3.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);

  // Mint function - assuming mint function exists in your contract
  const mintTokens = async (amount) => {
    if (!accounts || accounts.length === 0) throw new Error("No account found");

    try {
      // const decimals = 18; // USDT typically uses 18 decimals
      const amountInWei = web3.utils.toWei(amount.toString(), "mwei"); // Convert to proper decimal units

      // Send mint transaction
      const tx = await contract.methods.mint(accounts[0], amountInWei).send({ from: accounts[0] });
      console.log("Minting successful: ", tx);
    } catch (error) {
      console.error("Minting failed:", error);
      throw new Error("Minting transaction failed");
    }
  };

  return { contract, mintTokens, account: accounts[0] };
};

export default getContract;
