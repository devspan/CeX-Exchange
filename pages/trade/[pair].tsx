"use client";

import React from "react";
import { useRouter } from "next/router";
import TradingChart from "@/components/MarketComponents/TradingChart";
import Markets from "@/components/MarketComponents/Markets";
import Wallet from "@/components/MarketComponents/Wallet";
import BuySell from "@/components/MarketComponents/BuySell";
import OrderLogs from "@/components/MarketComponents/OrderLogs";
import RecentTrades from "@/components/MarketComponents/RecentTrades";
import OrderBook from "@/components/MarketComponents/OrderBook";
import OpenOrders from "@/components/MarketComponents/OpenOrders";
import TradingPairs from "@/components/MarketComponents/TradingPairs";
import { PairProvider, usePair } from "../../utils/PairContext";

const MarketContent: React.FC = () => {
  const { currentPair } = usePair();
  const [baseCurrency, quoteCurrency] = currentPair;

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] gap-4 overflow-hidden">
        <div className="order-tables">
          <TradingPairs />
          <OrderBook />
        </div>
        <div className="graphic-order">
          <TradingChart />
          <BuySell baseCurrency={baseCurrency} quoteCurrency={quoteCurrency} />
        </div>
        <div className="data-order">
          <Markets />
          <Wallet />
        </div>
      </div>
      <div className="xl:grid lg:grid-cols-2 lg:gap-4 p-4">
        <OrderLogs />
        <RecentTrades />
        <OpenOrders />
      </div>
    </div>
  );
};

const Market: React.FC = () => {
  const router = useRouter();
  const { pair } = router.query;
  const initialPair = pair ? pair.toString() : "BTC-USDT";

  return (
    <PairProvider initialPair={initialPair}>
      <MarketContent />
    </PairProvider>
  );
};

export default Market;
