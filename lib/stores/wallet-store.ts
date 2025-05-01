import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface WalletBalance {
  id: string
  symbol: string
  amount: number
  value: number
  chain: string
}

interface WalletTransaction {
  id: string
  type: 'send' | 'receive' | 'swap' | 'stake' | 'unstake'
  amount: number
  symbol: string
  from: string
  to: string
  hash: string
  status: 'pending' | 'completed' | 'failed'
  timestamp: number
}

interface WalletState {
  address: string | null
  isConnected: boolean
  chainId: number | null
  balances: WalletBalance[]
  transactions: WalletTransaction[]
  totalValue: number
  pendingTransactions: number
  setWalletInfo: (address: string, chainId: number) => void
  disconnect: () => void
  updateBalance: (balance: WalletBalance) => void
  addTransaction: (transaction: WalletTransaction) => void
  updateTransaction: (id: string, status: WalletTransaction['status']) => void
  updateWalletMetrics: () => void
}

export const useWalletStore = create<WalletState>()(
  devtools(
    persist(
      (set, get) => ({
        address: null,
        isConnected: false,
        chainId: null,
        balances: [],
        transactions: [],
        totalValue: 0,
        pendingTransactions: 0,

        setWalletInfo: (address, chainId) => {
          set({ address, chainId, isConnected: true })
        },

        disconnect: () => {
          set({
            address: null,
            chainId: null,
            isConnected: false,
            balances: [],
            transactions: [],
            totalValue: 0,
            pendingTransactions: 0
          })
        },

        updateBalance: (balance) => {
          const balances = get().balances
          const existingIndex = balances.findIndex(b => b.id === balance.id)
          
          if (existingIndex >= 0) {
            balances[existingIndex] = balance
          } else {
            balances.push(balance)
          }

          set({ balances })
          get().updateWalletMetrics()
        },

        addTransaction: (transaction) => {
          const transactions = [transaction, ...get().transactions]
          set({ transactions })
          get().updateWalletMetrics()
        },

        updateTransaction: (id, status) => {
          const transactions = get().transactions.map(tx =>
            tx.id === id ? { ...tx, status } : tx
          )
          set({ transactions })
          get().updateWalletMetrics()
        },

        updateWalletMetrics: () => {
          const balances = get().balances
          const transactions = get().transactions
          
          const totalValue = balances.reduce((sum, b) => sum + b.value, 0)
          const pendingTransactions = transactions.filter(tx => tx.status === 'pending').length

          set({
            totalValue,
            pendingTransactions
          })
        }
      }),
      {
        name: 'wallet-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)