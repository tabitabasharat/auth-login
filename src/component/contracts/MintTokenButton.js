// /components/MintTokenButton.js
import React, { useState } from 'react';
import useWeb3 from '../../hooks/useWeb3'; // Custom hook for web3 initialization

const MintTokenButton = () => {
  const [amount, setAmount] = useState('');
  const { mintTokens, account } = useWeb3();

  const handleMint = async () => {
    if (amount && !isNaN(amount) && amount > 0) {
      await mintTokens(amount);
    } else {
      alert('Please enter a valid amount to mint.');
    }
  };

  return (
    <div>
      <h3>Mint Tokens</h3>
      {account ? (
        <>
          <p>Account: {account}</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to mint"
          />
          <button onClick={handleMint}>Mint Tokens</button>
        </>
      ) : (
        <p>Please connect your Ethereum wallet (MetaMask).</p>
      )}
    </div>
  );
};

export default MintTokenButton;
