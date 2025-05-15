"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, ChevronRight, Shield, TrendingUp, Award } from "lucide-react";
import { useRouter } from "next/navigation";

// Animation variants for shimmer effect
const shimmerVariants = {
  shimmer: {
    x: ["-100%", "100%"],
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
  },
};

export default function HeroSection() {
  const router = useRouter();
  const ref = useRef(null);
  const statsRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const [currentAsset, setCurrentAsset] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const assets = [
    { name: "Real Estate", percentage: 75, color: "from-amber-400 to-amber-600" },
    { name: "Commodities", percentage: 66, color: "from-blue-400 to-blue-600" },
    { name: "Art & Collectibles", percentage: 50, color: "from-purple-400 to-purple-600" },
    { name: "Infrastructure", percentage: 83, color: "from-emerald-400 to-emerald-600" },
  ];

  useEffect(() => {
    setLoaded(true);

    // Auto-rotate asset spotlight
    const interval = setInterval(() => {
      setCurrentAsset((prev) => (prev + 1) % assets.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Split the headline text for animated reveal
  const headline = "Unlock Liquidity from Real-World Assets";
  const words = headline.split(" ");

  // Handle pitch deck button click with error handling
  const handlePitchDeckClick = () => {
    const fileUrl = "/Assetsure.pptx"; // File must be in public folder
    try {
      if (typeof window !== "undefined") {
        const opened = window.open(fileUrl, "_blank");
        if (!opened) {
          alert("Failed to open the pitch deck. Please check if the file is available or allow pop-ups.");
        }
      }
    } catch (error) {
      console.error("Error opening pitch deck:", error);
      alert("An error occurred while trying to open the pitch deck.");
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center py-24 overflow-hidden">
      {/* Enhanced 3D background with depth */}
      <div className="absolute inset-0 z-0">
        {/* Base layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 dark:opacity-100 opacity-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:opacity-0 opacity-100"></div>

        {/* Dynamic grid pattern */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/5 dark:bg-white/5 bg-navy-900/5"
              style={{
                height: "1px",
                width: "100%",
                top: `${i * 5}%`,
                left: 0,
              }}
              animate={{
                opacity: [0.05, 0.1, 0.05],
                x: [0, i % 2 === 0 ? 20 : -20, 0],
              }}
              transition={{ duration: 10 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i + 100}
              className="absolute bg-white/5 dark:bg-white/5 bg-navy-900/5"
              style={{
                width: "1px",
                height: "100%",
                left: `${i * 5}%`,
                top: 0,
              }}
              animate={{
                opacity: [0.05, 0.1, 0.05],
                y: [0, i % 2 === 0 ? 20 : -20, 0],
              }}
              transition={{ duration: 15 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        {/* Rich texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,125,255,0.05)_0%,transparent_70%)] dark:opacity-100 opacity-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)] dark:opacity-0 opacity-100"></div>

        {/* Dynamic particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-white/10 dark:bg-white/10 bg-navy-900/10"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [(Math.random() - 0.5) * 50],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-64 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 dark:blur-3xl blur-2xl dark:from-amber-500/20 dark:to-amber-600/20 from-amber-300/30 to-amber-400/30"
        animate={{
          x: [0, 50, 0],
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-64 w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:blur-3xl blur-2xl dark:from-blue-500/20 dark:to-purple-500/20 from-blue-300/30 to-purple-300/30"
        animate={{
          x: [0, -50, 0],
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute top-2/3 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 dark:blur-3xl blur-2xl dark:from-emerald-500/20 dark:to-cyan-500/20 from-emerald-300/30 to-cyan-300/30"
        animate={{
          y: [0, -30, 0],
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />

      <div className="container-custom relative z-10 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left content column - now spanning 6 columns */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 lg:col-span-6"
          >
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r dark:from-white/10 dark:to-white/5 from-navy-100 to-navy-50 backdrop-blur-md border dark:border-white/20 border-navy-200 text-sm font-medium dark:text-white text-navy-900 max-w-max"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400 animate-pulse"></span>
              <span className="relative overflow-hidden">
                <motion.span
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Enterprise-Grade DeFi Protocol
                </motion.span>
              </span>
            </motion.div>

            {/* Word-by-word animated heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className={`inline-block mr-3 ${
                    word === "Real-World" || word === "Assets"
                      ? "text-transparent bg-clip-text bg-gradient-to-r dark:from-amber-400 dark:to-amber-600 from-amber-500 to-amber-700 relative overflow-hidden"
                      : "dark:text-white text-navy-900"
                  }`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Staggered paragraph reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="text-lg dark:text-gray-300 text-navy-600 md:text-xl max-w-xl"
            >
              A secure, compliant platform for tokenizing RWAs, enabling enterprise-grade lending and borrowing with institutional liquidity pools.
            </motion.p>

            {/* Value proposition cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2"
            >
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg group">
                <div className="w-8 h-8 rounded-full dark:bg-blue-500/20 bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-500/30 dark:group-hover:bg-blue-500/40">
                  <Shield className="w-4 h-4 dark:text-blue-400 text-blue-600 group-hover:text-blue-700 dark:group-hover:text-blue-300" />
                </div>
                <p className="text-sm dark:text-white text-navy-800 group-hover:font-medium transition-all duration-300">Bank-grade security</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg group">
                <div className="w-8 h-8 rounded-full dark:bg-green-500/20 bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-green-500/30 dark:group-hover:bg-green-500/40">
                  <TrendingUp className="w-4 h-4 dark:text-green-400 text-green-600 group-hover:text-green-700 dark:group-hover:text-green-300" />
                </div>
                <p className="text-sm dark:text-white text-navy-800 group-hover:font-medium transition-all duration-300">High yield returns</p>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-lg group">
                <div className="w-8 h-8 rounded-full dark:bg-amber-500/20 bg-amber-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-amber-500/30 dark:group-hover:bg-amber-500/40">
                  <Award className="w-4 h-4 dark:text-amber-400 text-amber-600 group-hover:text-amber-700 dark:group-hover:text-amber-300" />
                </div>
                <p className="text-sm dark:text-white text-navy-800 group-hover:font-medium transition-all duration-300">Fully compliant</p>
              </div>
            </motion.div>

            {/* Animated buttons with hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 mt-4"
            >
              <Button
                onClick={handlePitchDeckClick}
                aria-label="Open pitch deck in a new tab"
                className="relative overflow-hidden group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-navy-900 h-12 px-6 shadow-md shadow-amber-500/20 dark:shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300"
              >
                <motion.span
                  className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  variants={shimmerVariants}
                  animate="shimmer"
                />
                <span className="relative z-10 flex items-center">
                  Pitch Deck
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-amber-600/50 to-amber-700/50 transition-transform duration-300 ease-out">
                  <motion.span
                    className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    variants={shimmerVariants}
                    animate="shimmer"
                  />
                </div>
              </Button>
              <Button
                variant="outline"
                className="relative overflow-hidden group dark:text-white text-navy-800 border-navy-300/50 dark:border-white/30 hover:bg-white/10 hover:text-navy-900 dark:hover:text-white h-12 px-6 hover:shadow-lg hover:border-amber-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center">
                  <FileText className="mr-4 h-4 w-4" />
                  Join Waitlist
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r dark:from-white/5 dark:to-white/10 from-navy-100 to-navy-200/50 transition-opacity duration-300 ease-out"></div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right content column with interactive 3D dashboard - now spanning 6 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative lg:col-span-6"
          >
            {/* Main dashboard card with 3D effect */}
            <div className="relative w-full aspect-square max-w-lg mx-auto transform perspective-1000">
              <motion.div
                className="relative w-full h-full"
                animate={{
                  rotateX: [0, 2, 0, -2, 0],
                  rotateY: [0, -2, 0, 2, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Glass effect card */}
                <div className="absolute inset-0 bg-gradient-to-br dark:from-navy-700/50 dark:to-navy-900/50 from-white/50 to-gray-100/50 rounded-2xl backdrop-blur-sm dark:border-white/10 border-navy-200/50 shadow-2xl"></div>

                <div className="absolute inset-0 p-8 flex flex-col">
                  {/* Header with glow effect */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="dark:text-white text-navy-900 font-bold">RWA Tokenization Platform</h3>
                      <p className="dark:text-gray-400 text-navy-600 text-sm">Institutional-grade security</p>
                    </div>
                    <motion.div
                      className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-lg"
                      animate={{
                        boxShadow: [
                          "0 0 0px rgba(245, 158, 11, 0)",
                          "0 0 15px rgba(245, 158, 11, 0.5)",
                          "0 0 0px rgba(245, 158, 11, 0)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2L2 7L12 12L22 7L12 2Z"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 17L12 22L22 17"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12L12 17L22 12"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Featured asset spotlight - Now animated */}
                  <div className="mb-4 dark:bg-white/5 bg-navy-900/5 backdrop-blur-sm dark:border-white/10 border-navy-200/50 p-4 rounded-lg">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentAsset}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="dark:text-white text-navy-900 font-medium flex items-center">
                            <span className="mr-1.5 inline-block w-2 h-2 rounded-full bg-gradient-to-r dark:from-amber-400 dark:to-amber-500 from-amber-500 to-amber-600 animate-pulse"></span>
                            Featured: {assets[currentAsset].name}
                          </h4>
                          <span className="text-xs dark:text-amber-400 text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full font-medium">
                            Spotlight
                          </span>
                        </div>
                        <div className="relative h-2 w-full dark:bg-gray-700 bg-gray-200 rounded-full overflow-hidden">
                          <motion.span
                            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            variants={shimmerVariants}
                            animate="shimmer"
                          />
                          <motion.div
                            className={`h-full bg-gradient-to-r ${assets[currentAsset].color} rounded-full`}
                            initial={{ width: "0%" }}
                            animate={{ width: `${assets[currentAsset].percentage}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="dark:text-gray-400 text-gray-500 text-xs">Tokenization Progress</span>
                          <span className="dark:text-amber-400 text-amber-600 text-xs font-medium">
                            {assets[currentAsset].percentage}%
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Assets grid with enhanced visuals */}
                  <div className="grid grid-cols-2 gap-4">
                    {assets.map((asset, index) => (
                      <motion.div
                        key={asset.name}
                        className={`dark:bg-white/5 bg-navy-900/5 backdrop-blur-sm dark:border-white/10 border-navy-200/50 p-4 rounded-lg ${
                          currentAsset === index ? "ring-2 dark:ring-amber-500/50 ring-amber-600/50 shadow-lg shadow-amber-500/10" : ""
                        } relative overflow-hidden cursor-pointer`}
                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span
                          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          variants={shimmerVariants}
                          animate="shimmer"
                        />
                        <h4 className="dark:text-white text-navy-900 mb-1">{asset.name}</h4>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full dark:bg-gray-700 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${asset.color} rounded-full`} style={{ width: `${asset.percentage}%` }}></div>
                          </div>
                          <span className="dark:text-amber-400 text-amber-600 text-sm">{asset.percentage}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* TVL stats with animated counter */}
                  <div className="mt-auto">
                    <motion.div
                      className="dark:bg-white/5 bg-navy-900/5 backdrop-blur-sm dark:border-white/10 border-navy-200/50 p-4 rounded-lg relative overflow-hidden group hover:shadow-lg hover:border-green-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    >
                      <motion.span
                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        variants={shimmerVariants}
                        animate="shimmer"
                      />
                      <h4 className="dark:text-white text-navy-900 text-sm mb-2">Total Value Locked (TVL)</h4>
                      <div className="flex items-end">
                        <motion.p
                          className="text-2xl font-bold dark:text-white text-navy-900"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ duration: 0.5, delay: 1.6 }}
                        >
                          $1.45B
                        </motion.p>
                        <motion.span
                          className="dark:text-green-400 text-green-600 text-sm font-normal ml-2 flex items-center"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.5, delay: 1.8 }}
                        >
                          <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          8.5%
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced floating notification elements */}
            <motion.div
              className="absolute -top-8 -right-8 bg-gradient-to-br dark:from-white/10 dark:to-white/5 from-white/80 to-gray-100/80 backdrop-blur-md dark:border-white/20 border-navy-200/50 rounded-xl p-4 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1, y: [0, -10, 0] } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.2,
              }}
            >
              <motion.span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={shimmerVariants}
                animate="shimmer"
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 8V16M8 12H16"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-xs font-medium">New asset tokenized</p>
                  <p className="text-gray-400 text-xs">2 minutes ago</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 bg-gradient-to-br dark:from-white/10 dark:to-white/5 from-white/80 to-gray-100/80 backdrop-blur-md dark:border-white/20 border-navy-200/50 rounded-xl p-4 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1, y: [0, 10, 0] } : { opacity: 0, y: -20, scale: 0.9 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1.6,
              }}
            >
              <motion.span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={shimmerVariants}
                animate="shimmer"
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 12L10.5 15L16.5 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-white text-xs font-medium">$50M loan approved</p>
                  <p className="text-gray-400 text-xs">5 minutes ago</p>
                </div>
              </div>
            </motion.div>

            {/* New notification element */}
            <motion.div
              className="absolute top-1/2 -right-8 bg-gradient-to-br dark:from-blue-500/10 dark:to-blue-600/10 from-blue-100/50 to-blue-200/50 backdrop-blur-md dark:border-blue-500/20 border-blue-300/30 rounded-xl p-4 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1, x: [0, 10, 0] } : { opacity: 0, x: 20, scale: 0.9 }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <motion.span
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                variants={shimmerVariants}
                animate="shimmer"
              />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-xs font-medium">APY increased</p>
                  <p className="text-green-400 text-xs font-medium">+2.3% yield</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}