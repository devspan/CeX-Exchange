"use client";

import React from "react";
import MarketContent from "@/components/MarketComponents/MarketContent";
import { PairProvider } from "@/utils/PairContext";

const Market: React.FC = () => {
  return (
    <PairProvider initialPair="BTC-USDT">
      <MarketContent />
    </PairProvider>
  );
};

export default Market;
