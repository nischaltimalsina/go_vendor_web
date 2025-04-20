export type TransactionType = "payment" | "refund" | "payout" | "commission"
export type TransactionStatus = "completed" | "pending" | "failed"
export type CurrencyType = "NPR" | "USD" | "EUR" | "GBP" | "INR" | "AUD" | "CNY" | "JPY"

export interface Transaction {
  id: string
  bookingId: string
  customerName: string
  type: TransactionType
  amount: number
  currency: CurrencyType
  status: TransactionStatus
  date: string
  description: string
  paymentMethod?: string
}
