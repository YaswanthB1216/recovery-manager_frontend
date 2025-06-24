// export interface CustomerRecord {
//   id: string
//   bank_name: string
//   customer_name: string
//   loan_type: string
//   outstanding_amount: number
//   missed_emi_count: number
//   emi_amount: number
//   due_date: string
//   proposed_months: number
//   amount: number
//   months: number
//   phone_number: string
//   call_status: "pending" | "completed" | "failed" | "in_progress"
//   number_of_call_attempts: number
//   call_lifted_time?: string
//   secure_payment_link: string
//   preferred_callback_time: string
//   main_message: string
//   dpd_days: number
//   date: string
//   agent_name: string
// }

// export interface CallLog {
//   id: string
//   customer_id: string
//   date: string
//   duration: number
//   status: "completed" | "missed" | "busy"
//   agent_name: string
//   recording_url?: string
//   transcript?: string
//   notes: string
// }

// export const mockCustomers: CustomerRecord[] = [
//   {
//     id: "1",
//     bank_name: "HDFC Bank",
//     customer_name: "Rajesh Kumar",
//     loan_type: "Personal Loan",
//     outstanding_amount: 125000,
//     missed_emi_count: 3,
//     emi_amount: 8500,
//     due_date: "2024-01-15",
//     proposed_months: 6,
//     amount: 125000,
//     months: 24,
//     phone_number: "+91-9876543210",
//     call_status: "pending",
//     number_of_call_attempts: 2,
//     secure_payment_link: "https://pay.hdfc.com/secure/rajesh-kumar-123",
//     preferred_callback_time: "10:00 AM - 12:00 PM",
//     main_message: "Customer requested payment plan restructuring",
//     dpd_days: 45,
//     date: "2024-01-10",
//     agent_name: "Priya Sharma",
//   },
//   {
//     id: "2",
//     bank_name: "ICICI Bank",
//     customer_name: "Anita Desai",
//     loan_type: "Home Loan",
//     outstanding_amount: 2500000,
//     missed_emi_count: 1,
//     emi_amount: 35000,
//     due_date: "2024-01-20",
//     proposed_months: 3,
//     amount: 2500000,
//     months: 240,
//     phone_number: "+91-9876543211",
//     call_status: "completed",
//     number_of_call_attempts: 1,
//     call_lifted_time: "2024-01-10T14:30:00Z",
//     secure_payment_link: "https://pay.icici.com/secure/anita-desai-456",
//     preferred_callback_time: "2:00 PM - 4:00 PM",
//     main_message: "Payment confirmed for next EMI",
//     dpd_days: 15,
//     date: "2024-01-08",
//     agent_name: "Amit Singh",
//   },
//   {
//     id: "3",
//     bank_name: "SBI",
//     customer_name: "Mohammed Ali",
//     loan_type: "Car Loan",
//     outstanding_amount: 450000,
//     missed_emi_count: 2,
//     emi_amount: 12000,
//     due_date: "2024-01-12",
//     proposed_months: 4,
//     amount: 450000,
//     months: 60,
//     phone_number: "+91-9876543212",
//     call_status: "in_progress",
//     number_of_call_attempts: 3,
//     secure_payment_link: "https://pay.sbi.com/secure/mohammed-ali-789",
//     preferred_callback_time: "6:00 PM - 8:00 PM",
//     main_message: "Customer facing temporary financial difficulties",
//     dpd_days: 30,
//     date: "2024-01-05",
//     agent_name: "Sunita Patel",
//   },
//   {
//     id: "4",
//     bank_name: "Axis Bank",
//     customer_name: "Deepika Reddy",
//     loan_type: "Business Loan",
//     outstanding_amount: 750000,
//     missed_emi_count: 4,
//     emi_amount: 25000,
//     due_date: "2024-01-08",
//     proposed_months: 8,
//     amount: 750000,
//     months: 36,
//     phone_number: "+91-9876543213",
//     call_status: "failed",
//     number_of_call_attempts: 5,
//     secure_payment_link: "https://pay.axis.com/secure/deepika-reddy-101",
//     preferred_callback_time: "11:00 AM - 1:00 PM",
//     main_message: "Multiple failed contact attempts",
//     dpd_days: 60,
//     date: "2024-01-03",
//     agent_name: "Rahul Gupta",
//   },
//   {
//     id: "5",
//     bank_name: "Kotak Bank",
//     customer_name: "Vikram Joshi",
//     loan_type: "Personal Loan",
//     outstanding_amount: 180000,
//     missed_emi_count: 1,
//     emi_amount: 9500,
//     due_date: "2024-01-25",
//     proposed_months: 2,
//     amount: 180000,
//     months: 24,
//     phone_number: "+91-9876543214",
//     call_status: "pending",
//     number_of_call_attempts: 1,
//     secure_payment_link: "https://pay.kotak.com/secure/vikram-joshi-202",
//     preferred_callback_time: "9:00 AM - 11:00 AM",
//     main_message: "First contact attempt scheduled",
//     dpd_days: 10,
//     date: "2024-01-12",
//     agent_name: "Meera Nair",
//   },
// ]

