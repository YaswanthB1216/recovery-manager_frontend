"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useMemo, useState } from "react"
import { formatDate } from "@/lib/utils"
import { Search, Phone, ChevronDown } from "@/components/ui/icons"

const dummyCustomers = [
  { id: "1", customer_name: "Vikram Rao", phone_number: "+919586217274" },
  { id: "2", customer_name: "Yaswanth Bheri", phone_number: "+918919025218" },
  { id: "3", customer_name: "Neha Joshi", phone_number: "+919805691066" },
]

const dummyCallLogs = [
  { id: "101", customer_id: "1", agent_name: "Priya Sharma", date: "2025-06-20T10:30:00Z", status: "completed", duration: 480 },
  { id: "102", customer_id: "2", agent_name: "Amit Singh", date: "2025-06-19T14:30:00Z", status: "missed", duration: 0 },
  { id: "103", customer_id: "3", agent_name: "Neha Verma", date: "2025-06-18T09:15:00Z", status: "busy", duration: 0 },
  { id: "104", customer_id: "1", agent_name: "Priya Sharma", date: "2025-06-17T16:45:00Z", status: "completed", duration: 300 },
]

export default function CallLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isLoading] = useState(false)

  const filteredLogs = useMemo(() => {
    return dummyCallLogs.filter((log) => {
      const customer = dummyCustomers.find(c => c.id === log.customer_id)
      const matchesSearch =
        !searchTerm ||
        (customer && (
          customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone_number.includes(searchTerm)
        ))
      const matchesStatus = statusFilter === "all" || log.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <span className="badge badge-completed text-xs">Completed</span>
      case "missed":
        return <span className="badge badge-failed text-xs">Missed</span>
      case "busy":
        return <span className="badge badge-pending text-xs">Busy</span>
      default:
        return <span className="badge text-xs">{status}</span>
    }
  }

  function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">Call Logs</h1>
            <p className="text-slate-600 mt-1">View and filter all customer call logs</p>
          </div>
        </div>
        <div className="card w-full p-2 sm:p-4">
          <div className="card-header">
            <h2 className="text-base sm:text-lg font-semibold text-navy">Call Logs</h2>
            <p className="text-xs text-slate-600">All customer call history</p>
          </div>
          <div className="card-content">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by customer name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input text-sm"
                  style={{ paddingLeft: "2.5rem" }}
                />
              </div>
              <div className="relative w-full sm:w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="select w-full appearance-none text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="missed">Missed</option>
                  <option value="busy">Busy</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="card p-4 flex items-center gap-4 animate-pulse w-full">
                    <div className="loading-skeleton rounded-full h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="loading-skeleton h-4 rounded" style={{ width: "75%" }}></div>
                      <div className="loading-skeleton h-4 rounded" style={{ width: "50%" }}></div>
                    </div>
                  </div>
                ))
              ) : filteredLogs.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No call logs found matching your criteria
                </div>
              ) : (
                filteredLogs.map((log, idx) => {
                  const customer = dummyCustomers.find(c => c.id === log.customer_id)
                  return (
                    <div key={log.id || idx} className="card flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 w-full">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                          <Phone size={18} className="text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 text-sm truncate">{customer?.customer_name || "-"}</div>
                          <div className="text-xs text-slate-500 truncate">{customer?.phone_number || "-"}</div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 items-start sm:items-center">
                        <div className="text-xs text-slate-500">Agent: <span className="font-medium text-slate-700">{log.agent_name}</span></div>
                        <div className="text-xs text-slate-500">{formatDate(log.date)}</div>
                        <div>{getStatusBadge(log.status)}</div>
                        <div className="text-xs text-slate-500">{log.duration > 0 ? `Duration: ${formatDuration(log.duration)}` : null}</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 