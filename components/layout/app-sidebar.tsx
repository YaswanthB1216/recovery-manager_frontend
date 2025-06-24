"use client"

import { Calendar, Home, Phone, Users, Settings, LogOut, Mic } from "@/components/ui/icons"
import { useAuth } from "@/contexts/auth-context"
import { useVoiceAssistant } from "@/contexts/voice-assistant-context"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import kaaraLogo from "@/assets/kaara_logo.png"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "Call Logs",
    url: "/call-logs",
    icon: Phone,
  },
  // {
  //   title: "Calendar",
  //   url: "/calendar",
  //   icon: Calendar,
  // },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { user, logout } = useAuth()
  const { isActive, activeCalls, toggleAssistant } = useVoiceAssistant()
  const pathname = usePathname()

  return (
    <div className="sidebar h-full overflow-y-auto">
      <div className="sidebar-content">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center overflow-hidden">
              <Image src={kaaraLogo} alt="Kaara Logo" width={28} height={28} className="object-contain w-full h-full" />
            </div>
            <div>
              <h2 className="text-black font-semibold text-base">Recovery Manager</h2>
              <p className="text-black-400 text-xs">Professional Edition</p>
            </div>
          </div>
        </div>

        <div className="px-3 flex-1">
          <div className="mb-5">
            {/* <div
              className="text-slate-400 text-xs font-semibold mb-2"
              style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              Navigation
            </div> */}
            <div className="space-y-1.5">
              {menuItems.map((item) => (
                <Link key={item.title} href={item.url} className={`menu-item ${pathname === item.url ? "active" : ""} text-sm`}>
                  <item.icon size={15} className="min-w-[15px]" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ height: "1px", backgroundColor: "var(--gray-700)", margin: "0.75rem 0" }}></div>

          <div>
            <div
              className="text-slate-400 text-xs font-semibold mb-2"
              style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              AI Assistant
            </div>
            <div className="p-3 bg-navy-light rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Mic size={15} className="text-slate-300" />
                  <span className="text-slate-300 text-sm">Voice Assistant</span>
                </div>
                <button
                  onClick={toggleAssistant}
                  className={`button button-sm ${isActive ? "button-primary" : "button-outline"}`}
                  style={{
                    backgroundColor: isActive ? "var(--teal)" : "transparent",
                    borderColor: isActive ? "var(--teal)" : "var(--gray-600)",
                    color: isActive ? "var(--white)" : "var(--slate-lighter)",
                    padding: "0.375rem 0.75rem",
                  }}
                >
                  {isActive ? "Active" : "Inactive"}
                </button>
              </div>
              {activeCalls.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-400">
                    {activeCalls.length} active call{activeCalls.length > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-3 p-3 bg-navy-light rounded-lg">
            <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-slate-600">{user?.name?.charAt(0) || "U"}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-slate-400 text-xs truncate">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="button button-sm"
              style={{
                backgroundColor: "transparent",
                color: "var(--slate-lighter)",
                padding: "var(--spacing-1)",
              }}
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
