// /components/TransferUSDTButton.js

import React, { useState } from 'react';
import { useWeb3 } from '../../hooks/useWeb3'; // Custom hook for web3 initialization
import { web3Utils } from '../../utils/web3Utils'; // Utility for web3-related functions

const TransferUSDTButton = () => {
  const [amountInUSDT, setAmountInUSDT] = useState(0);
  const [toAddress, setToAddress] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const { web3, usdtContract } = useWeb3(); // Custom hook to access web3 and contract

  const handleTransfer = async () => {
    if (typeof amountInUSDT !== 'number' || isNaN(amountInUSDT) || amountInUSDT <= 0) {
      console.error("Invalid amountInUSDT:", amountInUSDT);
      return;
    }

    const amount = web3.utils.toWei((amountInUSDT * (10 ** 6)).toString());
    console.log("Transfer amount log", amount);

    try {
      const tx = await usdtContract.methods.transfer(toAddress, amount).send({
        from: senderAddress
      });
      console.log("Transaction successful:", tx);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amountInUSDT}
        onChange={(e) => setAmountInUSDT(e.target.value)}
        placeholder="Enter amount in USDT"
      />
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="Enter recipient address"
      />
      <button onClick={handleTransfer}>Transfer USDT</button>
    </div>
  );
};

export default TransferUSDTButton;