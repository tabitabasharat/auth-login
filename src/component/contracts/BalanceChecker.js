import React, { useEffect, useState } from "react";
import Web3 from "web3";

function BalanceChecker() {
  const [balance, setBalance] = useState("");
  const [account, setAccount] = useState("");
  const [timestamps, setTimestamps] = useState("");
  const [blockNumber, setBlockNumber] = useState("");

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          // Get balance
          const weiBalance = await web3.eth.getBalance(accounts[0]);
          const ethBalance = web3.utils.fromWei(weiBalance, "ether");
          setBalance(ethBalance);
          //get block number
          const latestBlock = await web3.eth.getBlock("latest");
          setBlockNumber(latestBlock.number);
          //get current timestamp
          console.log("Latest Block:", latestBlock);
          console.log("Block Number:", blockNumber);
          console.log("Block Number:", latestBlock.number); // This should print the block number

          const currentTimestamp = new Date(
            latestBlock.timestamp * 1000
          ).toLocaleString();
          setTimestamps(currentTimestamp);
        } catch (error) {
          console.error("Error connecting:", error);
        }
      } else {
        alert("Please install MetaMask!");
      }
    };

    loadWeb3();
  }, []);
//   useEffect(() => {
//     console.log("Updated Block Number:", blockNumber);
//   }, [blockNumber]);
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>ETH Balance Checker</h1>
      <p>
        <strong>Address:</strong> {account}
      </p>
      <p>
        <strong>ETH Balance:</strong> {balance}
      </p>
      <p>
        <strong>blockNumber:</strong> {blockNumber}
      </p>
      <p>
        <strong>timestamp:</strong> {timestamps}
      </p>
    </div>
  );
}

export default BalanceChecker;
