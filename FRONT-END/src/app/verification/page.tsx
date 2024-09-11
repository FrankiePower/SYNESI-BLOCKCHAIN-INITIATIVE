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

const zeroAddress = "0x0000000000000000000000000000000000000000";

const ENSVerificationPage = () => {
  const [ensName, setEnsName] = useState("");

  const [verified, setVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [voterType, setVoterType] = useState(0);

  const { data: signMessageData, signMessage } = useSignMessage();

  const account = useAccount();
  const router = useRouter();

  const {
    data: contractHash,
    error: contractError,
    isPending: contractLoading,
    writeContractAsync,
    writeContract,
  } = useWriteContract();

  const { isLoading: isContractConfirming, isSuccess: isContractConfirmed } =
    useWaitForTransactionReceipt({ hash: contractHash });

  // useVerifyMessage should be used outside of useEffect
  const {
    data: verifyResult,
    isLoading: verifyLoading,
    isError: verifyError,
  } = useVerifyMessage({
    address: `${account.address as `0x${string}`}`,
    message: `Verify ownership of ${ensName}`,
    signature: signMessageData,
  });

  useEffect(() => {
    try {
      setVerificationLoading(true);
      if (signMessageData) {
        console.log(signMessageData);
        console.log(verifyResult);

        if (verifyResult) {
          writeContract({
            abi,
            address: account.address as `0x${string}`, // to be fixed
            functionName: "registerStudent",
            args: [account.address, voterType],
          });
          console.log("contract called");
          console.log(contractLoading);

          setVerified(!!verifyResult);
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setVerificationLoading(false);
    }
  }, [signMessageData, verifyResult]);

  const verifyOwnership = async (ensName: string) => {
    setVerificationLoading(true);
    const message = `Verify ownership of ${ensName}`;
    signMessage({ message });
  };

  useEffect(() => {
    if (contractLoading) console.log("contract loading");
    if (isContractConfirming)
      console.log("contract confirming", isContractConfirming);
    if (isContractConfirmed)
      console.log("contract confirmed", isContractConfirmed);
    if (contractError) console.log("contract error", contractError);
  }, [isContractConfirming, isContractConfirmed, contractError]);

  const handleVerify = () => {
    // Implement ENS verification logic here
    console.log("Verifying ENS:", ensName);
    alert(`Verifying ENS:, ${ensName}`);
    verifyOwnership(ensName);
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
              ENS Name
            </label>
            <input
              type="text"
              id="ens"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="johndoe.eth"
              value={ensName}
              onChange={(e) => setEnsName(e.target.value)}
            />
          </div>
          {signMessageData && (
            <p
              className={`text-sm text-left mt-2 ${
                verified ? "text-primary-blue" : "text-red-500"
              } `}
            >
              {verified
                ? "Verification successful. Continue to proceed"
                : "Failed to verify ens, you are not the signer"}
            </p>
          )}
          <button
            onClick={
              !account.address || account.address === zeroAddress
                ? () => router.back()
                : verified
                ? () => router.push("/courses")
                : account.address && (() => verifyOwnership(ensName!))
            }
            className={`mt-3 ${
              account.address
                ? "bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                : ""
            }`}
            disabled={verificationLoading}
          >
            {!account.address || account.address === zeroAddress ? (
              "Go back"
            ) : !account.address ? (
              <ConnectButton />
            ) : verificationLoading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ENSVerificationPage;
