"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Wallet, X, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from '@/lib/utils';
import { WalletConnectModal } from './wallet-connect-modal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');
  const router = useRouter();

  // Listen for MetaMask account changes
  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        const { ethereum } = window as any;
        if (ethereum && ethereum.isMetaMask) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsWalletConnected(true);
          }
        }
      } catch (error) {
        console.error("Error checking if wallet is connected:", error);
      }
    };

    checkIfWalletIsConnected();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsWalletConnected(true);
      } else {
        setWalletAddress('');
        setIsWalletConnected(false);
      }
    };

    const { ethereum } = window as any;
    if (ethereum && ethereum.isMetaMask) {
      ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (ethereum && ethereum.isMetaMask) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  // Check if wallet is connected on mount
  useEffect(() => {
    const isWalletConnected = localStorage.getItem('isWalletConnected') === 'true';
    const storedWalletAddress = localStorage.getItem('walletAddress');
    
    if (isWalletConnected && storedWalletAddress) {
      setIsWalletConnected(true);
      setWalletAddress(storedWalletAddress);
    }
  }, []);
  
  // Redirect to dashboard if wallet is connected and user clicks on wallet button
  const handleWalletClick = () => {
    if (isWalletConnected) {
      // Disconnect wallet
      const { ethereum } = window as any;
      if (ethereum && ethereum.isMetaMask) {
        // Clear local storage
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletProvider');
        localStorage.removeItem('isWalletConnected');
        
        // Reset state
        setWalletAddress('');
        setIsWalletConnected(false);
        
        // Redirect to home if on dashboard
        if (window.location.pathname.includes('/dashboard')) {
          router.replace('/');
        }
      }
    } else {
      // Connect wallet
      setIsWalletModalOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-lg py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-background dark:bg-navy-900 rounded-full p-2">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary group-hover:text-gold-500 transition-colors duration-300"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 3C9.716 3 3 9.716 3 18C3 26.284 9.716 33 18 33C26.284 33 33 26.284 33 18C33 9.716 26.284 3 18 3ZM7 18C7 12.477 11.477 8 17 8H25C25.552 8 26 8.448 26 9V17C26 22.523 21.523 27 16 27H8C7.448 27 7 26.552 7 26V18ZM16 23C18.761 23 21 20.761 21 18C21 15.239 18.761 13 16 13C13.239 13 11 15.239 11 18C11 20.761 13.239 23 16 23Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight flex">
                <span className="text-navy-800 dark:text-navy-200">Asset</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">sure</span>
              </span>
              <span className="text-xs text-muted-foreground hidden sm:inline-block">Secure Asset Management</span>
            </div>
          </Link>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            
            {/* <ModeToggle /> */}
            
            <Button 
              variant="outline" 
              className="gap-2 rounded-full border-gold-500/30 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-300"
              onClick={handleWalletClick}
            >
              {isWalletConnected ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></div>
                  <span className="truncate max-w-[100px]">{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
                  <X size={14} className="ml-1 text-red-500" />
                </>
              ) : (
                <>
                  <Wallet size={16} className="text-gold-500" />
                  <span>Connect Wallet</span>
                </>
              )}
            </Button>
            
            <Button 
              className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-navy-900 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 transition-all duration-300"
            >
              Launch App
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden flex items-center gap-3">
            <ModeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center bg-background dark:bg-navy-800 border border-border"
            >
              <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                <span className={`line ${isMenuOpen ? 'line1-active' : 'line1'}`}></span>
                <span className={`line ${isMenuOpen ? 'line2-active' : 'line2'}`}></span>
                <span className={`line ${isMenuOpen ? 'line3-active' : 'line3'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm bg-background dark:bg-navy-900 shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-6">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full hover:bg-gold-500/10"
                >
                  <X className="h-6 w-6 text-gold-500" />
                </Button>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gold-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18 3C9.716 3 3 9.716 3 18C3 26.284 9.716 33 18 33C26.284 33 33 26.284 33 18C33 9.716 26.284 3 18 3ZM7 18C7 12.477 11.477 8 17 8H25C25.552 8 26 8.448 26 9V17C26 22.523 21.523 27 16 27H8C7.448 27 7 26.552 7 26V18ZM16 23C18.761 23 21 20.761 21 18C21 15.239 18.761 13 16 13C13.239 13 11 15.239 11 18C11 20.761 13.239 23 16 23Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-xl font-bold tracking-tight">
                    <span className="text-navy-800 dark:text-navy-200">Asset</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600">sure</span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  The most secure asset management platform for your digital assets.
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <Button 
                  variant="outline" 
                  className="gap-2 w-full justify-start rounded-lg border-gold-500/30"
                  onClick={() => {
                    if (isWalletConnected) {
                      router.push('/dashboard');
                    } else {
                      setIsWalletModalOpen(true);
                      setIsMenuOpen(false);
                    }
                  }}
                >
                  {isWalletConnected ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></div>
                      <span className="truncate max-w-[150px]">{`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}</span>
                    </>
                  ) : (
                    <>
                      <Wallet size={18} className="text-gold-500" />
                      <span>Connect Wallet</span>
                    </>
                  )}
                </Button>
          
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Need Help?</span>
                    <Link href="/support" className="text-sm text-gold-500 hover:underline">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Wallet Connect Modal */}
      <WalletConnectModal 
        open={isWalletModalOpen} 
        onOpenChange={(open) => {
          setIsWalletModalOpen(open);
          // If modal is closed and we have a wallet address, consider it connected
          if (!open && walletAddress) {
            setIsWalletConnected(true);
          }
        }} 
      />

      {/* CSS for Hamburger Animation */}
      <style jsx>{`
        .hamburger {
          width: 24px;
          height: 24px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        
        .line {
          display: block;
          height: 2px;
          width: 100%;
          background-color: currentColor;
          transition: all 0.3s ease-in-out;
          position: absolute;
        }
        
        .line1 {
          top: 6px;
        }
        
        .line2 {
          top: 12px;
        }
        
        .line3 {
          top: 18px;
        }
        
        .line1-active {
          top: 12px;
          transform: rotate(45deg);
        }
        
        .line2-active {
          opacity: 0;
        }
        
        .line3-active {
          top: 12px;
          transform: rotate(-45deg);
        }
      `}</style>
    </header>
  );
}
