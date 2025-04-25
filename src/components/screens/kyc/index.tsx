"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui"
import { KycTabs } from "./kyc-tabs"
import { PersonalKycForm } from "./personal-kyc-form"
import { OrganizationalKycForm } from "./organizational-kyc-form"
import { BankAccountForm } from "./bank-account-form"

export type KycTabType = "personal" | "organizational" | "bank-accounts"

export function Kyc() {
  const [activeTab, setActiveTab] = useState<KycTabType>("personal")

  return (
    <section className="space-y-4">
      <Card>
        <Card.Header>
          <Card.Title>KYC Verification</Card.Title>
          <Card.Description>
            Complete your KYC verification to start selling on our platform.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <KycTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </Card.Content>
      </Card>

      {activeTab === "personal" && (
        <Card>
          <Card.Header>
            <Card.Title>Personal Information</Card.Title>
            <Card.Description>
              Provide your personal information for identity verification.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <PersonalKycForm />
          </Card.Content>
        </Card>
      )}

      {activeTab === "organizational" && (
        <Card>
          <Card.Header>
            <Card.Title>Organization Information</Card.Title>
            <Card.Description>
              Provide details about your business or organization.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <OrganizationalKycForm />
          </Card.Content>
        </Card>
      )}

      {activeTab === "bank-accounts" && (
        <Card>
          <Card.Header>
            <Card.Title>Bank Accounts</Card.Title>
            <Card.Description>Manage your bank accounts for receiving payments.</Card.Description>
          </Card.Header>
          <Card.Content>
            <BankAccountForm />
          </Card.Content>
        </Card>
      )}
    </section>
  )
}
