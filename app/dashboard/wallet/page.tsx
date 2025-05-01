"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, Copy, ExternalLink, CheckCircle2, Wallet, LogOut } from 'lucide-react'

export default function WalletPage() {
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [walletProvider, setWalletProvider] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const [balance, setBalance] = useState('0.00')
  const [network, setNetwork] = useState('Ethereum Mainnet')

  useEffect(() => {
    // Get wallet info from localStorage
    const storedWalletAddress = localStorage.getItem('walletAddress')
    const storedWalletProvider = localStorage.getItem('walletProvider')
    
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress)
    }
    
    if (storedWalletProvider) {
      setWalletProvider(storedWalletProvider)
    }
    
    // For demo purposes, set a random balance
    setBalance((Math.random() * 10).toFixed(4))
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const disconnectWallet = () => {
    // Clear wallet info from localStorage
    localStorage.removeItem('walletAddress')
    localStorage.removeItem('walletProvider')
    localStorage.removeItem('isWalletConnected')
    
    // Redirect to home page
    window.location.href = '/'
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Wallet</h1>
        <p className="text-muted-foreground">
          Manage your connected wallet and view your assets.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Wallet Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Connected Wallet</CardTitle>
            <CardDescription>
              Your wallet is currently connected to the Assetsure platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Wallet Address</span>
              <div className="flex items-center gap-2">
                <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-sm">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={copyToClipboard}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  asChild
                >
                  <a href={`https://etherscan.io/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Wallet Type</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded bg-muted px-[0.5rem] py-[0.3rem]">
                  <Wallet className="h-4 w-4" />
                  <span className="text-sm capitalize">{walletProvider}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Network</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded bg-muted px-[0.5rem] py-[0.3rem]">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">{network}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <span className="text-sm text-muted-foreground">Balance</span>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{balance} ETH</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="destructive" 
              className="w-full gap-2"
              onClick={disconnectWallet}
            >
              <LogOut className="h-4 w-4" />
              Disconnect Wallet
            </Button>
          </CardFooter>
        </Card>
        
        {/* Transactions Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your recent wallet transactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="received">Received</TabsTrigger>
              </TabsList>
              <div className="mt-4 space-y-4">
                {[
                  { type: 'received', amount: '0.25 ETH', from: '0x1a2...3b4c', time: '2 hours ago' },
                  { type: 'sent', amount: '0.1 ETH', to: '0x5d6...7e8f', time: '1 day ago' },
                  { type: 'received', amount: '0.05 ETH', from: '0x9a0...1b2c', time: '3 days ago' },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === 'received' ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                        <ArrowUpRight className={`h-4 w-4 ${tx.type === 'received' ? 'text-green-500 rotate-180' : 'text-amber-500'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {tx.type === 'received' ? `From ${tx.from}` : `To ${tx.to}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{tx.amount}</p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="justify-center">
            <Button variant="outline" className="w-full gap-2">
              View All Transactions
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
