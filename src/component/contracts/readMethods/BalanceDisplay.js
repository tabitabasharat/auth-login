import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { USDT_CONTRACT_ADDRESS } from "../../../utils/contracts/USDT_ADDRESS";
import USDT_ABI from "../../../utils/contracts/USDT_ABI.json";

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

export const BalanceDisplay = () => {
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize Web3 and contract
    const init = async () => {
      try {
        if (!window.ethereum) {
          setError("MetaMask is not installed");
          return;
        }

        // Initialize Web3 instance
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Check if the user is on the correct network (BSC Testnet)
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if (chainId !== BSC_TESTNET_CHAIN_ID) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: BSC_TESTNET_CHAIN_ID }],
            });
          } catch (switchError) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [BSC_TESTNET_PARAMS],
                });
              } catch (addError) {
                setError("Could not add BSC Testnet to MetaMask");
                return;
              }
            } else {
              setError("Failed to switch to BSC Testnet");
              return;
            }
          }
        }

        // Request account access and set account state
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length === 0) {
          setError("No accounts found");
          return;
        }
        setAccount(accounts[0]);

        // Initialize the contract instance
        const contractInstance = new web3Instance.eth.Contract(
          USDT_ABI,
          USDT_CONTRACT_ADDRESS
        );
        setContract(contractInstance);

        // Fetch the balance of the account
        const tokenBalance = await contractInstance.methods
          .balanceOf(accounts[0])
          .call();
        setBalance(web3Instance.utils.fromWei(tokenBalance, "ether"));
      } catch (error) {
        setError(error.message);
        console.error("Error initializing Web3 or fetching balance:", error);
      }
    };

    init();

    // Cleanup function to reset state when the component is unmounted
    return () => {
      setWeb3(null);
      setContract(null);
      setBalance(null);
      setAccount(null);
    };
  }, []);

  // Handle account or network change
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    };

    const handleChainChanged = () => {
      // Handle chain changes if necessary
      window.location.reload();
    };

    // Listen for account and network changes
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    // Cleanup listeners when component unmounts
    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <div>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <p>
        <strong>Account:</strong> {account ? account : "Not connected"}
      </p>
      <p>
        <strong>Balance:</strong> {balance ? `${balance} USDT` : "Loading..."}
      </p>
    </div>
  );
};
