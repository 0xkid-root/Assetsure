import { v4 as uuidv4 } from 'uuid'

interface MockLoanPosition {
  id: string
  type: 'borrow' | 'lend'
  amount: number
  interestRate: number
  term: number
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'defaulted'
  collateral?: {
    assetId: string
    amount: number
  }
}

interface MockFinanceTransaction {
  id: string
  type: 'deposit' | 'withdraw' | 'repay' | 'borrow' | 'interest'
  amount: number
  date: string
  positionId: string
  status: 'completed' | 'pending' | 'failed'
}

// Generate a random number between min and max
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate a random date within the last n days
const randomDate = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() - randomNumber(0, days))
  return date.toISOString().split('T')[0]
}

// Generate a future date n days from now
const futureDateFromNow = (days: number) => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

// Generate mock loan positions
export const generateMockPositions = (count: number = 5): MockLoanPosition[] => {
  const positions: MockLoanPosition[] = []
  const types: ('borrow' | 'lend')[] = ['borrow', 'lend']
  const statuses: ('active' | 'completed' | 'defaulted')[] = ['active', 'completed', 'defaulted']

  for (let i = 0; i < count; i++) {
    const type = types[randomNumber(0, 1)]
    const term = randomNumber(30, 365) // Term in days
    const startDate = randomDate(30)
    const position: MockLoanPosition = {
      id: uuidv4(),
      type,
      amount: randomNumber(10000, 100000),
      interestRate: Number((Math.random() * 15).toFixed(2)),
      term,
      startDate,
      endDate: futureDateFromNow(term),
      status: statuses[randomNumber(0, 2)]
    }

    if (type === 'borrow') {
      position.collateral = {
        assetId: uuidv4(),
        amount: position.amount * 1.5 // 150% collateralization
      }
    }

    positions.push(position)
  }

  return positions
}

// Generate mock finance transactions
export const generateMockTransactions = (positions: MockLoanPosition[], count: number = 20): MockFinanceTransaction[] => {
  const transactions: MockFinanceTransaction[] = []
  const types: ('deposit' | 'withdraw' | 'repay' | 'borrow' | 'interest')[] = 
    ['deposit', 'withdraw', 'repay', 'borrow', 'interest']
  const statuses: ('completed' | 'pending' | 'failed')[] = ['completed', 'pending', 'failed']

  for (let i = 0; i < count; i++) {
    const position = positions[randomNumber(0, positions.length - 1)]
    const type = types[randomNumber(0, types.length - 1)]
    
    const transaction: MockFinanceTransaction = {
      id: uuidv4(),
      type,
      amount: type === 'interest' 
        ? randomNumber(100, 1000)
        : randomNumber(5000, 50000),
      date: randomDate(30),
      positionId: position.id,
      status: statuses[randomNumber(0, 2)]
    }

    transactions.push(transaction)
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Generate finance metrics
export const generateFinanceMetrics = (positions: MockLoanPosition[]) => {
  const activePositions = positions.filter(p => p.status === 'active')
  const totalBorrowed = activePositions
    .filter(p => p.type === 'borrow')
    .reduce((sum, p) => sum + p.amount, 0)
  const totalLent = activePositions
    .filter(p => p.type === 'lend')
    .reduce((sum, p) => sum + p.amount, 0)
  const activeLoans = activePositions.length
  const netYield = activePositions.length > 0
    ? activePositions.reduce((sum, p) => sum + (p.type === 'lend' ? p.interestRate : -p.interestRate), 0) / activePositions.length
    : 0

  return {
    totalBorrowed,
    totalLent,
    activeLoans,
    netYield: Number(netYield.toFixed(2))
  }
}