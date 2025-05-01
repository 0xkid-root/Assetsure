'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowsUpFromLine, TrendingUp, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Market</h1>
        <p className="text-muted-foreground">Explore market opportunities and trading</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ArrowsUpFromLine className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Total Volume</p>
                  <p className="text-2xl font-bold">$2.4M</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm font-medium">+15.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Active Pools</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Live
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Market Cap</p>
                  <p className="text-2xl font-bold">$12.8M</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-red-500">
                <ArrowDownRight className="h-4 w-4" />
                <span className="text-sm font-medium">-2.4%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ArrowsUpFromLine className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Positions</p>
                  <p className="text-2xl font-bold">45</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pools">AMM Pools</TabsTrigger>
          <TabsTrigger value="rwa">RWA Marketplace</TabsTrigger>
          <TabsTrigger value="trading">Position Trading</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
              <CardDescription>Current market status and opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Market overview will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AMM Pools</CardTitle>
              <CardDescription>Automated Market Maker liquidity pools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Create Pool</h3>
                        <p className="text-sm text-muted-foreground">Start a new liquidity pool</p>
                        <Button className="w-full">Create New Pool</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Join Pool</h3>
                        <p className="text-sm text-muted-foreground">Provide liquidity to existing pools</p>
                        <Button variant="outline" className="w-full">Browse Pools</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rwa" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>RWA Marketplace</CardTitle>
              <CardDescription>Trade real-world assets on the blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">RWA marketplace will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Position Trading</CardTitle>
              <CardDescription>Trade loan positions and manage risk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Position trading interface will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}