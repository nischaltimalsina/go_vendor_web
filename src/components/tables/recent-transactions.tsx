"use client"
import React from "react"
import { Card } from "@/components/ui/card"
import { Table } from "@/components/ui/table"
import { Transaction, TransactionStatus, TransactionType } from "@/types/transaction"
import {
  IconCircleArrowDown,
  IconCircleArrowUp,
  IconCreditCard,
  IconPercent,
} from "@intentui/icons"
import { Badge } from "../ui"

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getStatusBadgeIntent(
  status: TransactionStatus
): "success" | "warning" | "danger" | "primary" | "secondary" | "info" {
  switch (status) {
    case "completed":
      return "success"
    case "pending":
      return "warning"
    case "failed":
      return "danger"
    default:
      return "primary"
  }
}

const getTransactionTypeIcon = (type: TransactionType) => {
  switch (type) {
    case "payment":
      return <IconCircleArrowDown className="h-5 w-5 text-green-600" />
    case "refund":
      return <IconCircleArrowUp className="h-5 w-5 text-red-600" />
    case "payout":
      return <IconCreditCard className="h-5 w-5 text-blue-600" />
    case "commission":
      return <IconPercent className="h-5 w-5 text-purple-600" />
    default:
      return null
  }
}

const items: Transaction[] = [
  {
    id: "TRX-52148",
    bookingId: "BK-78945",
    customerName: "John Smith",
    type: "payment",
    amount: 1200,
    currency: "NPR",
    status: "completed",
    date: "2025-04-18T10:23:45Z",
    description: "Everest Base Camp Trek - Full payment",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-52147",
    bookingId: "BK-78942",
    customerName: "Sophia Rodriguez",
    type: "payment",
    amount: 350,
    currency: "NPR",
    status: "completed",
    date: "2025-04-18T09:15:22Z",
    description: "Kathmandu Cultural Tour - Deposit",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TRX-52146",
    bookingId: "BK-78934",
    customerName: "Wei Chen",
    type: "refund",
    amount: 200,
    currency: "NPR",
    status: "completed",
    date: "2025-04-17T16:42:10Z",
    description: "Partial refund - Cancelled add-on service",
    paymentMethod: "Original Payment Method",
  },
  {
    id: "TRX-52145",
    bookingId: "BK-78930",
    customerName: "Admin",
    type: "payout",
    amount: 3456.75,
    currency: "NPR",
    status: "completed",
    date: "2025-04-17T14:30:00Z",
    description: "Weekly payout to vendor account",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TRX-52144",
    bookingId: "BK-78927",
    customerName: "Emma Wilson",
    type: "payment",
    amount: 455,
    currency: "NPR",
    status: "pending",
    date: "2025-04-17T11:07:33Z",
    description: "Annapurna Circuit Trek - Deposit",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "TRX-52143",
    bookingId: "BK-78925",
    customerName: "Go Nepal",
    type: "commission",
    amount: 127.5,
    currency: "NPR",
    status: "completed",
    date: "2025-04-16T23:15:00Z",
    description: "Platform commission for booking BK-78920",
    paymentMethod: "System",
  },
  {
    id: "TRX-52142",
    bookingId: "BK-78923",
    customerName: "Mohammed Al-Farsi",
    type: "payment",
    amount: 650,
    currency: "NPR",
    status: "failed",
    date: "2025-04-16T18:22:45Z",
    description: "Chitwan Safari Package - Full payment",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-52141",
    bookingId: "BK-78921",
    customerName: "Anika Patel",
    type: "payment",
    amount: 42500,
    currency: "NPR",
    status: "completed",
    date: "2025-04-16T14:50:12Z",
    description: "Pokhara Adventure Package - Full payment",
    paymentMethod: "UPI Transfer",
  },
  {
    id: "TRX-52140",
    bookingId: "BK-78918",
    customerName: "Lars Johansson",
    type: "payment",
    amount: 780,
    currency: "NPR",
    status: "completed",
    date: "2025-04-16T09:33:27Z",
    description: "Upper Mustang Trek - Deposit",
    paymentMethod: "Credit Card",
  },
  {
    id: "TRX-52139",
    bookingId: "BK-78915",
    customerName: "Admin",
    type: "payout",
    amount: 2876.25,
    currency: "NPR",
    status: "completed",
    date: "2025-04-15T16:00:00Z",
    description: "Weekly payout to vendor account",
    paymentMethod: "Bank Transfer",
  },
]

export function RecentTransactionsTable() {
  return (
    <Card className="pb-0">
      <Card.Header>
        <Card.Title>Recent Transactions</Card.Title>
        <Card.Description>These are the last 10 transactions from your account.</Card.Description>
        <Card.Action>View All</Card.Action>
      </Card.Header>
      <Table allowResize aria-label="Recent Transaction">
        <Table.Header>
          <Table.Column isRowHeader isResizable className="min-w-20">
            Transaction ID
          </Table.Column>
          <Table.Column isResizable>Customer Name</Table.Column>
          <Table.Column isResizable>Type</Table.Column>
          <Table.Column>Amount</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Date</Table.Column>
        </Table.Header>
        <Table.Body items={items}>
          {(item) => (
            <Table.Row id={item.id}>
              <Table.Cell>
                <div className="flex items-center">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    {getTransactionTypeIcon(item.type as TransactionType)}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.id}</div>
                    <div className="text-xs text-gray-500">{item.bookingId}</div>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="text-sm text-gray-900">{item.customerName}</div>
                <div className="truncate text-xs text-gray-500">{item.paymentMethod}</div>
              </Table.Cell>
              <Table.Cell>
                <div className="text-sm text-gray-900 capitalize">{item.type}</div>
                <div className="max-w-xs truncate text-xs text-gray-500">{item.description}</div>
              </Table.Cell>
              <Table.Cell>रू {item.amount}</Table.Cell>
              <Table.Cell>
                <Badge intent={getStatusBadgeIntent(item.status)} className="truncate capitalize">
                  {item.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{formatDate(item.date)}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Card>
  )
}
