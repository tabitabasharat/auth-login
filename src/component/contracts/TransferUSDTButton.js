import React, { useState, useEffect } from "react";
// import useWeb3 from "../../hooks/useWeb3";
import { BalanceDisplay } from "./readMethods/BalanceDisplay";
import getContract from "../../hooks/useWeb3";
import { USDT_CONTRACT_ADDRESS } from "../../utils/contracts/USDT_ADDRESS";
import Web3 from "web3";
const TransferUSDTButton = () => {
  const [amountInUSDT, setAmountInUSDT] = useState(0);
  const [toAddress, setToAddress] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [senderBalance, setSenderBalance] = useState("Loading...");
  // const { web3 } = useWeb3();

  // Fetch balance
  const fetchBalance = async () => {
    // if (web3 && usdtContract && web3.utils.isAddress(senderAddress)) {
    //   try {
    //     const balance = await usdtContract.methods
    //       .balanceOf(senderAddress)
    //       .call();
    //     const formattedBalance = web3.utils.fromWei(balance, "mwei"); // 6 decimals
    //     setSenderBalance(formattedBalance);
    //   } catch (error) {
    //     console.error("Error fetching balance:", error);
    //     setSenderBalance("Error fetching balance");
    //   }
    // } else {
    //   setSenderBalance("Invalid address or contract not initialized");
    // }
  };
  const sendUSDT = async (toAddress, amountInUSDT) => {
    if (!Web3.utils.isAddress(toAddress)) {
      alert("Invalid recipient address");
      return;
    }
  
    const contract = await getContract();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const userAccount = accounts[0];
  
    try {
      const amountInWei = Web3.utils.toWei(amountInUSDT.toString(), "mwei"); // 6 decimals
      console.log("Sending", amountInUSDT, "USDT =", amountInWei, "wei");
  
      // Optional: skip estimateGas (USDT sometimes rejects it)
      await contract.methods.transfer(toAddress, amountInWei).send({
        from: userAccount,
      });
  
      alert("Transaction successful!");
      await fetchBalance();
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed: " + (error?.message || "Unknown error"));
    }
  };
  

  return (
    <div className="flex flex-col space-y-4">
      <BalanceDisplay balance={senderBalance} onTransfer={sendUSDT} />

      <input
        type="number"
        value={amountInUSDT}
        onChange={(e) => setAmountInUSDT(Number(e.target.value))}
        placeholder="Enter amount in USDT"
        className="border p-2 rounded"
      />
      <input
        type="text"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        placeholder="Enter recipient address"
        className="border p-2 rounded"
      />

      <p>
        <strong>Sender Balance:</strong> {senderBalance} USDT
      </p>

      <button
        onClick={() => sendUSDT(toAddress, amountInUSDT)}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Transfer USDT
      </button>
    </div>
  );
};

export default TransferUSDTButton;
