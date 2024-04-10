import { createContext } from "react";

export const WalletContext = createContext({
  walletAddress: "",
  walletProvider: {},
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});
