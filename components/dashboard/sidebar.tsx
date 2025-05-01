import { cn } from "@/lib/utils"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  Home, Briefcase, CoinsIcon, Coins, ArrowsUpFromLine,
  Vote, Lock, Code, HelpCircle, Shield, Settings,
  ChevronDown, AlertCircle, Bell
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarItem {
  id: string
  title: string
  icon: any
  path: string
  badge?: string | number
  roles?: string[]
  children?: {
    title: string
    path: string
    badge?: string | number
  }[]
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    path: '/dashboard',
    badge: 'New'
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    icon: Briefcase,
    path: '/dashboard/portfolio'
  },
  {
    id: 'assets',
    title: 'Assets',
    icon: CoinsIcon,
    path: '/dashboard/assets',
    badge: 2,
    children: [
      { title: 'My Assets', path: '/dashboard/assets' },
      { title: 'Tokenization', path: '/dashboard/assets/tokenize', badge: 'Pending' }
    ]
  },
  {
    id: 'finance',
    title: 'Finance',
    icon: Coins,
    path: '/dashboard/finance',
    children: [
      { title: 'Borrow', path: '/dashboard/finance/borrow' },
      { title: 'Lend', path: '/dashboard/finance/lend' }
    ]
  },
  {
    id: 'market',
    title: 'Market',
    icon: ArrowsUpFromLine,
    path: '/dashboard/market',
    badge: '$2.4M',
    children: [
      { title: 'AMM Pools', path: '/dashboard/market/pools' },
      { title: 'NFT Marketplace', path: '/dashboard/market/nft' }
    ]
  },
  {
    id: 'governance',
    title: 'Governance',
    icon: Vote,
    path: '/dashboard/governance',
    badge: 3,
    roles: ['token_holder']
  },
  {
    id: 'compliance',
    title: 'Compliance',
    icon: Lock,
    path: '/dashboard/compliance',
    badge: 'Verified'
  },
  {
    id: 'developer',
    title: 'Developer',
    icon: Code,
    path: '/dashboard/developer',
    roles: ['developer']
  },
  {
    id: 'support',
    title: 'Support',
    icon: HelpCircle,
    path: '/dashboard/support'
  },
  {
    id: 'admin',
    title: 'Admin',
    icon: Shield,
    path: '/dashboard/admin',
    roles: ['admin']
  }
]

interface SidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <TooltipProvider>
      <div className={cn(
        "fixed top-0 left-0 h-screen border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center justify-between border-b border-border px-4">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">Assetsure</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className={cn("ml-auto", collapsed && "rotate-180")}
              onClick={() => onCollapse(!collapsed)}
            >
              <ChevronDown className="h-4 w-4 transition-transform" />
            </Button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 space-y-1 overflow-y-auto p-2">
            {sidebarItems.map((item) => (
              <SidebarItemContent 
                key={item.id} 
                item={item} 
                isOpen={openItems.includes(item.id)}
                isActive={pathname === item.path}
                onToggle={() => toggleItem(item.id)}
                pathname={pathname}
                collapsed={collapsed}
              />
            ))}
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full gap-2",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span>Settings</span>}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

// Renamed to avoid duplicate function declaration
function SidebarItemContent({ 
  item, 
  isOpen, 
  isActive, 
  onToggle,
  pathname,
  collapsed
}: { 
  item: SidebarItem
  isOpen: boolean
  isActive: boolean
  onToggle: () => void
  pathname: string
  collapsed: boolean
}) {
  const hasChildren = Boolean(item.children?.length)
  const isChildActive = item.children?.some(child => child.path === pathname) ?? false

  return (
    <div className="space-y-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={isActive || isChildActive ? "secondary" : "ghost"}
            size="sm"
            className={cn(
              "w-full justify-between",
              (isActive || isChildActive) && "bg-primary/10"
            )}
            onClick={() => hasChildren && onToggle()}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
            </div>
            {!collapsed && item.badge && (
              <Badge variant="outline" className="ml-auto">
                {item.badge}
              </Badge>
            )}
            {hasChildren && !collapsed && (
              <ChevronDown className={cn(
                "ml-2 h-4 w-4 transition-transform",
                isOpen && "rotate-180"
              )} />
            )}
          </Button>
        </TooltipTrigger>
        {collapsed && (
          <TooltipContent side="right" className="flex items-center gap-4">
            <span>{item.title}</span>
            {item.badge && (
              <Badge variant="outline">{item.badge}</Badge>
            )}
          </TooltipContent>
        )}
      </Tooltip>

      {/* Show children only when not collapsed and item is open */}
      {hasChildren && isOpen && !collapsed && (
        <div className="pl-6 space-y-1">
          {item.children?.map((child) => (
            <Link key={child.path} href={child.path}>
              <Button
                variant={pathname === child.path ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-between",
                  pathname === child.path && "bg-primary/10"
                )}
              >
                <span className="text-sm">{child.title}</span>
                {child.badge && (
                  <Badge variant="outline" className="ml-auto">
                    {child.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// Remove the duplicate SidebarItem component as it's no longer needed
function SidebarItem({ 
  item, 
  isOpen, 
  isActive, 
  onToggle,
  pathname 
}: { 
  item: SidebarItem
  isOpen: boolean
  isActive: boolean
  onToggle: () => void
  pathname: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="group relative">
          <Link href={item.path}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start gap-2",
                item.children && "pr-8",
                isActive && "bg-primary/10"
              )}
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault()
                  onToggle()
                }
              }}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.children && isOpen && (
                <ChevronDown 
                  className={cn(
                    "absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform",
                    isOpen && "rotate-180"
                  )} 
                />
              )}
              {item.badge && (
                <Badge variant="outline" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
          {item.children && isOpen && (
            <div className="pl-6 mt-1 space-y-1">
              {item.children.map((child) => (
                <Link key={child.path} href={child.path}>
                  <Button
                    variant={pathname === child.path ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start gap-2",
                      pathname === child.path && "bg-primary/10"
                    )}
                  >
                    <span>{child.title}</span>
                    {child.badge && (
                      <Badge variant="outline" className="ml-auto">
                        {child.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-[200px]">
        {item.roles && (
          <div className="text-xs text-muted-foreground">
            Available for: {item.roles.join(', ')}
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  )
}
