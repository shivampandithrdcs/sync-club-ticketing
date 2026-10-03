"use client";
import { useState } from "react";
import { Lock, Settings, Users, CheckSquare, ScanLine } from "lucide-react";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [activeTab, setActiveTab] = useState("editor");

  const stats = { approved: 142, pending: 8, revenue: "₹2.1L" };
  const pendingApprovals = [
    { id: 1, name: "Rahul Sharma", phone: "9876543210", utr: "908765432112", tier: "VIP" },
    { id: 2, name: "Priya Singh", phone: "8765432109", utr: "123456789012", tier: "General" },
  ];
  const guestList = [
    { id: 101, name: "Aman Gupta", phone: "9999988888", tier: "Backstage" },
    { id: 102, name: "Neha Verma", phone: "7777766666", tier: "General" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") setIsAuthenticated(true);
    else alert("Incorrect PIN");
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md w-full min-h-screen mx-auto bg-black text-white flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6">
          <Lock className="w-8 h-8 text-[#ff5500]" />
        </div>
        <h1 className="text-2xl font-bold mb-8">Host Portal</h1>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <input
            type="password"
            placeholder="Enter 4-Digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-center text-white text-xl tracking-[0.5em] focus:outline-none focus:border-[#ff5500]"
            maxLength={4}
          />
          <button type="submit" className="w-full bg-[#ff5500] text-black font-bold rounded-xl p-4">
            Unlock Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full min-h-screen mx-auto bg-black text-white overflow-y-auto">
      <div className="p-4 pt-8 bg-[#111111] border-b border-zinc-800 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-[#ff5500] mb-4">SYNC ADMIN</h1>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-black p-3 rounded-lg border border-zinc-800 text-center">
            <p className="text-xs text-zinc-500 mb-1">Approved</p>
            <p className="text-lg font-bold">{stats.approved}</p>
          </div>
          <div className="bg-black p-3 rounded-lg border border-zinc-800 text-center">
            <p className="text-xs text-zinc-500 mb-1">Pending</p>
            <p className="text-lg font-bold text-yellow-500">{stats.pending}</p>
          </div>
          <div className="bg-black p-3 rounded-lg border border-zinc-800 text-center">
            <p className="text-xs text-zinc-500 mb-1">Revenue</p>
            <p className="text-lg font-bold text-green-500">{stats.revenue}</p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-zinc-800 text-sm font-medium">
        {[
          { id: "editor", icon: Settings, label: "Editor" },
          { id: "approvals", icon: CheckSquare, label: "Queue" },
          { id: "guestlist", icon: Users, label: "Guests" },
          { id: "scanner", icon: ScanLine, label: "Scan" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === tab.id ? "text-[#ff5500] border-b-2 border-[#ff5500] bg-[#1a1a1a]/50" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-4 space-y-6">
        {activeTab === "editor" && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Event Title</label>
              <input type="text" defaultValue="Sync Club: Neon Nights" className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 text-white" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Poster Upload</label>
                <input type="file" accept="image/*" className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-2 text-sm text-zinc-400 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#ff5500] file:text-black hover:file:bg-orange-600" />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Theme Color</label>
                <div className="flex items-center space-x-3 bg-[#1a1a1a] border border-zinc-800 rounded-xl p-2">
                  <input type="color" defaultValue="#ff5500" className="w-8 h-8 rounded cursor-pointer bg-transparent border-0" />
                  <span className="text-sm font-mono text-zinc-400">#ff5500</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Event Description & Location</label>
              <textarea rows={4} defaultValue="Join us for a night of deep electronic grooves... Location: Secret Warehouse." className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 text-white text-sm"></textarea>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-2">Host UPI ID</label>
              <input type="text" defaultValue="syncclub@ybl" className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 text-white font-mono" />
            </div>

            <button className="w-full bg-[#ff5500] text-black font-bold rounded-xl p-4 mt-4">Save Changes</button>
          </div>
        )}

        {activeTab === "approvals" && (
          <div className="space-y-4">
            {pendingApprovals.map((req) => (
              <div key={req.id} className="bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold">{req.name}</h3>
                    <p className="text-sm text-zinc-400">{req.phone} • {req.tier}</p>
                  </div>
                  <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded font-bold">PENDING</span>
                </div>
                <div className="bg-black border border-zinc-800 rounded p-2 text-center mb-4">
                  <p className="text-xs text-zinc-500 uppercase mb-1">UTR Reference</p>
                  <p className="font-mono text-white tracking-widest">{req.utr}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-zinc-900 border border-red-900/50 text-red-500 font-bold py-2 rounded-lg text-sm">Reject</button>
                  <button className="flex-1 bg-green-500 text-black font-bold py-2 rounded-lg text-sm">Approve</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "guestlist" && (
          <div className="space-y-2">
            <input type="text" placeholder="Search guests..." className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-3 text-sm text-white mb-4" />
            {guestList.map((guest) => (
              <div key={guest.id} className="flex items-center justify-between bg-[#1a1a1a] border border-zinc-800 p-4 rounded-xl">
                <div>
                  <p className="font-bold">{guest.name}</p>
                  <p className="text-xs text-zinc-500">{guest.phone}</p>
                </div>
                <span className="text-xs font-bold px-2 py-1 bg-zinc-800 rounded text-zinc-300">{guest.tier}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "scanner" && (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-64 h-64 border-2 border-dashed border-[#ff5500] rounded-3xl flex flex-col items-center justify-center bg-[#1a1a1a]/30 relative">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ff5500] rounded-tl-3xl"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#ff5500] rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#ff5500] rounded-bl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ff5500] rounded-br-3xl"></div>
              
              <ScanLine className="w-12 h-12 text-[#ff5500] mb-4 opacity-50" />
              <p className="text-sm font-medium text-zinc-400">Tap to start camera</p>
            </div>
            <p className="text-xs text-zinc-500 mt-8 text-center max-w-[200px]">
              Align attendee QR code within the frame to verify entry.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}