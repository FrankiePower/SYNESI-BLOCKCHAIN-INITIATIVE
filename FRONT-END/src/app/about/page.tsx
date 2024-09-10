import React from "react";

function WelcomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-blue-800">Synesi</h1>
        <div className="flex items-center">
          <div className="mr-4 flex items-center">
            <select className="border-none bg-transparent">
              <option>EN</option>
            </select>
          </div>
          <button className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded">
            Login
          </button>
        </div>
      </header>

      <main className="flex justify-center items-center mt-20">
        <div className="w-full max-w-4xl p-8 border border-blue-200 rounded-lg flex">
          <div className="w-1/2 pr-8">
            <img
              src="/api/placeholder/400/300"
              alt="Welcome illustration"
              className="w-full"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">
              Get Started with Blockchain Learning
            </h2>
            <p className="mb-6">
              Sign up in seconds by verifying your ENS and connecting your
              wallet.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded">
              Continue with ENS & Wallet
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WelcomePage;
