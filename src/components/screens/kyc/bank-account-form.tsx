"use client"

import { Button, Card, Form, Heading, Radio, RadioGroup, Select, TextField } from "@/components/ui"
import { currencies } from "@/types"
import { BankAccount, BankAccountType } from "@/types/kyc"
import { IconCheck, IconFolderUpload, IconPlus } from "@intentui/icons"
import React, { useState } from "react"

export function BankAccountForm() {
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [documentFiles, setDocumentFiles] = useState<{
    chequeCopy?: File | null
    statementCopy?: File | null
  }>({})

  const CURRENCIES = Object.entries(currencies).map(([key, value]) => ({
    id: key,
    title: value.name,
  }))

  const handleAddAccount = () => {
    setEditingAccount({
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      branchName: "",
      accountType: BankAccountType.SAVINGS,
      isDefault: accounts.length === 0,
      currency: "NPR",
      documents: {},
    })
    setEditingIndex(null)
    setShowForm(true)
  }

  const handleEditAccount = (account: BankAccount, index: number) => {
    setEditingAccount({ ...account })
    setEditingIndex(index)
    setShowForm(true)
  }

  const handleDeleteAccount = (index: number) => {
    const newAccounts = [...accounts]
    newAccounts.splice(index, 1)

    // If we deleted the default account and there are other accounts, set the first one as default
    if (accounts[index].isDefault && newAccounts.length > 0) {
      newAccounts[0].isDefault = true
    }

    setAccounts(newAccounts)
  }

  const handleSetDefault = (index: number) => {
    const newAccounts = accounts.map((account, idx) => ({
      ...account,
      isDefault: idx === index,
    }))

    setAccounts(newAccounts)
  }

  const handleInputChange = (name: string, value: string) => {
    if (!editingAccount) return

    setEditingAccount({
      ...editingAccount,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (!files?.length || !editingAccount) return

    setDocumentFiles({
      ...documentFiles,
      [name]: files[0],
    })

    setEditingAccount({
      ...editingAccount,
      documents: {
        ...editingAccount.documents,
        [name]: files[0],
      },
    })
  }

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingAccount) return

    const newAccounts = [...accounts]

    if (editingIndex !== null) {
      // Update existing account
      newAccounts[editingIndex] = editingAccount
    } else {
      // Add new account
      // If this is set as default, update other accounts
      if (editingAccount.isDefault) {
        newAccounts.forEach((account) => {
          account.isDefault = false
        })
      }
      newAccounts.push(editingAccount)
    }

    setAccounts(newAccounts)
    setEditingAccount(null)
    setEditingIndex(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Submitting bank accounts:", accounts)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success notification would go here
      alert("Bank accounts saved successfully!")
    } catch (error) {
      console.error("Error submitting bank accounts:", error)
      // Error notification would go here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Account List */}
      {accounts.length > 0 && (
        <div className="space-y-4">
          {accounts.map((account, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="flex items-center justify-between border-b p-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{account.bankName}</span>
                    {account.isDefault && (
                      <span className="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs">
                        Default
                      </span>
                    )}
                  </div>
                  <span className="text-muted-fg text-sm">{account.accountNumber}</span>
                </div>
                <div className="flex gap-2">
                  {!account.isDefault && (
                    <Button
                      type="button"
                      intent="outline"
                      size="small"
                      onPress={() => handleSetDefault(index)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button
                    type="button"
                    intent="outline"
                    size="small"
                    onPress={() => handleEditAccount(account, index)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    intent="danger"
                    size="small"
                    onPress={() => handleDeleteAccount(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium">Account Details</p>
                  <div className="text-muted-fg mt-2 space-y-1 text-sm">
                    <p>
                      <span className="text-fg font-medium">Account Holder:</span>{" "}
                      {account.accountHolderName}
                    </p>
                    <p>
                      <span className="text-fg font-medium">Account Type:</span>{" "}
                      {account.accountType}
                    </p>
                    <p>
                      <span className="text-fg font-medium">Account Number:</span>{" "}
                      {account.accountNumber}
                    </p>
                    <p>
                      <span className="text-fg font-medium">Currency:</span> {account.currency}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Bank Information</p>
                  <div className="text-muted-fg mt-2 space-y-1 text-sm">
                    <p>
                      <span className="text-fg font-medium">Bank Name:</span> {account.bankName}
                    </p>
                    <p>
                      <span className="text-fg font-medium">Branch Name:</span> {account.branchName}
                    </p>
                    {account.branchCode && (
                      <p>
                        <span className="text-fg font-medium">Branch Code:</span>{" "}
                        {account.branchCode}
                      </p>
                    )}
                    {account.routingNumber && (
                      <p>
                        <span className="text-fg font-medium">Routing Number:</span>{" "}
                        {account.routingNumber}
                      </p>
                    )}
                    {account.swiftCode && (
                      <p>
                        <span className="text-fg font-medium">SWIFT Code:</span> {account.swiftCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Account Button */}
      {!showForm && (
        <div className="flex justify-end">
          <Button type="button" intent="outline" onPress={handleAddAccount}>
            <IconPlus className="h-4 w-4" />
            Add Bank Account
          </Button>
        </div>
      )}

      {/* Account Form */}
      {showForm && editingAccount && (
        <Card>
          <Card.Header>
            <Card.Title>
              {editingIndex !== null ? "Edit Bank Account" : "Add Bank Account"}
            </Card.Title>
            <Card.Description>
              {editingIndex !== null
                ? "Update your bank account information"
                : "Add a new bank account for receiving payments"}
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Form onSubmit={handleSaveAccount} className="space-y-6">
              {/* Account Information */}
              <div className="space-y-4">
                <Heading level={3}>Account Information</Heading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    label="Account Holder Name"
                    isRequired
                    name="accountHolderName"
                    value={editingAccount.accountHolderName || ""}
                    onChange={(value) => handleInputChange("accountHolderName", value)}
                    placeholder="Name on the account"
                  />

                  <TextField
                    label="Account Number"
                    isRequired
                    name="accountNumber"
                    value={editingAccount.accountNumber || ""}
                    onChange={(value) => handleInputChange("accountNumber", value)}
                    placeholder="Bank account number"
                  />
                </div>

                <RadioGroup
                  label="Account Type"
                  value={editingAccount.accountType || BankAccountType.SAVINGS}
                  onChange={(value) =>
                    setEditingAccount({
                      ...editingAccount,
                      accountType: value as BankAccountType,
                    })
                  }
                >
                  <div className="flex gap-4 pt-2">
                    <Radio value={BankAccountType.SAVINGS}>Savings</Radio>
                    <Radio value={BankAccountType.CURRENT}>Current</Radio>
                    <Radio value={BankAccountType.BUSINESS}>Business</Radio>
                  </div>
                </RadioGroup>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={editingAccount.isDefault}
                    onChange={(e) =>
                      setEditingAccount({
                        ...editingAccount,
                        isDefault: e.target.checked,
                      })
                    }
                    className="text-primary h-4 w-4 rounded"
                  />
                  <label htmlFor="isDefault" className="text-sm">
                    Set as default account for receiving payments
                  </label>
                </div>
              </div>

              {/* Bank Information */}
              <div className="space-y-4">
                <Heading level={3}>Bank Information</Heading>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField
                    label="Bank Name"
                    isRequired
                    name="bankName"
                    value={editingAccount.bankName || ""}
                    onChange={(value) => handleInputChange("bankName", value)}
                    placeholder="Name of the bank"
                  />

                  <TextField
                    label="Branch Name"
                    isRequired
                    name="branchName"
                    value={editingAccount.branchName || ""}
                    onChange={(value) => handleInputChange("branchName", value)}
                    placeholder="Branch of the bank"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <TextField
                    label="Branch Code"
                    name="branchCode"
                    value={editingAccount.branchCode || ""}
                    onChange={(value) => handleInputChange("branchCode", value)}
                    placeholder="Branch code (if applicable)"
                  />

                  <TextField
                    label="SWIFT Code"
                    name="swiftCode"
                    value={editingAccount.swiftCode || ""}
                    onChange={(value) => handleInputChange("swiftCode", value)}
                    placeholder="For international transfers"
                  />

                  <TextField
                    label="Routing Number"
                    name="routingNumber"
                    value={editingAccount.routingNumber || ""}
                    onChange={(value) => handleInputChange("routingNumber", value)}
                    placeholder="For US banks"
                  />
                </div>

                <Select
                  name="currency"
                  selectedKey={editingAccount.currency || "NPR"}
                  onSelectionChange={(key) =>
                    setEditingAccount({
                      ...editingAccount,
                      currency: String(key),
                    })
                  }
                >
                  <Select.Trigger />
                  <Select.List items={CURRENCIES}>
                    {(item) => (
                      <Select.Option id={item.id} textValue={item.title}>
                        {item.title}
                      </Select.Option>
                    )}
                  </Select.List>
                </Select>
              </div>

              {/* Supporting Documents */}
              <div className="space-y-4">
                <Heading level={3}>Supporting Documents</Heading>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">
                      Cancelled Cheque <span className="text-danger">*</span>
                    </label>
                    <div className="mt-1 flex items-center gap-4">
                      <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                        <IconFolderUpload className="h-5 w-5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          name="chequeCopy"
                          className="hidden"
                          accept="application/pdf,image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      {editingAccount.documents?.chequeCopy && (
                        <span className="text-muted-fg text-sm">File selected</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-sm font-medium">Bank Statement</label>
                    <div className="mt-1 flex items-center gap-4">
                      <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                        <IconFolderUpload className="h-5 w-5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          name="statementCopy"
                          className="hidden"
                          accept="application/pdf,image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      {editingAccount.documents?.statementCopy && (
                        <span className="text-muted-fg text-sm">File selected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  intent="outline"
                  onPress={() => {
                    setShowForm(false)
                    setEditingAccount(null)
                    setEditingIndex(null)
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">{editingIndex !== null ? "Update" : "Add"} Account</Button>
              </div>
            </Form>
          </Card.Content>
        </Card>
      )}

      {/* Save All Accounts */}
      {accounts.length > 0 && !showForm && (
        <div className="mt-8 flex justify-end">
          <Button
            intent="primary"
            className="min-w-32"
            onClick={handleSubmit}
            isDisabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save All Accounts"}
            {!isSubmitting && <IconCheck />}
          </Button>
        </div>
      )}
    </div>
  )
}
