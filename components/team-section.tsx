"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, ChevronRight, Users, Award, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define types for team members and other data
interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  color: string;
  quote: string;
}

interface Advisor {
  name: string;
  role: string;
  expertise: string;
  image: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

interface ValuePillarProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alexandra Chen",
    role: "Chief Executive Officer",
    bio: "Former VP at Goldman Sachs with 15+ years in fintech and capital markets. Led multiple successful fintech ventures.",
    image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-blue-500/20 to-purple-500/20",
    quote: "Our goal is to revolutionize how real-world assets are financed and traded globally."
  },
  {
    name: "Michael Winters",
    role: "Chief Technology Officer",
    bio: "Ex-CTO at Coinbase with expertise in blockchain development, cybersecurity, and distributed systems architecture.",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-teal-500/20 to-blue-500/20",
    quote: "We're building infrastructure that will stand the test of time in a rapidly evolving landscape."
  },
  {
    name: "Sarah Johnson",
    role: "Chief Risk Officer",
    bio: "Previously led regulatory compliance at J.P. Morgan. Expert in global financial regulations and enterprise risk management.",
    image: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-amber-500/20 to-red-500/20",
    quote: "Regulatory compliance is at the core of everything we do, creating trust in a trustless system."
  },
  {
    name: "David Park",
    role: "Chief Product Officer",
    bio: "Former product lead at Square. Specialized in creating enterprise financial products with exceptional user experiences.",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "from-green-500/20 to-emerald-500/20",
    quote: "Our products blend institutional-grade reliability with consumer-grade simplicity."
  },
];

