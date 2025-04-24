import React, { useState, useEffect } from 'react';
import { connectWallet } from '../utils/connectWallet';
import Web3 from 'web3';

export default function MyContractComponent() {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [balance, setBalance] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const init = async () => {
      const connection = await connectWallet();
      if (connection) {
        const { account, web3 } = connection;
        setAccount(account);
        setWeb3(web3);

        const balanceInWei = await web3.eth.getBalance(account);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        setBalance(balanceInEth);
      }
    };
    init();
  }, []);

  const sendEth = async () => {
    if (!web3 || !account || !recipient || !amount) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const amountInWei = web3.utils.toWei(amount, 'ether');
      await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: amountInWei,
      });
      alert('Transaction successful!');

      // Update balance
      const updatedBalance = await web3.eth.getBalance(account);
      setBalance(web3.utils.fromWei(updatedBalance, 'ether'));
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed!');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🚀 Web3 Wallet</h2>
      <p><strong>Connected Wallet:</strong> {account}</p>
      <p><strong>ETH Balance:</strong> {balance} ETH</p>

      <hr />

      <h3>💸 Send ETH</h3>
      <input
        type="text"
        placeholder="Recipient Wallet Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <button onClick={sendEth} style={{ padding: '10px', width: '100%' }}>
        Send ETH
      </button>
    </div>
  );
}
