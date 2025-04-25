"use client"

import {
  Button,
  DatePicker,
  Form,
  Heading,
  Input,
  Radio,
  RadioGroup,
  TextField,
} from "@/components/ui"
import { IdentityDocType, PersonalKyc } from "@/types/kyc"
import { IconCheck, IconFolderUpload } from "@intentui/icons"
import React, { useState } from "react"

export function PersonalKycForm() {
  const [formData, setFormData] = useState<Partial<PersonalKyc>>({
    address: { street: "", city: "", state: "", zipCode: "", country: "" },
    contactInfo: { email: "", phone: "" },
    identity: {
      documentType: IdentityDocType.CITIZENSHIP,
      documentNumber: "",
      issuedBy: "",
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [frontImage, setFrontImage] = useState<File | null>(null)
  const [backImage, setBackImage] = useState<File | null>(null)
  const [profileImage, setProfileImage] = useState<File | null>(null)

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

  const handleIdentityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      identity: {
        ...formData.identity,
        [name]: value,
      },
    })
  }

  const handleDocTypeChange = (value: IdentityDocType) => {
    setFormData({
      ...formData,
      identity: {
        ...formData.identity,
        documentType: value,
      },
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (!files?.length) return

    switch (name) {
      case "frontImage":
        setFrontImage(files[0])
        setFormData({
          ...formData,
          identity: {
            ...formData.identity,
            documentImageFront: files[0],
          },
        })
        break
      case "backImage":
        setBackImage(files[0])
        setFormData({
          ...formData,
          identity: {
            ...formData.identity,
            documentImageBack: files[0],
          },
        })
        break
      case "profileImage":
        setProfileImage(files[0])
        setFormData({
          ...formData,
          profileImage: files[0],
        })
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Submitting personal KYC data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Success notification would go here
      alert("Personal KYC information saved successfully!")
    } catch (error) {
      console.error("Error submitting KYC data:", error)
      // Error notification would go here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <Heading level={3}>Basic Information</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextField
            label="First Name"
            isRequired
            name="firstName"
            value={formData.firstName || ""}
            onChange={(value) => handleInputChange("firstName", value)}
            placeholder="Enter your first name"
          ></TextField>

          <TextField
            label="Middle Name"
            name="middleName"
            value={formData.middleName || ""}
            onChange={(value) => handleInputChange("middleName", value)}
            placeholder="Enter your middle name (if any)"
          ></TextField>

          <TextField
            label="Last Name"
            isRequired
            name="lastName"
            value={formData.lastName || ""}
            onChange={(value) => handleInputChange("lastName", value)}
            placeholder="Enter your last name"
          ></TextField>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DatePicker
            name="dateOfBirth"
            value={formData.dateOfBirth ?? null}
            onChange={(value) =>
              setFormData({
                ...formData,
                dateOfBirth: value!,
              })
            }
            label="Date of Birth"
          />

          <RadioGroup
            label="Gender"
            value={formData.gender || "male"}
            onChange={(value) =>
              setFormData({
                ...formData,
                gender: value as "male" | "female" | "other",
              })
            }
          >
            <div className="flex gap-4 pt-2">
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="other">Other</Radio>
            </div>
          </RadioGroup>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Profile Image</label>
            <div className="mt-1 flex items-center gap-4">
              <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                <IconFolderUpload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  name="profileImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {profileImage && <span className="text-muted-fg text-sm">{profileImage.name}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <Heading level={3}>Contact Information</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Email"
            isRequired
            name="contactInfo.email"
            value={formData.contactInfo?.email || ""}
            onChange={(value) => handleInputChange("contactInfo.email", value)}
            placeholder="Enter your email address"
            type="email"
          />

          <TextField
            label="Phone Number"
            isRequired
            name="contactInfo.phone"
            value={formData.contactInfo?.phone || ""}
            onChange={(value) => handleInputChange("contactInfo.phone", value)}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="space-y-4">
        <Heading level={3}>Address Information</Heading>
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Street Address"
            isRequired
            name="address.street"
            value={formData.address?.street || ""}
            onChange={(value) => handleInputChange("address.street", value)}
            placeholder="Enter your street address"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="City"
            isRequired
            name="address.city"
            value={formData.address?.city || ""}
            onChange={(value) => handleInputChange("address.city", value)}
            placeholder="Enter your city"
          />

          <TextField
            label="State/Province"
            isRequired
            name="address.state"
            value={formData.address?.state || ""}
            onChange={(value) => handleInputChange("address.state", value)}
            placeholder="Enter your state or province"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="Postal/ZIP Code"
            isRequired
            name="address.zipCode"
            value={formData.address?.zipCode || ""}
            onChange={(value) => handleInputChange("address.zipCode", value)}
            placeholder="Enter your postal code"
          />

          <TextField
            label="Country"
            isRequired
            name="address.country"
            value={formData.address?.country || ""}
            onChange={(value) => handleInputChange("address.country", value)}
            placeholder="Enter your country"
          />
        </div>
      </div>

      {/* Identity Documents */}
      <div className="space-y-4">
        <Heading level={3}>Identity Verification</Heading>

        <RadioGroup
          label="Document Type"
          value={formData.identity?.documentType || IdentityDocType.CITIZENSHIP}
          onChange={(value) => handleDocTypeChange(value as IdentityDocType)}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4">
            <Radio value={IdentityDocType.CITIZENSHIP}>Citizenship</Radio>
            <Radio value={IdentityDocType.PASSPORT}>Passport</Radio>
            <Radio value={IdentityDocType.DRIVERS_LICENSE}>Driver&apos;s License</Radio>
            <Radio value={IdentityDocType.VOTER_ID}>Voter ID</Radio>
          </div>
        </RadioGroup>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField label="Document Number" isRequired>
            <Input
              name="documentNumber"
              value={formData.identity?.documentNumber || ""}
              onChange={handleIdentityChange}
              placeholder="Enter your document number"
            />
          </TextField>

          <TextField label="Issued By" isRequired>
            <Input
              name="issuedBy"
              value={formData.identity?.issuedBy || ""}
              onChange={handleIdentityChange}
              placeholder="Authority that issued the document"
            />
          </TextField>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DatePicker
            value={formData.identity?.issuedDate ?? null}
            onChange={(value) =>
              setFormData({
                ...formData,
                identity: {
                  ...formData.identity,
                  issuedDate: value!,
                },
              })
            }
            label="Issue Date"
          />

          <DatePicker
            name="expiryDate"
            value={formData.identity?.expiryDate ?? null}
            onChange={(value) =>
              setFormData({
                ...formData,
                identity: {
                  ...formData.identity,
                  expiryDate: value!,
                },
              })
            }
            label="Expiry Date"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Front Image of Document</label>
            <div className="mt-1 flex items-center gap-4">
              <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                <IconFolderUpload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  name="frontImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {frontImage && <span className="text-muted-fg text-sm">{frontImage.name}</span>}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Back Image of Document</label>
            <div className="mt-1 flex items-center gap-4">
              <label className="border-border text-muted-fg hover:border-primary hover:text-primary flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4">
                <IconFolderUpload className="h-5 w-5" />
                <span>Upload</span>
                <input
                  type="file"
                  name="backImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {backImage && <span className="text-muted-fg text-sm">{backImage.name}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* PAN Number */}
      <div className="space-y-4">
        <Heading level={3}>Tax Information</Heading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TextField
            label="PAN Number"
            name="panNumber"
            value={formData.panNumber || ""}
            onChange={(value) => handleInputChange("panNumber", value)}
            placeholder="Enter your PAN number"
          />
        </div>
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
