"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithHubSpot: () => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Auto-login with a default user after a short delay
    const timer = setTimeout(() => {
      const defaultUser: User = {
        id: "1",
        email: "admin@recoverymanager.com",
        name: "Recovery Manager Admin",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Admin",
      }

      setUser(defaultUser)
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
    }

    setUser(mockUser)
    setIsLoading(false)
  }

  const loginWithHubSpot = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser: User = {
      id: "2",
      email: "hubspot.user@company.com",
      name: "HubSpot User",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=HubSpot",
    }

    setUser(mockUser)
    setIsLoading(false)
  }

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
    }

    setUser(mockUser)
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithHubSpot,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}