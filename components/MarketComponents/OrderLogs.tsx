import { RefreshCwIcon } from '@/config/icons'
import React from 'react'
import { Button } from '../ui/button'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table'

const OrderLogs = () => {
  return (
    <div className="col-span-2 flex flex-col gap-4 border-t bg-gray-100/40 p-4 dark:bg-gray-800/40">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold">Order Log</h2>
      <Button size="icon" variant="ghost">
        <RefreshCwIcon className="h-5 w-5" />
      </Button>
    </div>
    <div className="flex-1 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>12:34:56</TableCell>
            <TableCell>Buy</TableCell>
            <TableCell>$50,000.00</TableCell>
            <TableCell>0.5 BTC</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>12:33:12</TableCell>
            <TableCell>Sell</TableCell>
            <TableCell>$49,500.00</TableCell>
            <TableCell>0.2 BTC</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>12:32:01</TableCell>
            <TableCell>Buy</TableCell>
            <TableCell>$49,800.00</TableCell>
            <TableCell>0.3 BTC</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
  )
}

export default OrderLogs