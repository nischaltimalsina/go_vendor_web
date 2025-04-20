import { StatCard } from "@/components/cards/stat-card"
import { MonthlyRevenue } from "@/components/charts"
import { RecentTransactionsTable } from "@/components/tables"
import React from "react"

export function Overview() {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <StatCard value={15346} title="Total Revenue" growth={8} />
        <StatCard value={100} title="Users" growth={-12} />
        <StatCard value={100} title="Users" growth={-12} />
        <StatCard value={100} title="Users" growth={-12} />
      </div>
      <MonthlyRevenue />
      <RecentTransactionsTable />
    </section>
  )
}
