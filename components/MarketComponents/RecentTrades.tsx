"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FilterIcon, ListIcon } from "@/config/icons";

interface Trade {
  time: string;
  type: string;
  price: string;
  amount: string;
}

const RecentTrades: React.FC = () => {
  const [recentTradesData, setRecentTradesData] = useState<Trade[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await fetch('/api/recenttrades');
        if (!response.ok) {
          throw new Error('Failed to fetch recent trades');
        }
        const data = await response.json();
        setRecentTradesData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm dark:bg-card md:h-full mt-4">
      <div className="px-4 py-3 border-b dark:border-accent flex items-center justify-between">
        <h3 className="text-lg font-semibold">Recent Trades</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost">
            <FilterIcon className="h-5 w-5" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button size="sm" variant="ghost">
            <ListIcon className="h-5 w-5" />
            <span className="sr-only">Sort</span>
          </Button>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error loading recent trades: {error}</div>
        ) : recentTradesData.length > 0 ? (
          recentTradesData.map((trade, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 text-sm font-medium ${
                index % 2 === 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              <div>{trade.time}</div>
              <div>{trade.type}</div>
              <div>{trade.price}</div>
              <div>{trade.amount}</div>
            </div>
          ))
        ) : (
          <div>No recent trades available.</div>
        )}
      </div>
    </div>
  );
};

export default RecentTrades;
