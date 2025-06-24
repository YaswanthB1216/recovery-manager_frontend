"use client"

import type React from "react"
import { AppSidebar } from "./app-sidebar"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "@/components/ui/icons"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={32} className="text-teal" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-2">Access Required</h1>
          <p className="text-slate-600">Please wait while we set up your session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex main-layout">
      <AppSidebar />
      <main className="main-content">{children}</main>
    </div>
  )
}
