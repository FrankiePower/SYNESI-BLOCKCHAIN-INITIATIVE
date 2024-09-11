import { welcomeIllustration } from "@/assets";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex justify-center items-center mt-20">
        <div className="w-full flex">
          <div className="w-1/2 pr-8">
            <img
              src={welcomeIllustration.src}
              alt="Welcome illustration"
              className="object-contain"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">
              Get Started with Synesi Blockchain Learning
            </h2>
            <p className="mb-6">
              Sign up in seconds by verifying your ENS and connecting your
              wallet.
            </p>
            <Link href="/verification">
              <Button className="bg-primary-blue text-white px-6 py-3 rounded w-[220px]">
                Continue with ENS & Wallet
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
