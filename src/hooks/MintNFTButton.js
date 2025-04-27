import { useState } from 'react';
import { ethers } from 'ethers';

const MintNFTButton = () => {
  const [minting, setMinting] = useState(false);

  const mintNFT = async () => {
    try {
      // Connecting to Ethereum network (change provider if needed)
      const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");

      // Load wallet with private key
      const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);

      // Contract details: address and ABI (you can get ABI after deploying your contract)
      const contractAddress = "YOUR_CONTRACT_ADDRESS"; // replace with deployed contract address
      const contractABI = [
        "function mint(address to, string memory tokenURI) public"
      ];
      
      // Create contract instance
      const contract = new ethers.Contract(contractAddress, contractABI, wallet);

      // Set the metadata URI for your NFT
      const tokenURI = "https://example.com/metadata/1.json";  // Link to your token's metadata (image, description, etc.)
      const recipient = "RECIPIENT_ADDRESS";  // The address that will receive the NFT

      // Start the minting process
      setMinting(true);
      const tx = await contract.mint(recipient, tokenURI); // mint the NFT
      console.log("Minting started:", tx.hash);

      // Wait for the transaction to be mined
      await tx.wait();

      console.log("NFT minted successfully!");
      setMinting(false);
    } catch (err) {
      console.error("Error minting NFT:", err);
      setMinting(false);
    }
  };

  return (
    <button onClick={mintNFT} disabled={minting}>
      {minting ? 'Minting...' : 'Mint NFT'}
    </button>
  );
};

export default MintNFTButton;
