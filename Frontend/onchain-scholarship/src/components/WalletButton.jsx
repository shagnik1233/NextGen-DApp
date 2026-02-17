import { useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletButton = () => {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    setAccount(addr);
  };

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        if (accounts.length) setAccount(accounts[0]);
      });

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts.length ? accounts[0] : "");
    });

    return () => {
      window.ethereum.removeAllListeners("accountsChanged");
    };
  }, []);

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
    >
      {account
        ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
};

export default WalletButton;
