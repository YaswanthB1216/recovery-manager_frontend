"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useVoiceAssistant } from "@/contexts/voice-assistant-context"
import { fetchCustomers, type CustomerRecord } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useState, useEffect, useMemo } from "react"
import { Search, Phone, DollarSign, Users, AlertTriangle, Eye, PhoneCall, ChevronDown } from "@/components/ui/icons"

export default function DashboardPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("due_date")
  const [isLoading, setIsLoading] = useState(true)
  const { activeCalls } = useVoiceAssistant()

  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true)
      setTimeout(async () => {
        const data = await fetchCustomers()
        setCustomers(data)
        setIsLoading(false)
      }, 500)
    }
    loadCustomers()
  }, [])

  const filteredAndSortedCustomers = useMemo(() => {
    const filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.bank_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone_number.includes(searchTerm)

      const matchesStatus = statusFilter === "all" || customer.call_status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "due_date":
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
        case "outstanding_amount":
          return b.outstanding_amount - a.outstanding_amount
        case "customer_name":
          return a.customer_name.localeCompare(b.customer_name)
        case "dpd_days":
          return b.dpd_days - a.dpd_days
        default:
          return 0
      }
    })
  }, [customers, searchTerm, statusFilter, sortBy])

  const stats = useMemo(() => {
    const totalOutstanding = customers.reduce((sum, customer) => sum + customer.outstanding_amount, 0)
    const totalCustomers = customers.length
    const pendingCalls = customers.filter((c) => c.call_status === "pending" || "Pending").length
    const overdueCustomers = customers.filter((c) => c.dpd_days > 30).length

    return {
      totalOutstanding,
      totalCustomers,
      pendingCalls,
      overdueCustomers,
    }
  }, [customers])

  const getStatusBadge = (status: string) => {
    const baseClasses = "badge"
    switch (status.toLowerCase()) {
      case "pending":
        return `${baseClasses} badge-pending`
      case "connected":
        return `${baseClasses} badge-completed`
      case "no answer":
        return `${baseClasses} badge-failed`
      case "in_progress":
        return `${baseClasses} badge-in-progress`
      default:
        return `${baseClasses}`
    }
  }

  const getPriorityColor = (dpdDays: number) => {
    if (dpdDays > 60) return "text-red-600"
    if (dpdDays > 30) return "text-orange-600"
    if (dpdDays > 15) return "text-yellow-600"
    return "text-green-600"
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">Dashboard</h1>
            <p className="text-slate-600 mt-1">Monitor and manage customer recovery activities</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge badge-outline">{activeCalls.length} Active Calls</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="card w-full max-w-full">
              <div className="card-header flex items-center justify-between pb-2">
                <h3 className="text-xs sm:text-sm font-medium text-slate-600">Total Outstanding</h3>
                <DollarSign size={16} className="text-slate-400" />
              </div>
              <div className="card-content">
                <div className="text-base sm:text-lg md:text-xl font-bold text-navy">{formatCurrency(stats.totalOutstanding)}</div>
                <p className="text-xs text-slate-500 mt-1">Across all customers</p>
              </div>
            </div>

            <div className="card w-full max-w-full">
              <div className="card-header flex items-center justify-between pb-2">
                <h3 className="text-xs sm:text-sm font-medium text-slate-600">Total Customers</h3>
                <Users size={16} className="text-slate-400" />
              </div>
              <div className="card-content">
                <div className="text-base sm:text-lg md:text-xl font-bold text-navy">{stats.totalCustomers}</div>
                <p className="text-xs text-slate-500 mt-1">Active accounts</p>
              </div>
            </div>

            <div className="card w-full max-w-full">
              <div className="card-header flex items-center justify-between pb-2">
                <h3 className="text-xs sm:text-sm font-medium text-slate-600">Pending Calls</h3>
                <Phone size={16} className="text-slate-400" />
              </div>
              <div className="card-content">
                <div className="text-base sm:text-lg md:text-xl font-bold text-orange-600">{stats.pendingCalls}</div>
                <p className="text-xs text-slate-500 mt-1">Awaiting contact</p>
              </div>
            </div>

            <div className="card w-full max-w-full">
              <div className="card-header flex items-center justify-between pb-2">
                <h3 className="text-xs sm:text-sm font-medium text-slate-600">High Priority</h3>
                <AlertTriangle size={16} className="text-slate-400" />
              </div>
              <div className="card-content">
                <div className="text-base sm:text-lg md:text-xl font-bold text-red-600">{stats.overdueCustomers}</div>
                <p className="text-xs text-slate-500 mt-1">{"> 30 days overdue"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Records */}
        <div className="card w-full max-w-full p-2 sm:p-4">
          <div className="card-header">
            <h2 className="text-base sm:text-lg font-semibold text-navy">Customer Records</h2>
            <p className="text-xs text-slate-600">Manage and track customer recovery activities</p>
          </div>
          <div className="card-content">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search customers, banks, or phone numbers..."
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
                  <option value="pending">Pending</option>
                  <option value="connected">Completed</option>
                  <option value="No answer">Failed</option>
                  <option value="in_progress">In Progress</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative w-full sm:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select w-full appearance-none text-sm"
                >
                  <option value="due_date">Due Date</option>
                  <option value="outstanding_amount">Amount</option>
                  <option value="customer_name">Customer Name</option>
                  <option value="dpd_days">Days Overdue</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Customer Table */}
            <div className="rounded-md border overflow-x-auto">
              <table className="table min-w-[700px] text-xs sm:text-sm">
                <thead>
                  <tr>
                    <th className="text-xs sm:text-sm">Customer</th>
                    <th className="text-xs sm:text-sm">Bank</th>
                    <th className="text-xs sm:text-sm">Loan Type</th>
                    <th className="text-xs sm:text-sm">Outstanding</th>
                    <th className="text-xs sm:text-sm">EMI</th>
                    <th className="text-xs sm:text-sm">Due Date</th>
                    <th className="text-xs sm:text-sm">DPD</th>
                    <th className="text-xs sm:text-sm">Status</th>
                    {/* <th className="text-xs sm:text-sm">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index}>
                        <td colSpan={9} className="text-center py-8">
                          <div className="flex items-center space-x-4">
                            <div className="loading-skeleton rounded-full h-10 w-10"></div>
                            <div className="flex-1 space-y-2 py-1">
                              <div className="loading-skeleton h-4 rounded" style={{ width: "75%" }}></div>
                              <div className="loading-skeleton h-4 rounded" style={{ width: "50%" }}></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : filteredAndSortedCustomers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-8 text-slate-500">
                        No customers found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredAndSortedCustomers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="relative">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-200 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-slate-600">
                                  {customer.customer_name.charAt(0)}
                                </span>
                              </div>
                              {activeCalls.includes(customer.id) && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-slate-900 text-xs sm:text-sm">{customer.customer_name}</div>
                              <div className="text-xs text-slate-500">{customer.phone_number}</div>
                            </div>
                          </div>
                        </td>
                        <td className="font-medium text-slate-700 text-xs sm:text-sm">{customer.bank_name}</td>
                        <td className="text-slate-600 text-xs sm:text-sm">{customer.loan_type}</td>
                        <td className="font-semibold text-slate-900 text-xs sm:text-sm">{formatCurrency(customer.outstanding_amount)}</td>
                        <td className="text-slate-600 text-xs sm:text-sm">{formatCurrency(customer.emi_amount)}</td>
                        <td className="text-slate-600 text-xs sm:text-sm">{formatDate(customer.due_date)}</td>
                        <td>
                          <span className={`font-semibold ${getPriorityColor(customer.dpd_days)} text-xs sm:text-sm`}>
                            {customer.dpd_days} days
                          </span>
                        </td>
                        <td>
                          <span className={getStatusBadge(customer.call_status) + ' text-xs sm:text-sm'}>
                            {customer.call_status.replace("_", " ")}
                          </span>
                        </td>
                        {/* <td>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              className="button button-outline button-sm"
                              style={{ width: "2rem", height: "2rem", padding: 0 }}
                            >
                              <Eye size={12} />
                            </button>
                            <button
                              className="button button-outline button-sm"
                              style={{ width: "2rem", height: "2rem", padding: 0 }}
                            >
                              <PhoneCall size={12} />
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
