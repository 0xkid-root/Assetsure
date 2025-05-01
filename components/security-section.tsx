"use client"

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  FileCheck, 
  Database, 
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Eye,
  LockKeyhole
} from 'lucide-react';

// Define types for security features and other data
interface SecurityFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

interface ComplianceFramework {
  name: string;
  icon: React.ElementType;
}

interface AuditPartner {
  name: string;
  logo: string;
}

interface Certification {
  name: string;
  icon: React.ElementType;
}

interface SecurityCardProps {
  feature: SecurityFeature;
  index: number;
  expanded: boolean;
  toggleExpand: (index: number) => void;
}

const securityFeatures: SecurityFeature[] = [
  {
    icon: Shield,
    title: "Multi-Signature Security",
    description: "Enterprise-grade authorization requiring multiple approvals for critical transactions.",
    color: "bg-indigo-500"
  },
  {
    icon: Lock,
    title: "HSM Protection",
    description: "Hardware Security Module integration for secure key management and cryptographic operations.",
    color: "bg-purple-500"
  },
  {
    icon: Database,
    title: "Secure Data Storage",
    description: "End-to-end encryption with granular access controls and comprehensive audit logging.",
    color: "bg-blue-500"
  },
  {
    icon: ShieldCheck,
    title: "Penetration Testing",
    description: "Regular security audits and penetration testing by leading cybersecurity firms.",
    color: "bg-teal-500"
  },
];

const complianceFrameworks: ComplianceFramework[] = [
  { name: "SEC compliance", icon: CheckCircle },
  { name: "GDPR adherence", icon: CheckCircle },
  { name: "FATF guidelines", icon: CheckCircle },
  { name: "BSA/AML compliance", icon: CheckCircle },
];

const auditPartners: AuditPartner[] = [
  { name: "CertiK", logo: "certik" },
  { name: "Trail of Bits", logo: "trail" },
  { name: "Hacken", logo: "hacken" },
  { name: "Quantstamp", logo: "quantstamp" },
];

