import React from "react";
import { CoinData } from "@/config/coinDataFetcher";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface CryptoPriceCardProps {
  coinData: CoinData[];
}

const CryptoPriceCard: React.FC<CryptoPriceCardProps> = ({ coinData }) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {coinData?.map((crypto) => (
            <Card key={crypto.id} className="flex items-center justify-between p-6 shadow-sm transition-all hover:shadow-md dark:border-accent dark:bg-card">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage
                    alt={crypto.name}
                    className="rounded-full"
                    src={crypto.icon}
                  />
                  <AvatarFallback>{crypto.unit}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-50">
                    {crypto.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{crypto.unit}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-gray-50">
                  {crypto.price}
                </p>
                <p className={`text-sm ${crypto.class === "down" ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400'}`}>
                  {crypto.sale}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CryptoPriceCard;
