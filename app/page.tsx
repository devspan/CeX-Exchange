"use client";
import React from "react";
import { useCoinData } from "@/config/coinDataFetcher";
import CryptoPriceCard from "@/components/HomeComponents/cryptoPriceCard";
import { Features } from "@/components/HomeComponents/features";
import { Hero } from "@/components/HomeComponents/hero";
import { MarketUpdate } from "@/components/HomeComponents/marketUpdate";

const Home: React.FC = () => {
  const coinData = useCoinData();

  return (
    <main className="flex min-h-screen flex-col justify-between p-5">
      <Hero />
      <CryptoPriceCard coinData={coinData} />
      <Features />
      <MarketUpdate />
    </main>
  );
};

export default Home;
