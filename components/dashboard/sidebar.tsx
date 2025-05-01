import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  Home, Briefcase, CoinsIcon, Coins, ArrowsUpFromLine,
  Vote, Lock, Code, HelpCircle, Shield, Settings,
  ChevronDown, MenuIcon, X, User, Bell, Sun, Moon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

// Define TypeScript interfaces
interface SidebarChild {
  title: string
  path: string
  description: string
  badge?: string | number
}

interface SidebarItem {
  id: string
  title: string
  icon: React.ComponentType<any>
  path: string
  badge?: string | number
  description: string
  children?: SidebarChild[]
  roles?: string[]
}

interface SidebarCategory {
  name: string
  items: SidebarItem[]
}

interface SidebarProps {
  collapsed: boolean
  onCollapse: (collapsed: boolean) => void
}

interface SidebarItemProps {
  item: SidebarItem
  collapsed: boolean
  isOpen: boolean
  isActive: boolean
  onToggle: () => void
  pathname: string
}

// Define sidebar data structure
const sidebarCategories: SidebarCategory[] = [
  {
    name: "Core",
    items: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        icon: Home,
        path: '/dashboard',
        badge: 'New',
        description: 'View your portfolio overview'
      },
      {
        id: 'portfolio',
        title: 'Portfolio',
        icon: Briefcase,
        path: '/dashboard/portfolio',
        description: 'Manage your investments'
      },
      {
        id: 'wallet',
        title: 'Wallet',
        icon: CoinsIcon,
        path: '/dashboard/wallet',
        description: 'Manage your crypto wallet',
        children: [
          { title: 'Assets', path: '/dashboard/wallet/assets', description: 'View wallet assets' },
          { title: 'Transactions', path: '/dashboard/wallet/transactions', description: 'View transaction history' },
          { title: 'Settings', path: '/dashboard/wallet/settings', description: 'Wallet settings and security' }
        ]
      }
    ]
  },
  {
    name: "Assets & Finance",
    items: [
      {
        id: 'assets',
        title: 'Assets',
        icon: CoinsIcon,
        path: '/dashboard/assets',
        badge: 2,
        description: 'Your digital assets',
        children: [
          { title: 'My Assets', path: '/dashboard/assets', description: 'View all assets' },
          { title: 'Tokenization', path: '/dashboard/assets/tokenize', badge: 'Pending', description: 'Convert assets to tokens' }
        ]
      },
      {
        id: 'finance',
        title: 'Finance',
        icon: Coins,
        path: '/dashboard/finance',
        description: 'Manage your lending & borrowing',
        children: [
          { title: 'Borrow', path: '/dashboard/finance/borrow', description: 'Get loans against your assets' },
          { title: 'Lend', path: '/dashboard/finance/lend', description: 'Lend your assets for rewards' }
        ]
      },
      {
        id: 'market',
        title: 'Market',
        icon: ArrowsUpFromLine,
        path: '/dashboard/market',
        badge: '$2.4M',
        description: 'Explore market opportunities',
        children: [
          { title: 'AMM Pools', path: '/dashboard/market/pools', description: 'Automated market maker pools' },
          { title: 'RWA Marketplace', path: '/dashboard/market/rwa', description: 'Real world assets marketplace' },
          { title: 'Loan Position Trading', path: '/dashboard/market/lpt', description: 'Trade loan positions' }
        ]
      }
    ]
  },
  {
    name: "Platform",
    items: [
      {
        id: 'governance',
        title: 'Governance',
        icon: Vote,
        path: '/dashboard/governance',
        badge: 3,
        description: 'Vote on platform proposals',
        roles: ['token_holder']
      },
      {
        id: 'compliance',
        title: 'Compliance',
        icon: Lock,
        path: '/dashboard/compliance',
        badge: 'Verified',
        description: 'Manage regulatory requirements'
      },
      {
        id: 'developer',
        title: 'Developer',
        icon: Code,
        path: '/dashboard/developer',
        description: 'Access APIs and developer tools',
        roles: ['developer']
      }
    ]
  },
  {
    name: "Support",
    items: [
      {
        id: 'support',
        title: 'Support',
        icon: HelpCircle,
        path: '/dashboard/support',
        description: 'Get help and support'
      },
      {
        id: 'admin',
        title: 'Admin',
        icon: Shield,
        path: '/dashboard/admin',
        description: 'Administrative controls',
        roles: ['admin']
      }
    ]
  }
]

