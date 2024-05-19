"use client";

import React, { useState } from "react";
import { useCoinData } from "@/config/coinDataFetcher";
import { ArrowUpIcon, ArrowDownIcon, RocketIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

const Markets: React.FC = () => {
  const pairs = useCoinData();
  const baseMarkets = [...new Set(pairs.map(pair => pair.market.split("/")[1]))];
  const [selectedBase, setSelectedBase] = useState("USDT");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPairs = pairs.filter(pair =>
    pair.market.toLowerCase().includes(searchTerm.toLowerCase()) &&
    pair.market.endsWith(`/${selectedBase}`)
  );

  return (
    <div className="flex flex-col gap-4 border-l bg-gray-100/40 p-4 dark:bg-black">
      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Button size="icon" variant="ghost">
          <RocketIcon className="h-5 w-5" />
        </Button>
      </div>
      <Tabs value={selectedBase} onValueChange={setSelectedBase}>
        <TabsList>
          {baseMarkets.map(base => (
            <TabsTrigger key={base} value={base}>
              {base}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedBase}>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPairs.map(pair => {
                const change = parseFloat(pair.change);
                const isPositive = change >= 0;
                const displayChange = Math.abs(change) > 1000 ? (
                  <RocketIcon className="h-4 w-4 inline-block text-red-500" />
                ) : (
                  `${change.toFixed(2)}%`
                );

                return (
                  <TableRow key={pair.market}>
                    <TableCell className="text-sm">{pair.market}</TableCell>
                    <TableCell className="text-sm">{pair.price}</TableCell>
                    <TableCell className={`text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                      {isPositive ? <ArrowUpIcon className="h-4 w-4 inline-block" /> : <ArrowDownIcon className="h-4 w-4 inline-block" />}
                      {displayChange}
                    </TableCell>
                    <TableCell className="text-sm">{pair.volume}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Markets;
