"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader2, Mail, Lock, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isHubSpotLoading, setIsHubSpotLoading] = useState(false)
  const { login, loginWithHubSpot } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await login(email, password)
      toast({
        title: "Login Successful",
        description: "Welcome back to Recovery Manager",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleHubSpotLogin = async () => {
    setIsHubSpotLoading(true)
    try {
      await loginWithHubSpot()
      toast({
        title: "HubSpot Login Successful",
        description: "Connected with HubSpot account",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "HubSpot Login Failed",
        description: "Unable to connect with HubSpot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsHubSpotLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-navy to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">RM</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Recovery Manager</h1>
          <p className="text-slate-400">Professional debt recovery platform</p>
        </div>

        <Card className="border-slate-700 bg-white/95 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-navy">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading || isHubSpotLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading || isHubSpotLoading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-navy hover:bg-navy/90"
                disabled={isLoading || isHubSpotLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-slate-300 hover:bg-slate-50"
              onClick={handleHubSpotLogin}
              disabled={isLoading || isHubSpotLoading}
            >
              {isHubSpotLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Building2 className="mr-2 h-4 w-4" />
                  HubSpot OAuth
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-slate-600 w-full">
              Don't have an account?{" "}
              <Link href="/signup" className="text-teal hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
