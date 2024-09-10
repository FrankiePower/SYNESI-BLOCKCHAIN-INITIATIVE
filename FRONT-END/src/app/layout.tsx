import type { Metadata } from "next";
import { Open_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components";
import "@rainbow-me/rainbowkit/styles.css";
import CustomConnectButton from "@/components/custom-connect-button";
// import { ConnectButton } from "@rainbow-me/rainbowkit";

const open_sans = Open_Sans({ subsets: ["latin"] });
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Synesi Blockchain Initiative",
  description: "A decentralized platform to learn about decentralized networks...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${open_sans.className} ${space_grotesk.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
