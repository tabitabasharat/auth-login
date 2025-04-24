// src/components/WalletPage.js

import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const WalletPage = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request wallet access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create web3 instance
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get user's accounts
          const accounts = await web3Instance.eth.getAccounts();
          const user = accounts[0];
          setAccount(user);

          // Get ETH balance (in Wei)
          const balanceWei = await web3Instance.eth.getBalance(user);
          const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');
          setBalance(balanceEth);
        } catch (err) {
          console.error('Wallet connection error:', err);
          alert('Wallet connection failed');
        }
      } else {
        alert('MetaMask is not installed!');
      }
    };

    initWeb3();
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial' }}>
      <h2>💰 Wallet Info</h2>
      {account ? (
        <>
          <p><strong>Address:</strong> {account}</p>
          <p><strong>ETH Balance:</strong> {balance} ETH</p>
        </>
      ) : (
        <p>Connecting to wallet...</p>
      )}
    </div>
  );
};

export default WalletPage;
