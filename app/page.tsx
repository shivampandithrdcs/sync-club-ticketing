"use client";
import { useState } from "react";
import { MapPin, Copy, Clock, CheckCircle2, QrCode } from "lucide-react";

export default function PublicTicketingFlow() {
  const [step, setStep] = useState(1);
  const [themeColor, setThemeColor] = useState("#ff5500");
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [utr, setUtr] = useState("");

  const dummyTiers = [
    { id: 1, name: "Early Bird", price: 999 },
    { id: 2, name: "General Access", price: 1499 },
    { id: 3, name: "Backstage", price: 2999 },
  ];

  return (
    <div className="max-w-md w-full min-h-screen mx-auto bg-black text-white overflow-y-auto">
      <div className="p-4 pb-20">
        
        {/* STEP 1: Landing */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="w-full h-64 bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-zinc-800">
              <span className="text-zinc-500 font-medium tracking-widest uppercase">Afterhours / 01</span>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">Sync Club: Neon Nights</h1>
              <p className="text-sm text-zinc-400 mb-4">
                Join us for a night of deep electronic grooves, immersive visuals, and underground sonic frequencies.
              </p>
              
              <div className="space-y-1 mb-6">
                <p className="text-lg font-semibold">Sat, Oct 24 • 10:00 PM</p>
                <a 
                  href="https://maps.google.com/?q=Haridwar" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-lg font-semibold text-zinc-300 hover:text-white underline decoration-zinc-600 underline-offset-4"
                  style={{ textDecorationColor: themeColor }}
                >
                  <MapPin className="w-5 h-5 mr-2" style={{ color: themeColor }} />
                  Secret Warehouse, Haridwar
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:ring-1"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">WhatsApp Number</label>
                <input 
                  type="tel" 
                  placeholder="+91 99999 99999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              className="w-full font-bold text-black rounded-xl p-4 mt-6 transition-opacity hover:opacity-90"
              style={{ backgroundColor: themeColor }}
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2: Tier Select */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4">Choose your pass</h2>
            <div className="space-y-4">
              {dummyTiers.map((tier) => (
                <div 
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all cursor-pointer bg-[#1a1a1a] flex justify-between items-center ${
                    selectedTier === tier.id ? 'border-opacity-100' : 'border-transparent'
                  }`}
                  style={{ borderColor: selectedTier === tier.id ? themeColor : 'transparent' }}
                >
                  <div>
                    <h3 className="font-semibold text-lg">{tier.name}</h3>
                    <p className="text-xs text-zinc-500">Admit 1 Person</p>
                  </div>
                  <div className="text-xl font-bold" style={{ color: themeColor }}>
                    ₹{tier.price}
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setStep(3)}
              disabled={!selectedTier}
              className="w-full font-bold text-black rounded-xl p-4 mt-6 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: themeColor }}
            >
              Proceed to Payment
            </button>
          </div>
        )}

        {/* STEP 3: Payment Gate */}
        {step === 3 && (
          <div className="space-y-8 flex flex-col items-center pt-8">
            <h2 className="text-xl font-bold w-full text-left">Complete Payment</h2>
            
            <div className="bg-white p-4 rounded-2xl w-64 h-64 flex items-center justify-center text-black">
              <QrCode className="w-48 h-48" />
            </div>

            <div className="flex items-center space-x-3 bg-[#1a1a1a] py-3 px-6 rounded-full border border-zinc-800">
              <span className="font-mono text-sm tracking-wide">syncclub@ybl</span>
              <button 
                type="button"
                onClick={() => navigator.clipboard.writeText("syncclub@ybl")}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">12-Digit UTR Number</label>
                <input 
                  type="text" 
                  placeholder="Enter transaction reference"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-zinc-800 rounded-xl p-4 text-white font-mono tracking-widest focus:outline-none focus:ring-1"
                />
              </div>
              <button 
                onClick={() => setStep(4)}
                disabled={utr.length < 12}
                className="w-full font-bold text-black rounded-xl p-4 disabled:opacity-50 transition-all"
                style={{ backgroundColor: themeColor }}
              >
                Submit UTR
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Pending State */}
        {step === 4 && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full opacity-20" style={{ backgroundColor: themeColor }}></div>
              <div className="p-6 rounded-full bg-[#1a1a1a] border border-zinc-800 relative z-10">
                <Clock className="w-12 h-12" style={{ color: themeColor }} />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment Verifying.</h2>
              <p className="text-zinc-400 text-sm max-w-[250px] mx-auto">
                Your pass will be generated here once the host approves your UTR.
              </p>
            </div>

            <button 
              onClick={() => setStep(5)}
              className="mt-8 px-8 py-3 rounded-full border border-zinc-700 text-sm font-medium hover:bg-zinc-900 transition-colors"
            >
              Simulate Approval (Mock)
            </button>
          </div>
        )}

        {/* STEP 5: Success Ticket */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full bg-[#111111] border border-zinc-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="text-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block">Sync Club</span>
                <h2 className="text-2xl font-black uppercase tracking-tight">Neon Nights</h2>
              </div>

              <div className="bg-white p-4 rounded-2xl w-full aspect-square flex items-center justify-center mb-8">
                <QrCode className="w-full h-full text-black" />
              </div>

              <div className="space-y-4 border-t border-dashed border-zinc-700 pt-6">
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-sm">Admit</span>
                  <span className="font-bold">{name || "Guest Attendee"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500 text-sm">Tier</span>
                  <span className="font-bold">General Access</span>
                </div>
                
                <div className="mt-6 p-3 bg-green-950/30 border border-green-900/50 rounded-xl flex items-center justify-center space-x-2 text-green-500">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-bold text-sm tracking-widest">STATUS: CONFIRMED</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}