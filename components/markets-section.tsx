"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, DollarSign, Users, Activity, Search, Info, Check } from 'lucide-react';

// Define types for chart data
interface ChartDataPoint {
  date: string;
  value: number;
  volume: number;
}

// Define types for market data
interface BaseMarketItem {
  name: string;
  trend: 'up' | 'down';
  growth: number;
  color: string;
  icon: string;
  type: 'pools' | 'assets';
}

interface PoolItem extends BaseMarketItem {
  tvl: number;
  tvlFormatted: string;
  apy: number;
  apyFormatted: string;
  utilization: number;
  utilizationFormatted: string;
}

interface AssetItem extends BaseMarketItem {
  price: number;
  priceFormatted: string;
  yield: number;
  yieldFormatted: string;
  fractionalized: number;
  fractionalizedFormatted: string;
}

type MarketDataItem = PoolItem | AssetItem;

// Sample data for charts with improved visual presentation
const areaChartData: ChartDataPoint[] = [
  { date: "Jan", value: 900, volume: 300 },
  { date: "Feb", value: 1200, volume: 450 },
  { date: "Mar", value: 1100, volume: 420 },
  { date: "Apr", value: 1300, volume: 520 },
  { date: "May", value: 1500, volume: 580 },
  { date: "Jun", value: 1700, volume: 620 },
  { date: "Jul", value: 1400, volume: 550 },
  { date: "Aug", value: 1600, volume: 640 },
  { date: "Sep", value: 2000, volume: 780 },
  { date: "Oct", value: 1800, volume: 700 },
  { date: "Nov", value: 2200, volume: 850 },
  { date: "Dec", value: 2400, volume: 920 },
];

// Enhanced market data with more visual attributes
const marketData: MarketDataItem[] = [
  { 
    name: "Real Estate Pool", 
    tvl: 680, 
    tvlFormatted: "$680M", 
    apy: 5.8, 
    apyFormatted: "5.8%", 
    utilization: 76, 
    utilizationFormatted: "76%", 
    trend: "up", 
    growth: 12.4,
    color: "#3B82F6", 
    type: "pools",
    icon: "🏢"
  },
  { 
    name: "Commodities AMM", 
    tvl: 420, 
    tvlFormatted: "$420M", 
    apy: 6.2, 
    apyFormatted: "6.2%", 
    utilization: 82, 
    utilizationFormatted: "82%", 
    trend: "up", 
    growth: 8.7,
    color: "#10B981", 
    type: "pools",
    icon: "🪙"
  },
  { 
    name: "Infrastructure Bonds", 
    tvl: 290, 
    tvlFormatted: "$290M", 
    apy: 4.7, 
    apyFormatted: "4.7%", 
    utilization: 68, 
    utilizationFormatted: "68%", 
    trend: "down", 
    growth: -2.3,
    color: "#6366F1", 
    type: "pools",
    icon: "🌉"
  },
  { 
    name: "Corporate Receivables", 
    tvl: 175, 
    tvlFormatted: "$175M", 
    apy: 7.3, 
    apyFormatted: "7.3%", 
    utilization: 91, 
    utilizationFormatted: "91%", 
    trend: "up", 
    growth: 15.2,
    color: "#F59E0B", 
    type: "pools",
    icon: "📊"
  },
  { 
    name: "Manhattan Office #242", 
    price: 8.2, 
    priceFormatted: "$8.2M", 
    yield: 4.2, 
    yieldFormatted: "4.2%", 
    fractionalized: 38, 
    fractionalizedFormatted: "38%", 
    trend: "up", 
    growth: 3.8,
    color: "#EC4899", 
    type: "assets",
    icon: "🏙️"
  },
  { 
    name: "Gold Reserve Certificate", 
    price: 12.4, 
    priceFormatted: "$12.4M", 
    yield: 3.1, 
    yieldFormatted: "3.1%", 
    fractionalized: 65, 
    fractionalizedFormatted: "65%", 
    trend: "up", 
    growth: 1.5,
    color: "#F59E0B", 
    type: "assets",
    icon: "🥇"
  },
  { 
    name: "Solar Farm Portfolio", 
    price: 28.6, 
    priceFormatted: "$28.6M", 
    yield: 5.7, 
    yieldFormatted: "5.7%", 
    fractionalized: 42, 
    fractionalizedFormatted: "42%", 
    trend: "down", 
    growth: -1.2,
    color: "#10B981", 
    type: "assets",
    icon: "☀️"
  },
  { 
    name: "Tokenized Invoice Bundle", 
    price: 4.8, 
    priceFormatted: "$4.8M", 
    yield: 8.3, 
    yieldFormatted: "8.3%", 
    fractionalized: 92, 
    fractionalizedFormatted: "92%", 
    trend: "up", 
    growth: 7.6,
    color: "#8B5CF6", 
    type: "assets",
    icon: "📝"
  },
];

