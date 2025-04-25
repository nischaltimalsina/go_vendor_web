import { DateValue } from "@internationalized/date"

export enum IdentityDocType {
  CITIZENSHIP = "citizenship",
  PASSPORT = "passport",
  DRIVERS_LICENSE = "drivers_license",
  VOTER_ID = "voter_id",
}

export enum BusinessType {
  SOLE_PROPRIETORSHIP = "sole_proprietorship",
  PARTNERSHIP = "partnership",
  PRIVATE_LIMITED = "private_limited",
  PUBLIC_LIMITED = "public_limited",
  COOPERATIVE = "cooperative",
  NGO = "ngo",
  OTHER = "other",
}

export enum BankAccountType {
  SAVINGS = "savings",
  CURRENT = "current",
  BUSINESS = "business",
}

export interface PersonalKyc {
  firstName: string
  middleName?: string
  lastName: string
  dateOfBirth: DateValue
  gender: "male" | "female" | "other"
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contactInfo: {
    email: string
    phone: string
  }
  identity: {
    documentType?: IdentityDocType | null
    documentNumber?: string
    issuedDate?: DateValue
    expiryDate?: DateValue
    issuedBy?: string
    documentImageFront?: File | null
    documentImageBack?: File | null
  }
  panNumber?: string
  profileImage?: File | null
}

export interface OrganizationalKyc {
  businessName: string
  tradeName?: string
  businessType: BusinessType
  registrationNumber: string
  registrationDate: DateValue
  panNumber: string
  vatNumber?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contactInfo: {
    email: string
    phone: string
    website?: string
  }
  documents: {
    registrationCertificate?: File | null
    panCard?: File | null
    vatCertificate?: File | null
    taxClearance?: File | null
    otherDocuments?: File[] | null
  }
  ownershipDetails: {
    ownerName: string
    ownerTitle: string
    ownershipPercentage: number
  }[]
}

export interface BankAccount {
  id?: string
  accountHolderName: string
  accountNumber: string
  bankName: string
  branchName: string
  branchCode?: string
  accountType: BankAccountType
  isDefault: boolean
  swiftCode?: string
  routingNumber?: string
  currency: string
  documents: {
    chequeCopy?: File | null
    statementCopy?: File | null
  }
}
