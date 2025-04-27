import React, { useEffect, useState } from 'react';
import { connectWallet } from '../utils/connectWallet';
import abi from '../utils/contractABI.json'; // Make sure ABI is valid!
import Web3 from 'web3';

// Make sure this is the **deployed contract address** on Sepolia or whichever network
const contractAddress = "0x29938D84F99aC1b70432cf20756b8758E51984A4"; // Replace this



const ContractComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const initialization = async () => {
      try {
        const connection = await connectWallet();
        if (!connection) return;
  
        const { web3, account } = connection;
        setWeb3(web3);
        setAccount(account);
        console.log("Account:", account);  
        const contractInstance = new web3.eth.Contract(abi, contractAddress);
        setContract(contractInstance);
  
        console.log("✅ Contract loaded:", contractInstance);
  
        // const data = await contractInstance.methods.newGreeting().call();
        // console.log("✅ Greeting:", data);
        // setGreeting(data);
      } catch (error) {
        console.error("❌ Error:", error);
        alert("Error connecting to contract. Check ABI, contract address, or function names.");
      }
    };
  
    initialization();
  }, []);
  

  const updateGreeting = async () => {
    if (!contract || !account) return;

    try {
      await contract.methods.setGreeting("Hello Web3").send({ from: account });
      const newGreeting = await contract.methods.greeting().call();
      setGreeting(newGreeting);
    } catch (error) {
      console.error("Error updating greeting:", error.message);
      alert("Transaction failed. Make sure MetaMask is connected and has enough ETH.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Smart Contract Interaction</h2>
      <p><strong>Connected Wallet:</strong> {account}</p>
      {/* <p><strong>Greeting:</strong> {greeting || 'Loading...'}</p> */}
      <button onClick={updateGreeting}>Update Greeting</button>
    </div>
  );
};

export default ContractComponent;