// export const mockCallLogs: CallLog[] = [
//   {
//     id: "1",
//     customer_id: "1",
//     date: "2024-01-10T10:30:00Z",
//     duration: 480,
//     status: "completed",
//     agent_name: "Priya Sharma",
//     recording_url: "/mock-recording-1.mp3",
//     transcript:
//       "Agent: Hello Mr. Kumar, this is Priya from HDFC Bank recovery department. How are you today?\n\nCustomer: Hello, I'm doing okay. I know why you're calling.\n\nAgent: I'm calling regarding your personal loan account. I see you've missed your last 3 EMI payments. Can you help me understand your current situation?\n\nCustomer: Yes, I've been facing some financial difficulties due to a job change. I'm looking for a way to restructure my payment plan.\n\nAgent: I understand your situation. Let me see what options we have available for you. We can potentially extend your payment terms or adjust your EMI amount. Would you be interested in discussing this further?\n\nCustomer: Yes, that would be very helpful. What are my options?\n\nAgent: I can offer you a restructured plan with reduced EMI for the next 6 months. This would help you get back on track. I'll send you the details via email and SMS.\n\nCustomer: That sounds good. Thank you for being understanding.\n\nAgent: You're welcome. I'll follow up with you next week to finalize the arrangement. Have a good day!",
//     notes: "Customer agreed to payment plan restructuring. Will follow up next week with final terms.",
//   },
//   {
//     id: "2",
//     customer_id: "1",
//     date: "2024-01-08T15:45:00Z",
//     duration: 0,
//     status: "missed",
//     agent_name: "Priya Sharma",
//     notes: "No response, left voicemail regarding overdue payment",
//   },
//   {
//     id: "3",
//     customer_id: "2",
//     date: "2024-01-10T14:30:00Z",
//     duration: 720,
//     status: "completed",
//     agent_name: "Amit Singh",
//     recording_url: "/mock-recording-2.mp3",
//     transcript:
//       "Agent: Good afternoon Mrs. Desai, I am calling from ICICI Bank regarding your home loan account.\n\nCustomer: Yes, hello. I was expecting your call.\n\nAgent: I see that your EMI payment for this month is due. Can you confirm when you'll be making the payment?\n\nCustomer: I can make the payment today itself. I had some delay due to a bank transfer issue, but it's resolved now.\n\nAgent: That's great to hear. The due amount is ₹35,000. You can make the payment through our online portal or visit the nearest branch.\n\nCustomer: I'll do it online right now. Can you send me the payment link?\n\nAgent: I'm sending you the secure payment link via SMS. You should receive it within a few minutes.\n\nCustomer: Perfect. I'll make the payment immediately and send you the confirmation.\n\nAgent: Thank you for your cooperation. Is there anything else I can help you with today?\n\nCustomer: No, that's all. Thank you for the reminder.\n\nAgent: You're welcome. Have a great day!",
//     notes: "Payment confirmed for next EMI. Customer very cooperative.",
//   },
// ]

// export function fetchCustomers(): CustomerRecord[] {
//   return mockCustomers
// }

