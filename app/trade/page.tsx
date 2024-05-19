import React from 'react';
import TradingChart from "@/components/MarketComponents/TradingChart";
import Pairs from "@/components/MarketComponents/Pairs";
import Wallet from "@/components/MarketComponents/Wallet";
import BuySell from '@/components/MarketComponents/BuySell';
import OrderLogs from "@/components/MarketComponents/OrderLogs";
import RecentTrades from '@/components/MarketComponents/RecentTrades';
import OrderBook from "@/components/MarketComponents/OrderBook";

export default function Market() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
      <div className="lg:col-span-9 order-1 lg:order-1">
        <TradingChart />
      </div>
      <div className="lg:col-span-3 order-2 lg:order-2">
        <OrderBook />
      </div>
      <div className="lg:col-span-3 order-3 lg:order-3">
        <BuySell />
        <Wallet />
      </div>
      <div className="lg:col-span-9 order-4 lg:order-4">
        <RecentTrades />
      </div>
      <div className="lg:col-span-3 order-5 lg:order-5">
        <Pairs />
      </div>
      <div className="lg:col-span-9 order-6 lg:order-6">
        <OrderLogs />
      </div>
    </div>
  );
}
