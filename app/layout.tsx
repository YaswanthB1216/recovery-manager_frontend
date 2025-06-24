import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { VoiceAssistantProvider } from "@/contexts/voice-assistant-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Recovery Manager",
  description: "Professional debt recovery management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <VoiceAssistantProvider>{children}</VoiceAssistantProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