const certifications: Certification[] = [
  { name: "ISO 27001", icon: FileCheck },
  { name: "GDPR Compliant", icon: FileCheck },
  { name: "PCI DSS", icon: FileCheck },
  { name: "CCPA Compliant", icon: FileCheck },
  { name: "SOC 1", icon: FileCheck },
  { name: "SOC 2 Type II", icon: CheckCircle },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface SecurityCardProps {
  feature: SecurityFeature;
  index: number;
  expanded: boolean;
  toggleExpand: (index: number) => void;
}

const SecurityCard: React.FC<SecurityCardProps> = ({ feature, index, expanded, toggleExpand }) => {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      whileHover={{ scale: 1.03 }}
    >
      <Card className="h-full bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
        <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 rounded-bl-full ${feature.color}`}></div>
        <CardHeader className="pt-8">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${feature.color} shadow-lg`}>
            <feature.icon className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-navy-900 dark:text-white">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-navy-600 dark:text-navy-300 mb-4">
            {feature.description}
          </p>
          <button 
            onClick={() => toggleExpand(index)}
            className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Learn more <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('frameworks');

  const toggleExpand = (index: number): void => {
    setExpandedFeature(expandedFeature === index ? null : index);
  };

  return (
    <section id="security" ref={ref} className="section-padding py-20 bg-gradient-to-b from-navy-50 to-white dark:from-navy-900 dark:to-navy-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-black/[0.03] dark:bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
      <div className="absolute top-0 -right-64 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -left-64 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-md">
              <LockKeyhole className="h-4 w-4 mr-1.5" />
              Enterprise Security
            </Badge>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-navy-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-navy-900 to-indigo-900 dark:from-white dark:to-indigo-200"
          >
            Bank-Grade Security & Compliance
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-navy-600 dark:text-navy-300 text-lg md:text-xl"
          >
            Our platform is built with institutional-grade security measures and comprehensive regulatory compliance.
          </motion.p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {securityFeatures.map((feature, index) => (
            <SecurityCard 
              key={index}
              feature={feature} 
              index={index}
              expanded={expandedFeature === index}
              toggleExpand={toggleExpand}
            />
          ))}
        </motion.div>
        
        {/* Feature detail modal */}
        <AnimatePresence>
          {expandedFeature !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl p-6 mb-12 shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg ${securityFeatures[expandedFeature].color} flex items-center justify-center mr-4`}>
                    {React.createElement(securityFeatures[expandedFeature].icon, { className: "h-5 w-5 text-white" })}
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white">{securityFeatures[expandedFeature].title}</h3>
                </div>
                <button 
                  onClick={() => setExpandedFeature(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-navy-600 dark:text-navy-300">{securityFeatures[expandedFeature].description}</p>
                <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-4">
                  <h4 className="font-medium text-navy-900 dark:text-white mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-indigo-500" />
                    Why this matters
                  </h4>
                  <p className="text-sm text-navy-600 dark:text-navy-300">
                    {expandedFeature === 0 && "Multi-signature security prevents single points of failure and ensures that no individual can compromise your assets or execute critical transactions without proper authorization."}
                    {expandedFeature === 1 && "Hardware Security Modules provide the highest level of protection for cryptographic keys, making it virtually impossible for attackers to extract sensitive key material even if they gain physical access."}
                    {expandedFeature === 2 && "Our end-to-end encryption ensures your data remains protected both in transit and at rest, with comprehensive access controls that limit exposure to only those who need it."}
                    {expandedFeature === 3 && "Regular penetration testing by independent security experts helps identify and address potential vulnerabilities before they can be exploited by malicious actors."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compliance Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-navy-700 rounded-xl overflow-hidden shadow-xl"
        >
          <div className="p-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/20 rounded-full -mr-32 -mt-32 opacity-50"></div>
            
            <div className="relative">
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                <div className="w-full md:w-1/3">
                  <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4 flex items-center">
                    <Eye className="h-6 w-6 mr-3 text-indigo-500" />
                    Regulatory Compliance
                  </h3>
                  <p className="text-navy-600 dark:text-navy-300">
                    Our platform meets the highest regulatory standards across multiple jurisdictions, ensuring your operations remain fully compliant.
                  </p>
                  <div className="mt-6">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1.5 rounded-full">
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      SOC 2 Type II Certified
                    </Badge>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <div className="mb-6">
                    <div className="flex space-x-4 mb-6">
                      <button
                        onClick={() => setActiveTab('frameworks')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === 'frameworks' 
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                            : 'bg-gray-100 text-gray-600 dark:bg-navy-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                        }`}
                      >
                        Regulatory Frameworks
                      </button>
                      <button
                        onClick={() => setActiveTab('partners')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === 'partners' 
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                            : 'bg-gray-100 text-gray-600 dark:bg-navy-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                        }`}
                      >
                        Audit Partners
                      </button>
                      <button
                        onClick={() => setActiveTab('features')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          activeTab === 'features' 
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' 
                            : 'bg-gray-100 text-gray-600 dark:bg-navy-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'
                        }`}
                      >
                        Compliance Features
                      </button>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {activeTab === 'frameworks' && (
                        <motion.div
                          key="frameworks"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {complianceFrameworks.map((framework, idx) => (
                              <div key={idx} className="flex items-center p-3 bg-gray-50 dark:bg-navy-900 rounded-lg">
                                <framework.icon className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                                <span className="text-navy-700 dark:text-navy-300 font-medium">{framework.name}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      
                      {activeTab === 'partners' && (
                        <motion.div
                          key="partners"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {auditPartners.map((partner, idx) => (
                              <div key={idx} className="flex items-center p-3 bg-gray-50 dark:bg-navy-900 rounded-lg">
                                <div className="w-8 h-8 bg-gray-200 dark:bg-navy-700 rounded-md flex items-center justify-center mr-3">
                                  <span className="text-xs font-bold text-navy-600 dark:text-navy-300">{partner.logo.charAt(0).toUpperCase()}</span>
                                </div>
                                <span className="text-navy-700 dark:text-navy-300 font-medium">{partner.name}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                      
                      {activeTab === 'features' && (
                        <motion.div
                          key="features"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid grid-cols-2 gap-4">
                            {["KYC/AML integration", "Transaction monitoring", "Regulatory reporting", "Blacklist checking"].map((item, idx) => (
                              <div key={idx} className="flex items-center p-3 bg-gray-50 dark:bg-navy-900 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mr-3" />
                                <span className="text-navy-700 dark:text-navy-300 font-medium">{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-navy-700 pt-8">
                <h4 className="font-semibold text-navy-900 dark:text-white text-lg mb-6 flex items-center">
                  <FileCheck className="h-5 w-5 mr-2 text-indigo-500" />
                  Security Certifications
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {certifications.map((cert, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-navy-800 dark:to-navy-900 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-2">
                        <cert.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="text-navy-800 dark:text-navy-200 font-medium text-sm">{cert.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}