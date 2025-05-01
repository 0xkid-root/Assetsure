import { v4 as uuidv4 } from 'uuid'

interface MockAsset {
  id: string
  name: string
  type: string
  value: number
  allocation: number
  change: number
  status?: string
}

interface MockTransaction {
  id: string
  type: 'buy' | 'sell' | 'yield'
  assetId: string
  amount: number
  date: string
}

// Asset Types
const assetTypes = [
  'Real Estate',
  'Infrastructure',
  'Green Energy',
  'SME Loans',
  'Art & Collectibles'
]

// Status Types
const statusTypes = ['tokenized', 'pending', 'in_review']

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

// Generate a random percentage change
const randomChange = () => {
  const isPositive = Math.random() > 0.3
  return Number((Math.random() * 15 * (isPositive ? 1 : -1)).toFixed(2))
}

// Generate mock assets
export const generateMockAssets = (count: number = 8): MockAsset[] => {
  const assets: MockAsset[] = []
  let totalAllocation = 0

  for (let i = 0; i < count - 1; i++) {
    const remainingAllocation = 100 - totalAllocation
    const allocation = i === count - 2 
      ? remainingAllocation 
      : Math.min(randomNumber(10, 30), remainingAllocation)

    const asset: MockAsset = {
      id: uuidv4(),
      name: `${assetTypes[i % assetTypes.length]} Fund ${String.fromCharCode(65 + i)}`,
      type: assetTypes[i % assetTypes.length],
      value: randomNumber(100000, 2000000),
      allocation,
      change: randomChange(),
      status: statusTypes[randomNumber(0, 2)]
    }

    assets.push(asset)
    totalAllocation += allocation
  }

  // Add last asset with remaining allocation
  if (totalAllocation < 100) {
    assets.push({
      id: uuidv4(),
      name: `${assetTypes[count - 1 % assetTypes.length]} Fund ${String.fromCharCode(65 + count - 1)}`,
      type: assetTypes[count - 1 % assetTypes.length],
      value: randomNumber(100000, 2000000),
      allocation: 100 - totalAllocation,
      change: randomChange(),
      status: statusTypes[randomNumber(0, 2)]
    })
  }

  return assets
}

// Generate mock transactions
export const generateMockTransactions = (assets: MockAsset[], count: number = 10): MockTransaction[] => {
  const transactions: MockTransaction[] = []
  const transactionTypes: ('buy' | 'sell' | 'yield')[] = ['buy', 'sell', 'yield']

  for (let i = 0; i < count; i++) {
    const asset = assets[randomNumber(0, assets.length - 1)]
    const type = transactionTypes[randomNumber(0, 2)]
    
    const transaction: MockTransaction = {
      id: uuidv4(),
      type,
      assetId: asset.id,
      amount: type === 'yield' 
        ? randomNumber(100, 1000)
        : randomNumber(5000, 50000),
      date: randomDate(30)
    }

    transactions.push(transaction)
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Generate portfolio metrics
export const generatePortfolioMetrics = (assets: MockAsset[]) => {
  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
  const tokenizedAssets = assets.filter(asset => asset.status === 'tokenized').length
  const pendingAssets = assets.filter(asset => asset.status === 'pending').length

  return {
    totalValue,
    tokenizedAssets,
    pendingAssets,
    monthlyYield: Number((Math.random() * 8).toFixed(2)),
    roi: Number((Math.random() * 25).toFixed(2)),
    dailyChange: Number((Math.random() * 2000 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2))
  }
}