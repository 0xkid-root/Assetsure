import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

interface Asset {
  id: string
  name: string
  type: string
  value: number
  allocation: number
  change: number
  status?: 'tokenized' | 'pending' | 'in_review'
}

interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'yield'
  assetId: string
  amount: number
  date: string
}

interface PortfolioState {
  assets: Asset[]
  transactions: Transaction[]
  totalValue: number
  dailyChange: number
  monthlyYield: number
  roi: number
  tokenizedAssets: number
  pendingAssets: number
  setAssets: (assets: Asset[]) => void
  addAsset: (asset: Asset) => void
  updateAsset: (id: string, asset: Partial<Asset>) => void
  removeAsset: (id: string) => void
  addTransaction: (transaction: Transaction) => void
  updatePortfolioMetrics: () => void
}

export const usePortfolioStore = create<PortfolioState>()(
  devtools(
    persist(
      (set, get) => ({
        assets: [],
        transactions: [],
        totalValue: 0,
        dailyChange: 0,
        monthlyYield: 0,
        roi: 0,
        tokenizedAssets: 0,
        pendingAssets: 0,

        setAssets: (assets) => set({ assets }),

        addAsset: (asset) => {
          const assets = [...get().assets, asset]
          set({ assets })
          get().updatePortfolioMetrics()
        },

        updateAsset: (id, updatedAsset) => {
          const assets = get().assets.map(asset =>
            asset.id === id ? { ...asset, ...updatedAsset } : asset
          )
          set({ assets })
          get().updatePortfolioMetrics()
        },

        removeAsset: (id) => {
          const assets = get().assets.filter(asset => asset.id !== id)
          set({ assets })
          get().updatePortfolioMetrics()
        },

        addTransaction: (transaction) => {
          const transactions = [...get().transactions, transaction]
          set({ transactions })
          get().updatePortfolioMetrics()
        },

        updatePortfolioMetrics: () => {
          const assets = get().assets
          const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)
          const tokenizedAssets = assets.filter(asset => asset.status === 'tokenized').length
          const pendingAssets = assets.filter(asset => asset.status === 'pending').length
          
          // Calculate other metrics
          const monthlyYield = 5.2 // Mock value, should be calculated based on actual yields
          const roi = 18.5 // Mock value, should be calculated based on actual returns
          const dailyChange = -1245.23 // Mock value, should be calculated based on actual daily change

          set({
            totalValue,
            tokenizedAssets,
            pendingAssets,
            monthlyYield,
            roi,
            dailyChange
          })
        }
      }),
      {
        name: 'portfolio-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)