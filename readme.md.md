# SYNC CLUB — Event Ticketing Engine

A high-performance, mobile-first ticketing web application engineered specifically for Instagram in-app browser conversion, built with Next.js (App Router) and Tailwind CSS.

---

## 1. System Architecture

┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / RUNTIME SHELL                         │
│   max-w-md w-full min-h-screen (Mobile-First In-App Browser Isolation)  │
└───────────────────┬────────────────────────────────┬───────────────────┘
│                                │
▼                                ▼
┌─────────────────────────┐      ┌─────────────────────────┐
│   PUBLIC TICKETING      │      │     HOST CONTROL        │
│   app/page.tsx          │      │     app/admin/page.tsx  │
└────────────┬────────────┘      └────────────┬────────────┘
│                                │
[5-Step Sequential State]         [PIN Authentication Gate]
1. Landing & Metadata             ├── Editor (Event Settings)
2. Tier Selection                 ├── Approvals Queue (UTR Verification)
3. Manual Payment (UPI)           ├── Guest Directory (Approved Roster)
4. Pending Verification State     ├── QR Scanner (Viewfinder Shell)
5. Confirmed Entry Ticket         └── Capacity & Sales Controls
│                                │
└────────────────┬───────────────┘
▼
┌─────────────────────────────┐
│    LOCAL MOCK DATA LAYER    │
│  (Target: Supabase Realtime) │
└─────────────────────────────┘


### Architectural Principles
* **Zero Layout Shift:** Rigid container constraints (`max-w-md w-full min-h-screen mx-auto`) avoid horizontal jitter and unexpected reflows inside webviews.
* **Deterministic Public State:** Step-driven rendering (`step: 1 | 2 | 3 | 4 | 5`) maintained in local state; no URL fragmentation for public checkout steps.
* **Brutalist / Anti-AI Design Standard:** Pure blacks (`#000000`), crisp 1px borders (`border-zinc-800`), bold typographic scaling, zero glassmorphism, zero floating blur orbs, and high-contrast tactile elements.

---

## 2. Detailed Flow of Control

### A. Public Attendee Flow (`app/page.tsx`)

[ Step 1: Landing ]
│  ├── Poster Asset Display
│  ├── Title, Time, & Location (Google Maps Outbound Link)
│  ├── Event Description Block (Full narrative copy)
│  └── Inputs: Full Name + WhatsApp Phone
▼
[ Step 2: Pass Selection ]
│  ├── Evaluate salesOpen (Locks checkout if false)
│  ├── Selectable Tier Cards (Pricing, Perks, Active Border State)
│  └── Validation: Selection required to advance
▼
[ Step 3: Payment Verification ]
│  ├── Static UPI QR Matrix Display
│  ├── Raw UPI ID + One-Tap Clipboard Copy
│  ├── Input: 12-Digit UTR / Transaction Reference
│  └── Action: Submit UTR -> Transitions status to pending_approval
▼
[ Step 4: Verification Queue (Waiting Screen) ]
│  ├── Animated Status Indicator ("Payment Verifying")
│  ├── Realtime Hold State (Awaiting host UTR match)
│  └── (Target: Supabase Realtime listener auto-advances to Step 5)
▼
[ Step 5: Confirmed Digital Ticket ]
├── Unique Ticket Container with Validated Badge
├── Large Attendee Check-In QR Code
└── Attendee Details: Name, Tier, Verification Status


### B. Host Administration Flow (`app/admin/page.tsx`)

[ Secure Access Gate ]
│  └── PIN Protection: Requires valid 4-digit host credential
▼
[ Management Console ]
├── Realtime Metrics Bar
│     ├── Approved Attendee Count
│     ├── Pending Approvals Queue Length
│     └── Gross Revenue Aggregation
│
├── Tab 1: Event Editor
│     ├── Core Metadata (Title, Date, Time, Description)
│     ├── Location Setup & Google Maps Target URL
│     ├── Native Asset Upload (Event Poster)
│     ├── Native Color Picker (Dynamic Theme Variable)
│     └── Host VPA / UPI ID Configuration
│
├── Tab 2: Approvals Queue
│     ├── Unprocessed Registrations (Name, Phone, UTR Reference)
│     └── Actions: "Approve" (Issues Ticket) or "Reject"
│
├── Tab 3: Guest Directory
│     ├── Searchable Directory of all approved attendees
│     └── Check-in and tier auditing
│
├── Tab 4: QR Entry Scanner
│     └── Viewfinder interface for door staff check-in
│
└── Tab 5: Controls & Capacity
├── Maximum Capacity Hard Cap
└── Global Emergency Killswitch (salesOpen: boolean)


---

## 3. Data Contracts & State Structure

```typescript
interface EventConfig {
  title: string;
  posterUrl: string;
  date: string;
  time: string;
  locationName: string;
  locationMapLink: string;
  description: string;
  upiId: string;
  themeColor: string;
  maxCapacity: number;
  salesOpen: boolean;
  tiers: Array<{
    id: number;
    name: string;
    price: number;
    available: boolean;
  }>;
}

interface RegistrationRecord {
  id: string;
  name: string;
  phone: string;
  tierId: number;
  tierName: string;
  utr: string;
  status: 'pending_payment' | 'pending_approval' | 'approved' | 'rejected';
  createdAt: string;
}
4. Antigravity Refinement Checklist
Before integrating the live Supabase client, the following frontend cleanups must be completed:

[ ] Typography Hierarchy: Tighten font weight distribution; ensure descriptions render with legible line-height.

[ ] Location Integration: Ensure tapping the location opens native maps via target="_blank" with zero styling distortion.

[ ] Theme Variable Binding: Verify that changing the hex code in the host editor dynamically updates button states and active tier borders across all public steps.

[ ] Mobile Touch Safety: Confirm all clickable hit areas are ≥ 44px for thumb tap ergonomics.

[ ] Clean Code Standards: Strip out any leftover mock buttons, dead imports, or template styles.