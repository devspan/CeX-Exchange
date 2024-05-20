'use client';

import { useState, useEffect } from 'react';
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  Select,
} from "../ui/select";
import {
  CommandInput,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandList,
  Command,
} from "../ui/command";
import { BitcoinIcon, RibbonIcon } from "../../config/icons";

export default function Selector({ onPairChange }) {
  const [pairs, setPairs] = useState<string[]>([]);
  const [selectedPair, setSelectedPair] = useState('ETH/USDT');
  const [priceData, setPriceData] = useState({
    price: '0.00',
    change: '0.00%',
    high24h: '0.00',
    low24h: '0.00',
    baseVolume: '0.00',
    quoteVolume: '0.00'
  });

  const fetchPairsAndPrices = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CORE_URL}/summary`);
      const data = await response.json();

      const pairs = Object.keys(data.data).map(pair => pair.replace('_', '/'));
      setPairs(pairs);

      // Initialize with the default selected pair
      updatePriceData(selectedPair, data.data);
    } catch (error) {
      console.error('Error fetching pairs and prices:', error);
    }
  };

  const updatePriceData = (pair, data) => {
    const formattedPair = pair.replace('/', '_');
    if (data[formattedPair]) {
      const { last_price, high_24h, low_24h, base_volume, quote_volume, percent_change } = data[formattedPair];

      setPriceData({
        price: last_price.toFixed(2),
        change: (percent_change * 100).toFixed(2) + '%',
        high24h: high_24h.toFixed(2),
        low24h: low_24h.toFixed(2),
        baseVolume: base_volume.toFixed(2),
        quoteVolume: quote_volume.toFixed(2),
      });
    } else {
      console.error('Price data not found for pair:', formattedPair);
    }
  };

  useEffect(() => {
    fetchPairsAndPrices();
  }, []);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CORE_URL}/summary`);
        const data = await response.json();
        updatePriceData(selectedPair, data.data);
      } catch (error) {
        console.error('Error fetching price data:', error);
      }
    };

    fetchPriceData();
  }, [selectedPair]);

  const handleSelect = (pair) => {
    setSelectedPair(pair);
    onPairChange(pair); // Notify parent component about the pair change
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 space-y-4 md:flex-row md:space-y-0 md:space-x-8">
      <div className="flex items-center space-x-3">
        <BitcoinIcon className="h-6 w-6" />
        <Select>
          <SelectTrigger className="text-lg font-semibold" aria-label="Select Asset">
            <SelectValue placeholder={selectedPair} />
          </SelectTrigger>
          <SelectContent>
            <Command>
              <CommandInput
                autoFocus
                className="h-9"
                placeholder="Search assets..."
                aria-label="Search assets"
              />
              <CommandList>
                <CommandEmpty>No assets found.</CommandEmpty>
                <CommandGroup>
                  {pairs.map((pair, index) => (
                    <CommandItem key={index} onSelect={() => handleSelect(pair)}>
                      <BitcoinIcon className="h-4 w-4 mr-2" />
                      {pair}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </SelectContent>
        </Select>
        <div className="text-lg font-semibold">${priceData.price}</div>
        <div className="text-sm">{priceData.change}</div>
      </div>
      <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8">
        <div className="space-x-1 text-center md:text-left">
          <span className="text-sm">24h High</span>
          <span className="text-sm">${priceData.high24h}</span>
        </div>
        <div className="space-x-1 text-center md:text-left">
          <span className="text-sm">24h Low</span>
          <span className="text-sm">${priceData.low24h}</span>
        </div>
        <div className="space-x-1 text-center md:text-left">
          <span className="text-sm">24h Volume (Base)</span>
          <span className="text-sm">{priceData.baseVolume}</span>
        </div>
        <div className="space-x-1 text-center md:text-left">
          <span className="text-sm">24h Volume (Quote)</span>
          <span className="text-sm">{priceData.quoteVolume}</span>
        </div>
      </div>
    </div>
  );
}
