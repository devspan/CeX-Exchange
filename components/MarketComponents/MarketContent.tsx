"use client";

import React from "react";
import TradingChart from "@/components/MarketComponents/TradingChart";
import Markets from "@/components/MarketComponents/Markets";
import Wallet from "@/components/MarketComponents/Wallet";
import BuySell from "@/components/MarketComponents/BuySell";
import OrderLogs from "@/components/MarketComponents/OrderLogs";
import RecentTrades from "@/components/MarketComponents/RecentTrades";
import OrderBook from "@/components/MarketComponents/OrderBook";
import { usePair } from "@/utils/PairContext";

const MarketContent: React.FC = () => {
  const { currentPair } = usePair();
  const [baseCurrency, quoteCurrency] = currentPair;

  return (
    <div className="min-h-screen p-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Left Sidebar */}
      <div className="space-y-4">
        <OrderBook />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-4">
        <TradingChart />
        <BuySell baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} />
        <div className="grid grid-cols-1 gap-4">
          <OrderLogs />
          <RecentTrades />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-4">
        <Markets />
        <Wallet />
      </div>
    </div>
  );
};

export default MarketContent;
