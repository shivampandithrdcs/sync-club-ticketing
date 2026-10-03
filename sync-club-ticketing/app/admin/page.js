'use client';

import { useState } from 'react';
import {
  Lock, Search, QrCode, Signal, Wifi, BatteryFull, LogOut,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// GLOBAL MOCK STATE
// ─────────────────────────────────────────────────────────────
const initialEventData = {
  title: 'Sync Club: Neon Nights',
  posterUrl: '/placeholder.jpg',
  date: 'Sat, Oct 24',
  time: '10:00 PM',
  locationName: 'Ambition Hoops Academy',
  locationMapLink: 'https://maps.google.com/?q=Haridwar',
  description:
    'Join us for an evening of deep electronic grooves. High-energy pickup basketball meets underground sonic frequencies.',
  upiId: 'syncclub@ybl',
  themeColor: '#FF5500',
  maxCapacity: 200,
  salesOpen: true,
  tiers: [
    { id: 1, name: 'General Access', price: 1499 },
    { id: 2, name: 'VIP', price: 2999 },
  ],
};

const initialQueue = [
  { id: 1, name: 'Arjun Mehta', phone: '+91 98765 43210', utr: '402183746512', tier: 'General Access', amount: 1499 },
  { id: 2, name: 'Sana Kapoor', phone: '+91 91234 56789', utr: '509238475611', tier: 'VIP', amount: 2999 },
  { id: 3, name: 'Rohit Verma', phone: '+91 99887 76655', utr: '618293041755', tier: 'General Access', amount: 1499 },
  { id: 4, name: 'Ishita Nair', phone: '+91 90011 22334', utr: '726384950166', tier: 'VIP', amount: 2999 },
];

const initialGuests = [
  { id: 101, name: 'Kabir Malhotra', phone: '+91 98111 22333', tier: 'General Access' },
  { id: 102, name: 'Meera Joshi', phone: '+91 98222 44556', tier: 'VIP' },
  { id: 103, name: 'Dev Sharma', phone: '+91 98333 77889', tier: 'General Access' },
  { id: 104, name: 'Ananya Rao', phone: '+91 98444 99001', tier: 'VIP' },
  { id: 105, name: 'Vikram Pillai', phone: '+91 98555 12345', tier: 'General Access' },
  { id: 106, name: 'Tara Bose', phone: '+91 98666 54321', tier: 'General Access' },
];

const TABS = ['EDITOR', 'QUEUE', 'GUESTS', 'SCAN', 'SETTINGS'];

const inputCls =
  'w-full rounded-none border border-zinc-800 bg-[#1a1a1a] px-4 py-3.5 text-sm font-semibold text-white placeholder:font-normal placeholder:text-zinc-600 outline-none transition-colors focus:border-[#FF5500]';

const money = (n) => '₹' + Number(n).toLocaleString('en-IN');

// ─────────────────────────────────────────────────────────────
// SHARED MICRO-COMPONENTS
// ─────────────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-1 pt-3">
      <span className="text-[11px] font-black tracking-widest text-white">9:41</span>
      <div className="flex items-center gap-1.5 text-white">
        <Signal size={12} strokeWidth={2.5} />
        <Wifi size={12} strokeWidth={2.5} />
        <BatteryFull size={15} strokeWidth={2} />
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
        {label}
      </label>
      {children}
    </div>
  );
}

