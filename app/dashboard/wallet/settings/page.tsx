'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useWalletStore } from '@/lib/stores/wallet-store'
import { useToast } from '@/components/ui/use-toast'
import { 
  Shield,
  Bell,
  Wallet,
  Globe,
  AlertTriangle
} from 'lucide-react'

export default function WalletSettingsPage() {
  const { toast } = useToast()
  const { address, chainId } = useWalletStore()
  const [notifications, setNotifications] = useState(true)
  const [autoLock, setAutoLock] = useState(true)
  const [testnet, setTestnet] = useState(false)
  const [hardwareWallet, setHardwareWallet] = useState(false)

  const handleNetworkChange = async () => {
    try {
      // Implementation for network switching would go here
      setTestnet(!testnet)
      toast({
        title: 'Network Changed',
        description: `Switched to ${!testnet ? 'Testnet' : 'Mainnet'}`,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to switch network',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Wallet Settings</h2>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">Auto-lock Wallet</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically lock your wallet after 15 minutes of inactivity
                  </p>
                </div>
              </div>
              <Switch
                checked={autoLock}
                onCheckedChange={setAutoLock}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">Hardware Wallet Support</p>
                  <p className="text-sm text-muted-foreground">
                    Enable support for hardware wallets like Ledger
                  </p>
                </div>
              </div>
              <Switch
                checked={hardwareWallet}
                onCheckedChange={setHardwareWallet}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">Transaction Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for transactions and important updates
                  </p>
                </div>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Network</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <div className="space-y-1">
                  <p className="font-medium">Network Selection</p>
                  <p className="text-sm text-muted-foreground">
                    Switch between mainnet and testnet
                  </p>
                </div>
              </div>
              <Switch
                checked={testnet}
                onCheckedChange={handleNetworkChange}
              />
            </div>

            <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mt-1" />
                <div className="space-y-1">
                  <p className="font-medium text-yellow-500">Network Warning</p>
                  <p className="text-sm text-muted-foreground">
                    Switching networks will disconnect your current session. Make sure to save any pending changes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Advanced</h3>
          <div className="space-y-4">
            <Button
              variant="destructive"
              onClick={() => {
                toast({
                  title: 'Reset Wallet',
                  description: 'This will clear all your wallet data. Make sure you have backed up your keys.',
                  variant: 'destructive',
                })
              }}
            >
              Reset Wallet
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}