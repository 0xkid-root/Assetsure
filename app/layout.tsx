import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from "@radix-ui/react-tooltip"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Assetsure | Enterprise RWA-Backed DeFi Protocol',
  description: 'Professional DeFi protocol for tokenized real-world assets, enabling secure lending and borrowing for enterprise users.',
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}