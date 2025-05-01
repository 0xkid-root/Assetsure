"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Twitter, Linkedin, Github, ChevronRight, ArrowUpRight, Mail } from 'lucide-react';

const Footer = () => {
  type LinkItem = {
    name: string;
    href: string;
  };

  type Categories = {
    [key: string]: LinkItem[];
  };

  const [activeCategory, setActiveCategory] = useState<'platform' | 'company' | 'resources'>('platform');
  
  const categories: Categories = {
    platform: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#process' },
      { name: 'Markets', href: '#markets' },
      { name: 'Security', href: '#security' },
      { name: 'Pricing', href: '#' }
    ],
    company: [
      { name: 'Team', href: '#team' },
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Press', href: '#' }
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Whitepaper', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Contact', href: '#contact' }
    ]
  };

  return (
    <footer className="bg-gradient-to-b from-navy-900 to-black text-white relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:24px_24px]"></div>
      
      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-20 pb-8">
        {/* Top section with logo and newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70 rounded-full"></div>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18 3C9.716 3 3 9.716 3 18C3 26.284 9.716 33 18 33C26.284 33 33 26.284 33 18C33 9.716 26.284 3 18 3ZM7 18C7 12.477 11.477 8 17 8H25C25.552 8 26 8.448 26 9V17C26 22.523 21.523 27 16 27H8C7.448 27 7 26.552 7 26V18ZM16 23C18.761 23 21 20.761 21 18C21 15.239 18.761 13 16 13C13.239 13 11 15.239 11 18C11 20.761 13.239 23 16 23Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">Asset</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">sure</span>
              </span>
            </div>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Enterprise-grade DeFi protocol for tokenizing, trading, and financing real-world assets with institutional-level security.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="sm" className="rounded-full bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 backdrop-blur-sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-medium mb-3">Stay updated</h3>
              <p className="text-gray-400 mb-4 text-sm">Get the latest news and updates from Assetsure</p>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle section with interactive tabs */}
        <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm p-6 mb-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.keys(categories).map((category) => (
              <Button 
                key={category}
                variant={activeCategory === category ? "default" : "ghost"}
                onClick={() => setActiveCategory(category as 'platform' | 'company' | 'resources')}
                className={activeCategory === category 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                  : "text-gray-400 hover:text-white"}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories[activeCategory].map((link: LinkItem, index: number) => (
              <Link 
                key={index} 
                href={link.href}
                className="group flex items-center p-3 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <span className="text-gray-300 group-hover:text-white transition-colors">{link.name}</span>
                <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
          </div>
        </div>
        
        {/* Bottom section with legal and contact */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="order-2 lg:order-1">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Assetsure. All rights reserved.
            </div>
          </div>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 order-1 lg:order-2">
            <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
              Compliance
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
              Legal
            </Link>
            <Link href="#contact" className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-medium flex items-center gap-1 hover:opacity-80 transition-opacity">
              Contact Us <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;