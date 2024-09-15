"use client";
import { getAddress, getEns } from "@/lib";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Loader, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function CustomConnectButton() {
  const [ens, setEns] = useState<string | undefined>("");
  const account = useAccount();

  const fetchEns = async () => {
    if (!account.address) return null;

    try {
      const ens = await getEns(account.address);
      console.log("Ens Name", ens);
      if (ens) setEns(ens);
    } catch (error) {
      console.error(error);
    }
  };

  fetchEns();

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!ready) {
          return null;
        }

        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              type="button"
              className="bg-primary-blue text-white py-2 px-5 rounded-lg"
            >
              Connect Wallet
            </button>
          );
        }

        if (chain.unsupported) {
          return (
            <button onClick={openChainModal} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <button
            onClick={openAccountModal}
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              border: "none",
              cursor: "pointer",
            }}
            className="bg-primary-blue text-white py-2 px-5 rounded-lg truncate hover:bg-transparent shadow-md border-primary-blue hover:text-primary-blue transition"
          >
            {ens ? (
              ens
            ) : (
            <>{account.address.slice(0, 6)}{"..."}{account.address.slice(-4)}</>
            )}
            
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
