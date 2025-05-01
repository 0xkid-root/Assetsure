"use client"

import { ReactNode, useState, useCallback } from 'react'
import { Sidebar } from './sidebar'
import { cn } from '@/lib/utils'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/mode-toggle'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleSearch = useCallback(() => {
    setSearchOpen(true)
  }, [])

  const handleSelect = useCallback((value: string) => {
    // Handle the selected item
    console.log('Selected:', value)
    setSearchOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      
      <div className={cn(
        "min-h-screen flex flex-col transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-8">
          <div className="flex flex-1 items-center gap-6">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search assets, transactions..."
                className="w-full bg-background pl-8 focus-visible:ring-primary/50"
                aria-label="Search assets and transactions"
                role="searchbox"
                onClick={handleSearch}
                readOnly
              />
              
              <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
                <CommandInput placeholder="Search assets, transactions..." />
                <CommandList className="max-h-[400px] overflow-y-auto">
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Assets">
                    <CommandItem value="commercial-real-estate" onSelect={handleSelect}>
                      <div className="flex items-center gap-2">
                        <span>Commercial Real Estate</span>
                        <Badge variant="outline" className="ml-auto">$1.2M</Badge>
                      </div>
                    </CommandItem>
                    <CommandItem value="gold-reserve" onSelect={handleSelect}>
                      <div className="flex items-center gap-2">
                        <span>Gold Reserve</span>
                        <Badge variant="outline" className="ml-auto">$845K</Badge>
                      </div>
                    </CommandItem>
                    <CommandItem value="art-collection" onSelect={handleSelect}>
                      <div className="flex items-center gap-2">
                        <span>Art Collection</span>
                        <Badge variant="outline" className="ml-auto">$380K</Badge>
                      </div>
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Recent Transactions">
                    <CommandItem value="po-1234" onSelect={handleSelect}>
                      <div className="flex items-center gap-2">
                        <span>Purchase Order #1234</span>
                        <Badge className="ml-auto bg-green-500">Completed</Badge>
                      </div>
                    </CommandItem>
                    <CommandItem value="sale-5678" onSelect={handleSelect}>
                      <div className="flex items-center gap-2">
                        <span>Sale Transaction #5678</span>
                        <Badge className="ml-auto bg-yellow-500">Pending</Badge>
                      </div>
                    </CommandItem>
                    <CommandItem value="transfer-9012" onSelect={handleSelect}>
                      <div className="flex items-center gap-2">
                        <span>Transfer #9012</span>
                        <Badge className="ml-auto bg-blue-500">Processing</Badge>
                      </div>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative hover:bg-muted/80"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              <span 
                className="absolute top-1 right-1.5 flex h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-background"
                aria-label="New notifications available"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              </span>
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <ModeToggle />
          </div>
        </header>
        
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
