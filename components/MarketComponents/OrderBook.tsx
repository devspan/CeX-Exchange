"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { FilterIcon } from '@/config/icons';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';

interface Order {
  price: string;
  amount: string;
  total: string;
}

const OrderBook: React.FC = () => {
  const [buyOrders, setBuyOrders] = useState<Order[]>([]);
  const [sellOrders, setSellOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const coreUrl = process.env.NEXT_PUBLIC_CORE_URL;
        if (!coreUrl) {
          throw new Error('Core URL is not defined');
        }

        const response = await fetch(`${coreUrl}/api/schema/swagger-ui/`);
        const data = await response.json();
        setBuyOrders(data.buyOrders);
        setSellOrders(data.sellOrders);
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col gap-4 border-r bg-gray-100/40 p-4 dark:bg-card">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Order Book</h2>
        <Button size="icon" variant="ghost">
          <FilterIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="mb-4">
          <h3 className="text-md font-semibold">Buy Orders</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buyOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h3 className="text-md font-semibold">Sell Orders</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sellOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>{order.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OrderBook;
