export type StoreType = 'bank' | 'petrol' | 'restaurant' | 'cafe' | 'clinic' | 'grocery' | 'other';

export type TokenStatus = 'waiting' | 'serving' | 'completed';

export interface Token {
  id: string;
  tokenNumber: string;
  storeType: StoreType;
  storeName: string; // Added specific store name
  service: string;
  city: string;
  status: TokenStatus;
  createdAt: Date;
  calledAt?: Date;
  completedAt?: Date;
  customerName?: string;
}

export interface StoreService {
  name: string;
  services: string[];
}

export const STORE_DATA: Record<StoreType, StoreService> = {
  bank: {
    name: 'Bank',
    services: ['Withdraw', 'Deposit', 'Account Opening', 'Customer Support']
  },
  petrol: {
    name: 'Petrol Pump',
    services: ['Petrol', 'Diesel', 'Gas', 'Electric Vehicle Charging']
  },
  restaurant: {
    name: 'Restaurant',
    services: ['Food Order (Dine-in)', 'Food Parcel / Takeaway', 'Table Booking', 'Room Availability']
  },
  cafe: {
    name: 'Cafe',
    services: ['Coffee', 'Tea', 'Snacks', 'Breakfast', 'Desserts']
  },
  clinic: {
    name: 'Clinic',
    services: ['General Checkup', 'Vaccination', 'Lab Tests', 'Consultation', 'Emergency']
  },
  grocery: {
    name: 'Grocery Store',
    services: ['Billing', 'Customer Service', 'Home Delivery', 'Product Inquiry']
  },
  other: {
    name: 'Other Services',
    services: ['Service Center', 'Government Office', 'Hospital', 'Custom Service']
  }
};

// Actual store/branch names for each type
export const STORE_BRANCHES: Record<StoreType, string[]> = {
  bank: [
    'Bank of Baroda',
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India',
    'Axis Bank',
    'Punjab National Bank',
    'Kotak Mahindra Bank',
    'IndusInd Bank',
    'Yes Bank',
    'Union Bank of India',
    'Canara Bank',
    'Bank of India'
  ],
  petrol: [
    'HP Petrol Pump',
    'Bharat Petroleum',
    'Indian Oil',
    'Nayara Energy',
    'Shell Petrol Pump',
    'Reliance Petroleum',
    'Essar Oil'
  ],
  restaurant: [
    'Paradise Restaurant',
    'Royal Dine',
    'Spice Garden',
    'Urban Bites',
    'The Food Court',
    'Tasty Treat',
    'Flavour House',
    'Kings Restaurant',
    'Downtown Dining'
  ],
  cafe: [
    'Cafe Coffee Day',
    'Starbucks',
    'Barista',
    'Blue Tokai Coffee',
    'Chaayos',
    'Tea Villa',
    'The Coffee Bean',
    'Costa Coffee'
  ],
  clinic: [
    'City Health Clinic',
    'Apollo Clinic',
    'Max Healthcare',
    'Fortis Clinic',
    'Wellness Medical Center',
    'Care Clinic',
    'LifeCare Hospital',
    'Metro Multispecialty Clinic'
  ],
  grocery: [
    'Reliance Fresh',
    'Big Bazaar',
    'More Megastore',
    'DMart',
    'Spencer\'s',
    'Star Bazaar',
    'Metro Cash & Carry',
    'Natures Basket'
  ],
  other: [
    'Service Center 1',
    'Government Office',
    'District Hospital',
    'Community Center',
    'Public Service Office'
  ]
};

export const CITIES = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'Fort Worth',
  'Columbus',
  'Charlotte',
  'San Francisco',
  'Indianapolis',
  'Seattle',
  'Denver',
  'Boston'
];