import ContractComponent from "./ContractComponent";
import MintTokenButton from "./contracts/MintTokenButton";
import TransferUSDTButton from "./contracts/TransferUSDTButton";
import MyContractComponent from "./MyContractComponent";

export default function Home() {
  return (
    <div>
      <h1>Web3.js Example</h1>
      <MyContractComponent />
      <div className="App">
        <h1>USDT Transfer App</h1>
        <TransferUSDTButton />
      </div>
      <div className="App">
        <h1>Token Minting dApp</h1>
        <MintTokenButton />
      </div>
      {/* <ContractComponent/> */}
    </div>
  );
}
