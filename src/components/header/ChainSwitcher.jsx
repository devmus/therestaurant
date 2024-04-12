export const ChainSwitcher = () => {
  const switchChain = async (targetChainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetChainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: targetChainId,
                rpcUrl: "https://mainnet.infura.io/v3/",
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add the chain:", addError);
        }
      } else {
        console.error("Failed to switch the chain:", switchError);
      }
    }
  };

  const handleSelectChange = (event) => {
    switchChain(event.target.value);
  };

  return (
    <div className="chainswitcher">
      <select onChange={handleSelectChange}>
        <option value="">Network</option>
        <option value="0xaa36a7">Sepolia</option>
        <option value="0x7A69">Local</option>
      </select>
    </div>
  );
};
