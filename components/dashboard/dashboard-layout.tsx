"use client"

import { ReactNode, useState, useCallback } from 'react'
import { Sidebar } from './sidebar'
import { cn } from '@/lib/utils'
import { Bell, Search, Briefcase, ArrowsUpFromLine, CoinsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ModeToggle } from '@/components/mode-toggle'
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

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
    // Handle the selected item based on the value
    switch (value) {
      case 'portfolio':
        window.location.href = '/dashboard/portfolio'
        break
      case 'assets':
        window.location.href = '/dashboard/assets'
        break
      case 'market':
        window.location.href = '/dashboard/market'
        break
      default:
        console.log('Selected:', value)
    }
    setSearchOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      
      <div className={cn(
        "min-h-screen flex flex-col transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden" 
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label="Toggle sidebar"
              >
                <Search className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSearch}
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </header>

        <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem value="portfolio" onSelect={handleSelect}>
                <Briefcase className="mr-2 h-4 w-4" />
                Portfolio
              </CommandItem>
              <CommandItem value="assets" onSelect={handleSelect}>
                <CoinsIcon className="mr-2 h-4 w-4" />
                Assets
              </CommandItem>
              <CommandItem value="market" onSelect={handleSelect}>
                <ArrowsUpFromLine className="mr-2 h-4 w-4" />
                Market
                <Badge variant="outline" className="ml-auto">
                  $2.4M
                </Badge>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