const advisors: Advisor[] = [
  {
    name: "Dr. Alan Greenfield",
    role: "Former Central Bank Governor",
    expertise: "Monetary Policy",
    image: "/api/placeholder/100/100"
  },
  {
    name: "Prof. Maria Rodriguez",
    role: "MIT Blockchain Research",
    expertise: "Distributed Systems",
    image: "/api/placeholder/100/100"
  },
  {
    name: "Richard Lawson",
    role: "Managing Partner, Sequoia Capital",
    expertise: "Venture Investment",
    image: "/api/placeholder/100/100"
  },
  {
    name: "Dr. Helen Zhang",
    role: "Financial Regulation Expert",
    expertise: "Compliance",
    image: "/api/placeholder/100/100"
  },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index, isActive, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className="h-full"
      style={{ 
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: isActive ? 10 : 10 - index
      }}
      onClick={onClick}
    >
      <Card 
        className={cn(
          "h-full relative overflow-hidden border-0 shadow-lg bg-white dark:bg-navy-900",
          isActive ? "ring-2 ring-blue-500 dark:ring-blue-400" : "hover:shadow-xl",
          "transform transition-all duration-300",
          isActive ? "scale-105" : "hover:scale-102"
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30", 
            member.color
          )}
        />
        
        <div className="grid md:grid-cols-5 h-full">
          <div className={cn(
            "md:col-span-2 aspect-square md:aspect-auto relative overflow-hidden",
            isActive ? "md:col-span-2" : ""
          )}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            
            <div className="absolute bottom-0 left-0 p-4 z-20 md:hidden">
              <h3 className="text-xl font-bold text-white truncate">{member.name}</h3>
              <p className="text-blue-200 font-medium text-sm">{member.role}</p>
            </div>
          </div>
          
          <div className="md:col-span-3 p-5 flex flex-col">
            <div className="hidden md:block mb-3">
              <h3 className="text-xl font-bold text-navy-900 dark:text-white">{member.name}</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium">{member.role}</p>
            </div>
            
            <p className="text-navy-600 dark:text-navy-300 text-sm flex-grow">
              {member.bio}
            </p>
            
            <AnimatePresence>
              {isActive && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-navy-200 dark:border-navy-700"
                >
                  <blockquote className="italic text-navy-600 dark:text-navy-300 text-sm pl-3 border-l-2 border-blue-500">
                    "{member.quote}"
                  </blockquote>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-white/80 dark:bg-navy-800/80">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-white/80 dark:bg-navy-800/80">
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "text-xs gap-1 rounded-full",
                  isActive ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : ""
                )}
                onClick={onClick}
              >
                {isActive ? "Less" : "More"} 
                <ChevronRight className={cn(
                  "h-3 w-3 transition-transform", 
                  isActive ? "rotate-90" : ""
                )} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const ValuePillar: React.FC<ValuePillarProps> = ({ icon: Icon, title, description }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className="flex flex-col items-center text-center p-6"
    >
      <div className="relative mb-4">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
        <div className="relative bg-white dark:bg-navy-800 p-4 rounded-full shadow-lg">
          <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">{title}</h3>
      <p className="text-navy-600 dark:text-navy-300 text-sm">{description}</p>
    </motion.div>
  );
};

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);
  
  return (
    <section id="team" ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-navy-950 dark:to-navy-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="text-center mb-16 relative"
        >
          <motion.div
            variants={fadeUp}
            className="inline-block"
          >
            <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">Our Leadership</span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-navy-900 to-navy-700 dark:from-white dark:to-blue-100"
          >
            Visionaries Driving Innovation
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-navy-600 dark:text-navy-300 text-lg max-w-2xl mx-auto"
          >
            Our leadership team combines decades of experience across finance, technology, and regulatory domains to bridge traditional finance with decentralized solutions.
          </motion.p>
          
          {/* Decorative elements */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-24 h-1 bg-gradient-to-r from-blue-500 to-transparent hidden md:block"></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-24 h-1 bg-gradient-to-l from-blue-500 to-transparent hidden md:block"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={index}
              member={member}
              index={index}
              isActive={activeTeamMember === index}
              onClick={() => setActiveTeamMember(activeTeamMember === index ? null : index)}
            />
          ))}
        </div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-24"
        >
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
            <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:20px_20px] pointer-events-none"></div>
            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Advisory Board</h3>
                  <p className="text-blue-200 max-w-xl">
                    Strategic guidance from industry leaders at the intersection of finance, technology, and regulation.
                  </p>
                </div>
                <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm self-start">
                  Full Advisory Network
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {advisors.map((advisor, index) => (
                  <div key={index} className="group">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-lg">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-white/20 group-hover:ring-blue-400/50 transition-all duration-300">
                        <img 
                          src={advisor.image} 
                          alt={advisor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-white mb-1">{advisor.name}</h4>
                      <p className="text-blue-200 text-sm mb-2">{advisor.role}</p>
                      <span className="inline-block px-2 py-1 bg-white/10 rounded-full text-xs text-blue-100">
                        {advisor.expertise}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h3 
            variants={fadeUp}
            className="text-3xl font-bold mb-8 text-navy-900 dark:text-white relative inline-block"
          >
            Our Mission & Values
            <div className="h-1 w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 absolute bottom-0 left-1/4"></div>
          </motion.h3>
          
          <motion.p 
            variants={fadeUp}
            className="text-navy-600 dark:text-navy-300 text-lg leading-relaxed mb-12"
          >
            At Assetsure, we're committed to bridging the gap between traditional finance and DeFi by creating enterprise-grade infrastructure for tokenizing, trading, and financing real-world assets. Our mission is to increase liquidity, transparency, and accessibility in global financial markets while maintaining the highest standards of security and regulatory compliance.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValuePillar 
              icon={Users}
              title="Inclusive Finance"
              description="Creating access to financial opportunities previously reserved for institutions and high-net-worth individuals."
            />
            <ValuePillar 
              icon={Award}
              title="Operational Excellence"
              description="Maintaining the highest standards of security, performance, and regulatory compliance."
            />
            <ValuePillar 
              icon={Target}
              title="Sustainable Innovation"
              description="Building solutions that balance technological innovation with long-term market stability."
            />
          </div>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center"
        >
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
            Join Our Journey
          </Button>
        </motion.div>
      </div>
    </section>
  );
}