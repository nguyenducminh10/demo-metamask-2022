
import React, {useState} from 'react';
import { ethers } from "ethers";

function App() {
   const [accountDetail, setAccountDetail] = useState({
    address: "",
    Balance: null,
  });

  const getAccount = () => {
    window.ethereum
    .request({method: 'eth_requestAccounts'})
    .then((response) => accountChangeHandler(response[0]))
  }

  const getbalance = (address) => {
    // Requesting balance method
    window.ethereum
      .request({ 
        method: "eth_getBalance", 
        params: [address, "latest"] 
      })
      .then((balance) => {
        // Setting balance
        setAccountDetail({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  const accountChangeHandler = (account) => {
    // Setting an address data
    setAccountDetail({
      address: account,
    });
    // Setting a balance
    getbalance(account);
  };

  const checkMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      getAccount();
    }
  }
  
  return (
    <div className="App">
      <button onClick={checkMetaMask}>Check of metamask</button>
      <h2>Account: <span>{accountDetail.address}</span></h2>
      <h2>Ballance: <span>{accountDetail.Balance}</span></h2>
      <h1>Metaverse</h1>
    </div>
  );
}

export default App;
