import { useEffect, useState } from "react";

export interface CoinData {
  id: number;
  icon: string;
  name: string;
  market: string;
  price: string;
  sale: string;
  class: string;
  volume: string;
  change: string;
}

export const useCoinData = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([]);
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/home-page/?format=json`;

  console.log("API URL:", apiUrl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data from API URL:", apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);

        const coinPairs = Object.keys(data.pairs_data); // Extract pairs dynamically from the API response
        console.log("Extracted Coin Pairs:", coinPairs);

        const newData: CoinData[] = coinPairs.map((pair, index) => {
          const pairData = data.pairs_data[pair];
          const price = pairData.price;
          const price24h = pairData.price_24h;
          const changePercentage = ((price24h / price) * 100).toFixed(2);
          const volume = pairData.volume.toFixed(2);
          const coinSymbol = pair.split("-")[0].toLowerCase();
          const iconPath = `/assets/images/coin/${coinSymbol}.png`;

          return {
            id: index + 1,
            icon: iconPath,
            name: pairData.pair_data.base.code,  // Full name of the coin
            market: pair.replace("-", "/"),  // Market (e.g., BTC/USDT)
            price: `$${price.toFixed(2)}`,  // Format price in USD
            sale: `${changePercentage}%`,
            class: price24h < 0 ? "down" : "up",
            volume: volume,  // 24-hour volume
            change: `${changePercentage}%`,
          };
        });

        console.log("Formatted Coin Data:", newData);
        setCoinData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [apiUrl]);

  return coinData;
};