function Kpi({ label, value, accent }) {
  return (
    <div className="border border-zinc-800 bg-[#1a1a1a] px-3 py-3.5">
      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p
        className="mt-1.5 truncate text-[15px] font-black text-white"
        style={accent ? { color: accent } : undefined}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="border border-dashed border-zinc-800 px-5 py-10 text-center">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-600">{text}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PIN GATE — mock unlock with '1234'
// ─────────────────────────────────────────────────────────────
function PinScreen({ pin, setPin, onUnlock, error, accent }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 pb-24">
      <div className="w-full max-w-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border-2" style={{ borderColor: accent }}>
          <Lock size={22} style={{ color: accent }} />
        </div>
        <h1 className="mt-6 text-center text-2xl font-black uppercase tracking-tight text-white">
          Host Access
        </h1>
        <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
          Restricted · Sync Club Console
        </p>

        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
          onKeyDown={(e) => e.key === 'Enter' && onUnlock()}
          placeholder="••••"
          className="mt-8 w-full rounded-none border border-zinc-800 bg-[#1a1a1a] px-4 py-4 text-center font-mono text-xl tracking-[0.5em] text-white outline-none focus:border-[#FF5500]"
        />
        {error && (
          <p className="mt-3 text-center text-[10px] font-black uppercase tracking-[0.25em] text-red-500">
            Invalid PIN · Try again
          </p>
        )}
        <button
          onClick={onUnlock}
          className="mt-5 w-full py-4 text-xs font-black uppercase tracking-[0.3em] text-black"
          style={{ backgroundColor: accent }}
        >
          Unlock Console
        </button>
        <p className="mt-5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
          Demo PIN — 1234
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 1 — EDITOR
// ─────────────────────────────────────────────────────────────
function EditorTab({ event, onSave }) {
  const [draft, setDraft] = useState(event);
  const [saved, setSaved] = useState(false);
  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const save = () => {
    onSave(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 px-5 pb-12 pt-2">
      <Field label="Event Title">
        <input className={inputCls} value={draft.title} onChange={(e) => set('title', e.target.value)} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <input className={inputCls} value={draft.date} onChange={(e) => set('date', e.target.value)} />
        </Field>
        <Field label="Time">
          <input className={inputCls} value={draft.time} onChange={(e) => set('time', e.target.value)} />
        </Field>
      </div>

      <Field label="Venue Name">
        <input className={inputCls} value={draft.locationName} onChange={(e) => set('locationName', e.target.value)} />
      </Field>

      <Field label="Google Maps Link">
        <input className={inputCls} value={draft.locationMapLink} onChange={(e) => set('locationMapLink', e.target.value)} />
      </Field>

      <Field label="UPI ID">
        <input className={inputCls} value={draft.upiId} onChange={(e) => set('upiId', e.target.value)} />
      </Field>

      <Field label="Description">
        <textarea
          rows={4}
          className={`${inputCls} resize-none leading-relaxed`}
          value={draft.description}
          onChange={(e) => set('description', e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Theme Color">
          <input
            type="color"
            value={draft.themeColor}
            onChange={(e) => set('themeColor', e.target.value)}
            className="h-12 w-full cursor-pointer rounded-none border border-zinc-800 bg-[#1a1a1a] p-1"
          />
        </Field>
        <Field label="Poster Upload">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files && e.target.files[0];
              if (f) set('posterUrl', URL.createObjectURL(f));
            }}
            className="h-12 w-full rounded-none border border-zinc-800 bg-[#1a1a1a] p-2 text-[9px] font-bold uppercase tracking-wider text-zinc-500 file:mr-2 file:cursor-pointer file:border-0 file:bg-[#FF5500] file:px-2 file:py-1 file:text-[9px] file:font-black file:uppercase file:tracking-wider file:text-black"
          />
        </Field>
      </div>

      {draft.posterUrl && (
        <img src={draft.posterUrl} alt="Poster preview" className="h-36 w-full border border-zinc-800 object-cover" />
      )}

      <button
        onClick={save}
        className="w-full py-4 text-xs font-black uppercase tracking-[0.3em] text-black"
        style={{ backgroundColor: draft.themeColor }}
      >
        {saved ? 'Changes Saved' : 'Save Changes'}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 2 — QUEUE (UTR verifications)
// ─────────────────────────────────────────────────────────────
function QueueTab({ queue, setQueue, guests, setGuests }) {
  const approve = (u) => {
    setQueue((q) => q.filter((x) => x.id !== u.id));
    setGuests((g) => [...g, { id: u.id, name: u.name, phone: u.phone, tier: u.tier }]);
  };
  const reject = (u) => setQueue((q) => q.filter((x) => x.id !== u.id));

  return (
    <div className="space-y-3 px-5 pb-12 pt-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
        {queue.length} awaiting UTR verification
      </p>

      {queue.map((u) => (
        <div key={u.id} className="border border-zinc-800 bg-[#1a1a1a] p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-black uppercase tracking-wide text-white">{u.name}</p>
              <p className="mt-0.5 text-xs font-semibold text-zinc-500">{u.phone}</p>
              <p className="mt-1.5 font-mono text-[10px] tracking-widest text-zinc-400">
                UTR · {u.utr}
              </p>
            </div>
            <span className="shrink-0 border border-zinc-700 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-zinc-400">
              {u.tier} · {money(u.amount)}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => reject(u)}
              className="border-2 border-red-600 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] text-red-500 transition-colors hover:bg-red-600 hover:text-white"
            >
              Reject
            </button>
            <button
              onClick={() => approve(u)}
              className="bg-green-600 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] text-black transition-colors hover:bg-green-500"
            >
              Approve
            </button>
          </div>
        </div>
      ))}

      {queue.length === 0 && <EmptyState text="Queue clear · All UTRs verified" />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 3 — GUESTS (master list)
// ─────────────────────────────────────────────────────────────
function GuestsTab({ guests, accent }) {
  const [q, setQ] = useState('');
  const query = q.trim().toLowerCase();
  const filtered = guests.filter(
    (g) => g.name.toLowerCase().includes(query) || g.phone.replace(/\s/g, '').includes(query.replace(/\s/g, ''))
  );

  return (
    <div className="px-5 pb-12 pt-2">
      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or phone"
          className={`${inputCls} pl-11`}
        />
      </div>

      <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
        {filtered.length} approved attendees
      </p>

      <div className="mt-3 divide-y divide-zinc-900 border border-zinc-800 bg-[#1a1a1a]">
        {filtered.map((g) => (
          <div key={g.id} className="flex items-center justify-between gap-3 px-4 py-3.5">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{g.name}</p>
              <p className="mt-0.5 text-xs font-semibold text-zinc-500">{g.phone}</p>
            </div>
            <span
              className="shrink-0 border px-2 py-1 text-[9px] font-black uppercase tracking-widest"
              style={{ borderColor: accent, color: accent }}
            >
              {g.tier}
            </span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <EmptyState text="No guests found" />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 4 — SCAN (door viewfinder placeholder)
// ─────────────────────────────────────────────────────────────
function ScanTab({ accent }) {
  return (
    <div className="px-5 pb-12 pt-4">
      <div className="relative mx-auto aspect-square w-full max-w-[280px] border border-zinc-800 bg-[#1a1a1a]">
        {/* corner brackets */}
        <span className="absolute left-3 top-3 h-8 w-8 border-l-2 border-t-2" style={{ borderColor: accent }} />
        <span className="absolute right-3 top-3 h-8 w-8 border-r-2 border-t-2" style={{ borderColor: accent }} />
        <span className="absolute bottom-3 left-3 h-8 w-8 border-b-2 border-l-2" style={{ borderColor: accent }} />
        <span className="absolute bottom-3 right-3 h-8 w-8 border-b-2 border-r-2" style={{ borderColor: accent }} />

        {/* scan line */}
        <div
          className="absolute left-6 right-6 top-1/2 h-0.5 animate-pulse"
          style={{ backgroundColor: accent }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <QrCode size={64} strokeWidth={1.5} className="text-zinc-800" />
        </div>
      </div>

      <p className="mt-6 text-center text-xs font-black uppercase tracking-[0.25em] text-white">
        Align attendee QR within frame
      </p>
      <p className="mt-1.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
        Camera placeholder · Scan disabled in shell
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB 5 — SETTINGS
// ─────────────────────────────────────────────────────────────
function SettingsTab({ event, onSave }) {
  const [capacity, setCapacity] = useState(event.maxCapacity);
  const [open, setOpen] = useState(event.salesOpen);
  const [saved, setSaved] = useState(false);
  const accent = event.themeColor;

  const save = () => {
    onSave({ ...event, maxCapacity: Number(capacity) || 0, salesOpen: open });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 px-5 pb-12 pt-2">
      <Field label="Max Capacity">
        <input
          type="number"
          min="1"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="flex items-center justify-between border border-zinc-800 bg-[#1a1a1a] px-4 py-4">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-white">Ticket Sales</p>
          <p className="mt-0.5 text-xs font-semibold text-zinc-500">
            {open ? 'Open — accepting payments' : 'Closed — checkout paused'}
          </p>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle ticket sales"
          className="relative h-8 w-16 shrink-0 border-2 transition-colors"
          style={{
            borderColor: open ? accent : '#3f3f46',
            backgroundColor: open ? accent : '#1a1a1a',
          }}
        >
          <span
            className={`absolute top-1/2 h-5 w-6 -translate-y-1/2 bg-white transition-all ${
              open ? 'right-1' : 'left-1'
            }`}
          />
        </button>
      </div>

      <button
        onClick={save}
        className="w-full py-4 text-xs font-black uppercase tracking-[0.3em] text-black"
        style={{ backgroundColor: accent }}
      >
        {saved ? 'Settings Saved' : 'Save Settings'}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOST DASHBOARD
// ─────────────────────────────────────────────────────────────
export default function AdminApp() {
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [tab, setTab] = useState('EDITOR');
  const [event, setEvent] = useState(initialEventData);
  const [queue, setQueue] = useState(initialQueue);
  const [guests, setGuests] = useState(initialGuests);

  const accent = event.themeColor;
  const revenue = guests.reduce(
    (sum, g) => sum + ((event.tiers.find((t) => t.name === g.tier) || {}).price || 0),
    0
  );

  const tryUnlock = () => {
    if (pin === '1234') {
      setUnlocked(true);
      setPinError(false);
      setPin('');
    } else {
      setPinError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="max-w-md w-full min-h-screen mx-auto border-x border-zinc-900 overflow-y-auto bg-black text-white">
        <PinScreen pin={pin} setPin={setPin} onUnlock={tryUnlock} error={pinError} accent={accent} />
      </div>
    );
  }

  return (
    <div className="max-w-md w-full min-h-screen mx-auto border-x border-zinc-900 overflow-y-auto bg-black text-white">
      <StatusBar />

      {/* top bar */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-900 px-5 py-4">
        <p className="text-sm font-black uppercase tracking-[0.25em]" style={{ color: accent }}>
          Host Console
        </p>
        <div className="flex min-w-0 items-center gap-3">
          <p className="truncate text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            {event.title}
          </p>
          <button
            onClick={() => setUnlocked(false)}
            aria-label="Lock console"
            className="shrink-0 border border-zinc-800 bg-[#1a1a1a] p-2 text-zinc-500 transition-colors hover:text-white"
          >
            <LogOut size={13} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* text tab nav */}
      <div className="flex gap-5 overflow-x-auto border-b border-zinc-900 px-5 py-3.5">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap text-[11px] font-black uppercase tracking-[0.12em] transition-colors ${
              tab === t ? '' : 'text-zinc-600 hover:text-zinc-400'
            }`}
            style={tab === t ? { color: accent } : undefined}
          >
            [ {t} ]
          </button>
        ))}
      </div>

      {/* KPI row — always visible */}
      <div className="grid grid-cols-3 gap-2 px-5 py-4">
        <Kpi label="Revenue" value={money(revenue)} accent={accent} />
        <Kpi label="Approved" value={`${guests.length}/${event.maxCapacity}`} />
        <Kpi label="Queue" value={queue.length} accent={queue.length > 0 ? accent : undefined} />
      </div>

      {/* tab content */}
      {tab === 'EDITOR' && <EditorTab event={event} onSave={setEvent} />}
      {tab === 'QUEUE' && (
        <QueueTab queue={queue} setQueue={setQueue} guests={guests} setGuests={setGuests} />
      )}
      {tab === 'GUESTS' && <GuestsTab guests={guests} accent={accent} />}
      {tab === 'SCAN' && <ScanTab accent={accent} />}
      {tab === 'SETTINGS' && <SettingsTab event={event} onSave={setEvent} />}
    </div>
  );
}
