"use client"

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { 
  Building2, Mail, Phone, MessageSquare, MapPin, 
  ArrowRight, CheckCircle2, Sparkles, Globe
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ContactSection = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const formInView = useInView(formRef, { once: true });
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("message");
  const [formProgress, setFormProgress] = useState(0);
  const [formComplete, setFormComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiry: 'enterprise',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [hovered, setHovered] = useState(false);
  
  // Calculate form completion percentage
  useEffect(() => {
    const { name, email, company, message } = formData;
    const filledFields = [name, email, company, message].filter(field => field.trim().length > 0).length;
    setFormProgress((filledFields / 4) * 100);
  }, [formData]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInquiryChange = (inquiry: string) => {
    setFormData(prev => ({ ...prev, inquiry }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "Our team will contact you shortly.",
      });
      setLoading(false);
      setFormComplete(true);
      
      // Reset form after showing success state
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          company: '',
          inquiry: 'enterprise',
          message: '',
        });
        setFormComplete(false);
      }, 3000);
    }, 1500);
  };
  
  // Office locations with additional data
  const offices = [
    {
      city: "Boston",
      address: "One Financial Center, Boston, MA 02111",
      timezone: "EST",
      phone: "+1 (617) 555-0123",
      image: "/api/placeholder/400/320"
    },
    {
      city: "New York",
      address: "350 Fifth Avenue, 21st Floor, NY 10118",
      timezone: "EST",
      phone: "+1 (212) 555-0123",
      image: "/api/placeholder/400/320"
    },
    {
      city: "London",
      address: "One Canada Square, Canary Wharf, E14 5AB",
      timezone: "GMT",
      phone: "+44 20 5555 0123",
      image: "/api/placeholder/400/320"
    },
    {
      city: "Singapore",
      address: "Marina Bay Financial Centre, 018983",
      timezone: "SGT",
      phone: "+65 6555 0123",
      image: "/api/placeholder/400/320"
    }
  ];
  
  // Inquiry types with icons
  const inquiryTypes = [
    { value: "enterprise", label: "Enterprise Solution", icon: Building2 },
    { value: "asset-tokenization", label: "Asset Tokenization", icon: Sparkles },
    { value: "financing", label: "Financing", icon: Mail },
    { value: "secondary-market", label: "Secondary Market", icon: Globe },
    { value: "partnership", label: "Partnership", icon: Phone },
  ];

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="py-24 relative overflow-hidden bg-gradient-to-b from-navy-50 to-navy-100 dark:from-navy-950 dark:to-navy-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-60">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-black/[0.03] dark:bg-grid-white/[0.02] bg-[size:30px_30px]" />
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-gold-300/20 to-gold-500/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-navy-400/10 to-navy-600/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Header section with 3D-like motion effect */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block relative"
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-gold-200 to-gold-300 dark:from-gold-700 dark:to-gold-600 text-navy-900 dark:text-white font-medium mb-6">
              <Sparkles className="h-4 w-4 mr-2 text-gold-700 dark:text-gold-300" />
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-navy-900 dark:text-white tracking-tight"
          >
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-gold-600">Conversation</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-navy-600 dark:text-navy-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Speak with our dedicated enterprise team to discover how Assetsure can transform your organization's asset management strategy.
          </motion.p>
        </motion.div>
        
        {/* Main content area with tabs */}
        <div className="relative">
          <Tabs 
            defaultValue="message" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 w-full max-w-md bg-navy-200/50 dark:bg-navy-800/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="message"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-navy-700 data-[state=active]:text-navy-900 dark:data-[state=active]:text-white py-3"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </TabsTrigger>
                <TabsTrigger 
                  value="locations"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-navy-700 data-[state=active]:text-navy-900 dark:data-[state=active]:text-white py-3"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Our Locations
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="w-full max-w-6xl mx-auto">
              <TabsContent value="message" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form Card with Progress Indicator */}
                  <motion.div 
                    ref={formRef}
                    initial={{ opacity: 0, x: -30 }}
                    animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-2"
                  >
                    <Card className="overflow-hidden bg-white/70 dark:bg-navy-800/70 backdrop-blur-md border border-white/20 dark:border-navy-700/50 shadow-xl dark:shadow-navy-900/30">
                      {/* Progress bar indicator */}
                      <div className="w-full h-1 bg-navy-200 dark:bg-navy-700">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-gold-500 to-gold-600"
                          initial={{ width: '0%' }}
                          animate={{ width: `${formProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      <div className="p-8">
                        <div className="mb-8">
                          <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">
                            {formComplete ? "Message Sent!" : "Send us a message"}
                          </h3>
                          <p className="text-navy-600 dark:text-navy-300">
                            {formComplete 
                              ? "Thank you for reaching out. Our team will respond within 24 hours."
                              : "Fill out the form below and our enterprise team will get back to you quickly."}
                          </p>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          {formComplete ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.4 }}
                              className="flex flex-col items-center justify-center py-12"
                            >
                              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-4 mb-6">
                                <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                              </div>
                              <h4 className="text-xl font-semibold text-navy-900 dark:text-white mb-2">Message Received!</h4>
                              <p className="text-navy-600 dark:text-navy-300 text-center max-w-md">
                                We've received your inquiry and will be in touch shortly. 
                                You can expect a response within 24 hours.
                              </p>
                            </motion.div>
                          ) : (
                            <motion.form 
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onSubmit={handleSubmit} 
                              className="space-y-6"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label htmlFor="name" className="text-navy-800 dark:text-navy-200">Full Name</Label>
                                  <Input
                                    id="name"
                                    name="name"
                                    placeholder="John Smith"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-white/50 dark:bg-navy-700/50 backdrop-blur-sm border-navy-200 dark:border-navy-600 focus:ring-2 focus:ring-gold-500/50"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="email" className="text-navy-800 dark:text-navy-200">Email Address</Label>
                                  <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="john@company.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="bg-white/50 dark:bg-navy-700/50 backdrop-blur-sm border-navy-200 dark:border-navy-600 focus:ring-2 focus:ring-gold-500/50"
                                  />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                  <Label htmlFor="company" className="text-navy-800 dark:text-navy-200">Company</Label>
                                  <Input
                                    id="company"
                                    name="company"
                                    placeholder="Your Company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    className="bg-white/50 dark:bg-navy-700/50 backdrop-blur-sm border-navy-200 dark:border-navy-600 focus:ring-2 focus:ring-gold-500/50"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-navy-800 dark:text-navy-200">Inquiry Type</Label>
                                  <div className="grid grid-cols-5 gap-2">
                                    {inquiryTypes.map((type) => (
                                      <motion.button
                                        key={type.value}
                                        type="button"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                                          formData.inquiry === type.value
                                            ? "bg-navy-900 dark:bg-navy-600 border-navy-700 dark:border-navy-500 text-white"
                                            : "bg-white/50 dark:bg-navy-700/50 border-navy-200 dark:border-navy-600 text-navy-800 dark:text-navy-200"
                                        }`}
                                        onClick={() => handleInquiryChange(type.value)}
                                      >
                                        <type.icon className={`h-5 w-5 mb-1 ${
                                          formData.inquiry === type.value
                                            ? "text-gold-400"
                                            : "text-navy-600 dark:text-navy-400"
                                        }`} />
                                        <span className="text-xs truncate w-full text-center">{type.label.split(' ')[0]}</span>
                                      </motion.button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="message" className="text-navy-800 dark:text-navy-200">Message</Label>
                                <Textarea
                                  id="message"
                                  name="message"
                                  placeholder="Please describe your inquiry in detail..."
                                  rows={4}
                                  value={formData.message}
                                  onChange={handleChange}
                                  required
                                  className="resize-none bg-white/50 dark:bg-navy-700/50 backdrop-blur-sm border-navy-200 dark:border-navy-600 focus:ring-2 focus:ring-gold-500/50"
                                />
                              </div>
                              
                              <div className="flex justify-end">
                                <motion.div 
                                  whileHover={{ scale: 1.03 }}
                                  onHoverStart={() => setHovered(true)}
                                  onHoverEnd={() => setHovered(false)}
                                  className="w-full md:w-auto"
                                >
                                  <Button 
                                    type="submit" 
                                    className="w-full relative overflow-hidden group bg-gradient-to-r from-navy-800 to-navy-900 hover:from-navy-700 hover:to-navy-800 dark:from-navy-700 dark:to-navy-800 dark:hover:from-navy-600 dark:hover:to-navy-700 text-white"
                                    disabled={loading}
                                  >
                                    <span className="relative z-10 flex items-center">
                                      {loading ? "Sending..." : "Submit Request"}
                                      <motion.div
                                        animate={hovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                      </motion.div>
                                    </span>
                                    <motion.div 
                                      className="absolute inset-0 bg-gradient-to-r from-gold-500 to-gold-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      animate={loading ? { width: "100%" } : { width: "0%" }}
                                      transition={{ duration: 1.5 }}
                                    />
                                  </Button>
                                </motion.div>
                              </div>
                            </motion.form>
                          )}
                        </AnimatePresence>
                      </div>
                    </Card>
                  </motion.div>
                  
                  {/* Contact Info Cards */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Contact Card */}
                    <Card className="overflow-hidden relative bg-gradient-to-br from-navy-900 to-navy-800 text-white border-0">
                      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:24px_24px]"></div>
                      <CardContent className="p-8 relative z-10">
                        <div className="mb-8">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-navy-700/50 backdrop-blur-sm border border-navy-600/30 mb-4">
                            <Mail className="h-6 w-6 text-gold-400" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-1">Direct Contact</h3>
                          <p className="text-navy-300">Reach our enterprise team directly</p>
                        </div>
                        
                        <ul className="space-y-5">
                          <li className="flex items-start">
                            <Mail className="h-5 w-5 text-gold-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-navy-300 mb-1">Email</p>
                              <p className="text-white font-medium">enterprise@assetsure.com</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Phone className="h-5 w-5 text-gold-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-navy-300 mb-1">Phone</p>
                              <p className="text-white font-medium">+1 (888) 555-0123</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <Building2 className="h-5 w-5 text-gold-400 mt-0.5 mr-3" />
                            <div>
                              <p className="text-sm text-navy-300 mb-1">Headquarters</p>
                              <p className="text-white font-medium">One Financial Center, Boston, MA 02111</p>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    {/* Demo Card */}
                    <Card className="overflow-hidden bg-white/70 dark:bg-navy-800/70 backdrop-blur-md border border-white/20 dark:border-navy-700/50 shadow-xl dark:shadow-navy-900/30">
                      <CardContent className="p-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold-100 dark:bg-gold-900/30 mb-4">
                          <Sparkles className="h-6 w-6 text-gold-600 dark:text-gold-400" />
                        </div>
                        <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">
                          Schedule a Demo
                        </h3>
                        <p className="text-navy-600 dark:text-navy-300 mb-6">
                          See our enterprise platform in action with a personalized demonstration.
                        </p>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Request Demo
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="locations" className="mt-0">
                <Card className="overflow-hidden bg-white/70 dark:bg-navy-800/70 backdrop-blur-md border border-white/20 dark:border-navy-700/50 shadow-xl dark:shadow-navy-900/30">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-8">
                      Global Presence
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {offices.map((office, index) => (
                        <motion.div
                          key={office.city}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: 0.1 * index }}
                          whileHover={{ y: -5 }}
                          className="relative rounded-xl overflow-hidden bg-white dark:bg-navy-700 shadow-md"
                        >
                          <div className="h-32 bg-navy-100 dark:bg-navy-600 overflow-hidden">
                            <img 
                              src={office.image} 
                              alt={office.city} 
                              className="w-full h-full object-cover object-center"
                            />
                            <div className="absolute top-3 right-3 bg-navy-900/80 text-white text-xs font-medium px-2 py-1 rounded-full">
                              {office.timezone}
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-bold text-navy-900 dark:text-white text-lg mb-1">{office.city}</h4>
                            <p className="text-navy-600 dark:text-navy-300 text-sm mb-3">{office.address}</p>
                            <div className="flex items-center text-navy-500 dark:text-navy-400 text-sm">
                              <Phone className="h-4 w-4 mr-2" />
                              {office.phone}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;