// Custom tooltip component for charts
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-navy-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-navy-700">
        <p className="font-medium text-navy-900 dark:text-white">{label}</p>
        {payload && payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {entry.value.toLocaleString('en-US', { 
              style: 'currency', 
              currency: 'USD',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0,
            })}M
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Stat card component for better reusability
interface StatCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down';
  percentage: string | number;
  icon: React.ElementType;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, percentage, icon }) => {
  const Icon = icon;
  
  return (
    <Card className="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 right-0 w-20 h-20 -mt-6 -mr-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-navy-600 dark:text-navy-300">{title}</CardTitle>
        <div className="p-2 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-navy-800 dark:to-navy-700">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-navy-900 dark:text-white">{value}</div>
        <p className={`text-sm flex items-center mt-1 ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {trend === 'up' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
              <path fillRule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clipRule="evenodd" />
            </svg>
          )}
          {trend === 'up' ? '+' : ''}{percentage}% from last month
        </p>
      </CardContent>
    </Card>
  );
};

// New visual element: Pool card for a more visual representation
interface PoolCardProps {
  pool: PoolItem;
}

const PoolCard: React.FC<PoolCardProps> = ({ pool }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-700 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="h-3" style={{ backgroundColor: pool.color }}></div>
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="text-2xl mr-3">{pool.icon}</div>
          <h3 className="font-semibold text-navy-900 dark:text-white">{pool.name}</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-navy-600 dark:text-navy-300">TVL</p>
            <p className="font-bold text-navy-900 dark:text-white">{pool.tvlFormatted}</p>
          </div>
          <div>
            <p className="text-xs text-navy-600 dark:text-navy-300">APY</p>
            <p className="font-bold text-green-600 dark:text-green-400">{pool.apyFormatted}</p>
          </div>
          <div>
            <p className="text-xs text-navy-600 dark:text-navy-300">Growth</p>
            <p className={`font-bold ${pool.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {pool.trend === 'up' ? '+' : ''}{pool.growth}%
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-navy-600 dark:text-navy-300">Utilization</span>
            <span className="text-xs font-medium text-navy-900 dark:text-white">{pool.utilizationFormatted}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${pool.utilization}%`,
                backgroundColor: pool.color
              }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// New visual element: Asset card for a more visual representation
interface AssetCardProps {
  asset: AssetItem;
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-navy-900 rounded-xl border border-gray-200 dark:border-navy-700 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="h-3" style={{ backgroundColor: asset.color }}></div>
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="text-2xl mr-3">{asset.icon}</div>
          <h3 className="font-semibold text-navy-900 dark:text-white">{asset.name}</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <p className="text-xs text-navy-600 dark:text-navy-300">Price</p>
            <p className="font-bold text-navy-900 dark:text-white">{asset.priceFormatted}</p>
          </div>
          <div>
            <p className="text-xs text-navy-600 dark:text-navy-300">Yield</p>
            <p className="font-bold text-green-600 dark:text-green-400">{asset.yieldFormatted}</p>
          </div>
          <div>
            <p className="text-xs text-navy-600 dark:text-navy-300">Growth</p>
            <p className={`font-bold ${asset.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {asset.trend === 'up' ? '+' : ''}{asset.growth}%
            </p>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs text-navy-600 dark:text-navy-300">Fractionalized</span>
            <span className="text-xs font-medium text-navy-900 dark:text-white">{asset.fractionalizedFormatted}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2.5 overflow-hidden">
            <div 
              className="h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${asset.fractionalized}%`,
                backgroundColor: asset.color
              }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function MarketsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('pools');
  
  // Type guard functions to check item types
  const isPoolItem = (item: MarketDataItem): item is PoolItem => {
    return item.type === 'pools';
  };

  const isAssetItem = (item: MarketDataItem): item is AssetItem => {
    return item.type === 'assets';
  };
  
  // Filter items based on search term with proper type guards
  const filteredPools = marketData
    .filter(item => isPoolItem(item) && item.name.toLowerCase().includes(searchTerm.toLowerCase())) as PoolItem[];
  
  const filteredAssets = marketData
    .filter(item => isAssetItem(item) && item.name.toLowerCase().includes(searchTerm.toLowerCase())) as AssetItem[];

  // Custom container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <section id="markets" ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-navy-950 dark:to-navy-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-50/30 dark:from-blue-900/10 to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-navy-800 dark:to-purple-900/50 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium mb-4 shadow-sm">Secondary Markets</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-navy-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-navy-900 to-navy-700 dark:from-white dark:to-blue-200"
          >
            Liquid Secondary Markets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy-600 dark:text-navy-300 text-lg leading-relaxed"
          >
            Access deep liquidity pools and trade tokenized assets on our enterprise-grade exchange.
          </motion.p>
        </div>
        
        {/* Stats at the top for immediate insights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={itemVariants}>
            <StatCard 
              title="Total Value Locked" 
              value="$1.45B" 
              trend="up" 
              percentage="8.5" 
              icon={DollarSign} 
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard 
              title="Total Trading Volume" 
              value="$890M" 
              trend="up" 
              percentage="12.3" 
              icon={TrendingUp} 
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard 
              title="Active Users" 
              value="5,280" 
              trend="up" 
              percentage="5.7" 
              icon={Users} 
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard 
              title="Avg. Transaction" 
              value="$425K" 
              trend="up" 
              percentage="18.2" 
              icon={Activity} 
            />
          </motion.div>
        </motion.div>
        
        {/* Main market overview card with enhanced visuals */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-12"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 shadow-xl rounded-2xl overflow-hidden relative">
              {/* Decorative gradients */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-2xl"></div>
              
              <CardHeader className="pb-4 border-b border-gray-100 dark:border-navy-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-navy-900 dark:text-white">Market Overview</CardTitle>
                    <p className="text-navy-600 dark:text-navy-300">
                      Current market statistics and performance metrics
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-navy-700 dark:text-navy-300">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span className="text-sm">TVL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm">Volume</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `$${value}M`}
                      />
                      <Tooltip content={<CustomTooltip active={false} payload={[]} label="" />} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        strokeWidth={2}
                        name="TVL"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#8B5CF6" 
                        fillOpacity={1} 
                        fill="url(#colorVolume)" 
                        strokeWidth={2}
                        name="Volume"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8">
                  <Tabs defaultValue="pools" onValueChange={setActiveTab}>
                    <div className="flex justify-between items-center mb-6">
                      <TabsList className="p-1 bg-gray-100 dark:bg-navy-800 rounded-lg">
                        <TabsTrigger 
                          value="pools" 
                          className="px-6 data-[state=active]:bg-white data-[state=active]:text-navy-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-navy-700 dark:data-[state=active]:text-white"
                        >
                          Liquidity Pools
                        </TabsTrigger>
                        <TabsTrigger 
                          value="assets" 
                          className="px-6 data-[state=active]:bg-white data-[state=active]:text-navy-900 data-[state=active]:shadow-sm dark:data-[state=active]:bg-navy-700 dark:data-[state=active]:text-white"
                        >
                          Tokenized Assets
                        </TabsTrigger>
                      </TabsList>
                      
                      {/* Search input for filtering */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="pl-10 pr-4 py-2 bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                          placeholder={`Search ${activeTab === 'pools' ? 'pools' : 'assets'}...`}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <TabsContent value="pools">
                      {/* Card view for pools */}
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                      >
                        {filteredPools.length > 0 ? (
                          filteredPools.map((pool, index) => (
                            <motion.div key={index} variants={itemVariants}>
                              <PoolCard pool={pool} />
                            </motion.div>
                          ))
                        ) : (
                          <div className="col-span-4 flex flex-col items-center justify-center py-16 text-center text-navy-500 dark:text-navy-400">
                            <Info className="h-12 w-12 mb-4 opacity-50" />
                            <p className="text-lg font-medium">No pools found matching "{searchTerm}"</p>
                            <p className="mt-2">Try a different search term or clear your search</p>
                          </div>
                        )}
                      </motion.div>
                    </TabsContent>
                    
                    <TabsContent value="assets">
                      {/* Card view for assets */}
                      <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                      >
                        {filteredAssets.length > 0 ? (
                          filteredAssets.map((asset, index) => (
                            <motion.div key={index} variants={itemVariants}>
                              <AssetCard asset={asset} />
                            </motion.div>
                          ))
                        ) : (
                          <div className="col-span-4 flex flex-col items-center justify-center py-16 text-center text-navy-500 dark:text-navy-400">
                            <Info className="h-12 w-12 mb-4 opacity-50" />
                            <p className="text-lg font-medium">No assets found matching "{searchTerm}"</p>
                            <p className="mt-2">Try a different search term or clear your search</p>
                          </div>
                        )}
                      </motion.div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Performance comparison */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="mb-6"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-white dark:bg-navy-900 border border-gray-200 dark:border-navy-700 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-navy-900 dark:text-white">Performance Comparison</CardTitle>
                <CardDescription className="text-sm text-navy-500 dark:text-navy-400">
                  Compare the performance of different pools and assets.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-navy-900 dark:text-white">High liquidity</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-navy-900 dark:text-white">Low volatility</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-navy-900 dark:text-white">High liquidity</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-navy-900 dark:text-white">Low volatility</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-navy-900 dark:text-white">High liquidity</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-navy-900 dark:text-white">Low volatility</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