// export function fetchCustomer(id: string): CustomerRecord | null {
//   return mockCustomers.find((customer) => customer.id === id) || null
// }

// export function fetchCallLogs(customerId: string): CallLog[] {
//   return mockCallLogs.filter((log) => log.customer_id === customerId)
// }


export interface CustomerRecord {
  id: string
  bank_name: string
  customer_name: string
  loan_type: string
  outstanding_amount: number
  missed_emi_count: number
  emi_amount: number
  due_date: string
  proposed_months: number
  amount: number
  months: number
  phone_number: string
  call_status: "pending" | "completed" | "failed" | "in_progress"
  number_of_call_attempts: number
  call_lifted_time?: string
  secure_payment_link: string
  preferred_callback_time: string
  main_message: string
  dpd_days: number
  date: string
  agent_name: string
}

export interface CallLog {
  id: string
  customer_id: string
  date: string
  duration: number
  status: "completed" | "missed" | "busy"
  agent_name: string
  recording_url?: string
  transcript?: string
  notes: string
}

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';
const HUBSPOT_API_URL = 'http://localhost:8000/api/hubspot-contacts';

const properties = [
  'bank_name',
  'customer_name',
  'loan_type',
  'outstanding_amount',
  'missed_emi_count',
  'emi_amount',
  'due_date',
  'proposed_months',
  'amount',
  'months',
  'phone_number',
  'call_status',
  'number_of_call_attempts',
  'call_lifted_time',
  'secure_payment_link',
  'preferred_callback_time',
  'dpd_days',
  'date',
  'agent_name',
  'main_message'
];

async function fetchFromHubSpot(queryParams: string = ''): Promise<CustomerRecord[]> {
  try {
    const response = await fetch(`${HUBSPOT_API_URL}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    const responseData = await response.json();
    
    // Handle the new response format with data array
    const contacts = responseData.data || responseData.results || [];
    
    return contacts.map((contact: any, index: number) => ({
      id: contact.id || `customer-${index + 1}`,
      bank_name: contact.bank_name || '',
      customer_name: contact.customer_name || '',
      loan_type: contact.loan_type || '',
      outstanding_amount: parseFloat(contact.outstanding_amount?.replace(/[₹,]/g, '') || '0'),
      missed_emi_count: parseInt(contact.missed_emi_count || '0'),
      emi_amount: parseFloat(contact.emi_amount?.replace(/[₹,]/g, '') || '0'),
      due_date: contact.due_date || '',
      proposed_months: parseInt(contact.proposed_months || '0'),
      amount: parseFloat(contact.amount?.replace(/[₹,]/g, '') || '0'),
      months: parseInt(contact.months || '0'),
      phone_number: contact.phone_number || '',
      call_status: contact.call_status || 'pending',
      number_of_call_attempts: parseInt(contact.number_of_call_attempts || '0'),
      call_lifted_time: contact.call_lifted_time || undefined,
      secure_payment_link: contact.secure_payment_link || '',
      preferred_callback_time: contact.preferred_callback_time || '',
      main_message: contact.main_message || '',
      dpd_days: parseInt(contact.dpd_days || '0'),
      date: contact.date || '',
      agent_name: contact.agent_name || ''
    }));
  } catch (error) {
    console.error('Error fetching from HubSpot:', error);
    return [];
  }
}

export async function fetchCustomers(): Promise<CustomerRecord[]> {
  const queryParams = `properties=${properties.join(',')}&limit=100`;
  return await fetchFromHubSpot(queryParams);
}

export async function fetchCustomer(id: string): Promise<CustomerRecord | null> {
  const queryParams = `properties=${properties.join(',')}`;
  const customers = await fetchFromHubSpot(queryParams);
  return customers.find(customer => customer.id === id) || null;
}

// Note: CallLog fetching would require a different HubSpot object type (likely custom object or engagements)
// This implementation assumes CallLogs are not stored in the same contacts endpoint
export async function fetchCallLogs(customerId: string): Promise<CallLog[]> {
  // Placeholder for CallLog API implementation
  // Would need to know the specific HubSpot endpoint for call logs
  console.warn('CallLog fetching not implemented - requires specific HubSpot endpoint');
  return [];
}