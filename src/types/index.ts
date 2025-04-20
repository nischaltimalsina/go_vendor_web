export interface Payment {
  id: string;
  bookingId: string;
  amount: Money;
  method: PaymentMethod;
  status: PaymentStatus;
  receivedAt?: Date;
  notes?: string;
  externalReference?: string;
}

enum CurrencyCode {
  NPR = 'NPR',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  INR = 'INR',
  AUD = 'AUD',
  CNY = 'CNY',
  JPY = 'JPY'
}

interface Currency {
  code: CurrencyCode;
  symbol: string;
  name: string;
  decimalPlaces: number;
}

// Currency configuration
export const currencies: Record<CurrencyCode, Currency> = {
  NPR: { code: CurrencyCode.NPR, symbol: 'रू', name: 'Nepalese Rupee', decimalPlaces: 2 },
  USD: { code: CurrencyCode.USD, symbol: '$', name: 'US Dollar', decimalPlaces: 2 },
  EUR: { code: CurrencyCode.EUR, symbol: '€', name: 'Euro', decimalPlaces: 2 },
  GBP: { code: CurrencyCode.GBP, symbol: '£', name: 'British Pound', decimalPlaces: 2 },
  INR: { code: CurrencyCode.INR, symbol: '₹', name: 'Indian Rupee', decimalPlaces: 2 },
  AUD: { code: CurrencyCode.AUD, symbol: '$', name: 'Australian Dollar', decimalPlaces: 2 },
  CNY: { code: CurrencyCode.CNY, symbol: '¥', name: 'Chinese Yuan', decimalPlaces: 2 },
  JPY: { code: CurrencyCode.JPY, symbol: '¥', name: 'Japanese Yen', decimalPlaces: 0 }
};

export interface Money {
  amount: number;
  currency: Currency;
}

export enum PaymentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  REFUNDED = 'refunded',
  DISPUTED = 'disputed'
}

enum PaymentMethod {
  INTERNET_BANKING = 'internet_banking',
  MOBILE_BANKING = 'mobile_banking',
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  PLATFORM = 'platform',
  OTHER = 'other'
}
