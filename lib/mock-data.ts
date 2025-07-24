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


// const live_url = "https://recovery-agent-kaara-tech.lemoncoast-3e44e81a.eastus2.azurecontainerapps.io"
// const live_url = "http://localhost:8000"
const live_url = "https://recovery-agent.lemonglacier-2b0560d0.southindia.azurecontainerapps.io"

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
  callId: string
  customer_id: string
  created: string
  ended: string
  endReason: string
  maxDuration:number
  voice:string
  shortSummary?:string
}

export interface PhoneCallResponse{
  "call_sid":string,
  "join_url":string,
  "call_id":string,
  "message":string
}

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN || '';
// const HUBSPOT_API_URL = 'http://localhost:8000/api/hubspot-contacts';
const HUBSPOT_API_URL = `${live_url}/api/hubspot-contacts`;

// const INITIATE_CALL_URL = "http://localhost:8000/initiate-call"
const INITIATE_CALL_URL = `${live_url}/initiate-call`

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

// export async function fetchCallLogs(customer_name: string): Promise<CallLog[]> {
//   try {
//     // Retrieve customer data from localStorage
//     const local_customers_raw_data = localStorage.getItem('customers');
//     if (!local_customers_raw_data) {
//       console.log('No customers data found in localStorage');
//       return [];
//     }

//     let local_customers_data;
//     try {
//       local_customers_data = JSON.parse(local_customers_raw_data);
//     } catch (e) {
//       console.warn('Invalid customers data format in localStorage:', e);
//       return [];
//     }

//     // Check if local_customers_data is a valid object
//     if (!local_customers_data || typeof local_customers_data !== 'object') {
//       console.warn('Invalid customers data format in localStorage');
//       return [];
//     }

//     // Check if callIds exist for the customer
//     const callIds = local_customers_data[customer_name] || [];
//     if (!callIds || !Array.isArray(callIds) || callIds.length === 0) {
//       console.log(`No call IDs found for customer ${customer_name}`);
//       return [];
//     }

//     // Fetch each call log for each call_id
//     const callLogPromises = callIds.map(async (callId: string) => {
//       try {
//         const response = await fetch(`http://localhost:8001/call/${callId}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           console.error(`Error fetching call log for call_id ${callId}: ${response.statusText}`);
//           return null; // Return null for failed requests
//         }

//         const responseData = await response.json();
//         const log = responseData.data || responseData.results || responseData || {};

//         return {
//             callId: log.callId,
//             created:log.created,
//             ended:log.ended,
//             endReason: log.endReason,
//             maxDuration:log.maxDuration,
//             voice:log.voice,
//             shortSummary:log.shortSummary?? ''
//         };
//       } catch (error) {
//         console.error(`Error fetching call log for call_id ${callId}:`, error);
//         return null;
//       }
//     });

//     // Wait for all API calls to complete and filter out null results
//     const callLogs = (await Promise.all(callLogPromises)).filter((log): log is CallLog => log !== null);

//     return callLogs;
//   } catch (error) {
//     console.error('Error fetching call logs from API:', error);
//     return [];
//   }
// }


export interface CallLog {
  callId: string;
  customer_id: string;
  created: string;
  ended: string;
  endReason: string;
  maxDuration: number;
  voice: string;
  shortSummary?: string; // Optional
  recording_url:string
}

export interface TranscriptLog {
  role: string;
  text: string;
  callStageId: string;
  customer_id: string;
}

