"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  useSignMessage,
  useAccount,
  useWaitForTransactionReceipt,
  useVerifyMessage,
  useWriteContract,
} from "wagmi";
import { abi } from "@/lib/contract-abi";
import { LoaderCircle } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import CustomConnectButton from "@/components/custom-connect-button";
import RegisterForm from "./register-form";
import { verifyEns } from "@/lib";
import { VerifiedModal } from "@/components";

const ENSVerificationPage = () => {
  const [ensName, setEnsName] = useState("");
  const [verifiedData, setVerifiedData] = useState<any | null>(null);
  const [verificationLoading, setVerificationLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setVerificationLoading(true);
    const res = await verifyEns(ensName);

    console.log(res);
    setVerifiedData(res);
    setVerificationLoading(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <form
          className="flex-grow flex items-center justify-center px-4"
          onSubmit={handleSubmit}
        >
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
                ENS Name
              </label>
              <input
                type="text"
                id="ens"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="johndoe.eth"
                value={ensName}
                required
                onChange={(e) => setEnsName(e.target.value)}
              />
            </div>
            <button
              className={`mt-3 bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-primary-dark`}
              disabled={verificationLoading}
              type="submit"
            >
              {verificationLoading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "verify"
              )}
            </button>
          </div>
        </form>
      </div>
      {!!verifiedData && (
        <VerifiedModal
          onClose={() => setVerifiedData(null)}
          ethAddress={verifiedData?.address}
          details={verifiedData?.details}
          ensName={ensName}
        />
      )}
    </>
  );
};

export default ENSVerificationPage;
