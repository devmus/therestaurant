import { RouterProvider } from "react-router-dom";
import "./App.scss";
import { router } from "./Router";
import { useContext, useEffect, useState } from "react";
import { WalletContext } from "./context/WalletContext";
import { ContractContext } from "./context/ContractContext";
import {
  loadReadContract,
  loadWriteContract,
} from "./services/blockchainService";
import { CONTRACT_ADDRESSES } from "./services/config";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [walletProvider, setWalletProvider] = useState(null);
  const [readContract, setReadContract] = useState(null);
  const [writeContract, setWriteContract] = useState(null);
  const [contractAddress, setContractAddress] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setWalletProvider(accounts);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Install MetaMask.");
    }
  };

  useEffect(() => {
    const setUp = async () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Install MetaMask.");
        return;
      }
      const chainId = await ethereum.request({ method: "eth_chainId" });
      setContractAddress(CONTRACT_ADDRESSES[chainId]);
      console.log("Chain ID:", CONTRACT_ADDRESSES[chainId]);

      const handdleChainChanged = (_chainId) => {
        setContractAddress(CONTRACT_ADDRESSES[_chainId]);
        window.location.reload();
      };

      ethereum.on("chainChanged", handdleChainChanged);

      return () => {
        ethereum.removeListener("chainChanged", handdleChainChanged);
      };
    };
    setUp();
  }, []);

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
  };

  useEffect(() => {
    connectWallet();

    const Contracts = async () => {
      const rContract = await loadReadContract(contractAddress);
      setReadContract(rContract);

      const wContract = await loadWriteContract(contractAddress);
      setWriteContract(wContract);
    };
    Contracts();
  }, [contractAddress]);

  return (
    <>
      <WalletContext.Provider
        value={{
          walletAddress, // string
          isConnected, // boolean
          connectWallet, // function
          disconnectWallet, // function
          walletProvider, // object
        }}
      >
        <ContractContext.Provider
          value={{
            readContract,
            writeContract,
          }}
        >
          <RouterProvider router={router} />
        </ContractContext.Provider>
      </WalletContext.Provider>
    </>
  );
}

export default App;
