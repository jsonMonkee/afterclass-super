'use client';

import React, { useState, useEffect } from 'react';
import { Bell, ShieldCheck, Calendar, Stamp } from 'lucide-react';
import Footer from '../../components/Footer';

export default function NoticesPage() {
  const [noticesList, setNoticesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/notices')
      .then(r => r.json())
      .then(data => {
        if (data.success && data.data) {
          setNoticesList(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="bg-[#E11D48] min-h-screen text-[#000000] flex flex-col font-sans select-none selection:bg-[#FFFDF5] selection:text-[#E11D48]">
      
      {/* 1. Header Banner */}
      <section className="arc-grain-red text-white pt-8 pb-16 px-6 sm:px-12 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#881337] px-3.5 py-1 rounded-full font-arc-mono text-xs uppercase tracking-wider text-[#FFFDF5] mb-4 border border-white/15">
            <Bell size={13} />
            <span>OFFICIAL CAMPUS GAZETTE</span>
          </div>
          <h1 className="font-arc-display text-white text-3xl sm:text-5xl md:text-6xl mb-4 leading-tight">
            “Authorized notices from the Amity community.”
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            Koi botla admin nahi hai, sab students manage kar rahe hain updates. Directly from students, for students — verified circulars and urgent campus buzz.
          </p>
        </div>

        <div className="scallop-bottom-cream"></div>
      </section>

      {/* 2. Main Content Area with Postal Stamp Cards */}
      <div className="bg-[#FFFDF5] flex-1 py-14 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <span className="font-arc-mono text-xs font-bold text-[#E11D48] uppercase tracking-wider flex items-center gap-2">
              <Stamp size={14} />
              <span>OFFICIAL POSTAL DISPATCHES · 2026</span>
            </span>
            <span className="font-arc-mono text-xs text-[#71717A]">
              {noticesList.length} Active Circulars
            </span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-[#71717A] font-arc-mono text-sm">
              Connecting to campus broadcast wire...
            </div>
          ) : noticesList.length === 0 ? (
            <div className="text-center py-12 text-[#71717A] font-arc-mono text-sm">
              No circulars broadcasted yet. Create a notice in the SuperAdmin portal to push it here live!
            </div>
          ) : (
            noticesList.map((notice, idx) => (
            <div 
              key={notice.id}
              className="stamp-card bg-white p-6 sm:p-8 hover:border-[#E11D48] shadow-sm hover:shadow-xl transition-all duration-300 group font-arc-display"
            >
              {/* Top Row: Stamp Postal Markings & Date */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  {/* Postage Badge Stamp */}
                  <span className="bg-[#E11D48] text-white text-[10.5px] font-black px-3 py-1 rounded-md uppercase tracking-wider border border-black/10 shadow-xs">
                    ★ {notice.badge}
                  </span>

                  {notice.pinned && (
                    <span className="bg-[#FEF08A] text-[#881337] text-[10.5px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#FACC15]">
                      PINNED
                    </span>
                  )}
                </div>

                {/* Postmark Date with Postal Icon */}
                <div className="flex items-center gap-1.5 text-xs text-[#881337] font-bold bg-[#FFE4E6] px-3 py-1 rounded-full">
                  <Calendar size={13} className="text-[#E11D48]" />
                  <span>DISPATCHED: {notice.date}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-black text-xl sm:text-[23px] text-[#000000] mb-3 leading-snug group-hover:text-[#E11D48] transition-colors">
                {notice.title}
              </h2>

              {/* Content excerpt */}
              <p className="text-sm text-[#4B5563] leading-relaxed mb-6 font-medium">
                {notice.content}
              </p>

              {/* Bottom Perforated Cut Strip */}
              <div className="pt-4 border-t-2 border-dashed border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                {/* Posted by signature */}
                <div className="flex items-center gap-2 text-[#881337] font-bold">
                  <span className="w-5 h-5 rounded-full bg-[#FFE4E6] flex items-center justify-center text-[#E11D48]">
                    <ShieldCheck size={13} />
                  </span>
                  <span>POSTED BY: SuperAdmin</span>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
