"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for the new app directory structure
import { useCoinData } from '@/config/coinDataFetcher';

const TradingPairs: React.FC = () => {
  const pairs = useCoinData();
  const router = useRouter();
  const currentPair = typeof window !== 'undefined' ? (router.query?.pair as string) : '';

  const handlePairClick = (pair: string) => {
    router.push(`/trade/${pair}`);
  };

  return (
    <div className="p-4 bg-gray-100/40 dark:bg-card border-r">
      <h2 className="text-lg font-semibold mb-4">Trading Pairs</h2>
      <ul className="space-y-2">
        {pairs.map((pair) => (
          <li key={pair.id}>
            <button
              onClick={() => handlePairClick(pair.market.replace("/", "-"))}
              className={`block w-full text-left p-2 rounded ${
                pair.market.replace("/", "-") === currentPair ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700'
              }`}
            >
              {pair.market}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TradingPairs;
