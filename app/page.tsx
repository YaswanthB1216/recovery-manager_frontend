"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "@/components/ui/icons"

export default function HomePage() {
  const { isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      router.push("/dashboard")
    }
  }, [isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 size={32} className="text-teal" />
    </div>
  )
}
