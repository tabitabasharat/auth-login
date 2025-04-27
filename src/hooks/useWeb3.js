// /hooks/useWeb3.js

import { useEffect, useState } from 'react';
import Web3 from 'web3';
// import { USDT_CONTRACT_ADDRESS } from '../utils/contracts/USDT_ADDRESS';
// import USDT_ABI from '../utils/contracts/USDT_ABI.json';

// export const useWeb3 = () => {
//   const [web3, setWeb3] = useState(null);
//   const [usdtContract, setUsdtContract] = useState(null);

//   useEffect(() => {
//     const initWeb3 = async () => {
//       const web3Instance = new Web3(window.ethereum);
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const contract = new web3Instance.eth.Contract(USDT_ABI, USDT_CONTRACT_ADDRESS);
//       setWeb3(web3Instance);
//       setUsdtContract(contract);
//     };
//     initWeb3();
//   }, []);

//   return { web3, usdtContract };
// };

import { TOKEN_CONTRACT_ADDRESS } from '.././utils/contracts/Token_ADDRESS';
import Token_ABI from '.././utils/contracts/Token_ABI.json';

export const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); // Connect to the wallet
        const accounts = await web3Instance.eth.getAccounts();
        const contract = new web3Instance.eth.Contract(Token_ABI, TOKEN_CONTRACT_ADDRESS);
        setWeb3(web3Instance);
        setTokenContract(contract);
        setAccount(accounts[0]); // Set the user's account address
      } else {
        console.error('Ethereum provider not found. Please install MetaMask!');
      }
    };
    initWeb3();
  }, []);

  const mintTokens = async (amount) => {
    if (tokenContract && account) {
      try {
        // Calling mint function on the contract
        await tokenContract.methods.mint(account, web3.utils.toWei(amount, 'ether')).send({ from: account });
        console.log(`${amount} tokens minted successfully!`);
      } catch (error) {
        console.error('Error minting tokens:', error);
      }
    }
  };

  return { mintTokens, account };
};
