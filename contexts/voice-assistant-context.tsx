"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface VoiceAssistantContextType {
  isActive: boolean
  activeCalls: string[]
  toggleAssistant: () => void
  addActiveCall: (customerId: string) => void
  removeActiveCall: (customerId: string) => void
}

const VoiceAssistantContext = createContext<VoiceAssistantContextType | undefined>(undefined)

export function VoiceAssistantProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [activeCalls, setActiveCalls] = useState<string[]>([])

  useEffect(() => {
    // Mock real-time updates for active calls
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const customerIds = ["1", "2", "3", "4", "5"]
        const randomId = customerIds[Math.floor(Math.random() * customerIds.length)]

        setActiveCalls((prev) => {
          if (prev.includes(randomId)) {
            return prev.filter((id) => id !== randomId)
          } else if (prev.length < 2) {
            return [...prev, randomId]
          }
          return prev
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const toggleAssistant = () => {
    setIsActive(!isActive)
  }

  const addActiveCall = (customerId: string) => {
    setActiveCalls((prev) => [...prev.filter((id) => id !== customerId), customerId])
  }

  const removeActiveCall = (customerId: string) => {
    setActiveCalls((prev) => prev.filter((id) => id !== customerId))
  }

  return (
    <VoiceAssistantContext.Provider
      value={{
        isActive,
        activeCalls,
        toggleAssistant,
        addActiveCall,
        removeActiveCall,
      }}
    >
      {children}
    </VoiceAssistantContext.Provider>
  )
}

export function useVoiceAssistant() {
  const context = useContext(VoiceAssistantContext)
  if (context === undefined) {
    throw new Error("useVoiceAssistant must be used within a VoiceAssistantProvider")
  }
  return context
}