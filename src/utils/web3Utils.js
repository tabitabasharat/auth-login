// /utils/web3Utils.js
import Web3 from 'web3';

export const web3Utils = {
    toWei: (amount, unit = 'ether') => {
      return Web3.utils.toWei(amount.toString(), unit);
    },
    fromWei: (amount, unit = 'ether') => {
      return Web3.utils.fromWei(amount.toString(), unit);
    },
    // Add more utility functions as needed...
  };
  