"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ChevronRight } from 'lucide-react';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}): [React.Dispatch<React.SetStateAction<HTMLElement | null>>, boolean] => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting];
};

// Data structure for process steps
const steps = [
  {
    id: "tokenize",
    number: "01",
    title: "Tokenize Real-World Assets",
    description: "Convert physical assets into compliant digital tokens with our enterprise tokenization engine.",
    features: [
      'Legal documentation automation',
      'Regulatory compliance verification',
      'Multi-asset class support',
      'Custom token economics',
    ],
    cta: "Start Tokenizing",
    color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    hoverColor: "hover:from-blue-600 hover:to-indigo-700",
    lightColor: "bg-blue-50",
    iconColor: "text-blue-500",
    borderColor: "border-blue-200",
    symbolIcon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    id: "finance",
    number: "02",
    title: "Lend & Borrow",
    description: "Access institutional liquidity pools for lending or use your RWA tokens as collateral for loans.",
    features: [
      'Flexible loan terms',
      'Automated interest payments',
      'Risk-adjusted collateralization',
      'Counterparty verification',
    ],
    cta: "Get Financing",
    color: "bg-gradient-to-r from-amber-500 to-orange-600",
    hoverColor: "hover:from-amber-600 hover:to-orange-700",
    lightColor: "bg-amber-50",
    iconColor: "text-amber-500",
    borderColor: "border-amber-200",
    symbolIcon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "trade",
    number: "03",
    title: "Trade & Manage",
    description: "Access secondary markets for RWA tokens with deep liquidity and advanced portfolio management.",
    features: [
      'Order book & AMM trading',
      'Performance analytics',
      'Risk management dashboards',
      'Portfolio optimization',
    ],
    cta: "Start Trading",
    color: "bg-gradient-to-r from-emerald-500 to-teal-600",
    hoverColor: "hover:from-emerald-600 hover:to-teal-700",
    lightColor: "bg-emerald-50",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-200",
    symbolIcon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
];

export default function ProcessSection() {
  const [sectionRef, isInView] = useIntersectionObserver({ threshold: 0.1, rootMargin: "-100px 0px" });
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Auto-play through steps
  useEffect(() => {
    if (!isInView || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Ensure steps progress in correct order: 0 -> 1 -> 2
          setActiveStep((prevStep) => {
            // Go to the next step or back to the first step if at the end
            return (prevStep + 1) % steps.length;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isInView, isAutoPlaying, activeStep]);

  // Reset progress when step changes
  useEffect(() => {
    setProgress(0);
  }, [activeStep]);

  // Pause auto-play when user interacts
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
    setProgress(0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section ref={(el) => sectionRef(el)} className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-3xl"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        
        <motion.div 
          className="absolute bottom-40 right-0 w-96 h-96 rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 blur-3xl"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, delay: 5 }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-amber-300/10 dark:bg-amber-500/10 blur-3xl"
          animate={{ 
            x: [0, 40, 0], 
            y: [0, 40, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <motion.span 
              className="relative px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 rounded-full font-medium"
              animate={{ 
                scale: [1, 1.03, 1],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Streamlined Process
              <motion.span 
                className="absolute inset-0 rounded-full bg-indigo-200 dark:bg-indigo-700"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.span>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-900 to-blue-700 dark:from-indigo-200 dark:to-blue-300">
            How Assetsure Works
          </h2>
          
          <p className="text-gray-700 dark:text-gray-300 text-xl">
            Our enterprise platform provides end-to-end solutions for the entire RWA lifecycle, from tokenization to trading.
          </p>
        </motion.div>
        
        {/* 3D Process Viewer */}
        <div className="relative max-w-6xl mx-auto">
          {/* Process Navigation Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-12 relative z-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`relative group flex flex-col rounded-xl transition-all duration-300 p-5 ${
                    activeStep === index 
                      ? `${step.lightColor} border-2 ${step.borderColor} shadow-lg` 
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Step Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      activeStep === index 
                        ? step.color
                        : 'bg-gray-200 dark:bg-gray-600'
                    } text-white`}>
                      <span className="text-lg font-bold">{step.number}</span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-1 ${
                        activeStep === index 
                          ? step.iconColor 
                          : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress indicator for active step */}
                  {activeStep === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600 rounded-b-xl overflow-hidden">
                      <motion.div 
                        className={`h-full ${step.color}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
          
          {/* Main Content Display */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                {/* Information Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 order-2 lg:order-1">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.div 
                      variants={itemVariants} 
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${steps[activeStep].color} text-white mb-4`}
                    >
                      <div className="w-8 h-8">
                        {steps[activeStep].symbolIcon}
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`text-sm font-bold py-1 px-3 rounded-full ${steps[activeStep].color} text-white`}>
                          STEP {steps[activeStep].number}
                        </span>
                        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></span>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                        {steps[activeStep].title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                        {steps[activeStep].description}
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="space-y-5">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
                        Key Features
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {steps[activeStep].features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + (idx * 0.1) }}
                            className="flex items-start space-x-3"
                          >
                            <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${steps[activeStep].lightColor}`}>
                              <Check className={`w-5 h-5 ${steps[activeStep].iconColor}`} />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="pt-4">
                      <button className={`group ${steps[activeStep].color} ${steps[activeStep].hoverColor} text-white rounded-xl py-3 px-6 font-medium flex items-center space-x-2 transform transition-all hover:-translate-y-1 shadow-lg`}>
                        <span>{steps[activeStep].cta}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Visual Display */}
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-2xl overflow-hidden relative order-1 lg:order-2">
                  <AnimatePresence mode="sync" initial={false}>
                    {activeStep === 0 && (
                      <TokenizationVisual key="tokenize" />
                    )}
                    
                    {activeStep === 1 && (
                      <LendingVisual key="lending" />
                    )}
                    
                    {activeStep === 2 && (
                      <TradingVisual key="trading" />
                    )}
                  </AnimatePresence>
                  
                  {/* Step indicator badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className={`${steps[activeStep].color} text-white text-lg px-3 py-1 rounded-lg font-bold`}>
                      {steps[activeStep].number}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          
          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {steps.map((step, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => handleStepClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? steps[activeStep].color 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to step ${index + 1}: ${step.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Visual components for each step
function TokenizationVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center p-8"
    >
      {/* Central token */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute z-10 w-40 h-40 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex items-center justify-center"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-28 h-28 text-blue-500"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Background grid */}
      <div className="absolute inset-8 grid grid-cols-4 grid-rows-3 gap-4 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="rounded-lg border border-blue-300 dark:border-blue-700"></div>
        ))}
      </div>
      
      {/* Orbiting tokens */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 160;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`token-${i}`}
            className="absolute w-16 h-16 rounded-xl bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center z-10"
            initial={{ x, y, opacity: 0, scale: 0.6 }}
            animate={{ 
              x, y, opacity: 1, scale: 1,
              rotate: [0, 360],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.1 * i },
              scale: { duration: 0.5, delay: 0.1 * i },
              rotate: { duration: 20 + i * 2, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="text-blue-500 w-10 h-10">
              {i % 3 === 0 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <path d="M21 15l-5-5-5 5-5-5"></path>
                </svg>
              ) : i % 3 === 1 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v12M6 12h12"></path>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              )}
            </div>
          </motion.div>
        );
      })}
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60) * (Math.PI / 180);
          const radius = 160;
          const x = 200 + Math.cos(angle) * radius;
          const y = 150 + Math.sin(angle) * radius;
          
          return (
            <motion.line
              key={`line-${i}`}
              x1="200"
              y1="150"
              x2={x}
              y2={y}
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="3,3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
            />
          );
        })}
      </svg>
      
      {/* Particle effects */}
      {[...Array(20)].map((_, i) => {
        const size = 2 + Math.random() * 4;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-blue-400 dark:bg-blue-500"
            style={{ width: size, height: size }}
            initial={{ 
              x: Math.random() * 400 - 200,
              y: Math.random() * 300 - 150,
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * 400 - 200,
              y: Math.random() * 300 - 150,
              opacity: [0, 0.7, 0],
            }}
            transition={{
              x: { duration: 10 + Math.random() * 10, repeat: Infinity },
              y: { duration: 10 + Math.random() * 10, repeat: Infinity },
              opacity: { duration: 2 + Math.random() * 3, repeat: Infinity, repeatType: "reverse" },
              delay: Math.random() * 5
            }}
          />
        );
      })}
    </motion.div>
  );
}

function LendingVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-orange-100/30 dark:from-amber-900/30 dark:to-orange-900/30"></div>
      
      <div className="relative w-full max-w-md">
        {/* Lender node */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4 w-32 h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center justify-center z-10"
        >
          <div className="w-12 h-12 text-amber-500 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div className="text-gray-900 dark:text-white text-center font-medium">Lender</div>
        </motion.div>
        
        {/* Borrower node */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col items-center justify-center z-10"
        >
          <div className="w-12 h-12 text-amber-500 mb-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5-5 5-5-5" />
            </svg>
          </div>
          <div className="text-gray-900 dark:text-white text-center font-medium">Borrower</div>
        </motion.div>
        
        {/* Center circle - marketplace */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-white dark:bg-gray-800 rounded-full shadow-xl flex flex-col items-center justify-center z-10 border-4 border-amber-100 dark:border-amber-900/50"
        >
          <div className="w-16 h-16 text-amber-500 mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div className="text-gray-900 dark:text-white text-center font-medium">Marketplace</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TradingVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 dark:from-emerald-900/30 dark:to-teal-900/30"></div>
      
      {/* Central dashboard */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative w-64 h-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col items-center justify-center z-20 overflow-hidden border border-emerald-200 dark:border-emerald-800"
      >
        {/* Dashboard header */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-emerald-500 dark:bg-emerald-600 flex items-center px-3">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="text-white text-xs font-medium mx-auto">Portfolio Dashboard</div>
        </div>
        
        {/* Dashboard content */}
        <div className="w-full h-full pt-8 px-3 flex flex-col">
          {/* Chart */}
          <motion.div 
            className="w-full h-16 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <svg viewBox="0 0 100 30" className="w-full h-full">
              <motion.path
                d="M0,25 L10,20 L20,22 L30,15 L40,18 L50,10 L60,12 L70,8 L80,5 L90,7 L100,3"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
              />
              <motion.path
                d="M0,25 L10,20 L20,22 L30,15 L40,18 L50,10 L60,12 L70,8 L80,5 L90,7 L100,3"
                fill="url(#chartGradient)"
                fillOpacity="0.2"
                stroke="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
              >
                <animate attributeName="d" dur="10s" repeatCount="indefinite"
                  values="M0,25 L10,20 L20,22 L30,15 L40,18 L50,10 L60,12 L70,8 L80,5 L90,7 L100,3;
                          M0,23 L10,18 L20,24 L30,17 L40,16 L50,12 L60,14 L70,6 L80,7 L90,5 L100,5;
                          M0,25 L10,20 L20,22 L30,15 L40,18 L50,10 L60,12 L70,8 L80,5 L90,7 L100,3" />
              </motion.path>
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Stats */}
          <div className="flex justify-between mt-3">
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">Assets</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">12</div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">Value</div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">$2.4M</div>
            </motion.div>
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">Return</div>
              <div className="text-sm font-medium text-emerald-500">+12.4%</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Orbiting assets */}
      {[...Array(5)].map((_, i) => {
        const angle = (i * 72) * (Math.PI / 180);
        const radius = 150;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`asset-${i}`}
            className="absolute w-16 h-16 rounded-lg bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center z-10 border border-emerald-100 dark:border-emerald-800"
            initial={{ x, y, opacity: 0, scale: 0.6 }}
            animate={{ 
              x, y, opacity: 1, scale: 1,
              rotate: [0, 360],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.1 * i },
              scale: { duration: 0.5, delay: 0.1 * i },
              rotate: { duration: 25 + i * 3, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="text-emerald-500 w-10 h-10">
              {i % 5 === 0 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ) : i % 5 === 1 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2z" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              ) : i % 5 === 2 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M21 12H3M12 3v18" />
                </svg>
              ) : i % 5 === 3 ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              )}
            </div>
          </motion.div>
        );
      })}
      
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
        {[...Array(5)].map((_, i) => {
          const angle = (i * 72) * (Math.PI / 180);
          const radius = 150;
          const x = 200 + Math.cos(angle) * radius;
          const y = 150 + Math.sin(angle) * radius;
          
          return (
            <motion.line
              key={`line-${i}`}
              x1="200"
              y1="150"
              x2={x}
              y2={y}
              stroke="#10b981"
              strokeWidth="2"
              strokeDasharray="3,3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
            />
          );
        })}
      </svg>
      
      {/* Data particles */}
      {[...Array(15)].map((_, i) => {
        const size = 2 + Math.random() * 3;
        const angle = Math.random() * 360 * (Math.PI / 180);
        const radius = 50 + Math.random() * 100;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-emerald-400 dark:bg-emerald-500"
            style={{ width: size, height: size }}
            initial={{ 
              x: 0,
              y: 0,
              opacity: 0
            }}
            animate={{ 
              x: x,
              y: y,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              x: { duration: 2 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" },
              y: { duration: 2 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" },
              opacity: { duration: 1 + Math.random() * 1, repeat: Infinity, repeatType: "reverse" },
              delay: Math.random() * 2
            }}
          />
        );
      })}
    </motion.div>
  );
}