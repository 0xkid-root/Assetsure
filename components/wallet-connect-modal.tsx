"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Wallet, X, AlertCircle, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// Define wallet types
interface WalletOption {
  id: string
  name: string
  icon: string
  description: string
  popular?: boolean
}

interface WalletConnectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WalletConnectModal({ open, onOpenChange }: WalletConnectModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>('popular')
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // Check if MetaMask is installed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { ethereum } = window as any
      setIsMetaMaskInstalled(!!ethereum && !!ethereum.isMetaMask)
    }
  }, [])

  // Wallet options
  const wallets: WalletOption[] = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '/wallets/metamask.svg',
      description: 'The world\'s most popular crypto wallet',
      popular: true
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: '/wallets/coinbase.svg',
      description: 'Connect using Coinbase Wallet app',
      popular: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '/wallets/walletconnect.svg',
      description: 'Connect using mobile wallet',
      popular: true
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      icon: '/wallets/trustwallet.svg',
      description: 'Connect using Trust Wallet app',
      popular: false
    },
    {
      id: 'phantom',
      name: 'Phantom',
      icon: '/wallets/phantom.svg',
      description: 'Connect using Phantom wallet',
      popular: false
    },
    {
      id: 'brave',
      name: 'Brave Wallet',
      icon: '/wallets/brave.svg',
      description: 'Connect using Brave browser wallet',
      popular: false
    }
  ]

  // Filter wallets based on active tab
  const filteredWallets = wallets.filter(wallet => 
    activeTab === 'popular' ? wallet.popular : !wallet.popular
  )

  // Connect wallet function
  const connectWallet = async (walletId: string) => {
      setConnecting(walletId)
      setError(null)
      
      let retries = 3
      while (retries > 0) {
        try {
          if (walletId === 'metamask') {
            await connectMetaMask()
            break
          } else {
            // Simulate connection for other wallets
            await new Promise(resolve => setTimeout(resolve, 1500))
            throw new Error(`Connection to ${walletId} not implemented yet`)
          }
        } catch (err: any) {
          retries--
          if (retries === 0) {
            const errorMessages: Record<string, string> = {
              'MetaMask is not installed': 'Please install MetaMask to continue',
              'Please connect to MetaMask': 'Connection rejected. Please try again',
              'No accounts found': 'No wallet accounts found. Please create or unlock an account',
            }
            
            setError(errorMessages[err.message] || 'Failed to connect wallet')
          }
        }
      }
      setConnecting(null)
  }

  // Redirect to dashboard when connected
  useEffect(() => {
    if (isConnected) {
      // Add a small delay before redirecting to ensure modal animations complete
      const redirectTimer = setTimeout(() => {
        router.push('/dashboard')
      }, 500)
      
      return () => clearTimeout(redirectTimer)
    }
  }, [isConnected, router])

  // Connect to MetaMask
  const connectMetaMask = async () => {
    const { ethereum } = window as any
    
    if (!ethereum || !ethereum.isMetaMask) {
      throw new Error('MetaMask is not installed')
    }
    
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length > 0) {
        // Successfully connected
        console.log('Connected to MetaMask:', accounts[0])
        
        // Store wallet info in localStorage for persistence
        localStorage.setItem('walletAddress', accounts[0])
        localStorage.setItem('walletProvider', 'metamask')
        localStorage.setItem('isWalletConnected', 'true')
        
        // Update state and close modal
        setIsConnected(true)
        onOpenChange(false)
      } else {
        throw new Error('No accounts found')
      }
    } catch (error: any) {
      if (error.code === 4001) {
        // User rejected the request
        throw new Error('Please connect to MetaMask')
      } else {
        throw error
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Connect Wallet</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-8 w-8 absolute right-4 top-4" 
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <DialogDescription>
            Connect your wallet to access the Assetsure platform
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="popular" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="more">More Options</TabsTrigger>
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-3 mt-2">
                {filteredWallets.map((wallet) => (
                  <div 
                    key={wallet.id}
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-lg border border-border hover:border-gold-500/50 hover:bg-gold-500/5 transition-all duration-300 cursor-pointer relative overflow-hidden",
                      connecting === wallet.id && "border-gold-500 bg-gold-500/10"
                    )}
                    onClick={() => connectWallet(wallet.id)}
                  >
                    <div className="h-10 w-10 rounded-md bg-background flex items-center justify-center border border-border">
                      {wallet.icon ? (
                        <div className="relative h-6 w-6">
                          <Image 
                            src={wallet.icon} 
                            alt={wallet.name} 
                            width={24} 
                            height={24} 
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <Wallet className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-sm flex items-center gap-2">
                        {wallet.name}
                        {wallet.id === 'metamask' && !isMetaMaskInstalled && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                            Not Installed
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground">{wallet.description}</p>
                    </div>
                    
                    {connecting === wallet.id ? (
                      <div className="h-5 w-5 rounded-full border-2 border-gold-500 border-t-transparent animate-spin"></div>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground/50">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Tabs>
        
        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-2 text-sm">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-500">{error}</p>
              {error.includes('MetaMask is not installed') && (
                <a 
                  href="https://metamask.io/download/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center gap-1 text-red-500 hover:text-red-600 mt-1"
                >
                  Install MetaMask
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        )}
        
        <div className="mt-2 text-center text-xs text-muted-foreground">
          By connecting your wallet, you agree to our <a href="#" className="text-gold-500 hover:underline">Terms of Service</a> and <a href="#" className="text-gold-500 hover:underline">Privacy Policy</a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
