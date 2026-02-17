import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ethers } from "ethers";

const LoginPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role"); // student | donor | faculty

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
    if (account && role) {
      navigate(`/dashboard/${role}`);
    }
  }, [account, role, navigate]);

  if (!role) {
    return (
      <p className="p-6 text-center text-gray-600">
        Please select a role first.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center w-96">
        <h2 className="text-2xl font-bold mb-4">Login as {role}</h2>

        <button
          onClick={connectWallet}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {account ? "Continue" : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