export function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [theme, setTheme] = useState("light")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Handle screen resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        onCollapse(true)
      }
    }
    
    window.addEventListener('resize', checkMobile)
    checkMobile()
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [onCollapse])

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // Toggle sidebar item
  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  // Find the active category based on pathname
  useEffect(() => {
    for (const category of sidebarCategories) {
      for (const item of category.items) {
        if (pathname === item.path || item.children?.some(child => child.path === pathname)) {
          setActiveCategory(category.name)
          // Open the item if it has children and is active
          if (item.children?.some(child => child.path === pathname)) {
            setOpenItems(prev => prev.includes(item.id) ? prev : [...prev, item.id])
          }
          break
        }
      }
    }
  }, [pathname])

  // Main sidebar rendering
  const renderSidebar = () => (
    <div className={cn(
      "h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center px-3 border-b border-border">
        {!collapsed ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <span className="text-lg font-semibold">Assetsure</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCollapse(!collapsed)}
              className="h-8 w-8"
            >
              <ChevronDown className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCollapse(!collapsed)}
              className="h-6 w-6 mt-1"
            >
              <ChevronDown className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto py-2 px-1 space-y-6">
        {sidebarCategories.map((category) => (
          <div key={category.name} className={cn(
            "space-y-1",
            !collapsed && "px-2"
          )}>
            {!collapsed && (
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground px-2 mb-2">
                {category.name}
              </h4>
            )}
            {category.items.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                collapsed={collapsed}
                isOpen={openItems.includes(item.id)}
                isActive={pathname === item.path || (item.children !== undefined && item.children.some(child => child.path === pathname))}
                onToggle={() => toggleItem(item.id)}
                pathname={pathname}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Sidebar footer */}
      <div className="border-t border-border p-2 mt-auto">
        {collapsed ? (
          <TooltipProvider>
            <div className="flex flex-col gap-2 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
                    {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{theme === "light" ? "Dark mode" : "Light mode"}</p>
                </TooltipContent>
              </Tooltip>
              
              <UserDropdown collapsed={collapsed} />
            </div>
          </TooltipProvider>
        ) : (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-full justify-start gap-2"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
            </Button>
            
            <UserDropdown collapsed={collapsed} />
          </div>
        )}
      </div>
    </div>
  )

  // Mobile sidebar implementation
  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full h-14 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border flex items-center px-4 z-50">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              {renderSidebar()}
            </SheetContent>
          </Sheet>
          
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="text-lg font-semibold">Assetsure</span>
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="h-14" />
      </>
    )
  }

  // Desktop sidebar
  return (
    <div className={cn(
      "fixed top-0 left-0 h-screen border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      {renderSidebar()}
    </div>
  )
}

// User dropdown component
function UserDropdown({ collapsed }: { collapsed: boolean }): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {collapsed ? (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatar.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Pro Account</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <User className="h-4 w-4 mr-2" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Lock className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Individual sidebar item
function SidebarItem({
  item,
  collapsed,
  isOpen,
  isActive,
  onToggle,
  pathname
}: SidebarItemProps): JSX.Element {
  const hasChildren = item.children !== undefined && item.children.length > 0
  const isChildActive = item.children !== undefined && item.children.some(child => child.path === pathname)
  const showActiveState = isActive || isChildActive

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={item.path} className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md transition-colors mb-1 mx-auto",
              showActiveState ? "bg-primary text-primary-foreground" : "hover:bg-accent hover:text-accent-foreground"
            )}>
              <item.icon className="h-4 w-4" />
              {item.badge && (
                <Badge variant="default" className="absolute h-4 w-4 min-w-0 p-0 flex items-center justify-center top-0 right-0 text-[10px] translate-x-1 -translate-y-1">
                  {typeof item.badge === "number" ? item.badge : "•"}
                </Badge>
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-4">
              <span className="font-medium">{item.title}</span>
              {item.badge && (
                <Badge variant="outline">{item.badge}</Badge>
              )}
            </div>
            {item.description && (
              <p className="text-xs text-muted-foreground">{item.description}</p>
            )}
            {hasChildren && (
              <div className="text-xs text-muted-foreground pt-1">
                <strong>Submenu:</strong> {item.children?.map(c => c.title).join(', ')}
              </div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <div className="space-y-1">
      {hasChildren ? (
        <Button
          variant={showActiveState ? "default" : "ghost"}
          size="sm"
          className={cn(
            "w-full justify-between",
            showActiveState && "bg-primary text-primary-foreground"
          )}
          onClick={onToggle}
        >
          <div className="flex items-center gap-3">
            <item.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{item.title}</span>
          </div>
          <div className="flex items-center">
            {item.badge && (
              <Badge 
                variant={showActiveState ? "outline" : "default"} 
                className={cn(
                  "mr-1", 
                  showActiveState && "bg-primary-foreground text-primary"
                )}
              >
                {item.badge}
              </Badge>
            )}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )} />
          </div>
        </Button>
      ) : (
        <Link href={item.path}>
          <Button
            variant={showActiveState ? "default" : "ghost"}
            size="sm"
            className={cn(
              "w-full justify-between",
              showActiveState && "bg-primary text-primary-foreground"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
            {item.badge && (
              <Badge 
                variant={showActiveState ? "outline" : "default"} 
                className={cn(
                  showActiveState && "bg-primary-foreground text-primary"
                )}
              >
                {item.badge}
              </Badge>
            )}
          </Button>
        </Link>
      )}

      {/* Children submenu */}
      {hasChildren && isOpen && (
        <div className="ml-6 space-y-1 pt-1">
          {item.children?.map((child) => {
            const isChildItemActive = pathname === child.path
            
            return (
              <Link key={child.path} href={child.path}>
                <Button
                  variant={isChildItemActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "w-full justify-between text-sm",
                    isChildItemActive && "bg-secondary text-secondary-foreground font-medium"
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
            )
          })}
        </div>
      )}
    </div>
  )
}