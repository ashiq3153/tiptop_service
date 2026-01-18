# Loan Application System

A full-stack loan application management system built with Node.js, Express, TypeScript, React, and Prisma.

## Features

- ✅ Create new loan applications
- ✅ View all loan applications
- ✅ Update loan status (Pending, Approved, Rejected, Disbursed, Completed)
- ✅ Delete loan applications
- ✅ Automatic EMI (Equated Monthly Installment) calculation
- ✅ Total amount calculation
- ✅ Modern, responsive UI

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- SQLite database

### Frontend
- React 18
- TypeScript
- Vite
- Axios for API calls

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL="file:./dev.db"
   PORT=3000
   ```

   Generate Prisma client and run migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

## Running the Application

### Development Mode (Runs both frontend and backend)

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3000`
- Frontend development server on `http://localhost:5173`

### Run Separately

**Backend only:**
```bash
npm run dev:server
```

**Frontend only:**
```bash
npm run dev:client
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/loans` - Get all loans
- `GET /api/loans/:id` - Get loan by ID
- `POST /api/loans` - Create new loan application
- `PATCH /api/loans/:id/status` - Update loan status
- `PUT /api/loans/:id` - Update loan details
- `DELETE /api/loans/:id` - Delete loan application

## Loan Statuses

- **PENDING** - Initial status when loan application is created
- **APPROVED** - Loan application has been approved
- **REJECTED** - Loan application has been rejected
- **DISBURSED** - Loan amount has been disbursed
- **COMPLETED** - Loan has been fully repaid

## EMI Calculation

The system automatically calculates:
- **EMI** (Equated Monthly Installment) using the standard formula
- **Total Amount** (EMI × Loan Term in months)

Formula: `EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)`
- P = Principal (loan amount)
- r = Monthly interest rate
- n = Number of months

## Database Management

**View database in Prisma Studio:**
```bash
npm run prisma:studio
```

**Reset database (if needed):**
```bash
npm run prisma:migrate reset
```

## Project Structure

```
tiptop_service/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types.ts       # TypeScript types
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   └── package.json
├── src/                    # Backend server
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   └── server.ts          # Server entry point
├── prisma/
│   └── schema.prisma      # Database schema
└── package.json
```

## Building for Production

```bash
npm run build
```

This will:
- Build the TypeScript backend to `dist/`
- Build the React frontend to `client/dist/`

## License

ISC
