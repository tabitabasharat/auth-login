// import Web3 from 'web3';

import Web3 from "web3";

export const connectWallet = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      return { account: accounts[0], web3 };
    } catch (error) {
      console.error("User denied wallet connection", error);
      return null;
    }
  } else {
    alert('MetaMask is not installed!');
    return null;
  }
};

// export const connectWallet = async()=>{
//     if(window.ethereum){
//         try{
//             await window.ethereum.requset({method:'eth_requsestAccounts'});
//             const web3 = new Web3(window.ethereum);
//             const account = await web3.eth.getAccounts();
//             return{web3 , account:account[0]};
//         }

//         catch(error){
//             console.error("User denied wallet connection",error);
//             return null;
//         }
//     }else{
//         alert("Please install MetaMask!");
//         return null;
//     }
// }