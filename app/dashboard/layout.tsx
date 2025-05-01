"use client"

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function Layout({ children }: DashboardLayoutProps) {
  const router = useRouter()

  // Check if user is authenticated
  useEffect(() => {
    const isWalletConnected = localStorage.getItem('isWalletConnected') === 'true'
    
    if (!isWalletConnected) {
      // Redirect to home if wallet is not connected
      router.push('/')
    }
  }, [router])

  return <DashboardLayout>{children}</DashboardLayout>
}
