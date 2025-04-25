"use client"

import {
  Button,
  DatePicker,
  Form,
  Heading,
  NumberField,
  Radio,
  RadioGroup,
  TextField,
} from "@/components/ui"
import { BusinessType, OrganizationalKyc } from "@/types/kyc"
import { IconCheck, IconFolderUpload, IconPlus, IconTrash } from "@intentui/icons"
import React, { useState } from "react"

export function OrganizationalKycForm() {
  const [formData, setFormData] = useState<Partial<OrganizationalKyc>>({
    businessType: BusinessType.PRIVATE_LIMITED,
    address: { street: "", city: "", state: "", zipCode: "", country: "" },
    contactInfo: { email: "", phone: "" },
    documents: {},
    ownershipDetails: [{ ownerName: "", ownerTitle: "", ownershipPercentage: 100 }],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [documentFiles, setDocumentFiles] = useState<{
    registrationCertificate?: File | null
    panCard?: File | null
    vatCertificate?: File | null
    taxClearance?: File | null
    otherDocuments: File[]
  }>({
    otherDocuments: [],
  })

  const handleInputChange = (name: string, value: string) => {
    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData({
        ...formData,
        [parent]: Object.assign({}, formData[parent as keyof typeof formData], { [child]: value }),
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleOwnershipChange = (index: number, field: string, value: string | number) => {
    const newOwnershipDetails = [...(formData.ownershipDetails || [])]
    newOwnershipDetails[index] = {
      ...newOwnershipDetails[index],
      [field]: value,
    }

    setFormData({
      ...formData,
      ownershipDetails: newOwnershipDetails,
    })
  }

  const handleAddOwner = () => {
    setFormData({
      ...formData,
      ownershipDetails: [
        ...(formData.ownershipDetails || []),
        { ownerName: "", ownerTitle: "", ownershipPercentage: 0 },
      ],
    })
  }

  const handleRemoveOwner = (index: number) => {
    const newOwnershipDetails = [...(formData.ownershipDetails || [])]
    newOwnershipDetails.splice(index, 1)

    setFormData({
      ...formData,
      ownershipDetails: newOwnershipDetails,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (!files?.length) return

    if (name === "otherDocuments") {
      setDocumentFiles({
        ...documentFiles,
        otherDocuments: [...documentFiles.otherDocuments, ...Array.from(files)],
      })

      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          otherDocuments: [...(documentFiles.otherDocuments || []), ...Array.from(files)],
        },
      })
    } else {
      setDocumentFiles({
        ...documentFiles,
        [name]: files[0],
      })

      setFormData({
        ...formData,
        documents: {
          ...formData.documents,
          [name]: files[0],
        },
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Submitting organizational KYC data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success notification would go here
      alert("Organizational KYC information saved successfully!")
    } catch (error) {
      console.error("Error submitting KYC data:", error)
      // Error notification would go here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-8">
      {/* Business Information */}
      <div className="space-y-4">
        <Heading level={3}>Business Information</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Business/Company Name"
            isRequired
            name="businessName"
            value={formData.businessName || ""}
            onChange={(value) => handleInputChange("businessName", value)}
            placeholder="Legal registered name of your business"
          />

          <TextField
            label="Trading Name"
            name="tradeName"
            value={formData.tradeName || ""}
            onChange={(value) => handleInputChange("tradeName", value)}
            placeholder="Business name used for trading (if different)"
          />
        </div>

        <RadioGroup
          label="Business Type"
          value={formData.businessType || BusinessType.PRIVATE_LIMITED}
          onChange={(value) =>
            setFormData({
              ...formData,
              businessType: value as BusinessType,
            })
          }
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            <Radio value={BusinessType.SOLE_PROPRIETORSHIP}>Sole Proprietorship</Radio>
            <Radio value={BusinessType.PARTNERSHIP}>Partnership</Radio>
            <Radio value={BusinessType.PRIVATE_LIMITED}>Private Limited</Radio>
            <Radio value={BusinessType.PUBLIC_LIMITED}>Public Limited</Radio>
            <Radio value={BusinessType.COOPERATIVE}>Cooperative</Radio>
            <Radio value={BusinessType.NGO}>NGO</Radio>
            <Radio value={BusinessType.OTHER}>Other</Radio>
          </div>
        </RadioGroup>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Registration Number"
            isRequired
            name="registrationNumber"
            value={formData.registrationNumber || ""}
            onChange={(value) => handleInputChange("registrationNumber", value)}
            placeholder="Business registration number"
          />

          <DatePicker
            label="Registration Date"
            isRequired
            value={formData.registrationDate ?? null}
            onChange={(value) =>
              setFormData({
                ...formData,
                registrationDate: value!,
              })
            }
          />
        </div>
      </div>

      {/* Tax Information */}
      <div className="space-y-4">
        <Heading level={3}>Tax Information</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="PAN Number"
            isRequired
            name="panNumber"
            value={formData.panNumber || ""}
            onChange={(value) => handleInputChange("panNumber", value)}
            placeholder="Enter business PAN number"
          />

          <TextField
            label="VAT/GST Number"
            name="vatNumber"
            value={formData.vatNumber || ""}
            onChange={(value) => handleInputChange("vatNumber", value)}
            placeholder="Enter VAT/GST registration number (if applicable)"
          />
        </div>
      </div>

      {/* Business Address */}
      <div className="space-y-4">
        <Heading level={3}>Business Address</Heading>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Street Address"
            isRequired
            name="address.street"
            value={formData.address?.street || ""}
            onChange={(value) => handleInputChange("address.street", value)}
            placeholder="Street address of your business"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="City"
            isRequired
            name="address.city"
            value={formData.address?.city || ""}
            onChange={(value) => handleInputChange("address.city", value)}
            placeholder="City"
          />

          <TextField
            label="State/Province"
            isRequired
            name="address.state"
            value={formData.address?.state || ""}
            onChange={(value) => handleInputChange("address.state", value)}
            placeholder="State or province"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Postal/ZIP Code"
            isRequired
            name="address.zipCode"
            value={formData.address?.zipCode || ""}
            onChange={(value) => handleInputChange("address.zipCode", value)}
            placeholder="Postal or ZIP code"
          />

          <TextField
            label="Country"
            isRequired
            name="address.country"
            value={formData.address?.country || ""}
            onChange={(value) => handleInputChange("address.country", value)}
            placeholder="Country"
          />
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <Heading level={3}>Business Contact</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextField
            label="Email"
            isRequired
            name="contactInfo.email"
            value={formData.contactInfo?.email || ""}
            onChange={(value) => handleInputChange("contactInfo.email", value)}
            type="email"
            placeholder="Business email address"
          />

          <TextField
            label="Phone Number"
            isRequired
            name="contactInfo.phone"
            value={formData.contactInfo?.phone || ""}
            onChange={(value) => handleInputChange("contactInfo.phone", value)}
            placeholder="Business phone number"
          />

          <TextField
            label="Website"
            name="contactInfo.website"
            value={formData.contactInfo?.website || ""}
            onChange={(value) => handleInputChange("contactInfo.website", value)}
            placeholder="Business website URL"
          />
        </div>
      </div>

      {/* Business Documents */}
      <div className="space-y-4">
        <Heading level={3}>Business Documents</Heading>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">
              Registration Certificate <span className="text-danger">*</span>
            </label>
            <div className="mt-1 flex items-center gap-4">
              <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                <IconFolderUpload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  name="registrationCertificate"
                  className="hidden"
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                />
              </label>
              {documentFiles.registrationCertificate && (
                <span className="text-muted-fg text-sm">
                  {documentFiles.registrationCertificate.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">
              PAN Card <span className="text-danger">*</span>
            </label>
            <div className="mt-1 flex items-center gap-4">
              <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                <IconFolderUpload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  name="panCard"
                  className="hidden"
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                />
              </label>
              {documentFiles.panCard && (
                <span className="text-muted-fg text-sm">{documentFiles.panCard.name}</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">VAT/GST Certificate</label>
            <div className="mt-1 flex items-center gap-4">
              <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                <IconFolderUpload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  name="vatCertificate"
                  className="hidden"
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                />
              </label>
              {documentFiles.vatCertificate && (
                <span className="text-muted-fg text-sm">{documentFiles.vatCertificate.name}</span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Tax Clearance Certificate</label>
            <div className="mt-1 flex items-center gap-4">
              <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                <IconFolderUpload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  name="taxClearance"
                  className="hidden"
                  accept="application/pdf,image/*"
                  onChange={handleFileChange}
                />
              </label>
              {documentFiles.taxClearance && (
                <span className="text-muted-fg text-sm">{documentFiles.taxClearance.name}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Other Documents</label>
          <div className="mt-1 flex items-center gap-4">
            <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
              <IconFolderUpload className="h-5 w-5" />
              <span>Upload</span>
              <input
                type="file"
                name="otherDocuments"
                className="hidden"
                accept="application/pdf,image/*"
                multiple
                onChange={handleFileChange}
              />
            </label>
            <span className="text-muted-fg text-sm">
              {documentFiles.otherDocuments.length > 0
                ? `${documentFiles.otherDocuments.length} file(s) selected`
                : "No files selected"}
            </span>
          </div>
          {documentFiles.otherDocuments.length > 0 && (
            <div className="mt-2 space-y-1">
              {documentFiles.otherDocuments.map((file, idx) => (
                <div key={idx} className="text-muted-fg text-sm">
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ownership Information */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading level={3}>Ownership Details</Heading>
          <Button type="button" intent="outline" size="small" onPress={handleAddOwner}>
            <IconPlus className="h-4 w-4" />
            Add Owner
          </Button>
        </div>

        {formData.ownershipDetails?.map((owner, index) => (
          <div key={index} className="border-border rounded-lg border p-4">
            <div className="mb-4 flex items-center justify-between">
              <Heading level={4}>Owner {index + 1}</Heading>
              {index > 0 && (
                <Button
                  type="button"
                  intent="danger"
                  size="small"
                  onPress={() => handleRemoveOwner(index)}
                >
                  <IconTrash className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <TextField
                label="Name"
                isRequired
                value={owner.ownerName || ""}
                onChange={(value) => handleOwnershipChange(index, "ownerName", value)}
                placeholder="Owner's full name"
              />

              <TextField
                label="Title/Position"
                isRequired
                value={owner.ownerTitle || ""}
                onChange={(value) => handleOwnershipChange(index, "ownerTitle", value)}
                placeholder="e.g. CEO, Director"
              />

              <NumberField
                label="Ownership %"
                isRequired
                minValue={0}
                maxValue={100}
                value={owner.ownershipPercentage || 0}
                onChange={(e) => handleOwnershipChange(index, "ownershipPercentage", Number(e))}
                placeholder="Percentage of ownership"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" className="min-w-32" isDisabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save & Continue"}
          {!isSubmitting && <IconCheck />}
        </Button>
      </div>
    </Form>
  )
}
