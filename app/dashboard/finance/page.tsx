'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Coins, ArrowUpRight, ArrowDownRight, Wallet, LineChart } from 'lucide-react'

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Finance</h1>
        <p className="text-muted-foreground">Manage your lending and borrowing activities</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Total Borrowed</p>
                  <p className="text-2xl font-bold">$50,000.00</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-amber-500">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm font-medium">+2.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Total Lent</p>
                  <p className="text-2xl font-bold">$75,000.00</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm font-medium">+4.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Net Position</p>
                  <p className="text-2xl font-bold">$25,000.00</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                Positive
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Total Rewards</p>
                  <p className="text-2xl font-bold">$1,234.56</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-500">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm font-medium">+8.7%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
          <TabsTrigger value="lend">Lend</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Finance Overview</CardTitle>
              <CardDescription>Your lending and borrowing activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Finance overview will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borrow Assets</CardTitle>
              <CardDescription>Get loans against your digital assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">New Loan</h3>
                        <p className="text-sm text-muted-foreground">Start a new borrowing position</p>
                        <Button className="w-full">Apply for Loan</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold">Loan Management</h3>
                        <p className="text-sm text-muted-foreground">Manage your existing loans</p>
                        <Button variant="outline" className="w-full">View Loans</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lending Opportunities</CardTitle>
              <CardDescription>Earn rewards by lending your assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Lending opportunities will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rewards Center</CardTitle>
              <CardDescription>Track your lending rewards and earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Rewards dashboard will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}