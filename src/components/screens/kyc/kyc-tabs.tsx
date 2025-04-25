import React from "react"
import { IconBuilding, IconCreditCard, IconCirclePerson } from "@intentui/icons"
import { Button } from "@/components/ui"
import { KycTabType } from "."

interface KycTabsProps {
  activeTab: KycTabType
  onTabChange: (tab: KycTabType) => void
}

export function KycTabs({ activeTab, onTabChange }: KycTabsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button
        className="justify-start"
        intent={activeTab === "personal" ? "primary" : "outline"}
        onPress={() => onTabChange("personal")}
      >
        <IconCirclePerson />
        Personal KYC
      </Button>
      <Button
        className="justify-start"
        intent={activeTab === "organizational" ? "primary" : "outline"}
        onPress={() => onTabChange("organizational")}
      >
        <IconBuilding />
        Organization KYC
      </Button>
      <Button
        className="justify-start"
        intent={activeTab === "bank-accounts" ? "primary" : "outline"}
        onPress={() => onTabChange("bank-accounts")}
      >
        <IconCreditCard />
        Bank Accounts
      </Button>
    </div>
  )
}
