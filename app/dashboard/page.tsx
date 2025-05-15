"use client"

import { useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function DashboardPage() {
  return (
      <div className="flex flex-col gap-8 p-6">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back to your dashboard. Here's an overview of your assets.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Total Value Locked</CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">$4,231,589</div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                +20.1% from last month
              </p>
              <div className="mt-4 h-1 w-full bg-muted overflow-hidden rounded-full">
                <div className="h-full w-[75%] bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">24</div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span>+3 new this week</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Total Yield</CardTitle>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">14.5%</div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span>+2.3% from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">12</div>
              <div className="flex items-center gap-1 text-sm text-amber-500">
                <span>3 pending invitations</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different data views */}
        <Tabs defaultValue="assets" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="assets" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Asset Portfolio</CardTitle>
                <CardDescription>
                  Your tokenized assets and their current performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Asset items */}
                  {[
                    { name: 'Commercial Real Estate', value: '$1,245,000', change: '+5.2%', type: 'Real Estate' },
                    { name: 'Gold Reserve', value: '$845,320', change: '+2.1%', type: 'Commodity' },
                    { name: 'Art Collection', value: '$532,800', change: '-0.8%', type: 'Collectible' },
                    { name: 'Infrastructure Bond', value: '$1,608,469', change: '+3.5%', type: 'Infrastructure' },
                  ].map((asset, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex flex-col">
                        <span className="font-medium">{asset.name}</span>
                        <span className="text-xs text-muted-foreground">{asset.type}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">{asset.value}</span>
                        <span className={`text-xs ${asset.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {asset.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your recent asset transactions and activities.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Transaction items */}
                  {[
                    { type: 'Purchase', asset: 'Commercial Real Estate', amount: '$245,000', date: '2 days ago' },
                    { type: 'Sale', asset: 'Gold Reserve', amount: '$45,320', date: '5 days ago' },
                    { type: 'Yield', asset: 'Infrastructure Bond', amount: '$8,469', date: '1 week ago' },
                    { type: 'Purchase', asset: 'Art Collection', amount: '$132,800', date: '2 weeks ago' },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex flex-col">
                        <span className="font-medium">{tx.type}: {tx.asset}</span>
                        <span className="text-xs text-muted-foreground">{tx.date}</span>
                      </div>
                      <div className="font-medium">
                        {tx.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Detailed analytics on your portfolio performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded-lg">
                  <p className="text-muted-foreground">Interactive charts will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
