# Guest Leases Page

A React + TypeScript implementation of the Split Lease Guest Leases page, migrated from Bubble.io.

## Features

- **Lease Card Display**: View all leases with expandable/collapsible details
- **Payment Records Table**: Track scheduled and actual payments
- **Stays Management**: View weekly stays with status indicators
- **Check-in/Check-out Flow**: Interactive modal for arrival/departure notifications
- **Date Change Requests**: View, approve, or reject date modification requests
- **Flexibility Score**: Visual representation of guest reputation and flexibility metrics
- **Emergency Assistance**: Quick access to emergency support

## Tech Stack

- React 18
- TypeScript
- Vite
- Lucide React (icons)
- CSS Modules

## Project Structure

```
src/
├── components/
│   ├── shared/
│   │   ├── Header.tsx
│   │   ├── Header.css
│   │   ├── Footer.tsx
│   │   └── Footer.css
│   ├── LeaseCard.tsx
│   ├── LeaseCard.css
│   ├── PaymentRecordsTable.tsx
│   ├── PaymentRecordsTable.css
│   ├── StaysTable.tsx
│   ├── StaysTable.css
│   ├── DateChangeRequestsTable.tsx
│   ├── DateChangeRequestsTable.css
│   ├── FlexibilityScore.tsx
│   ├── FlexibilityScore.css
│   ├── CheckInCheckOutFlow.tsx
│   └── CheckInCheckOutFlow.css
├── pages/
│   ├── GuestLeasesPage.tsx
│   └── GuestLeasesPage.css
├── types/
│   └── lease.types.ts
├── utils/
│   └── formatters.ts
├── data/
│   └── mockData.ts
├── styles/
│   └── index.css
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Design Specifications

- **Primary Font**: DM Sans
- **Primary Purple**: #7C3AED
- **Text Dark**: #4D4D4D
- **Background Gray**: #F7F8F9
- **Border Gray**: #6B6B6B

## Data Types

### BookingLease
Main data type containing:
- Guest/Host information
- Listing details
- Financial information (payments, rent)
- Documents (agreements, authorization forms)
- Related stays and date change requests
- Reputation scores

### BookingStay
Individual weekly stays within a lease:
- Check-in/out dates
- Stay status
- Reviews
- Photos (cleaning, storage)

### DateChangeRequest
Modification requests for dates:
- Request status
- Old/new dates
- Pricing information
- Approval workflow

## Workflows

The page implements 37 workflows including:
- Lease card toggle (expand/collapse)
- Check-in flow (I'm on my way, I'm here)
- Check-out flow (photos, review, leaving)
- Date change request management
- Review submission and viewing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License
