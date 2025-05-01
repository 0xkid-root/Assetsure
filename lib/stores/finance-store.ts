import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface LoanPosition {
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

interface FinanceTransaction {
  id: string
  type: 'deposit' | 'withdraw' | 'repay' | 'borrow' | 'interest'
  amount: number
  date: string
  positionId: string
  status: 'completed' | 'pending' | 'failed'
}

interface Pool {
  id: string
  name: string
  apy: number
  tvl: number
  risk: 'Low' | 'Medium' | 'High'
  minDeposit: number
  maxDeposit: number
  utilizationRate: number
}

interface FinanceState {
  positions: LoanPosition[]
  transactions: FinanceTransaction[]
  pools: Pool[]
  totalBorrowed: number
  totalLent: number
  netYield: number
  activeLoans: number
  setPositions: (positions: LoanPosition[]) => void
  addPosition: (position: LoanPosition) => void
  updatePosition: (id: string, position: Partial<LoanPosition>) => void
  closePosition: (id: string) => void
  addTransaction: (transaction: FinanceTransaction) => void
  updatePool: (id: string, pool: Partial<Pool>) => void
  updateFinanceMetrics: () => void
}

export const useFinanceStore = create<FinanceState>()(
  devtools(
    persist(
      (set, get) => ({
        positions: [],
        transactions: [],
        pools: [
          {
            id: '1',
            name: 'Stable Yield Pool',
            apy: 5.2,
            tvl: 2500000,
            risk: 'Low',
            minDeposit: 1000,
            maxDeposit: 500000,
            utilizationRate: 0.75
          },
          {
            id: '2',
            name: 'High Yield Pool',
            apy: 12.8,
            tvl: 1800000,
            risk: 'Medium',
            minDeposit: 5000,
            maxDeposit: 1000000,
            utilizationRate: 0.85
          },
          {
            id: '3',
            name: 'RWA Pool',
            apy: 8.5,
            tvl: 3200000,
            risk: 'Low',
            minDeposit: 10000,
            maxDeposit: 2000000,
            utilizationRate: 0.65
          }
        ],
        totalBorrowed: 0,
        totalLent: 0,
        netYield: 0,
        activeLoans: 0,

        setPositions: (positions) => set({ positions }),

        addPosition: (position) => {
          const positions = [...get().positions, position]
          set({ positions })
          get().updateFinanceMetrics()
        },

        updatePosition: (id, updatedPosition) => {
          const positions = get().positions.map(position =>
            position.id === id ? { ...position, ...updatedPosition } : position
          )
          set({ positions })
          get().updateFinanceMetrics()
        },

        closePosition: (id) => {
          const positions = get().positions.map(position =>
            position.id === id ? { ...position, status: 'completed' as const } : position
          )
          set({ positions })
          get().updateFinanceMetrics()
        },

        addTransaction: (transaction) => {
          const transactions = [...get().transactions, transaction]
          set({ transactions })
          get().updateFinanceMetrics()
        },

        updatePool: (id, updatedPool) => {
          const pools = get().pools.map(pool =>
            pool.id === id ? { ...pool, ...updatedPool } : pool
          )
          set({ pools })
        },

        updateFinanceMetrics: () => {
          const positions = get().positions.filter(p => p.status === 'active')
          const totalBorrowed = positions
            .filter(p => p.type === 'borrow')
            .reduce((sum, p) => sum + p.amount, 0)
          const totalLent = positions
            .filter(p => p.type === 'lend')
            .reduce((sum, p) => sum + p.amount, 0)
          const activeLoans = positions.length
          const netYield = positions
            .reduce((sum, p) => sum + (p.type === 'lend' ? p.interestRate : -p.interestRate), 0) / positions.length

          set({
            totalBorrowed,
            totalLent,
            activeLoans,
            netYield
          })
        }
      }),
      {
        name: 'finance-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)