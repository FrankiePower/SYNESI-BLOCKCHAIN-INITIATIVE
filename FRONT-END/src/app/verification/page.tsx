"use client";

import React, { useState } from "react";

const ENSVerificationPage = () => {
  const [ensAddress, setEnsAddress] = useState("");

  const handleVerify = () => {
    // Implement ENS verification logic here
    console.log("Verifying ENS:", ensAddress);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-blue-200">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Verify Your ENS
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Enter your Ethereum Name Service (ENS) address to continue.
          </p>
          <div className="mb-4">
            <label
              htmlFor="ens"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              ENS
            </label>
            <input
              type="text"
              id="ens"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="johndoe.eth"
              value={ensAddress}
              onChange={(e) => setEnsAddress(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            onClick={handleVerify}
          >
            Verify ENS
          </button>
        </div>
      </main>
    </div>
  );
};

export default ENSVerificationPage;
