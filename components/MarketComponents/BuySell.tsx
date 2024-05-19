"use client";

import { ReplaceIcon, SettingsIcon } from "@/config/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface BuySellProps {
  baseCurrency: string;
  quoteCurrency: string;
}

const BuySell: React.FC<BuySellProps> = ({ baseCurrency, quoteCurrency }) => {
  const availableQuote = 1234.56;
  const availableBase = 0.12345;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {baseCurrency}/{quoteCurrency}
        </h2>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <ReplaceIcon className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <SettingsIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Tabs defaultValue="limit" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="limit">Limit</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="stop-limit">Stop-limit</TabsTrigger>
        </TabsList>
        <TabsContent value="limit">
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-md bg-gray-900">
              <CardHeader>
                <CardTitle>Buy BTC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Avbl - USDT {availableQuote.toFixed(2)}</div>
                <form className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="buy-price">Price ({quoteCurrency})</Label>
                    <Input id="buy-price" placeholder="Enter price" type="number" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="buy-amount">Amount ({baseCurrency})</Label>
                    <Input id="buy-amount" placeholder="Enter amount" type="number" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="buy-total">Total ({quoteCurrency})</Label>
                    <Input id="buy-total" placeholder="Enter total" type="number" />
                  </div>
                  <Slider min={0} max={100} step={1} defaultValue={[50]} className="mt-2 mb-4" />
                  <Button type="submit" variant="default" className="bg-green-500 text-white">
                    🚀 Buy BTC
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="shadow-md bg-gray-900">
              <CardHeader>
                <CardTitle>Sell BTC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Avbl - BTC {availableBase.toFixed(5)}</div>
                <form className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="sell-price">Price ({quoteCurrency})</Label>
                    <Input id="sell-price" placeholder="Enter price" type="number" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="sell-amount">Amount ({baseCurrency})</Label>
                    <Input id="sell-amount" placeholder="Enter amount" type="number" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="sell-total">Total ({quoteCurrency})</Label>
                    <Input id="sell-total" placeholder="Enter total" type="number" />
                  </div>
                  <Slider min={0} max={100} step={1} defaultValue={[50]} className="mt-2 mb-4" />
                  <Button type="submit" variant="default" className="bg-red-500 text-white">
                    🐂 Sell BTC
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="market">
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-md bg-gray-900">
              <CardHeader>
                <CardTitle>Buy BTC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Avbl - USDT {availableQuote.toFixed(2)}</div>
                <form className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="buy-market-amount">Amount ({baseCurrency})</Label>
                    <Input id="buy-market-amount" placeholder="Enter amount" type="number" />
                  </div>
                  <Slider min={0} max={100} step={1} defaultValue={[50]} className="mt-2 mb-4" />
                  <Button type="submit" variant="default" className="bg-green-500 text-white">
                    🚀 Buy BTC
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="shadow-md bg-gray-900">
              <CardHeader>
                <CardTitle>Sell BTC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Avbl - BTC {availableBase.toFixed(5)}</div>
                <form className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="sell-market-amount">Amount ({baseCurrency})</Label>
                    <Input id="sell-market-amount" placeholder="Enter amount" type="number" />
                  </div>
                  <Slider min={0} max={100} step={1} defaultValue={[50]} className="mt-2 mb-4" />
                  <Button type="submit" variant="default" className="bg-red-500 text-white">
                    🐂 Sell BTC
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="stop-limit">
          <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-md bg-gray-900">
              <CardHeader>
                <CardTitle>Buy BTC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Avbl - USDT {availableQuote.toFixed(2)}</div>
                <form className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="buy-stop-limit-price">Stop Price ({quoteCurrency})</Label>
                    <Input id="buy-stop-limit-price" placeholder="Enter stop price" type="number" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="buy-stop-limit-amount">Amount ({baseCurrency})</Label>
                    <Input id="buy-stop-limit-amount" placeholder="Enter amount" type="number" />
                  </div>
                  <Slider min={0} max={100} step={1} defaultValue={[50]} className="mt-2 mb-4" />
                  <Button type="submit" variant="default" className="bg-green-500 text-white">
                    🚀 Buy BTC
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="shadow-md bg-gray-900">
              <CardHeader>
                <CardTitle>Sell BTC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">Avbl - BTC {availableBase.toFixed(5)}</div>
                <form className="grid gap-2">
                  <div className="grid gap-1">
                    <Label htmlFor="sell-stop-limit-price">Stop Price ({quoteCurrency})</Label>
                    <Input id="sell-stop-limit-price" placeholder="Enter stop price" type="number" />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="sell-stop-limit-amount">Amount ({baseCurrency})</Label>
                    <Input id="sell-stop-limit-amount" placeholder="Enter amount" type="number" />
                  </div>
                  <Slider min={0} max={100} step={1} defaultValue={[50]} className="mt-2 mb-4" />
                  <Button type="submit" variant="default" className="bg-red-500 text-white">
                    🐂 Sell BTC
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      <div className="bg-gray-900 p-4 rounded-md mt-4">
        <h3 className="text-lg font-semibold mb-2">Order Log</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="px-2 py-1">Time</th>
              <th className="px-2 py-1">Type</th>
              <th className="px-2 py-1">Price</th>
              <th className="px-2 py-1">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-1">12:34:56</td>
              <td className="px-2 py-1">Buy</td>
              <td className="px-2 py-1">$50,000.00</td>
              <td className="px-2 py-1">0.5 BTC</td>
            </tr>
            <tr>
              <td className="px-2 py-1">12:33:12</td>
              <td className="px-2 py-1">Sell</td>
              <td className="px-2 py-1">$49,500.00</td>
              <td className="px-2 py-1">0.2 BTC</td>
            </tr>
            <tr>
              <td className="px-2 py-1">12:32:01</td>
              <td className="px-2 py-1">Buy</td>
              <td className="px-2 py-1">$49,800.00</td>
              <td className="px-2 py-1">0.3 BTC</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuySell;
