"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { useState } from "react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Yaswanth Bheri",
    email: "yaswanth@example.com",
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  })
  const [theme, setTheme] = useState("system")
  const [twilio, setTwilio] = useState({
    accountSid: "",
    authToken: "",
    phoneNumber: "",
  })
  const [voiceApi, setVoiceApi] = useState({
    apiKey: "",
    apiSecret: "",
  })
  const [webhooks, setWebhooks] = useState({
    callStatus: "",
    recording: "",
  })
  const [hubspot, setHubspot] = useState({
    accessToken: "",
    clientId: "",
    clientSecret: "",
  })

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-6">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {/* Profile */}
          <div className="card w-full max-w-full p-2 sm:p-4">
            <div className="card-header mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-navy">Profile</h2>
            </div>
            <div className="card-content space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Name</label>
                <input
                  className="input text-sm"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Email</label>
                <input
                  className="input text-sm"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Notifications */}

          {/* Twilio Credentials */}
          <div className="card w-full max-w-full p-2 sm:p-4">
            <div className="card-header mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-navy">Twilio Credentials</h2>
            </div>
            <div className="card-content space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Account SID</label>
                <input
                  className="input text-sm"
                  value={twilio.accountSid}
                  onChange={e => setTwilio({ ...twilio, accountSid: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Auth Token</label>
                <input
                  className="input text-sm"
                  value={twilio.authToken}
                  onChange={e => setTwilio({ ...twilio, authToken: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Phone Number</label>
                <input
                  className="input text-sm"
                  value={twilio.phoneNumber}
                  onChange={e => setTwilio({ ...twilio, phoneNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* HubSpot Credentials */}
          <div className="card w-full max-w-full p-2 sm:p-4">
            <div className="card-header mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-navy">HubSpot Credentials</h2>
            </div>
            <div className="card-content space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Access Token</label>
                <input
                  className="input text-sm"
                  value={hubspot.accessToken}
                  onChange={e => setHubspot({ ...hubspot, accessToken: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Client ID</label>
                <input
                  className="input text-sm"
                  value={hubspot.clientId}
                  onChange={e => setHubspot({ ...hubspot, clientId: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Client Secret</label>
                <input
                  className="input text-sm"
                  value={hubspot.clientSecret}
                  onChange={e => setHubspot({ ...hubspot, clientSecret: e.target.value })}
                />
              </div>
            </div>
          </div>
          {/* Voice API Credentials */}
          <div className="card w-full max-w-full p-2 sm:p-4">
            <div className="card-header mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-navy">Voice API Credentials</h2>
            </div>
            <div className="card-content space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">API Key</label>
                <input
                  className="input text-sm"
                  value={voiceApi.apiKey}
                  onChange={e => setVoiceApi({ ...voiceApi, apiKey: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">API Secret</label>
                <input
                  className="input text-sm"
                  value={voiceApi.apiSecret}
                  onChange={e => setVoiceApi({ ...voiceApi, apiSecret: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Webhooks */}
          <div className="card w-full max-w-full p-2 sm:p-4">
            <div className="card-header mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-navy">Webhooks</h2>
            </div>
            <div className="card-content space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Call Status Webhook URL</label>
                <input
                  className="input text-sm"
                  value={webhooks.callStatus}
                  onChange={e => setWebhooks({ ...webhooks, callStatus: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Recording Webhook URL</label>
                <input
                  className="input text-sm"
                  value={webhooks.recording}
                  onChange={e => setWebhooks({ ...webhooks, recording: e.target.value })}
                />
              </div>
            </div>
          </div>
          {/* Preferences */}
          <div className="card w-full max-w-full p-2 sm:p-4">
            <div className="card-header mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-navy">Preferences</h2>
            </div>
            <div className="card-content space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-slate-600">Theme</label>
                <select
                  className="select w-full text-sm"
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                >
                  <option value="system">System Default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card w-full max-w-full p-2 sm:p-4">
            <div className="card-header mb-2">
              <h2 className="text-base sm:text-lg font-semibold text-navy">Notifications</h2>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={e => setNotifications(n => ({ ...n, email: e.target.checked }))}
                  className="checkbox"
                  id="notif-email"
                />
                <label htmlFor="notif-email" className="text-sm">Email Notifications</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={e => setNotifications(n => ({ ...n, sms: e.target.checked }))}
                  className="checkbox"
                  id="notif-sms"
                />
                <label htmlFor="notif-sms" className="text-sm">SMS Notifications</label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
} 