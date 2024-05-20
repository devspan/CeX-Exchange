'use client';

import React, { useState } from "react";
import TradingChart from "@/components/MarketComponents/TradingChart";
import BuySell from "@/components/MarketComponents/BuySell";
import OrderLogs from "@/components/MarketComponents/OrderLogs";
import RecentTrades from "@/components/MarketComponents/RecentTrades";
import OrderBook from "@/components/MarketComponents/OrderBook";
import Selector from "@/components/MarketComponents/SelectorComponent";

export default function Market() {
  const [selectedPair, setSelectedPair] = useState('ETH/USDT');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
      <div className="col-span-1 lg:col-span-12 order-1">
        <Selector onPairChange={setSelectedPair} />
      </div>
      <div className="col-span-1 lg:col-span-9 order-2">
        <TradingChart symbol={selectedPair.replace('/', '')} />
      </div>
      <div className="col-span-1 lg:col-span-3 order-3">
        <OrderBook />
      </div>
      <div className="col-span-1 lg:col-span-3 order-4">
        <BuySell />
      </div>
      <div className="col-span-1 lg:col-span-9 order-5">
        <RecentTrades />
      </div>
      <div className="col-span-1 lg:col-span-9 order-7">
        <OrderLogs />
      </div>
    </div>
  );
}
