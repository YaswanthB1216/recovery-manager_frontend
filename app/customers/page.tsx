"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useVoiceAssistant } from "@/contexts/voice-assistant-context"
import { fetchCustomers, fetchCallLogs, type CustomerRecord, type CallLog, initateCall, fetchTranscriptions, TranscriptLog } from "@/lib/mock-data"
import { formatCurrency, formatDate, formatTime } from "@/lib/utils"
import { useState, useEffect, useMemo } from "react"
import { Search, Phone, Eye, PhoneCall, Play, FileText, Clock, ChevronDown, X } from "@/components/ui/icons"
import { toast,Toaster } from "sonner"

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null)
  const [customerCallLogs, setCustomerCallLogs] = useState<CallLog[]>([])

  const [transcriptions, setTranscriptions] = useState<TranscriptLog[]>([])
  const [visibleTranscripts, setVisibleTranscripts] = useState<{ [key: string]: boolean }>({}) // New state for transcript
  
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("due_date")
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
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

  const handleViewCustomer = async (customer: CustomerRecord) => {
    setSelectedCustomer(customer)
    setIsDialogOpen(true)
    setActiveTab("details")
    setTranscriptions([])
    setVisibleTranscripts({})
    try{
      const logs = await fetchCallLogs(customer.customer_name)
      setCustomerCallLogs(logs)
      const transcriptData = await fetchTranscriptions(customer.customer_name)
      console.log("transcription dat loading",transcriptData)
      setTranscriptions(transcriptData)
    }catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const handlePhoneCall = async(customer: CustomerRecord) =>{
    try{
      console.log("handlePhoneCall method called...")
      const callResponse = await initateCall(customer.customer_name)
      console.log("call response...",callResponse)
      toast.success(`Calling to ${customer.customer_name}`,{
        duration:3000,
        position:"top-right"
      })
    }
    catch(error){
      console.log(`error calling to ${customer.customer_name}`)
      toast.error(`Failed to call ${customer.customer_name}`,{
        duration:3000,
        position:"top-right"
      })
    }
    
  }

  const handleShowConversations = (callId: string) => {
    setVisibleTranscripts((prev) => ({
      ...prev,
      [callId]: !prev[callId],
    }))
  }

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-navy">Customers</h1>
            <p className="text-slate-600 mt-1">Detailed customer records and call management</p>
          </div>
        </div>

        <div className="card w-full max-w-full p-2 sm:p-4">
          <div className="card-header">
            <h2 className="text-base sm:text-lg font-semibold text-navy">Customer Records</h2>
            <p className="text-xs text-slate-600">View detailed customer information and call history</p>
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
                  <option value="no answer">Failed</option>
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
                    <th className="text-xs sm:text-sm">Actions</th>
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
                        <td>
                          <div className="flex items-center gap-1 sm:gap-2">
                            <button
                              onClick={() => handleViewCustomer(customer)}
                              className="button button-outline button-sm"
                              style={{ width: "2rem", height: "2rem", padding: 0 }}
                            >
                              <Eye size={12} />
                            </button>
                            <button
                              onClick={()=>handlePhoneCall(customer)}
                              className="button button-outline button-sm"
                              style={{ width: "2rem", height: "2rem", padding: 0 }}
                            >
                              <PhoneCall size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Detail Dialog */}
        {isDialogOpen && (
          <div className="dialog-overlay" onClick={() => setIsDialogOpen(false)}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-navy">
                      {selectedCustomer?.customer_name} - Customer Details
                    </h2>
                    <p className="text-sm text-slate-600">
                      Comprehensive view of customer information, call logs, and recordings
                    </p>
                  </div>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="button button-outline button-sm"
                    style={{ width: "2rem", height: "2rem", padding: 0 }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {selectedCustomer && (
                <div className="p-6">
                  <div className="tabs">
                    <div className="tabs-list">
                      <button
                        onClick={() => setActiveTab("details")}
                        className={`tabs-trigger ${activeTab === "details" ? "active" : ""}`}
                      >
                        Customer Details
                      </button>
                      <button
                        onClick={() => setActiveTab("calls")}
                        className={`tabs-trigger ${activeTab === "calls" ? "active" : ""}`}
                      >
                        Call History
                      </button>
                      <button
                        onClick={() => setActiveTab("recordings")}
                        className={`tabs-trigger ${activeTab === "recordings" ? "active" : ""}`}
                      >
                        Recordings & Transcripts
                      </button>
                    </div>

                    <div className="tabs-content">
                      {activeTab === "details" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="card">
                              <div className="card-header">
                                <h3 className="text-sm font-medium text-slate-600">Personal Information</h3>
                              </div>
                              <div className="card-content space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Name:</span>
                                  <span className="text-sm font-medium">{selectedCustomer.customer_name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Phone:</span>
                                  <span className="text-sm font-medium">{selectedCustomer.phone_number}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Preferred Callback:</span>
                                  <span className="text-sm font-medium">
                                    {selectedCustomer.preferred_callback_time}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="card">
                              <div className="card-header">
                                <h3 className="text-sm font-medium text-slate-600">Loan Information</h3>
                              </div>
                              <div className="card-content space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Bank:</span>
                                  <span className="text-sm font-medium">{selectedCustomer.bank_name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Loan Type:</span>
                                  <span className="text-sm font-medium">{selectedCustomer.loan_type}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Outstanding:</span>
                                  <span className="text-sm font-medium text-red-600">
                                    {formatCurrency(selectedCustomer.outstanding_amount)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">EMI Amount:</span>
                                  <span className="text-sm font-medium">
                                    {formatCurrency(selectedCustomer.emi_amount)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Due Date:</span>
                                  <span className="text-sm font-medium">{formatDate(selectedCustomer.due_date)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-slate-500">Days Overdue:</span>
                                  <span
                                    className={`text-sm font-medium ${getPriorityColor(selectedCustomer.dpd_days)}`}
                                  >
                                    {selectedCustomer.dpd_days} days
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card">
                            <div className="card-header">
                              <h3 className="text-sm font-medium text-slate-600">Recovery Information</h3>
                            </div>
                            <div className="card-content space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Call Attempts:</span>
                                <span className="text-sm font-medium">{selectedCustomer.number_of_call_attempts}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Agent:</span>
                                <span className="text-sm font-medium">{selectedCustomer.agent_name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Status:</span>
                                <span className={getStatusBadge(selectedCustomer.call_status)}>
                                  {selectedCustomer.call_status.replace("_", " ")}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm text-slate-500">Main Message:</span>
                                <p className="text-sm font-medium mt-1">{selectedCustomer.main_message}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === "calls" && (
                        <div className="space-y-4">
                          {customerCallLogs.length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                              <Phone size={48} className="mx-auto mb-4 text-slate-300" />
                              <p>No call history available for this customer</p>
                            </div>
                          ) : (
                            customerCallLogs.map((log) => (
                              <div key={log.callId} className="card">
                                <div className="card-content p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                                        <Phone size={16} className="text-slate-600" />
                                      </div>
                                      <div>
                                        <p className="font-medium text-slate-900">{formatDate(log.created)}</p>
                                        <p className="text-sm text-slate-500">{formatTime(log.created)}</p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <span
                                        className={`badge ${
                                          log.endReason === "completed"
                                            ? "badge-completed"
                                            : log.endReason === "unjoined"
                                              ? "badge-failed"
                                              : "badge-pending"
                                        }`}
                                      >
                                        {log.endReason}
                                      </span>
                                      {log.maxDuration &&(
                                        <p className="text-sm text-slate-500 mt-1">
                                          Duration: {log.maxDuration}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {log.shortSummary && (
                                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-md">{log.shortSummary}</p>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {activeTab === "recordings" && (
                        <div className="space-y-4">
                          {customerCallLogs.filter((log) => log.recording_url || log.callId).length === 0 ? (
                            <div className="text-center py-8 text-slate-500">
                              <FileText size={48} className="mx-auto mb-4 text-slate-300" />
                              <p>No recordings or transcripts available</p>
                            </div>
                          ) : (
                            customerCallLogs
                              .filter((log) => log.recording_url || log.callId)
                              .map((log) => (
                                <div key={log.callId} className="card">
                                  <div className="card-header">
                                    <h3 className="text-sm font-medium flex items-center gap-2">
                                      <Clock size={16} />
                                      {formatDate(log.created)} - {formatTime(log.created)}
                                    </h3>
                                  </div>
                                  <div className="card-content space-y-4">
                                    {log.recording_url && (
                                      <div>
                                        <h4 className="text-sm font-medium text-slate-700 mb-2">Audio Recording</h4>
                                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
                                          <button className="button button-outline button-sm">
                                            <Play size={12} className="mr-1" />
                                            Play Recording
                                          </button>
                                          <span className="text-sm text-slate-500">
                                            Duration: {formatDuration(log.maxDuration)}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                    <div>
                                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md">
                                        <span className="text-sm font-medium text-slate-700">
                                          Call ID: {log.callId}
                                        </span>
                                        <button
                                          onClick={() => handleShowConversations(log.callId)}
                                          className="button button-outline button-sm"
                                        >
                                          {visibleTranscripts[log.callId] ? "Hide Conversations" : "Show Conversations"}
                                        </button>
                                      </div>
                                      {visibleTranscripts[log.callId] && (
                                        <div className="p-4 bg-slate-50 rounded-md mt-2">
                                          {transcriptions
                                            .filter((transcript) => transcript.callStageId === log.callId)
                                            .length > 0 ? (
                                            transcriptions
                                              .filter((transcript) => transcript.callStageId === log.callId)
                                              .map((transcript, index) => (
                                                <div
                                                  key={index}
                                                  className={`mb-2 p-2 rounded-md ${
                                                    transcript.role === "MESSAGE_ROLE_USER"
                                                      ? "bg-blue-100 text-blue-800"
                                                      : "bg-green-100 text-green-800"
                                                  }`}
                                                >
                                                  <p className="text-sm font-semibold">
                                                    {transcript.role === "MESSAGE_ROLE_USER" ? selectedCustomer.customer_name+":" : "Recovery Manager:"}
                                                  </p>
                                                  <p className="text-sm whitespace-pre-wrap">{transcript.text}</p>
                                                </div>
                                              ))
                                          ) : (
                                            <p className="text-sm text-slate-700">
                                              No conversations available
                                            </p>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Toaster position="top-right" />
    </DashboardLayout>
  )
}
