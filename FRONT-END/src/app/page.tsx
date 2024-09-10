"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 5000);
  });

  return <div>Hello App</div>;
}
