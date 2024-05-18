import React from "react";
import { useCoinData } from "@/config/coinDataFetcher";
import Image from 'next/image';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export function MarketUpdate() {
  const marketData = useCoinData();

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">Market Update</h2>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-sm border border-accent">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-card">
              <tr>
                <th className="w-[60px] py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">24H Volume</th>
                <th className="text-right hidden md:table-cell py-3 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-card dark:divide-gray-700">
              {marketData.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white flex items-center">
                    <span data-tooltip-id={`tooltip-${item.id}`} data-tooltip-content={item.name}>
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={20}
                        height={20}
                        className="inline-block w-5 h-5 mr-2"
                        loading="lazy"
                      />
                    </span>
                    <Tooltip id={`tooltip-${item.id}`} place="top" />
                    {item.name}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500 dark:text-white">{item.market}</td>
                  <td className="text-right py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.price}</td>
                  <td className="text-right py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.volume}</td>
                  <td className={`text-right hidden md:table-cell py-4 px-6 whitespace-nowrap text-sm font-medium ${item.change.includes("-") ? "text-red-500" : "text-green-500"}`}>{item.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