export async function fetchCallLogs(customer_name: string): Promise<CallLog[]> {
  try {
    // Retrieve customer data from localStorage
    const local_customers_raw_data = localStorage.getItem('customers');
    if (!local_customers_raw_data) {
      console.log('No customers data found in localStorage');
      return [];
    }

    let local_customers_data;
    try {
      local_customers_data = JSON.parse(local_customers_raw_data);
    } catch (e) {
      console.warn('Invalid customers data format in localStorage:', e);
      return [];
    }

    // Check if local_customers_data is a valid object
    if (!local_customers_data || typeof local_customers_data !== 'object') {
      console.warn('Invalid customers data format in localStorage');
      return [];
    }

    // Check if callIds exist for the customer
    const callIds = local_customers_data[customer_name] || [];
    if (!callIds || !Array.isArray(callIds) || callIds.length === 0) {
      console.log(`No call IDs found for customer ${customer_name}`);
      return [];
    }

    // To get the latest callId first
    const reverseCallIds = [...callIds].reverse();

    // Fetch each call log for each call_id
    const callLogPromises = reverseCallIds.map(async (callId: string): Promise<CallLog | null> => {
      try {
        const response = await fetch(`${live_url}/call/${callId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`Error fetching call log for call_id ${callId}: ${response.statusText}`);
          return null;
        }

        const responseData = await response.json();
        const log = responseData.data || responseData.results || responseData || {};

        return {
          callId: log.callId,
          customer_id: customer_name, // Use customer_name from the function parameter
          created: log.created,
          ended: log.ended,
          endReason: log.endReason,
          maxDuration: log.maxDuration,
          voice: log.voice,
          shortSummary: log.shortSummary ?? '', // Default to empty string if undefined
          recording_url:''
        };
      } catch (error) {
        console.error(`Error fetching call log for call_id ${callId}:`, error);
        return null;
      }
    });

    // Resolve all promises and filter out null results
    const callLogs = (await Promise.all(callLogPromises)).filter((log): log is CallLog => log !== null);

    return callLogs;
  } catch (error) {
    console.error('Unexpected error in fetchCallLogs:', error);
    return [];
  }
}

export async function fetchTranscriptions(customer_name: string): Promise<TranscriptLog[]> {
  try {
    // Retrieve customer data from localStorage
    const local_customers_raw_data = localStorage.getItem('customers');
    if (!local_customers_raw_data) {
      console.log('No customers data found in localStorage');
      return [];
    }

    let local_customers_data;
    try {
      local_customers_data = JSON.parse(local_customers_raw_data);
    } catch (e) {
      console.warn('Invalid customers data format in localStorage:', e);
      return [];
    }

    // Check if local_customers_data is a valid object
    if (!local_customers_data || typeof local_customers_data !== 'object') {
      console.warn('Invalid customers data format in localStorage');
      return [];
    }

    // Check if callIds exist for the customer
    const callIds = local_customers_data[customer_name] || [];
    if (!callIds || !Array.isArray(callIds) || callIds.length === 0) {
      console.log(`No call IDs found for customer ${customer_name}`);
      return [];
    }

    // To get the latest callId first
    const reverseCallIds = [...callIds].reverse();

    // Fetch each call log for each call_id
    const callLogPromises = reverseCallIds.map(async (callId: string): Promise<TranscriptLog[]> => {
      try {
        const response = await fetch(`${live_url}/fetch-transcript/${callId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`Error fetching call log for call_id ${callId}: ${response.statusText}`);
          return [];
        }

        const responseData = await response.json();
        console.log("response Data..",responseData)
        const results = responseData.results || [];
        console.log("results..",results)

        // The first object in results should contain call_id
        const call_id = results[0]?.call_id;
        if (!call_id) {
          console.warn(`No call_id found in results for call_id ${callId}`);
          return [];
        }
      // Map transcription objects, using call_id as callStageId
      return results
        .filter((log: any) => log.role && log.text) // Only include objects with role and text
        .map((log: any) => ({
          role: log.role,
          text: log.text,
          callStageId: call_id, // Use call_id from the first object
          customer_id: customer_name,
        }));
      } catch (error) {
        console.error(`Error fetching call log for call_id ${callId}:`, error);
        return [];
      }
    });

    // Resolve all promises and filter out null results
    const callLogs = (await Promise.all(callLogPromises)).flat().filter((log): log is TranscriptLog => log !== null);
    console.log("callLogs...",callLogs)
    return callLogs;
  } catch (error) {
    console.error('Unexpected error in fetchCallLogs:', error);
    return [];
  }
}

export async function initateCall(customerName:string): Promise<PhoneCallResponse[]>{
  try {
    const payload = {
      customer_name:customerName
    }

    const response = await fetch(`${INITIATE_CALL_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    if(!response.ok){
      throw new Error(`Initiate call error: ${response.statusText}`);
    }
    const responseData = await response.json();
    // Retrieve existing customers data from localStorage
    let customers = JSON.parse(localStorage.getItem('customers') || '{}');
    console.log(customers)

    // Initialize array for customer if it doesn't exist
    if (!customers[customerName]) {
      customers[customerName] = [];
    }

    // Append the new call_id if it's not already in the array
    if (!customers[customerName].includes(responseData.call_id)) {
      customers[customerName].push(responseData.call_id);
    }

    // Save updated data back to localStorage
    localStorage.setItem('customers', JSON.stringify(customers));
    return responseData
  }
  catch(error){
    return []
  }
}