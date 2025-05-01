"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Layers, Shield, Zap, BarChart3, Building, FileCheck, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Enterprise-Grade Security',
    description: 'Multi-signature authorization, threshold encryption, and secure key management with bank-level security protocols.',
    icon: Shield,
    color: 'from-blue-500 to-blue-600',
    textColor: 'text-blue-500',
    bgLight: 'from-blue-50 to-blue-100',
    bgDark: 'from-blue-900/30 to-blue-800/30',
    bulletPoints: [
      'Multi-signature authorization',
      'Threshold encryption',
      'Secure key management',
      'Bank-level security protocols'
    ]
  },
  {
    title: 'Tokenization Engine',
    description: 'Convert real-world assets into compliant digital tokens with legal enforceability and regulatory compliance.',
    icon: Layers,
    color: 'from-amber-500 to-amber-600',
    textColor: 'text-amber-500',
    bgLight: 'from-amber-50 to-amber-100',
    bgDark: 'from-amber-900/30 to-amber-800/30',
    bulletPoints: [
      'Real-world asset conversion',
      'Legal enforceability',
      'Regulatory compliance',
      'Digital token creation'
    ]
  },
  {
    title: 'Institutional Liquidity',
    description: 'Access deep liquidity pools from institutional investors with customizable risk parameters and APY.',
    icon: BarChart3,
    color: 'from-emerald-500 to-emerald-600',
    textColor: 'text-emerald-500',
    bgLight: 'from-emerald-50 to-emerald-100',
    bgDark: 'from-emerald-900/30 to-emerald-800/30',
    bulletPoints: [
      'Deep liquidity pools',
      'Institutional investors',
      'Customizable risk parameters',
      'Adjustable APY settings'
    ]
  },
  {
    title: 'Regulatory Compliance',
    description: 'Built-in KYC/AML, automatic regulatory reporting, and jurisdictional compliance frameworks.',
    icon: FileCheck,
    color: 'from-indigo-500 to-indigo-600',
    textColor: 'text-indigo-500',
    bgLight: 'from-indigo-50 to-indigo-100',
    bgDark: 'from-indigo-900/30 to-indigo-800/30',
    bulletPoints: [
      'Built-in KYC/AML',
      'Automatic regulatory reporting',
      'Jurisdictional compliance',
      'Audit-ready frameworks'
    ]
  },
  {
    title: 'Enterprise Integration',
    description: 'Seamless API integration with existing enterprise systems, custom workflows, and data processing.',
    icon: Building,
    color: 'from-purple-500 to-purple-600',
    textColor: 'text-purple-500',
    bgLight: 'from-purple-50 to-purple-100',
    bgDark: 'from-purple-900/30 to-purple-800/30',
    bulletPoints: [
      'Seamless API integration',
      'Enterprise system compatibility',
      'Custom workflow creation',
      'Advanced data processing'
    ]
  },
  {
    title: 'High-Performance Oracle',
    description: 'Decentralized price feeds for real-world assets with millisecond latency and 99.99% uptime guarantee.',
    icon: Zap,
    color: 'from-rose-500 to-rose-600',
    textColor: 'text-rose-500',
    bgLight: 'from-rose-50 to-rose-100',
    bgDark: 'from-rose-900/30 to-rose-800/30',
    bulletPoints: [
      'Decentralized price feeds',
      'Millisecond latency',
      '99.99% uptime guarantee',
      'Real-world asset pricing'
    ]
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const floatingIconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 }
    },
    floating: {
      y: [0, -10, 0],
      transition: {
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };
  
  return (
    <section id="features" ref={ref} className="py-24 bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 dark:from-navy-950 dark:via-blue-800/10 dark:to-purple-800/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      
      {/* Animated dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full hidden lg:block"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: `hsla(${Math.random() * 360}, 70%, 70%, 0.3)`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {/* Floating background shapes - enhanced with more vibrant gradients for dark mode */}
      <div className="absolute hidden lg:block h-64 w-64 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 dark:from-blue-500/40 dark:to-cyan-500/40 rounded-full blur-3xl top-20 -left-32 dark:animate-pulse-slow"></div>
      <div className="absolute hidden lg:block h-72 w-72 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-500/40 dark:to-pink-500/40 rounded-full blur-3xl bottom-20 -right-32 dark:animate-pulse-slow-delay"></div>
      <div className="absolute hidden lg:block h-48 w-48 bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-500/40 dark:to-orange-500/40 rounded-full blur-3xl top-40 right-[20%] dark:animate-pulse-slow-delay-2"></div>
      <div className="absolute hidden lg:block h-56 w-56 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/40 dark:to-teal-500/40 rounded-full blur-3xl bottom-40 left-[20%] dark:animate-pulse-slow"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <span className="relative inline-flex">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-500 dark:to-purple-500 text-navy-800 dark:text-white rounded-full text-sm font-medium dark:shadow-[0_0_15px_rgba(147,197,253,0.5)]">
                Enterprise Features
              </span>
              <motion.span 
                className="absolute inset-0 rounded-full bg-navy-200 dark:bg-navy-700"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.span>
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-navy-800 to-purple-700 dark:from-blue-300 dark:via-indigo-200 dark:to-purple-300 dark:drop-shadow-[0_0_15px_rgba(147,197,253,0.5)]">
            Institutional-Grade DeFi Infrastructure
          </h2>
          
          <p className="text-navy-600 dark:text-gray-200 text-lg md:text-xl max-w-2xl mx-auto dark:drop-shadow-[0_0_2px_rgba(255,255,255,0.2)]">
            Our protocol provides the robust infrastructure needed for secure, compliant, and scalable RWA tokenization and lending.
          </p>
        </motion.div>
        
        {/* Features grid with enhanced interaction */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => {
                setActiveFeature(index);
                setIsHovering(true);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
              }}
              className="h-full group"
            >
              <Card className={cn(
                "h-full relative overflow-hidden border-0 p-1 transition-all duration-300",
                "bg-white dark:bg-navy-900/80 shadow-lg hover:shadow-xl",
                "transform hover:-translate-y-2",
                "dark:backdrop-blur-md dark:border dark:border-navy-700/50",
                {
                  "ring-2 ring-offset-2 dark:ring-offset-navy-950": activeFeature === index && isHovering,
                  [`ring-${feature.textColor.split('-')[1]}-400 dark:ring-${feature.textColor.split('-')[1]}-500`]: activeFeature === index && isHovering,
                }
              )}>
                {/* Card background gradient - enhanced with more vibrant gradients */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  `bg-gradient-to-br ${feature.bgLight} dark:from-${feature.textColor.split('-')[1]}-700/40 dark:to-${feature.textColor.split('-')[1]}-900/30`
                )}></div>
                
                {/* Subtle ambient gradient that's always visible - enhanced for dark mode */}
                <div className={cn(
                  "absolute inset-0 opacity-20 dark:opacity-40",
                  `bg-gradient-to-tr from-${feature.textColor.split('-')[1]}-100/40 to-transparent dark:from-${feature.textColor.split('-')[1]}-400/40 dark:to-transparent`
                )}></div>
                
                {/* Dark mode glow effect */}
                <div className={cn(
                  "absolute inset-0 opacity-0 dark:opacity-40 dark:group-hover:opacity-70 transition-opacity duration-500",
                  `dark:shadow-[0_0_25px_rgba(var(--${feature.textColor.split('-')[1]}-rgb),0.6)_inset]`
                )}></div>
                
                {/* Card border glow */}
                <div className={cn(
                  "absolute inset-0 opacity-0 dark:opacity-0 dark:group-hover:opacity-100 transition-all duration-500",
                  "dark:border dark:border-transparent dark:group-hover:border-opacity-100",
                  `dark:group-hover:border-${feature.textColor.split('-')[1]}-500/50`
                )}></div>
                
                {/* Card content */}
                <div className="relative p-6 h-full flex flex-col">
                  {/* Icon with enhanced gradient background - improved for dark mode */}
                  <div className="mb-5">
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center",
                      "bg-gradient-to-br",
                      `${feature.color}`,
                      "shadow-lg transform group-hover:scale-110 transition-transform duration-300",
                      "relative overflow-hidden",
                      "dark:shadow-[0_0_20px_rgba(var(--${feature.textColor.split('-')[1]}-rgb),0.7)]" 
                    )}>
                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-white/50 to-transparent animate-shimmer"></div>
                      </div>
                      {/* Icon glow ring */}
                      <div className={cn(
                        "absolute inset-0 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500",
                        "dark:border-2 dark:rounded-2xl",
                        `dark:border-${feature.textColor.split('-')[1]}-500/70`
                      )}></div>
                      <feature.icon className="h-7 w-7 text-white relative z-10 dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]" />
                    </div>
                  </div>
                  
                  {/* Feature title - enhanced for dark mode with better color */}
                  <h3 className={cn(
                    "text-2xl font-bold mb-3 text-navy-900 dark:text-white",
                    "group-hover:text-navy-900",
                    `dark:group-hover:text-${feature.textColor.split('-')[1]}-200`,
                    "dark:group-hover:drop-shadow-[0_0_8px_rgba(var(--${feature.textColor.split('-')[1]}-rgb),0.7)]",
                    "transition-colors duration-300",
                  )}>
                    {feature.title}
                  </h3>
                  
                  {/* Feature description - improved contrast and readability for dark mode */}
                  <p className="text-navy-600 dark:text-gray-100 mb-4 flex-grow dark:leading-relaxed dark:drop-shadow-[0_0_1px_rgba(255,255,255,0.3)]">
                    {feature.description}
                  </p>
                  
                  {/* Expandable bullet points */}
                  <AnimatePresence>
                    {activeFeature === index && isHovering && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 mb-4"
                      >
                        {feature.bulletPoints.map((point, i) => (
                          <motion.li 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start"
                          >
                            <div className={cn(
                              "min-w-5 h-5 mr-2 rounded-full flex items-center justify-center",
                              `bg-${feature.textColor.split('-')[1]}-100 dark:bg-${feature.textColor.split('-')[1]}-900/30`,
                              feature.textColor
                            )}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                            <span className="text-sm text-navy-700 dark:text-white dark:font-medium">
                              {point}
                            </span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  
                  {/* Learn more button */}
                  <div className="mt-auto">
                    <Button 
                      variant="ghost" 
                      className={cn(
                        "p-0 h-8 text-sm font-medium flex items-center",
                        feature.textColor,
                        "hover:bg-transparent hover:opacity-80 transition-opacity",
                        "dark:text-white dark:hover:text-white/90",
                        `dark:group-hover:text-${feature.textColor.split('-')[1]}-200`,
                      )}>
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Floating icon in the center */}
        <motion.div
          className="relative mt-20 mb-16 flex justify-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={floatingIconVariants}
          whileInView="floating"
        >
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg overflow-hidden dark:shadow-[0_0_25px_rgba(147,197,253,0.5)]">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            
            {/* Animated rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-purple-400"
              animate={{ scale: [1, 1.7, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
            ></motion.div>
          </div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center"
        >
          <Button className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 hover:from-blue-600 hover:via-indigo-500 hover:to-purple-600 text-white dark:from-blue-500 dark:via-indigo-400 dark:to-purple-500 dark:hover:from-blue-400 dark:hover:via-indigo-300 dark:hover:to-purple-400 px-8 py-6 h-auto text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group dark:shadow-[0_0_20px_rgba(147,197,253,0.4)]">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/40 to-transparent animate-shimmer"></div>
            </div>
            <span className="relative z-10 font-semibold tracking-wide">
            Explore All Features
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}