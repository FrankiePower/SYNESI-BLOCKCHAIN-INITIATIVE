"use client";

// import CustomConnectButton from "@/components/custom-connect-button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return <div className="flex flex-col items-center jusify-center min-h-screen w-full">Hello App <ConnectButton/> </div>;
}
