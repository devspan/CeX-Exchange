import React from 'react';
import TradingChart from "@/components/MarketComponents/TradingChart";
import MarketUpdates from "@/components/MarketComponents/MarketUpdates";
import Wallet from "@/components/MarketComponents/Wallet";
import BuySell from '@/components/MarketComponents/BuySell';
import OrderLogs from "@/components/MarketComponents/OrderLogs";
import RecentTrades from '@/components/MarketComponents/RecentTrades';
import OrderBook from "@/components/MarketComponents/OrderBook";
import OpenOrders from "@/components/MarketComponents/OpenOrders";

export default function Market() {
  return (
    <div className="grid min-h-screen w-full grid-cols-[320px_1fr_320px] overflow-hidden">
      <OrderBook />
      <TradingChart />
      <MarketUpdates />
      <Wallet />
      <BuySell />
      <OrderLogs />
      <RecentTrades />
      <OpenOrders />
    </div>
  );
}
