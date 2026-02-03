
// Kiểm tra xem script đã chạy chưa
if (window.hasRunScraper) {
  // Mini version of showToast for early execution
  const showEarlyToast = (msg, type = 'info') => {
    const accent = type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : '#3b82f6');
    const toast = document.createElement('div');
    Object.assign(toast.style, {
      position: 'fixed', bottom: '32px', left: '32px', zIndex: '2147483647',
      background: 'rgba(255, 255, 255, 0.75)', color: '#1f2937',
      padding: '16px 22px', borderRadius: '20px', 
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
      fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: '600', fontSize: '15px',
      border: `1px solid ${accent}50`, backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', gap: '16px',
      animation: 'scraper-toast-enter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      transition: 'all 0.3s ease'
    });
    toast.innerHTML = `
      <style>@keyframes scraper-toast-enter { 0% { opacity: 0; transform: scale(0.8) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }</style>
      <span style="color: #fff; background: ${accent}; padding: 8px; border-radius: 12px; display: flex; box-shadow: 0 4px 12px ${accent}40;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
      </span>
      <span style="flex: 1;">${msg}</span>
      <button class="early-toast-close" style="
        background: transparent; border: none; color: #9ca3af; 
        cursor: pointer; padding: 6px; display: flex; align-items: center;
        border-radius: 10px; transition: all 0.2s;
      " onmouseover="this.style.color='#4b5563';this.style.background='rgba(0,0,0,0.05)'" 
        onmouseout="this.style.color='#9ca3af';this.style.background='transparent'">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;
    
    const closeBtn = toast.querySelector('.early-toast-close');
    const dismiss = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'scale(0.9) translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    };
    closeBtn.onclick = dismiss;

    document.body.appendChild(toast);
    setTimeout(dismiss, 4000);
  };

  const existingToast = document.querySelector('.scraper-toast-already-running');
  if (!existingToast) {
    showEarlyToast('Scraper đang hoạt động!', 'success');
  }
} else if (!window.location.hostname.endsWith('onluyen.vn')) {
  const accent = '#ef4444';
  const toast = document.createElement('div');
  Object.assign(toast.style, {
    position: 'fixed', top: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: '2147483647',
    background: 'rgba(255, 255, 255, 0.75)', color: '#1f2937',
    padding: '16px 24px', borderRadius: '20px', 
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif", fontWeight: '600', fontSize: '16px',
    border: `1px solid ${accent}50`, backdropFilter: 'blur(20px)',
    display: 'flex', alignItems: 'center', gap: '16px',
    animation: 'scraper-toast-enter-top 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transition: 'all 0.3s ease'
  });
  toast.innerHTML = `
    <style>@keyframes scraper-toast-enter-top { 0% { opacity: 0; transform: translate(-50%, -20px) scale(0.8); } 100% { opacity: 1; transform: translate(-50%, 0) scale(1); } }</style>
    <span style="color: #fff; background: ${accent}; padding: 8px; border-radius: 12px; display: flex; box-shadow: 0 4px 12px ${accent}40;">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    </span>
    <span style="flex: 1;">Trang web không hỗ trợ! Tiện ích chỉ chạy trên OnLuyen.vn</span>
    <button class="early-toast-close" style="
      background: transparent; border: none; color: #9ca3af; 
      cursor: pointer; padding: 6px; display: flex; align-items: center;
      border-radius: 10px; transition: all 0.2s;
    " onmouseover="this.style.color='#4b5563';this.style.background='rgba(0,0,0,0.05)'" 
      onmouseout="this.style.color='#9ca3af';this.style.background='transparent'">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;
  
  const closeBtn = toast.querySelector('.early-toast-close');
  const dismiss = () => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, -10px) scale(0.9)';
    setTimeout(() => toast.remove(), 300);
  };
  closeBtn.onclick = dismiss;

  document.body.appendChild(toast);
  setTimeout(dismiss, 5000);
} else {
  window.hasRunScraper = true;

  /**
   * ╔══════════════════════════════════════════════════════════════════╗
   * ║     AUTO SCRAPER v${chrome.runtime.getManifest().version} - COMBINED HOMEWORK & EXAM MODE           ║
   * ║   Kết hợp scrape bài tập (có nút click) và bài thi (static)     ║
   * ╠══════════════════════════════════════════════════════════════════╣
   * ║  Chế độ 1: HOMEWORK - Click qua từng câu, scrape động           ║
   * ║  Chế độ 2: EXAM - Scrape tất cả câu hỏi trên trang              ║
   * ╚══════════════════════════════════════════════════════════════════╝
   */

  (async function AutoScraperCombined() {
    'use strict';

    // 🎯 GLOBAL CONFIGURATION
    let isSkipLoadingEnabled = true; // Default: ON

    // 🚀 AUTO-SKIP LOADING SCREEN (GLOBAL OBSERVER)
    const loadingObserver = new MutationObserver(() => {
      if (!isSkipLoadingEnabled) return;
      document
        .querySelectorAll('.background.fadeIn.ng-star-inserted')
        .forEach(el => {
          // Chỉ xóa nếu thực sự là màn hình loading (có chứa text hoặc icon loading)
          if (el.querySelector('.text-loading') || el.querySelector('img[src*="loading"]')) {
            el.remove();
          }
        });
    });
    
    if (document.body) {
        loadingObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        window.addEventListener('DOMContentLoaded', () => {
            loadingObserver.observe(document.body, { childList: true, subtree: true });
        });
    }
    // ------------------------------------------

    // ============================================================ 
    // 🎯 GLOBAL VARIABLES & CONFIGURATION
    // ============================================================ 
    const fastSleep = ms => new Promise(r => setTimeout(r, ms));
    
    // Hàm sleep có thể ngắt để dừng ngay lập tức
    const smartSleep = async (ms) => {
      const start = Date.now();
      while (Date.now() - start < ms) {
        if (stopRequested) return;
        await new Promise(r => setTimeout(r, 50)); // Check mỗi 50ms
      }
    };

    const ICONS = {
      rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1"/><path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4"/></svg>',
      book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>',
      fileText: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>',
      check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      alertTriangle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      pause: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>',
      play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      square: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>',
      minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      chevronLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
      chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
      image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
      copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
      download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
      refreshCw: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 3.5L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-3.5L3 16"/><path d="M3 21v-5h5"/></svg>',
      loader: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>',
      sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
      settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
      send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
      github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>',
      target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
      brain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04"/></svg>',
      clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
      chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
      zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
      pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>',
      circle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>',
      link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
      messageSquare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
      sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
      moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      get celebrationLine() {
        return ['💋', '😁', '❤'][Math.floor(Math.random() * 3)];
      }
    };

    // CSS Variables for Theming - ENHANCED
    const THEME_STYLES = `
      :root {
        /* LIGHT MODE PALETTE */
        --ol-bg: #ffffff;
        --ol-surface: #f9fafb;
        --ol-border: #e5e7eb;
        
        --ol-text: #111827;
        --ol-text-sub: #6b7280;
        
        --ol-brand: #4f46e5;       /* Indigo 600 */
        --ol-brand-bg: #eef2ff;    /* Indigo 50 */
        
        --ol-success: #059669;     /* Emerald 600 */
        --ol-success-bg: #ecfdf5;  /* Emerald 50 */

        --ol-warning: #d97706;     /* Amber 600 */
        --ol-warning-bg: #fffbeb;  /* Amber 50 */

        --ol-danger: #e11d48;      /* Rose 600 */
        --ol-danger-bg: #fff1f2;   /* Rose 50 */
        
        --ol-hover: #f3f4f6;
        --ol-shadow: rgba(0, 0, 0, 0.1);
        --ol-overlay-bg: rgba(255, 255, 255, 0.8); /* Light Overlay */
      }

      .scraper-dark {
        /* DARK MODE PALETTE */
        --ol-bg: #0f172a;          /* Slate 900 */
        --ol-surface: #1e293b;     /* Slate 800 */
        --ol-border: #334155;      /* Slate 700 */
        
        --ol-text: #f1f5f9;        /* Slate 100 */
        --ol-text-sub: #94a3b8;    /* Slate 400 */
        
        --ol-brand: #818cf8;       /* Indigo 400 */
        --ol-brand-bg: #312e81;    /* Indigo 900 */
        
        --ol-success: #34d399;     /* Emerald 400 */
        --ol-success-bg: #064e3b;  /* Emerald 900 */

        --ol-warning: #fbbf24;     /* Amber 400 */
        --ol-warning-bg: #78350f;  /* Amber 900 */

        --ol-danger: #fb7185;      /* Rose 400 */
        --ol-danger-bg: #881337;   /* Rose 900 */
        
        --ol-hover: #334151;
        --ol-shadow: rgba(0, 0, 0, 0.5);
        --ol-overlay-bg: rgba(15, 23, 42, 0.85); /* Dark Overlay */
      }

      /* UTILITY CLASSES */
      .ol-bg { background-color: var(--ol-bg) !important; transition: all 0.3s; }
      .ol-surface { background-color: var(--ol-surface) !important; transition: all 0.3s; }
      .ol-border { border-color: var(--ol-border) !important; transition: all 0.3s; }
      .ol-overlay { background-color: var(--ol-overlay-bg) !important; transition: all 0.3s; backdrop-filter: blur(8px); }
      
      .ol-text { color: var(--ol-text) !important; transition: all 0.3s; }
      .ol-text-sub { color: var(--ol-text-sub) !important; transition: all 0.3s; }
      
      /* Semantic Colors (Text & Icon) */
      .ol-brand-text { color: var(--ol-brand) !important; transition: all 0.3s; }
      .ol-success-text { color: var(--ol-success) !important; transition: all 0.3s; }
      .ol-warning-text { color: var(--ol-warning) !important; transition: all 0.3s; }
      .ol-danger-text { color: var(--ol-danger) !important; transition: all 0.3s; }
      
      /* Semantic Backgrounds */
      .ol-brand-bg { background-color: var(--ol-brand-bg) !important; transition: all 0.3s; }
      .ol-success-bg { background-color: var(--ol-success-bg) !important; transition: all 0.3s; }
      .ol-warning-bg { background-color: var(--ol-warning-bg) !important; transition: all 0.3s; }
      .ol-danger-bg { background-color: var(--ol-danger-bg) !important; transition: all 0.3s; }
      
      .ol-btn-hover:hover { background-color: var(--ol-hover) !important; }

      /* Theme Transition Overlay */
      .ol-theme-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 10000;
        pointer-events: none;
        clip-path: circle(0% at var(--clip-x, 50%) var(--clip-y, 50%));
        transition: clip-path 0.8s cubic-bezier(0.65, 0, 0.35, 1);
        background: var(--ol-bg);
      }
      .ol-theme-overlay.active {
        clip-path: circle(150% at var(--clip-x, 50%) var(--clip-y, 50%));
      }

      /* Components */
      .ol-card {
        background-color: var(--ol-surface);
        border: 1px solid var(--ol-border);
        border-radius: 32px;
        padding: 24px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .ol-card:hover {
        border-color: var(--ol-brand);
        box-shadow: 0 12px 30px -10px var(--ol-shadow);
      }
      .q-card-multiple-choice { border: 2.5px solid var(--ol-brand) !important; box-shadow: 0 10px 30px -10px var(--ol-brand-bg) !important; }
      .q-card-true-false { border: 2.5px solid var(--ol-warning) !important; box-shadow: 0 10px 30px -10px var(--ol-warning-bg) !important; }
      .q-card-fill-blank { border: 2.5px solid var(--ol-success) !important; box-shadow: 0 10px 30px -10px var(--ol-success-bg) !important; }

      .ol-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 12px;
        border-radius: 99px;
        font-size: 9px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        box-shadow: 0 2px 6px var(--ol-shadow);
        border: 1px solid var(--ol-border);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .ol-badge:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px var(--ol-shadow);
        border-color: var(--ol-brand);
      }

      .recommended-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: var(--ol-brand);
        color: white;
        padding: 4px 12px;
        border-radius: 99px;
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 0.05em;
        box-shadow: 0 4px 12px var(--ol-brand-bg);
        z-index: 10;
        border: 1px solid rgba(255,255,255,0.2);
      }

      .ol-footer-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: var(--ol-surface);
        color: var(--ol-text-sub);
        border: 1px solid var(--ol-border);
        border-radius: 99px;
        text-decoration: none;
        font-weight: 600;
        font-size: 13px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 5px var(--ol-shadow);
      }
      .ol-footer-link:hover {
        background: var(--ol-surface-hover);
        border-color: var(--ol-brand);
        color: var(--ol-brand);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -6px var(--ol-brand-bg);
      }
      .ol-footer-link svg {
        transition: transform 0.2s ease;
      }
      .ol-footer-link:hover svg {
        transform: scale(1.1);
      }

      .ol-input {
        background-color: var(--ol-surface);
        border: 1.5px solid var(--ol-border);
        border-radius: 99px;
        padding: 10px 20px;
        color: var(--ol-text);
        outline: none;
        transition: all 0.2s;
      }
      .ol-input:focus {
        border-color: var(--ol-brand);
        box-shadow: 0 0 0 4px var(--ol-brand-bg);
      }
      
      /* View Transitions Support */
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }

      /* SVG Fill Fix - Force currentColor inheritance with transition */
      .ol-brand-text svg, .ol-success-text svg, .ol-warning-text svg, .ol-danger-text svg, button svg { 
        stroke: currentColor !important; 
        transition: stroke 0.3s ease;
      }

      /* Table Styles */
      .ol-table-wrapper {
        margin: 20px 0;
        max-width: 100%;
      }
      .ol-table-wrapper table {
        border-spacing: 0;
        border-collapse: separate;
        border: 1px solid var(--ol-border);
        border-radius: 12px;
        overflow: hidden;
      }
      .ol-table-wrapper th, .ol-table-wrapper td {
        border: 1px solid var(--ol-border);
      }
      .ol-table-wrapper tr:last-child td:first-child { border-bottom-left-radius: 12px; }
      .ol-table-wrapper tr:last-child td:last-child { border-bottom-right-radius: 12px; }
      .ol-table-wrapper thead tr:first-child th:first-child { border-top-left-radius: 12px; }
      .ol-table-wrapper thead tr:first-child th:last-child { border-top-right-radius: 12px; }

      .q-content-area {
        white-space: pre-wrap;
      }
      /* Ensure tables inside q-content-area don't inherit pre-wrap which causes extra lines */
      .q-content-area .ol-table-wrapper {
        white-space: normal;
      }

      /* AI Chat Enhancements */
      .ai-think-block {
        background: rgba(99, 102, 241, 0.05);
        border: 1px solid rgba(99, 102, 241, 0.1);
        border-radius: 12px;
        margin: 12px 0;
        overflow: hidden;
      }
      .ai-think-summary {
        padding: 8px 12px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 600;
        color: var(--ol-text-sub);
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
        transition: background 0.2s;
      }
      .ai-think-summary:hover {
        background: rgba(99, 102, 241, 0.05);
      }
      .ai-think-content {
        padding: 12px;
        border-top: 1px solid rgba(99, 102, 241, 0.1);
        font-size: 13px;
        color: var(--ol-text-sub);
        background: rgba(99, 102, 241, 0.02);
        line-height: 1.6;
      }
      
      .code-block-wrapper {
        border-radius: 12px;
        border: 1px solid var(--ol-border);
        overflow: hidden;
        margin: 16px 0;
        background: #1e293b;
      }
      .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.05);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }
      .code-lang {
        font-size: 11px;
        font-weight: 600;
        color: #94a3b8;
        text-transform: uppercase;
      }
      .code-copy-btn {
        background: transparent;
        border: none;
        color: #94a3b8;
        cursor: pointer;
        font-size: 11px;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 6px;
        transition: all 0.2s;
      }
      .code-copy-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #f1f5f9;
      }
      .chat-msg-content pre {
        margin: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        background: transparent !important;
        padding: 16px !important;
      }

      .ai-tool-block {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: var(--ol-surface);
        border: 1px solid var(--ol-border);
        border-radius: 12px;
        margin: 12px 0;
        font-size: 13px;
        color: var(--ol-text);
        box-shadow: 0 2px 5px var(--ol-shadow);
      }
      .ai-tool-icon {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--ol-brand-bg);
        color: var(--ol-brand);
        border-radius: 8px;
      }
    `;

    // Inject Styles
    const styleEl = document.createElement('style');
    styleEl.textContent = THEME_STYLES;
    document.head.appendChild(styleEl);

    // Hiển thị loading khởi tạo ngay lập tức (đã có đủ ICONS và Styles)
    showInitialLoading();

    const getIcon = (name, className = '') => {
      const svg = ICONS[name] || '';
      if (!svg) return '';
      return svg.replace('<svg ', `<svg class="scraper-icon ${className}" `);
    };

    // 🎯 INITIAL LOADING UI (LUMINOUS MODERN V4)
    function showInitialLoading() {
      if (document.getElementById('scraper-initial-loader')) return;
      
      const loader = document.createElement('div');
      loader.id = 'scraper-initial-loader';
      
      const appendLoader = () => {
          if (document.body) {
              document.body.appendChild(loader);
              initializeLoaderLogic();
          } else {
              setTimeout(appendLoader, 50);
          }
      };

      Object.assign(loader.style, {
        position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh',
        background: '#030014', zIndex: '2147483647',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: 'white',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden', perspective: '1000px'
      });
      
      loader.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');
          
          .mesh-bg {
            position: absolute; inset: 0;
            background: 
                radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120, 119, 198, 0.3), transparent),
                radial-gradient(ellipse 60% 60% at 100% 100%, rgba(79, 70, 229, 0.2), transparent),
                radial-gradient(ellipse 40% 40% at 0% 100%, rgba(139, 92, 246, 0.15), transparent),
                linear-gradient(180deg, #030014 0%, #0f0720 50%, #030014 100%);
            z-index: -3;
          }

          .grid-bg {
            position: absolute; inset: 0;
            background-image: 
                linear-gradient(rgba(99, 102, 241, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent);
            animation: grid-move 20s linear infinite;
            z-index: -2;
          }

          @keyframes grid-move {
            0% { transform: translateY(0); }
            100% { transform: translateY(50px); }
          }

          .orb {
            position: absolute; border-radius: 50%;
            filter: blur(100px); opacity: 0.5;
            will-change: transform;
          }

          .orb-1 {
            width: 600px; height: 600px;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            top: -20%; left: -15%;
            animation: orb-dance-1 25s ease-in-out infinite;
          }

          .orb-2 {
            width: 500px; height: 500px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            bottom: -15%; right: -10%;
            animation: orb-dance-2 30s ease-in-out infinite;
          }

          .orb-3 {
            width: 300px; height: 300px;
            background: linear-gradient(135deg, #818cf8, #c084fc);
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            animation: orb-dance-3 20s ease-in-out infinite;
          }

          @keyframes orb-dance-1 {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            25% { transform: translate(10%, 10%) scale(1.1) rotate(90deg); }
            50% { transform: translate(-5%, 15%) scale(0.9) rotate(180deg); }
            75% { transform: translate(5%, -5%) scale(1.05) rotate(270deg); }
          }

          @keyframes orb-dance-2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(-15%, -10%) scale(1.15); }
            66% { transform: translate(10%, 5%) scale(0.85); }
          }

          @keyframes orb-dance-3 {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.5; }
          }

          .particles {
            position: absolute; inset: 0;
            z-index: -1; overflow: hidden;
          }

          .particle {
            position: absolute; width: 4px; height: 4px;
            background: rgba(139, 92, 246, 0.6);
            border-radius: 50%;
            animation: particle-float 15s linear infinite;
            box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
          }

          @keyframes particle-float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(40px);
            -webkit-backdrop-filter: blur(40px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 40px;
            padding: 70px 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 40px;
            box-shadow: 
                0 0 0 1px rgba(255, 255, 255, 0.03) inset,
                0 50px 100px -20px rgba(0, 0, 0, 0.5),
                0 30px 60px -30px rgba(79, 70, 229, 0.3);
            animation: card-entrance 1.5s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.3s ease;
          }

          .glass-card::before {
            content: '';
            position: absolute; inset: -2px;
            border-radius: 42px;
            background: linear-gradient(135deg, 
                rgba(139, 92, 246, 0.4), 
                rgba(99, 102, 241, 0.1), 
                rgba(139, 92, 246, 0.4));
            z-index: -1;
            animation: border-rotate 4s linear infinite;
            background-size: 300% 300%;
            opacity: 0.5;
          }

          @keyframes border-rotate {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes card-entrance {
            0% { 
                opacity: 0; 
                transform: translateY(60px) rotateX(10deg) scale(0.9); 
                filter: blur(10px);
            }
            100% { 
                opacity: 1; 
                transform: translateY(0) rotateX(0deg) scale(1); 
                filter: blur(0);
            }
          }

          .logo-container {
            position: relative;
            width: 120px; height: 120px;
            display: flex; align-items: center; justify-content: center;
          }

          .logo-ring {
            position: absolute; inset: 0;
            border-radius: 50%; border: 2px solid transparent;
            border-top-color: rgba(139, 92, 246, 0.8);
            border-right-color: rgba(99, 102, 241, 0.4);
            animation: ring-spin 2s linear infinite;
          }

          .logo-ring:nth-child(2) {
            inset: 8px;
            animation-duration: 3s; animation-direction: reverse;
            border-top-color: rgba(99, 102, 241, 0.6);
            border-right-color: rgba(139, 92, 246, 0.3);
          }

          .logo-ring:nth-child(3) {
            inset: 16px; animation-duration: 4s;
            border-top-color: rgba(167, 139, 250, 0.5);
            border-right-color: rgba(99, 102, 241, 0.2);
          }

          @keyframes ring-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .logo-core {
            width: 70px; height: 70px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.3));
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            position: relative;
            animation: core-pulse 3s ease-in-out infinite;
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2);
          }

          @keyframes core-pulse {
            0%, 100% { 
                transform: scale(1); 
                box-shadow: 0 0 30px rgba(99, 102, 241, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.2);
            }
            50% { 
                transform: scale(1.05); 
                box-shadow: 0 0 50px rgba(99, 102, 241, 0.5), inset 0 0 30px rgba(139, 92, 246, 0.4);
            }
          }

          .rocket-icon {
            color: white;
            filter: drop-shadow(0 0 20px rgba(139, 92, 246, 0.8));
            animation: rocket-float 4s ease-in-out infinite;
          }

          @keyframes rocket-float {
            0%, 100% { transform: translateY(0) rotate(-5deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
          }

          .title-section {
            text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px;
          }

          .title-main {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 48px; font-weight: 700; letter-spacing: -0.03em;
            background: linear-gradient(135deg, #ffffff 0%, #c7d2fe 30%, #a5b4fc 60%, #818cf8 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
            text-shadow: 0 0 80px rgba(139, 92, 246, 0.5);
            animation: title-shimmer 3s ease-in-out infinite; background-size: 200% 200%;
          }

          @keyframes title-shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          .title-sub {
            font-size: 14px; font-weight: 500; color: rgba(167, 139, 250, 0.8);
            letter-spacing: 0.3em; text-transform: uppercase;
          }

          .version-badge {
            display: inline-flex; align-items: center; gap: 8px;
            font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 600;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
            color: #a5b4fc; padding: 8px 16px; border-radius: 100px;
            border: 1px solid rgba(139, 92, 246, 0.2); box-shadow: 0 4px 15px rgba(99, 102, 241, 0.1);
          }

          .version-dot {
            width: 6px; height: 6px; background: #22c55e; border-radius: 50%;
            animation: dot-pulse 2s ease-in-out infinite; box-shadow: 0 0 10px #22c55e;
          }

          @keyframes dot-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }

          .loading-section {
            display: flex; flex-direction: column; align-items: center; gap: 24px; width: 100%;
          }

          .progress-container {
            width: 100%; max-width: 320px; display: flex; flex-direction: column; gap: 12px;
          }

          .progress-header {
            display: flex; justify-content: space-between; align-items: center;
            font-size: 12px; color: rgba(167, 139, 250, 0.7); font-weight: 500;
          }

          .progress-percent {
            font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; color: #a5b4fc;
          }

          .progress-bar {
            width: 100%; height: 6px; background: rgba(255, 255, 255, 0.05);
            border-radius: 100px; overflow: hidden; position: relative;
          }

          .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #8b5cf6, #6366f1);
            background-size: 200% 100%; border-radius: 100px; width: 0%;
            animation: progress-shimmer 2s linear infinite;
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
            transition: width 0.4s ease;
          }

          @keyframes progress-shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }

          .progress-glow {
            position: absolute; top: 0; left: 0; height: 100%; width: 30%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: glow-slide 2s ease-in-out infinite;
          }

          @keyframes glow-slide {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }

          .status-steps {
            display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 320px;
          }

          .status-step {
            display: flex; align-items: center; gap: 12px; padding: 12px 16px;
            background: rgba(255, 255, 255, 0.02); border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.03);
            opacity: 0; transform: translateX(-20px);
            animation: step-appear 0.5s ease-out forwards;
          }

          @keyframes step-appear {
            to { opacity: 1; transform: translateX(0); }
          }

          .step-icon {
            width: 32px; height: 32px; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
            color: #a5b4fc;
          }

          .step-icon.completed {
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
            color: #22c55e;
          }

          .step-icon.loading {
            animation: icon-spin 1s linear infinite;
          }

          @keyframes icon-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .step-content { flex: 1; }
          .step-title { font-size: 13px; font-weight: 600; color: rgba(255, 255, 255, 0.9); }
          .step-desc { font-size: 11px; color: rgba(167, 139, 250, 0.6); margin-top: 2px; }
          .step-status {
            font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600;
            padding: 4px 8px; border-radius: 6px; background: rgba(99, 102, 241, 0.1); color: #818cf8;
          }

          .step-status.done { background: rgba(34, 197, 94, 0.1); color: #22c55e; }

          .loader-footer {
            display: flex; align-items: center; gap: 24px; margin-top: 8px;
          }

          .footer-link {
            font-size: 12px; color: rgba(167, 139, 250, 0.5); text-decoration: none;
            transition: color 0.3s ease; display: flex; align-items: center; gap: 6px;
          }

          .footer-link:hover { color: #a5b4fc; }

          .corner-decoration {
            position: absolute; width: 100px; height: 100px; pointer-events: none;
          }

          .corner-decoration.top-left {
            top: 20px; left: 20px; border-top: 2px solid rgba(139, 92, 246, 0.2);
            border-left: 2px solid rgba(139, 92, 246, 0.2); border-top-left-radius: 20px;
          }

          .corner-decoration.bottom-right {
            bottom: 20px; right: 20px; border-bottom: 2px solid rgba(139, 92, 246, 0.2);
            border-right: 2px solid rgba(139, 92, 246, 0.2); border-bottom-right-radius: 20px;
          }
        </style>
        
        <div class="mesh-bg"></div>
        <div class="grid-bg"></div>
        <div class="orb orb-1"></div>
        <div class="orb orb-2"></div>
        <div class="orb orb-3"></div>
        <div class="particles" id="particles"></div>
        <div class="corner-decoration top-left"></div>
        <div class="corner-decoration bottom-right"></div>
        
        <div class="glass-card" id="glass-card">
            <div class="logo-container">
                <div class="logo-ring"></div>
                <div class="logo-ring"></div>
                <div class="logo-ring"></div>
                <div class="logo-core">
                    <svg class="rocket-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.1 4-1 4-1"/>
                        <path d="M12 15v5s3.03-.55 4-2c1.1-1.62 1-4 1-4"/>
                    </svg>
                </div>
            </div>
            
            <div class="title-section">
                <h1 class="title-main">ONLUYEN SCRAPER</h1>
                <p class="title-sub">Data Extraction Engine</p>
                <div class="version-badge">
                    <span class="version-dot"></span>
                    <span>v4.0.0</span>
                </div>
            </div>

            <div class="loading-section">
                <div class="progress-container">
                    <div class="progress-header">
                        <span>Initializing...</span>
                        <span class="progress-percent" id="progress-percent">0%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" id="progress-fill"></div>
                        <div class="progress-glow"></div>
                    </div>
                </div>

                <div class="status-steps">
                    <div class="status-step" id="step-1" style="animation-delay: 0.2s">
                        <div class="step-icon loading">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                            </svg>
                        </div>
                        <div class="step-content">
                            <div class="step-title">Khởi tạo Hệ thống</div>
                            <div class="step-desc">Thiết lập các thành phần cốt lõi</div>
                        </div>
                        <span class="step-status">Đang chạy</span>
                    </div>
                    
                    <div class="status-step" id="step-2" style="animation-delay: 0.4s">
                        <div class="step-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="m15 9-6 6"/>
                                <path d="m9 9 6 6"/>
                            </svg>
                        </div>
                        <div class="step-content">
                            <div class="step-title">Kết nối Máy chủ</div>
                            <div class="step-desc">Đang kiểm tra cập nhật & cấu hình</div>
                        </div>
                        <span class="step-status">Đang chờ</span>
                    </div>
                    
                    <div class="status-step" id="step-3" style="animation-delay: 0.6s">
                        <div class="step-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <div class="step-content">
                            <div class="step-title">Xác thực AI</div>
                            <div class="step-desc">Kiểm tra Gemini API Key</div>
                        </div>
                        <span class="step-status">Đang chờ</span>
                    </div>
                    
                    <div class="status-step" id="step-4" style="animation-delay: 0.8s">
                        <div class="step-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <div class="step-content">
                            <div class="step-title">Sẵn sàng</div>
                            <div class="step-desc">Hệ thống đã sẵn sàng hoạt động</div>
                        </div>
                        <span class="step-status">Đang chờ</span>
                    </div>
                </div>
            </div>

            <div class="loader-footer">
                <a href="#" class="footer-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    GitHub
                </a>
                <a href="#" class="footer-link">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Support
                </a>
            </div>
        </div>
      `;

      function initializeLoaderLogic() {
          // Generate Particles
          const particlesContainer = document.getElementById('particles');
          if (particlesContainer) {
              for (let i = 0; i < 30; i++) {
                  const particle = document.createElement('div');
                  particle.className = 'particle';
                  particle.style.left = `${Math.random() * 100}%`;
                  particle.style.animationDuration = `${15 + Math.random() * 20}s`;
                  particle.style.animationDelay = `${Math.random() * 15}s`;
                  particle.style.width = `${2 + Math.random() * 4}px`;
                  particle.style.height = particle.style.width;
                  particlesContainer.appendChild(particle);
              }
          }

          // Animate Progress
          const progressPercent = document.getElementById('progress-percent');
          const progressFill = document.getElementById('progress-fill');
          window.scraperProgress = 0;
          const steps = [
              { at: 25, element: 'step-1', complete: true },
              { at: 50, element: 'step-2', complete: true },
              { at: 75, element: 'step-3', complete: true },
              { at: 100, element: 'step-4', complete: true }
          ];

          if (progressFill) progressFill.style.transition = 'width 0.3s ease-out';

          const interval = setInterval(() => {
              if (window.scraperProgress < 100) {
                  // Tăng tốc độ ngẫu nhiên để trông thật hơn
                  const increment = Math.random() * 2 + 0.5;
                  window.scraperProgress = Math.min(100, window.scraperProgress + increment);
                  
                  const displayProgress = Math.floor(window.scraperProgress);
                  if (progressPercent) progressPercent.textContent = `${displayProgress}%`;
                  if (progressFill) progressFill.style.width = `${window.scraperProgress}%`;
                  
                  // Check steps
                  steps.forEach(step => {
                      if (displayProgress >= step.at && !step.triggered) {
                          step.triggered = true;
                          const el = document.getElementById(step.element);
                          if (el) {
                              const icon = el.querySelector('.step-icon');
                              const status = el.querySelector('.step-status');
                              
                              if (icon) {
                                  icon.classList.remove('loading');
                                  icon.classList.add('completed');
                                  icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
                              }
                              if (status) {
                                  status.textContent = 'Xong';
                                  status.classList.add('done');
                              }
                              
                              // Start next step loading
                              const nextStepId = `step-${parseInt(step.element.split('-')[1]) + 1}`;
                              const nextStep = document.getElementById(nextStepId);
                              if (nextStep) {
                                  const nextIcon = nextStep.querySelector('.step-icon');
                                  const nextStatus = nextStep.querySelector('.step-status');
                                  if (nextIcon) nextIcon.classList.add('loading');
                                  if (nextStatus) nextStatus.textContent = 'Đang chạy';
                              }
                          }
                      }
                  });
              } else {
                  clearInterval(interval);
              }
          }, 50);

          // Card 3D Effect
          const card = document.getElementById('glass-card');
          if (card) {
              const handleMouseMove = (e) => {
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  
                  const rotateX = (y / rect.height) * -5;
                  const rotateY = (x / rect.width) * 5;
                  
                  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              };

              const handleMouseLeave = () => {
                  card.style.transform = 'rotateX(0) rotateY(0)';
              };

              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseleave', handleMouseLeave);
              
              // Cleanup listeners when loader is removed
              const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                      mutation.removedNodes.forEach((node) => {
                          if (node.id === 'scraper-initial-loader') {
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseleave', handleMouseLeave);
                              observer.disconnect();
                          }
                      });
                  });
              });
              observer.observe(document.body, { childList: true });
          }
      }

      appendLoader();
    }

    async function hideInitialLoading() {
      const loader = document.getElementById('scraper-initial-loader');
      if (loader) {
        // Đợi cho đến khi progress đạt 100%
        while (window.scraperProgress < 100) {
          await new Promise(r => setTimeout(r, 100));
        }
        
        // Thêm một chút delay để người dùng thấy trạng thái hoàn thành
        await new Promise(r => setTimeout(r, 400));

        loader.style.opacity = '0';
        loader.style.filter = 'blur(40px)';
        loader.style.transform = 'scale(1.05)';
        setTimeout(() => loader.remove(), 800);
      }
    }
    
    let allResults = "";
    let allResultsAI = "";
    let allImages = [];
    let allQuestions = []; // NEW: Store individual question objects
    let stopRequested = false;
    let lastID = "";
    let questionCount = 0;
    let isAIMode = true; // Default to AI Mode
    let retryCount = 0;
    let isPaused = false;
    let startTime = Date.now();
    let currentMode = null; // 'homework' or 'exam'
    let isCheckingUpdate = false;

    // ============================================================ 
    // 🤖 DEFAULT AI PROMPT CONFIGURATION
    // ============================================================ 
    let defaultAIPrompt = ""; // Loaded from PROMPT.md

    function loadDefaultPrompt() {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ action: "getPrompt" }, (response) => {
                if (chrome.runtime.lastError || !response || !response.success) {
                    console.error('Error loading PROMPT.md via background', chrome.runtime.lastError || response?.error);
                    defaultAIPrompt = "# Lỗi: Không thể tải PROMPT.md";
                } else {
                    defaultAIPrompt = response.data;
                }
                resolve();
            });
        });
    }

    // Function to customize AI prompt
    function setCustomAIPrompt(newPrompt) {
      defaultAIPrompt = newPrompt;
      showToast('Đã cập nhật prompt AI!', 'success');
    }

    // ============================================================ 
    // 🤖 GEMINI API CONFIGURATION
    // ============================================================ 
    const GEMINI_MODELS = [
        { id: 'gemini-3-pro', name: 'Gemini 3 Pro' },
        { id: 'gemini-3-flash', name: 'Gemini 3 Flash' },
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro' },
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
        { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite' }
    ];

    function getGeminiConfig() {
        const defaultModel = 'gemini-2.5-flash';
        try {
            const stored = localStorage.getItem('scraper_gemini_config');
            if (stored) {
                const config = JSON.parse(stored);
                // Validate if model still exists
                const isValidModel = GEMINI_MODELS.some(m => m.id === config.model);
                if (!isValidModel) {
                    config.model = defaultModel;
                    saveGeminiConfig(config); // Auto-fix
                }
                return config;
            }
        } catch (e) { }
        return { apiKey: '', model: defaultModel };
    }

    function saveGeminiConfig(config) {
        localStorage.setItem('scraper_gemini_config', JSON.stringify(config));
    }

    function getScraperSettings() {
        try {
            const stored = localStorage.getItem('scraper_settings');
            if (stored) return JSON.parse(stored);
        } catch (e) { }
        return { autoStopAtEnd: true };
    }

    function saveScraperSettings(settings) {
        localStorage.setItem('scraper_settings', JSON.stringify(settings));
    }

    // State for Gemini Chat
    let chatHistory = [];
    let imageMode = 'all'; // 'all', 'none', 'custom'
    let selectedImageIndices = new Set();
    let isImageMenuOpen = false;

    async function callGeminiAPI(messages, apiKey, modelId) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;
        
        // Chuyển đổi format nếu messages là string (tương thích ngược)
        const contents = Array.isArray(messages) 
            ? messages 
            : [{ role: 'user', parts: [{ text: messages }] }];

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || 'Gemini API Error');
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            throw error;
        }
    }

    // ============================================================ 
    // 🎨 INJECT STYLES
    // ============================================================ 
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
      
      :root {
        --scraper-bg: #ffffff;
        --scraper-text-primary: #111827;
        --scraper-text-secondary: #6b7280;
        --scraper-border: #e5e7eb;
        --scraper-primary: #6366f1;
        --scraper-success: #10b981;
        --scraper-warning: #f59e0b;
        --scraper-danger: #ef4444;
        --scraper-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        --scraper-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --scraper-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        --scraper-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      
      .scraper-icon {
        width: 1.25em;
        height: 1.25em;
        vertical-align: middle;
        display: inline-block;
        stroke-width: 2px;
        flex-shrink: 0;
      }
      .scraper-icon-lg { width: 3em; height: 3em; }
      .scraper-icon-md { width: 1.5em; height: 1.5em; }
      .scraper-icon-sm { width: 1em; height: 1em; }
      .scraper-icon-xs { width: 0.875em; height: 0.875em; }
      .scraper-icon-spin { animation: scraper-spin 1s linear infinite; }

      @keyframes scraper-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-6px); }
      }
      
      @keyframes scraper-pulse-ring {
        0% { transform: scale(0.8); opacity: 1; }
        100% { transform: scale(1.5); opacity: 0; }
      }
      
      @keyframes scraper-slide-up {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      
      @keyframes scraper-slide-in-right {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes scraper-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes scraper-confetti {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
      }
      
      @keyframes scraper-number-pop {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
      }

      .scraper-panel {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        animation: scraper-slide-in-right 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      
      .scraper-btn {
        position: relative;
        overflow: hidden;
        transition: all 0.2s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        letter-spacing: 0.01em;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 10px;
        cursor: pointer;
      }

      .scraper-btn-rounded {
        border-radius: 9999px;
      }
      
      .scraper-btn:hover {
        transform: translateY(-1px);
        filter: brightness(0.98);
      }
      
      .scraper-btn:active {
        transform: translateY(0) scale(0.98);
      }
      
      .scraper-stat-card {
        transition: all 0.3s ease;
        border-radius: 16px;
        background: #f9fafb;
        border: 1px solid #f3f4f6;
      }
      
      .scraper-stat-card:hover {
        transform: translateY(-2px);
        background: #ffffff;
        box-shadow: var(--scraper-shadow);
        border-color: #e5e7eb;
      }
      
      .scraper-stat-number.updated {
        animation: scraper-number-pop 0.4s ease;
      }
      
      .scraper-progress-bar {
        background: linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #d946ef, #6366f1);
        background-size: 200% 100%;
        animation: scraper-gradient-flow 2s ease infinite;
      }
      
      .scraper-live-indicator::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: currentColor;
        animation: scraper-pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      }
      
      .scraper-toast {
        animation: scraper-slide-up 0.4s ease-out;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
      }
      
      .scraper-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      .scraper-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .scraper-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        transition: all 0.3s;
      }
      
      .scraper-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.2);
      }
      
      .scraper-image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 12px;
        contain: content;
        content-visibility: auto;
        contain-intrinsic-size: 1px 320px; /* Estimated height */
      }
      
      .scraper-image-card {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        transition: all 0.3s ease;
        cursor: pointer;
        background: #f3f4f6;
        border: 1px solid #e5e7eb;
        will-change: transform;
        contain: paint;
      }
      
      .scraper-image-card:hover {
        transform: scale(1.02);
        z-index: 10;
        box-shadow: var(--scraper-shadow-lg);
        border-color: #d1d5db;
      }

      .scraper-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.95);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: scraper-fade-in 0.3s ease;
        backdrop-filter: blur(8px);
      }

      @keyframes scraper-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .scraper-lightbox-content {
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        animation: scraper-zoom-in 0.3s ease;
        background: white;
        border-radius: 16px;
        box-shadow: var(--scraper-shadow-xl);
        padding: 8px;
        border: 1px solid #e5e7eb;
      }

      @keyframes scraper-zoom-in {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      .scraper-lightbox img {
        max-width: 85vw;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 8px;
      }

      .scraper-lightbox-close {
        position: absolute;
        top: -20px;
        right: -20px;
        background: white;
        color: #ef4444;
        border: 1px solid #fee2e2;
        box-shadow: var(--scraper-shadow);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        cursor: pointer;
        z-index: 10;
      }

      .scraper-lightbox-close:hover {
        background: #ef4444;
        color: white;
        transform: rotate(90deg);
      }

      .scraper-lightbox-info {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 8px 20px;
        border-radius: 9999px;
        color: #374151;
        font-size: 13px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: var(--scraper-shadow-lg);
        border: 1px solid #e5e7eb;
      }

      .scraper-lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: white;
        color: #111827;
        border: 1px solid #e5e7eb;
        box-shadow: var(--scraper-shadow);
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .scraper-lightbox-nav:hover {
        background: #f9fafb;
        transform: translateY(-50%) scale(1.1);
        border-color: #d1d5db;
      }

      .scraper-lightbox-nav.prev { left: -80px; }
      .scraper-lightbox-nav.next { right: -80px; }

      .scraper-image-card:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .scraper-confetti-piece {
        position: fixed;
        pointer-events: none;
        animation: scraper-confetti 3s ease-out forwards;
      }

      .scraper-mode-select-btn {
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        background: white;
      }

      .scraper-mode-select-btn:hover {
        transform: translateY(-4px);
        box-shadow: var(--scraper-shadow-xl);
      }
      
      .scraper-mode-select-btn:active {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(styleSheet);

    // ============================================================ 
    // 🔔 TOAST NOTIFICATION SYSTEM
    // ============================================================ 
    const toastContainer = document.createElement('div');
    Object.assign(toastContainer.style, {
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      zIndex: '2147483647',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    });
    document.body.appendChild(toastContainer);

    function showToast(message, type = 'info', duration = 3000) {
      if (toastContainer.children.length >= 4) {
        toastContainer.children[0].remove();
      }

      const icons = {
        success: getIcon('check', 'scraper-icon-sm'),
        error: getIcon('x', 'scraper-icon-sm'),
        warning: getIcon('alertTriangle', 'scraper-icon-sm'),
        info: getIcon('info', 'scraper-icon-sm')
      };

      const typeColors = {
        success: '#10b981', 
        error: '#ef4444',   
        warning: '#f59e0b', 
        info: '#3b82f6'     
      };
      
      const toast = document.createElement('div');
      toast.className = 'scraper-toast ol-bg ol-border';
      if (localStorage.getItem('ol_theme') === 'dark') toast.classList.add('scraper-dark');
      
      const accentColor = typeColors[type] || typeColors.info;

      Object.assign(toast.style, {
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.7)',
        color: 'var(--ol-text)', 
        padding: '12px 16px',
        borderRadius: '16px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: '600',
        minWidth: '280px',
        maxWidth: '400px',
        border: `1px solid ${accentColor}40`,
        backdropFilter: 'blur(16px)',
        overflow: 'hidden',
        animation: 'scraper-toast-enter 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      });
      
      toast.innerHTML = `
        <style>
          @keyframes scraper-toast-enter {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes scraper-progress {
            0% { width: 100%; }
            100% { width: 0%; }
          }
        </style>
        <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
          <span style="
            color: #fff; 
            display: flex; 
            align-items: center; 
            background: ${accentColor}; 
            padding: 6px; 
            border-radius: 10px;
            box-shadow: 0 4px 10px ${accentColor}40;
          ">${icons[type]}</span>
          <span style="line-height: 1.4;">${message}</span>
        </div>
        <button class="scraper-toast-close" style="
          background: transparent; border: none; color: var(--ol-text-sub); 
          cursor: pointer; padding: 4px; display: flex; align-items: center;
          border-radius: 8px; transition: all 0.2s; opacity: 0.6;
        " onmouseover="this.style.opacity='1';this.style.background='var(--ol-surface-hover)'" 
          onmouseout="this.style.opacity='0.6';this.style.background='transparent'">
          ${getIcon('x', 'scraper-icon-xs')}
        </button>
        <div style="
          position: absolute; bottom: 0; left: 0; height: 3px; 
          background: ${accentColor}; width: 100%; opacity: 0.4;
          animation: scraper-progress ${duration}ms linear forwards;
        "></div>
      `;
      
      const closeBtn = toast.querySelector('.scraper-toast-close');
      if (closeBtn) {
        closeBtn.onclick = () => {
          toast.style.opacity = '0';
          toast.style.transform = 'scale(0.9) translateY(-10px)';
          setTimeout(() => toast.remove(), 300);
        };
      }

      toastContainer.appendChild(toast);
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.opacity = '0';
          toast.style.transform = 'scale(0.9) translateY(-10px)';
          setTimeout(() => toast.remove(), 300);
        }
      }, duration);
    }

    function showConfirmModal(message, title = 'Xác nhận') {
      return new Promise((resolve) => {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
          position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
          background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)',
          zIndex: '200001', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', sans-serif", animation: 'scraper-fade-in 0.2s ease'
        });

        overlay.innerHTML = `
          <div style="
            background: #ffffff; border-radius: 20px; padding: 32px; width: 400px;
            border: 1px solid #e5e7eb; color: #1f2937;
            box-shadow: var(--scraper-shadow-xl);
            text-align: center;
          ">
            <div style="
              width: 56px; height: 56px; background: #fffbeb; color: #f59e0b;
              border-radius: 50%; display: flex; align-items: center; justifyContent: center;
              margin: 0 auto 20px auto;
            ">
              ${getIcon('alertTriangle', 'scraper-icon-lg')}
            </div>
            <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #111827;">${title}</h3>
            <p style="color: #6b7280; font-size: 15px; line-height: 1.6; margin-bottom: 28px;">${message}</p>
            <div style="display: flex; gap: 12px;">
              <button id="confirmCancel" style="
                flex: 1; padding: 12px; background: white; border: 1px solid #e5e7eb;
                border-radius: 12px; color: #4b5563; cursor: pointer; font-weight: 600; transition: all 0.2s;
              " onmouseover="this.style.background='#f9fafb';this.style.borderColor='#d1d5db'" onmouseout="this.style.background='white';this.style.borderColor='#e5e7eb'">Hủy</button>
              <button id="confirmOk" style="
                flex: 1; padding: 12px; background: #6366f1; border: none;
                border-radius: 12px; color: white; cursor: pointer; font-weight: 600; transition: all 0.2s;
                box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
              " onmouseover="this.style.background='#4f46e5';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#6366f1';this.style.transform='translateY(0)'">Đồng ý</button>
            </div>
          </div>
        `;

        document.body.appendChild(overlay);

        document.getElementById('confirmCancel').onclick = () => {
          overlay.remove();
          resolve(false);
        };

        document.getElementById('confirmOk').onclick = () => {
          overlay.remove();
          resolve(true);
        };
      });
    }

    // ============================================================ 
    // 🎊 CONFETTI EFFECT
    // ============================================================ 
    function createConfetti() {
      const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];
      const svgs = [
        '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>',
        '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>',
        '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12,4 4,20 20,20"/></svg>',
        '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
        '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12,4 20,12 12,20 4,12"/></svg>'
      ];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'scraper-confetti-piece';
        confetti.innerHTML = svgs[Math.floor(Math.random() * svgs.length)];
        Object.assign(confetti.style, {
          position: 'fixed',
          left: Math.random() * 100 + 'vw',
          top: '-40px',
          width: (Math.random() * 15 + 10) + 'px',
          height: (Math.random() * 15 + 10) + 'px',
          color: colors[Math.floor(Math.random() * colors.length)],
          zIndex: '200000',
          pointerEvents: 'none',
          animation: `scraper-confetti ${Math.random() * 2 + 2}s ease-out forwards`,
          animationDelay: Math.random() * 0.5 + 's'
        });
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 4000);
      }
    }

    // ============================================================
    // 🖼️ IMAGE LIGHTBOX SYSTEM
    // ============================================================

    function createImageLightbox(images, startIndex = 0) {
      let currentIndex = startIndex;

      const lightbox = document.createElement('div');
      lightbox.className = 'scraper-lightbox';
      lightbox.id = 'scraperLightbox';

      function updateImage() {
        const img = images[currentIndex];
        const imgUrl = img.fullUrl || img.url;
        const isBase64 = img.isBase64 || imgUrl.startsWith('data:');

        // Build navigation buttons HTML
        let navButtonsHTML = '';
        if (images.length > 1) {
          navButtonsHTML = `
            <button class="scraper-lightbox-nav prev" id="lightboxPrev" title="Ảnh trước (←)">
              ${getIcon('chevronLeft', 'scraper-icon-md')}
            </button>
            <button class="scraper-lightbox-nav next" id="lightboxNext" title="Ảnh sau (→)">
              ${getIcon('chevronRight', 'scraper-icon-md')}
            </button>
          `;
        }

        lightbox.innerHTML = `
          <div class="scraper-lightbox-content">
            <!-- Close Button -->
            <button class="scraper-lightbox-close" id="lightboxClose" title="Đóng (ESC)">
              ${getIcon('x', 'scraper-icon-md')}
            </button>

            <!-- Navigation -->
            ${navButtonsHTML}

            <!-- Image -->
            <img src="${imgUrl}" alt="${img.alt || 'Ảnh'}" id="lightboxImg">

            <!-- Info -->
            <div class="scraper-lightbox-info">
              <span>${getIcon('info', 'scraper-icon-sm')} Câu ${img.question || '?'}</span>
              ${img.optionLabel ? '<span> • Đáp án ' + img.optionLabel + '</span>' : ''}
              <span> • ${currentIndex + 1}/${images.length}</span>
              ${isBase64 ? '<span> • Base64</span>' : ''}
            </div>
          </div>
        `;

        // Event: Close button
        document.getElementById('lightboxClose').onclick = closeLightbox;

        // Event: Navigation
        if (images.length > 1) {
          document.getElementById('lightboxPrev').onclick = (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateImage();
          };
          document.getElementById('lightboxNext').onclick = (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateImage();
          };
        }

        // Event: Click on image to download/open
        document.getElementById('lightboxImg').onclick = (e) => {
          e.stopPropagation();
          if (!isBase64) {
            window.open(imgUrl, '_blank');
          }
        };
      }

      function closeLightbox() {
        lightbox.style.animation = 'scraper-fade-in 0.2s ease reverse';
        setTimeout(() => lightbox.remove(), 200);
        document.removeEventListener('keydown', handleKeydown);
      }

      function handleKeydown(e) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft' && images.length > 1) {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateImage();
        }
        if (e.key === 'ArrowRight' && images.length > 1) {
          currentIndex = (currentIndex + 1) % images.length;
          updateImage();
        }
      }

      // Click outside to close
      lightbox.onclick = (e) => {
        if (e.target === lightbox) closeLightbox();
      };

      // Keyboard events
      document.addEventListener('keydown', handleKeydown);

      updateImage();
      document.body.appendChild(lightbox);

      return lightbox;
    }

    // ============================================================
    // 🔄 UPDATE CHECK SYSTEM
    // ============================================================

    async function checkUpdate(manual = false) {
      if (isCheckingUpdate) return;
      
      // Kiểm tra xem extension context có còn hiệu lực không
      if (!chrome.runtime?.id) {
        return;
      }

      isCheckingUpdate = true;
      
      if (manual) showToast('Đang kiểm tra cập nhật...', 'info');
      return new Promise((resolve) => {
        try {
          chrome.runtime.sendMessage({ action: "checkUpdate" }, (response) => {
            isCheckingUpdate = false;
            
            if (chrome.runtime.lastError) {
              const errMsg = chrome.runtime.lastError.message;
              if (errMsg.includes("context invalidated")) {
                // Không log gì để tránh phiền toái, script cũ sẽ tự chết
              } else {
                if (manual) showToast('Lỗi kết nối hệ thống', 'error');
              }
              resolve();
              return;
            }

            if (response && response.success) {
              const updateInfo = response.data;

              // 1. Kiểm tra bảo trì
              if (updateInfo.maintenance) {
                showMaintenanceModal();
                resolve();
                return;
              }

              // 2. Kiểm tra thông báo hệ thống
              if (updateInfo.announcement && updateInfo.announcement.enabled) {
                const ann = updateInfo.announcement;
                const lastAnnId = localStorage.getItem('ol_last_ann_id');
                const currentAnnId = btoa(encodeURIComponent(ann.title + ann.content));
                
                if (lastAnnId !== currentAnnId || manual) {
                  showAnnouncementModal(ann);
                  localStorage.setItem('ol_last_ann_id', currentAnnId);
                }
              }

              const currentVersion = chrome.runtime.getManifest().version;
              
              if (isNewerVersion(updateInfo.version, currentVersion)) {
                showUpdateModal(updateInfo).then(resolve);
              } else {
                if (manual) showToast('Bạn đang sử dụng phiên bản mới nhất!', 'success');
                resolve();
              }
            } else {
              if (manual) showToast('Không thể kiểm tra cập nhật lúc này', 'warning');
              resolve();
            }
          });
        } catch (e) {
          isCheckingUpdate = false;
          resolve();
        }
      });
    }

    function isNewerVersion(newVer, curVer) {
      const newParts = newVer.split('.').map(Number);
      const curParts = curVer.split('.').map(Number);
      for (let i = 0; i < Math.max(newParts.length, curParts.length); i++) {
        const n = newParts[i] || 0;
        const c = curParts[i] || 0;
        if (n > c) return true;
        if (n < c) return false;
      }
      return false;
    }

    function showUpdateModal(info) {
      return new Promise((resolve) => {
        // 1. Detect Browser
        const userAgent = navigator.userAgent;
        const isEdge = userAgent.indexOf("Edg") > -1;
        const browserKey = isEdge ? 'edge' : 'chrome';
        const browserName = isEdge ? 'Microsoft Edge' : 'Google Chrome / Brave';

        // 2. Get Config
        // Ưu tiên config mới (platforms), fallback config cũ (links)
        let config = {};
        if (info.platforms && info.platforms[browserKey]) {
            config = info.platforms[browserKey];
        } else if (info.links) {
            config = { url: info.links[browserKey], force_update: false };
        }
        
        // 3. Determine URL & Force Update Status
        const defaultEdgeStore = "https://microsoftedge.microsoft.com/addons/detail/jfnjmcpocmkbdknlglbahglkbkjifpde";
        const defaultChromeRepo = "https://github.com/Trongdepzai-dev/onluyen-scraper-extension/releases";

        // Logic URL: Nếu Admin cấu hình thì dùng Admin, không thì dùng Default
        // Với Chrome: Admin thường sẽ upload file .zip lên server -> config.url sẽ là link localhost/downloads/...
        const downloadUrl = config.url || (isEdge ? defaultEdgeStore : defaultChromeRepo);
        const isForceUpdate = !!config.force_update;
        
        // Logic Button Label
        let btnLabel = "";
        let btnIcon = "download";
        
        if (isEdge) {
            // Nếu URL chứa microsoft -> Store
            if (downloadUrl.includes("microsoft.com")) {
                btnLabel = "Mở Microsoft Edge Store";
                btnIcon = "shoppingBag"; // Giả sử dùng icon shopping bag hoặc external link
            } else {
                btnLabel = "Tải bản mới (.zip)";
            }
        } else {
            // Chrome luôn là file zip thủ công
            btnLabel = "Tải gói cập nhật (.zip)";
        }

        console.log('[OnLuyen Update] Browser:', browserName);
        console.log('[OnLuyen Update] Download URL:', downloadUrl);

        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
          position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
          background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(4px)',
          zIndex: '100001', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', sans-serif", animation: 'scraper-fade-in 0.4s ease'
        });

        overlay.innerHTML = `
          <div style="
            background: #ffffff;
            border-radius: 32px; padding: 40px; max-width: 500px; width: 90%;
            box-shadow: var(--scraper-shadow-xl); border: 1px solid #e5e7eb;
            text-align: center; color: #1f2937;
          ">
            <div style="
              width: 64px; height: 64px; background: #eef2ff; color: #6366f1;
              border-radius: 20px; display: flex; align-items: center; justify-content: center;
              margin: 0 auto 24px auto; animation: scraper-float 3s ease-in-out infinite;
            ">
              ${getIcon('refreshCw', 'scraper-icon-lg')}
            </div>
            <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 12px; color: #111827;">
                ${isForceUpdate ? 'Cập Nhật Bắt Buộc!' : 'Cập Nhật Mới Sẵn Sàng!'}
            </h2>
            <div style="background: #f3f4f6; padding: 10px 20px; border-radius: 9999px; margin-bottom: 24px; display: inline-block; border: 1px solid #e5e7eb;">
              <span style="color: #6366f1; font-weight: 700;">v${info.version}</span>
              <span style="color: #9ca3af; margin: 0 10px;">•</span>
              <span style="color: #6b7280;">${info.release_date || new Date().toISOString().split('T')[0]}</span>
            </div>
            <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin-bottom: 32px; text-align: left; background: #f9fafb; padding: 20px; border-radius: 16px; border: 1px solid #f3f4f6;">
              ${info.message}
            </p>
            
            <div id="updateActionButtons" style="display: flex; flex-direction: column; gap: 12px;">
              <!-- Main Download Button -->
              <div id="downloadBtn" style="
                background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); 
                color: white; padding: 16px; border-radius: 16px; cursor: pointer;
                text-decoration: none; font-weight: 700; font-size: 16px; transition: all 0.2s;
                display: flex; align-items: center; justify-content: center; gap: 8px;
                box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
              " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                ${getIcon(btnIcon, 'scraper-icon-sm')} ${btnLabel}
              </div>
              
              <!-- Manual Guide Button (Always show for Chrome/Brave) -->
              ${!isEdge ? `
              <div style="display: flex; gap: 8px; align-items: center; justify-content: center; margin-top: 4px;">
                  <span style="font-size: 12px; color: #ef4444; font-weight: 600; display: flex; align-items: center; gap: 4px;">
                    ${getIcon('alertTriangle', 'scraper-icon-xs')} Chrome cần cài đặt thủ công
                  </span>
                  <button id="guideBtn" style="
                    background: transparent; border: none; color: #4f46e5;
                    padding: 4px; cursor: pointer; font-weight: 700; font-size: 12px;
                    text-decoration: underline;
                  ">
                    Xem hướng dẫn
                  </button>
              </div>` : ''}
            </div>

            <!-- Skip Button (Hidden if Force Update) -->
            ${!isForceUpdate ? `
            <button id="skipUpdateBtn" style="
              margin-top: 24px; background: transparent; border: none; color: #9ca3af;
              font-size: 14px; cursor: pointer; transition: color 0.2s;
              font-weight: 500;
            " onmouseover="this.style.color='#6b7280'" onmouseout="this.style.color='#9ca3af'">Để sau</button>
            ` : ''}
          </div>
        `;

        document.body.appendChild(overlay);
        
        const skipBtn = document.getElementById('skipUpdateBtn');
        const guideBtn = document.getElementById('guideBtn');
        const downloadBtn = document.getElementById('downloadBtn');

        // Logic hướng dẫn
        if (guideBtn) {
            guideBtn.onclick = () => {
                window.open('https://github.com/Trongdepzai-dev/onluyen-scraper-extension/blob/main/HOW2UPDATE.md', '_blank');
            };
        }

        // Logic Skip
        if (skipBtn) {
          skipBtn.onclick = () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
              overlay.remove();
              resolve();
            }, 400);
          };
        }
        
        // Logic Download
        downloadBtn.onclick = () => {
             console.log('[OnLuyen Update] Downloading:', downloadUrl);
             window.open(downloadUrl, '_blank');
             
             // Nếu là Edge Store -> Có thể đóng luôn modal
             // Nếu là Chrome (Zip) -> Nên giữ modal hoặc hiện hướng dẫn? 
             // Hiện tại logic là đóng modal sau 1s nếu không phải force update
             if (!isForceUpdate) {
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => overlay.remove(), 400);
                    resolve();
                }, 1000);
             }
        };
      });
    }

    function showMaintenanceModal() {
      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
        background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)',
        zIndex: '100002', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif", animation: 'scraper-fade-in 0.4s ease'
      });

      overlay.innerHTML = `
        <div style="
          background: #ffffff; border-radius: 32px; padding: 40px; 
          max-width: 450px; width: 90%; text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid #fee2e2;
        ">
          <div style="
            width: 80px; height: 80px; background: #fef2f2; color: #ef4444;
            border-radius: 24px; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 24px auto;
          ">
            ${getIcon('alertTriangle', 'scraper-icon-xl')}
          </div>
          <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 12px; color: #991b1b;">
            Hệ Thống Bảo Trì
          </h2>
          <p style="color: #7f1d1d; font-size: 15px; line-height: 1.6; margin-bottom: 0;">
            Hiện tại hệ thống đang được bảo trì để nâng cấp. Vui lòng quay lại sau ít phút. Xin lỗi vì sự bất tiện này!
          </p>
        </div>
      `;
      document.body.appendChild(overlay);
      // Không resolve, chặn người dùng sử dụng tiếp
    }

    function showAnnouncementModal(ann) {
      const colors = {
        info: { bg: '#eef2ff', text: '#4338ca', icon: 'info', title: '#1e1b4b' },
        success: { bg: '#f0fdf4', text: '#15803d', icon: 'checkCircle', title: '#064e3b' },
        warning: { bg: '#fffbeb', text: '#b45309', icon: 'alertTriangle', title: '#451a03' },
        error: { bg: '#fef2f2', text: '#b91c1c', icon: 'alertCircle', title: '#450a0a' }
      };
      const theme = colors[ann.type] || colors.info;

      const overlay = document.createElement('div');
      Object.assign(overlay.style, {
        position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
        background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)',
        zIndex: '100001', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif", animation: 'scraper-fade-in 0.3s ease'
      });

      overlay.innerHTML = `
        <div style="
          background: #ffffff; border-radius: 24px; padding: 32px; 
          max-width: 400px; width: 90%; text-align: center;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          position: relative;
        ">
          <button id="closeAnnBtn" style="
            position: absolute; top: 16px; right: 16px; background: transparent;
            border: none; cursor: pointer; color: #9ca3af;
          ">
            ${getIcon('x', 'scraper-icon-sm')}
          </button>
          <div style="
            width: 56px; height: 56px; background: ${theme.bg}; color: ${theme.text};
            border-radius: 16px; display: flex; align-items: center; justify-content: center;
            margin: 0 auto 20px auto;
          ">
            ${getIcon(theme.icon, 'scraper-icon-md')}
          </div>
          <h3 style="font-size: 20px; font-weight: 700; margin-bottom: 8px; color: ${theme.title};">
            ${ann.title}
          </h3>
          <p style="color: #4b5563; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
            ${ann.content}
          </h3>
          <button id="okAnnBtn" style="
            width: 100%; background: #111827; color: white; padding: 12px;
            border-radius: 12px; font-weight: 600; cursor: pointer; border: none;
          ">
            Đã hiểu
          </button>
        </div>
      `;

      document.body.appendChild(overlay);
      
      const close = () => {
        overlay.style.opacity = '0';
        overlay.style.transform = 'scale(0.95)';
        setTimeout(() => overlay.remove(), 300);
      };

      overlay.querySelector('#closeAnnBtn').onclick = close;
      overlay.querySelector('#okAnnBtn').onclick = close;
    }

    // ============================================================
    // 🎯 MODE SELECTION DIALOG
    // ============================================================
    function showModeSelector() {
      return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.id = 'modeSelectorOverlay';
        overlay.className = 'ol-overlay';
        
        const currentTheme = localStorage.getItem('ol_theme') || 'light';
        if (currentTheme === 'dark') overlay.classList.add('scraper-dark');

        // Smart Context Detection
        const url = window.location.href.toLowerCase();
        const isExamUrl = url.includes('exam') || url.includes('test') || url.includes('kiem-tra');
        const isHomeworkUrl = url.includes('homework') || url.includes('assignment') || url.includes('bai-tap');

        Object.assign(overlay.style, {
          position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
          zIndex: '99999', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
          animation: 'scraper-fade-in 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          perspective: '1500px',
          overflow: 'hidden',
          padding: '16px'
        });

        overlay.innerHTML = `
          <!-- Compact Mesh Background -->
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.5; pointer-events: none;">
            <div style="position: absolute; top: -15%; left: -5%; width: 60%; height: 60%; background: radial-gradient(circle, var(--ol-brand-alpha) 0%, transparent 70%); animation: mesh-float 20s infinite alternate;"></div>
            <div style="position: absolute; bottom: -15%; right: -5%; width: 60%; height: 60%; background: radial-gradient(circle, var(--ol-success-alpha) 0%, transparent 70%); animation: mesh-float 25s infinite alternate-reverse;"></div>
          </div>

          <div class="ol-bg ol-border scraper-modal-container" style="
            border-radius: 40px; padding: 48px 40px; max-width: 680px; width: 100%;
            box-shadow: 0 30px 80px -15px rgba(0, 0, 0, 0.35), inset 0 0 0 1px rgba(255,255,255,0.1); 
            position: relative;
            border-width: 1px; border-style: solid;
            animation: scraper-modal-ultra-enter 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            backdrop-filter: blur(25px);
            display: flex; flex-direction: column; align-items: center;
          ">
            <!-- Top Close Button -->
            <button id="topCloseBtn" class="ol-surface ol-border ol-text-sub ol-btn-hover" style="
              position: absolute; top: 24px; left: 24px;
              background: transparent; border-width: 1px; border-style: solid; cursor: pointer;
              width: 44px; height: 44px; border-radius: 14px;
              display: flex; align-items: center; justify-content: center;
              transition: all 0.3s ease; color: #ef4444; border-color: rgba(239, 68, 68, 0.3);
            " title="Đóng">
              ${getIcon('x', 'scraper-icon-sm')}
            </button>

            <!-- Compact Theme Toggle -->
            <button id="menuThemeBtn" class="ol-surface ol-border ol-text-sub ol-btn-hover" style="
              position: absolute; top: 24px; right: 24px;
              background: transparent; border-width: 1px; border-style: solid; cursor: pointer;
              width: 44px; height: 44px; border-radius: 14px;
              display: flex; align-items: center; justify-content: center;
              transition: all 0.3s ease;
            ">
              ${currentTheme === 'dark' ? getIcon('sun', 'scraper-icon-sm') : getIcon('moon', 'scraper-icon-sm')}
            </button>

            <!-- Scaled Header Section -->
            <div style="text-align: center; margin-bottom: 40px; width: 100%;">
              <div class="ol-brand-bg ol-brand-text rocket-container" style="
                margin: 0 auto 24px auto; 
                width: 90px; height: 90px;
                border-radius: 28px; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 15px 30px -8px var(--ol-brand-alpha), inset 0 0 0 1px rgba(255,255,255,0.2);
                animation: scraper-float 4s infinite ease-in-out;
                border: 1px solid var(--ol-brand);
              ">
                <div style="transform: scale(1.5); filter: drop-shadow(0 0 8px rgba(255,255,255,0.4));">
                    ${getIcon('rocket', 'scraper-icon-xl')}
                </div>
              </div>
              <h1 class="ol-text main-title" style="
                font-size: 32px; font-weight: 900; margin: 0 0 12px 0; letter-spacing: -0.04em;
                background: linear-gradient(135deg, var(--ol-text) 0%, var(--ol-brand) 100%);
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                display: inline-flex; align-items: center; gap: 12px;
              ">
                Auto Scraper v${chrome.runtime.getManifest().version}
                <span id="titleInfoBtn" style="cursor: pointer; color: var(--ol-text-sub); opacity: 0.5; transition: all 0.2s;" onmouseover="this.style.opacity='1';this.style.transform='scale(1.1)'" onmouseout="this.style.opacity='0.5';this.style.transform='scale(1)'">
                    ${getIcon('info', 'scraper-icon-sm')}
                </span>
              </h1>
              <p class="ol-text-sub" style="font-size: 16px; font-weight: 600; margin: 0; opacity: 0.85;">
                Công cụ hỗ trợ học tập thông minh
              </p>
            </div>
            
            <!-- Compact Mode Grid -->
            <div class="mode-cards-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; width: 100%;">
              
              <!-- Homework Mode -->
              <div id="homeworkModeBtn" class="scraper-mode-card ol-surface ol-border ${isHomeworkUrl ? 'recommended' : ''}" style="
                border-width: 1px; border-style: solid;
                border-radius: 28px; padding: 32px 24px; text-align: left;
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
                position: relative; overflow: hidden;
              ">
                ${isHomeworkUrl ? '<div class="recommended-badge">KHUYÊN DÙNG</div>' : ''}
                <div class="ol-success-bg ol-success-text" style="
                  width: 52px; height: 52px;
                  border-radius: 16px; display: flex; align-items: center; justify-content: center;
                  margin-bottom: 20px; border: 1.5px solid var(--ol-success);
                  box-shadow: 0 8px 16px -4px var(--ol-success-bg);
                ">
                  ${getIcon('book', 'scraper-icon-md')}
                </div>
                <h2 class="ol-text" style="font-size: 19px; font-weight: 900; margin: 0 0 4px 0; letter-spacing: -0.02em;">BÀI TẬP</h2>
                <p class="ol-success-text" style="font-size: 9px; font-weight: 800; margin: 0 0 16px 0; opacity: 0.8; letter-spacing: 0.1em; text-transform: uppercase;">HOMEWORK</p>
                <div class="ol-text-sub" style="font-size: 14px; line-height: 1.5; margin-bottom: 24px; opacity: 0.8;">
                  Tương tác từng bước. Phù hợp luyện tập kiến thức.
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <kbd class="ol-border" style="background: var(--ol-bg); padding: 4px 10px; border-radius: 10px; font-size: 12px; font-weight: 900; color: var(--ol-text-sub); border-width: 1px; border-style: solid;">1</kbd>
                    <span class="ol-text-sub" style="font-size: 12px; font-weight: 700;">Phím tắt</span>
                </div>
              </div>
              
              <!-- Exam Mode -->
              <div id="examModeBtn" class="scraper-mode-card ol-surface ol-border ${isExamUrl ? 'recommended' : ''}" style="
                border-width: 1px; border-style: solid;
                border-radius: 28px; padding: 32px 24px; text-align: left;
                transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); cursor: pointer;
                position: relative; overflow: hidden;
              ">
                ${isExamUrl ? '<div class="recommended-badge">KHUYÊN DÙNG</div>' : ''}
                <div class="ol-brand-bg ol-brand-text" style="
                  width: 52px; height: 52px;
                  border-radius: 16px; display: flex; align-items: center; justify-content: center;
                  margin-bottom: 20px; border: 1.5px solid var(--ol-brand);
                  box-shadow: 0 8px 16px -4px var(--ol-brand-bg);
                ">
                  ${getIcon('fileText', 'scraper-icon-md')}
                </div>
                <h2 class="ol-text" style="font-size: 19px; font-weight: 900; margin: 0 0 4px 0; letter-spacing: -0.02em;">BÀI THI</h2>
                <p class="ol-brand-text" style="font-size: 9px; font-weight: 800; margin: 0 0 16px 0; opacity: 0.8; letter-spacing: 0.1em; text-transform: uppercase;">EXAM MODE</p>
                <div class="ol-text-sub" style="font-size: 14px; line-height: 1.5; margin-bottom: 24px; opacity: 0.8;">
                  Quét nhanh tự động. Dành cho các kỳ thi quan trọng.
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <kbd class="ol-border" style="background: var(--ol-bg); padding: 4px 10px; border-radius: 10px; font-size: 12px; font-weight: 900; color: var(--ol-text-sub); border-width: 1px; border-style: solid;">2</kbd>
                    <span class="ol-text-sub" style="font-size: 12px; font-weight: 700;">Phím tắt</span>
                </div>
              </div>
            </div>

            <!-- Premium Services Section -->
            <div style="width: 100%; margin-bottom: 32px;">
              <p class="ol-text-sub" style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; text-align: center; opacity: 0.6;">Dịch vụ Premium</p>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <!-- Perpixel Max -->
                <button class="premium-service-btn scraper-service-card" data-service="Perpixel Max">
                  <div class="service-icon-bg" style="background: rgba(99, 102, 241, 0.1); color: #6366f1;">
                    ${getIcon('search', 'scraper-icon-md')}
                  </div>
                  <div class="service-info">
                    <span class="service-name">Perpixel Max</span>
                    <span class="service-badge badge-maintenance">Bảo trì</span>
                  </div>
                </button>
                
                <!-- ChatGPT Pro -->
                <button class="premium-service-btn scraper-service-card" data-service="ChatGPT Pro">
                  <div class="service-icon-bg" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
                    ${getIcon('bot', 'scraper-icon-md')}
                  </div>
                  <div class="service-info">
                    <span class="service-name">ChatGPT Pro</span>
                    <span class="service-badge badge-active">Hoạt động</span>
                  </div>
                </button>
                
                <!-- Canva Pro -->
                <button class="premium-service-btn scraper-service-card" data-service="Canva Pro">
                  <div class="service-icon-bg" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                    ${getIcon('image', 'scraper-icon-md')}
                  </div>
                  <div class="service-info">
                    <span class="service-name">Canva Pro</span>
                    <span class="service-badge badge-maintenance">Bảo trì</span>
                  </div>
                </button>
                
                <!-- Scribd Pro -->
                <button class="premium-service-btn scraper-service-card" data-service="Scribd Pro">
                  <div class="service-icon-bg" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;">
                    ${getIcon('book', 'scraper-icon-md')}
                  </div>
                  <div class="service-info">
                    <span class="service-name">Scribd Pro</span>
                    <span class="service-badge badge-maintenance">Bảo trì</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Settings Toggle -->
            <div style="margin-bottom: 32px; display: flex; align-items: center; justify-content: center; gap: 12px;">
              <label class="ol-surface ol-border ol-btn-hover" style="
                display: flex; align-items: center; gap: 12px; padding: 10px 20px; 
                border-radius: 99px; border-width: 1px; border-style: solid; 
                cursor: pointer; user-select: none; transition: all 0.2s;
              ">
                <input type="checkbox" id="skipLoadingToggle" checked style="accent-color: var(--ol-brand); width: 18px; height: 18px; cursor: pointer;">
                <span class="ol-text" style="font-size: 14px; font-weight: 700;">Tự động bỏ qua Loading</span>
              </label>
              <button id="skipLoadingInfoBtn" class="ol-surface ol-border ol-text-sub ol-btn-hover" style="
                background: transparent; border-width: 1px; border-style: solid; cursor: pointer; padding: 10px;
                display: flex; align-items: center; border-radius: 50%; transition: all 0.2s;
              " title="Thông tin tính năng">
                ${getIcon('info', 'scraper-icon-sm')}
              </button>
            </div>
            
            <!-- Compact Footer Section -->
            <div class="modal-footer" style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--ol-border); padding-top: 32px; width: 100%;">
              <div style="display: flex; align-items: center; gap: 20px;">
                  <button id="checkUpdateBtn" class="ol-text-sub ol-btn-hover ol-border" style="
                    background: transparent; border-width: 1px; border-style: solid; cursor: pointer;
                    display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700;
                    padding: 8px 16px; border-radius: 14px; transition: all 0.2s;
                  ">
                    ${getIcon('refreshCw', 'scraper-icon-xs')} Cập nhật
                  </button>
                  <button id="shortcutHelpBtn" class="ol-text-sub ol-btn-hover ol-border" style="
                    background: transparent; border-width: 1px; border-style: solid; cursor: pointer;
                    display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700;
                    padding: 8px 16px; border-radius: 14px; transition: all 0.2s;
                  ">
                    ${getIcon('info', 'scraper-icon-xs')} Trợ giúp
                  </button>
              </div>
              
              <button id="cancelModeBtn" class="ol-text-sub ol-border" style="
                background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.2); 
                font-size: 14px; font-weight: 800; cursor: pointer;
                padding: 8px 24px; border-radius: 14px; transition: all 0.2s;
                color: #ef4444;
              " onmouseover="this.style.background='rgba(239, 68, 68, 0.15)'" onmouseout="this.style.background='rgba(239, 68, 68, 0.05)'">
                Đóng (Esc)
              </button>
            </div>
          </div>

          <style>
            @keyframes mesh-float {
              0% { transform: translate(0, 0) rotate(0deg) scale(1); }
              100% { transform: translate(5%, 10%) rotate(10deg) scale(1.05); }
            }
            @keyframes scraper-modal-ultra-enter {
              0% { opacity: 0; transform: scale(0.8) translateY(60px) rotateX(-15deg); filter: blur(15px); }
              100% { opacity: 1; transform: scale(1) translateY(0) rotateX(0); filter: blur(0); }
            }
            @keyframes scraper-float {
              0%, 100% { transform: translateY(0) rotate(-3deg); }
              50% { transform: translateY(-8px) rotate(3deg); }
            }
            @keyframes scraper-pulse-ultra {
              0% { box-shadow: 0 0 0 0 var(--pulse-color); }
              70% { box-shadow: 0 0 0 15px transparent; }
              100% { box-shadow: 0 0 0 0 transparent; }
            }
            
            .scraper-mode-card:hover {
              transform: translateY(-8px) !important;
              border-color: var(--ol-brand) !important;
              box-shadow: 0 20px 40px -15px rgba(0,0,0,0.2) !important;
              background: var(--ol-surface-hover) !important;
            }
            .scraper-mode-card#homeworkModeBtn:hover {
              border-color: var(--ol-success) !important;
              box-shadow: 0 20px 40px -15px var(--ol-success-alpha) !important;
            }
            .scraper-mode-card#examModeBtn:hover {
              border-color: var(--ol-brand) !important;
              box-shadow: 0 20px 40px -15px var(--ol-brand-alpha) !important;
            }
            .scraper-mode-card.recommended {
              --pulse-color: var(--ol-brand-alpha);
              animation: scraper-pulse-ultra 2.5s infinite ease-in-out;
              border-width: 2px !important;
            }
            .scraper-mode-card#homeworkModeBtn.recommended { --pulse-color: var(--ol-success-alpha); }

            /* NEW: Service Card Styles */
            .scraper-service-card {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 12px;
              border-radius: 16px;
              border: 1px solid var(--ol-border);
              background: var(--ol-surface);
              cursor: pointer;
              transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              text-align: left;
              width: 100%;
            }
            .scraper-service-card:hover {
              transform: translateY(-2px);
              background: var(--ol-surface-hover);
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              border-color: var(--ol-brand-alpha);
            }
            .service-icon-bg {
              width: 40px;
              height: 40px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
            }
            .service-info {
              display: flex;
              flex-direction: column;
              gap: 2px;
            }
            .service-name {
              font-size: 13px;
              font-weight: 700;
              color: var(--ol-text);
            }
            .service-badge {
              font-size: 10px;
              font-weight: 600;
              padding: 2px 6px;
              border-radius: 6px;
              width: fit-content;
            }
            .badge-active { background: rgba(16, 185, 129, 0.15); color: #059669; }
            .badge-maintenance { background: rgba(245, 158, 11, 0.15); color: #d97706; }

            @media (max-width: 700px) {
              .scraper-modal-container { padding: 32px 24px !important; }
              .main-title { font-size: 24px !important; }
              .mode-cards-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
              .rocket-container { width: 70px !important; height: 70px !important; }
              .modal-footer { flex-direction: column !important; gap: 16px !important; }
              .modal-footer div { width: 100%; justify-content: center; }
              #cancelModeBtn { width: 100%; }
            }
          </style>
        `;

        document.body.appendChild(overlay);

        // Ẩn màn hình loading khởi tạo khi bảng chính đã hiện ra
        hideInitialLoading();

        // Keyboard Shortcuts
        const handleKeyDown = (e) => {
          if (e.key === '1') {
            const btn = document.getElementById('homeworkModeBtn');
            if (btn) btn.click();
          } else if (e.key === '2') {
            const btn = document.getElementById('examModeBtn');
            if (btn) btn.click();
          } else if (e.key === 'Escape') {
            const btn = document.getElementById('cancelModeBtn');
            if (btn) btn.click();
          }
        };
        window.addEventListener('keydown', handleKeyDown);

        // Theme Toggle Handler
        document.getElementById('menuThemeBtn').onclick = () => {
            const isDark = overlay.classList.toggle('scraper-dark');
            localStorage.setItem('ol_theme', isDark ? 'dark' : 'light');
            document.getElementById('menuThemeBtn').innerHTML = isDark 
                ? getIcon('sun', 'scraper-icon-sm') 
                : getIcon('moon', 'scraper-icon-sm');
        };

        // NEW: Info Button Handler
        document.getElementById('titleInfoBtn').onclick = () => {
            showToast('Auto Scraper: Công cụ hỗ trợ thu thập và giải bài tập tự động.', 'info');
        };

        // NEW: Top Close Button Handler
        document.getElementById('topCloseBtn').onclick = () => {
            // Trigger same logic as cancelModeBtn
            document.getElementById('cancelModeBtn').click();
        };

        // NEW: Skip Loading Toggle Logic
        const skipLoadingToggle = document.getElementById('skipLoadingToggle');
        if (skipLoadingToggle) {
            skipLoadingToggle.checked = isSkipLoadingEnabled;
            skipLoadingToggle.onchange = (e) => {
                isSkipLoadingEnabled = e.target.checked;
                showToast(isSkipLoadingEnabled ? 'Đã bật tự động bỏ qua loading' : 'Đã tắt tự động bỏ qua loading', 'info');
            };
        }

        document.getElementById('skipLoadingInfoBtn').onclick = () => {
            showToast('Tự động xóa màn hình chờ "Đang tải dữ liệu" để tăng tốc độ scrape.', 'info');
        };

        // Event handlers with cleanup
        const cleanup = () => {
          window.removeEventListener('keydown', handleKeyDown);
        };

        document.getElementById('homeworkModeBtn').onclick = () => {
          cleanup();
          overlay.style.opacity = '0';
          overlay.style.transform = 'scale(1.05) translateY(-10px)';
          overlay.style.transition = 'all 0.4s ease';
          setTimeout(() => { overlay.remove(); resolve('homework'); }, 400);
        };

        document.getElementById('examModeBtn').onclick = () => {
          cleanup();
          overlay.style.opacity = '0';
          overlay.style.transform = 'scale(1.05) translateY(-10px)';
          overlay.style.transition = 'all 0.4s ease';
          setTimeout(() => { overlay.remove(); resolve('exam'); }, 400);
        };

        document.getElementById('checkUpdateBtn').onclick = (e) => {
          e.stopPropagation();
          checkUpdate(true);
        };

        document.getElementById('cancelModeBtn').onclick = () => {
          cleanup();
          overlay.style.opacity = '0';
          overlay.style.transition = 'all 0.3s ease';
          setTimeout(() => { overlay.remove(); resolve(null); }, 300);
        };

        document.getElementById('shortcutHelpBtn').onclick = () => {
          showToast('Phím tắt: [1] Bài tập, [2] Bài thi, [Esc] Đóng', 'info');
        };

        // Handle Premium Service Buttons
        const premiumBtns = overlay.querySelectorAll('.premium-service-btn');
        premiumBtns.forEach(btn => {
          btn.onclick = async () => {
            const service = btn.getAttribute('data-service');
            
            if (service !== 'ChatGPT Pro') {
              showToast('Tính năng chưa làm xong', 'warning');
              return;
            }

            const confirmed = await showConfirmModal(
              `Bạn có chắc chắn muốn lấy tài khoản ${service} không?\n\nĐây là phương pháp được đảm bảo bởi ADMIN onluyenscaper.`,
              'Xác nhận truy cập'
            );
            
            if (confirmed) {
              window.open(`https://www.oxaam.com/login.php?service=${encodeURIComponent(service)}`, '_blank');
              showToast(`Đang chuyển hướng tới hệ thống tài khoản ${service}...`, 'success');
            }
          };
        });
      });
    }

    // ============================================================ 
    // 🎯 CREATE STATUS PANEL
    // ============================================================ 
    let statusPanel = null;
    let panelElements = {};

    function createStatusPanel(mode) {
      statusPanel = document.createElement('div');
      statusPanel.className = 'scraper-panel ol-bg ol-border';
      
      // Theme Check
      if (localStorage.getItem('ol_theme') === 'dark') {
        statusPanel.classList.add('scraper-dark');
      }

      let isDragging = false;
      let dragOffset = { x: 0, y: 0 };
      let isMinimized = false;

      const modeColor = mode === 'homework' ? '#10b981' : '#6366f1';
      const modeBg = mode === 'homework' ? '#ecfdf5' : '#eef2ff';
      const modeIcon = mode === 'homework' ? getIcon('book', 'scraper-icon-md') : getIcon('fileText', 'scraper-icon-md');
      const modeText = mode === 'homework' ? 'HOMEWORK' : 'EXAM';

      Object.assign(statusPanel.style, {
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: '10000',
        // background: '#ffffff', -> Handled by CSS class ol-bg
        borderRadius: '24px',
        padding: '0',
        boxShadow: 'var(--scraper-shadow-xl)',
        minWidth: '340px',
        fontFamily: "'Inter', -apple-system, sans-serif",
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(12px)',
        borderWidth: '1px',
        borderStyle: 'solid'
        // border: '1px solid #e5e7eb' -> Handled by CSS class ol-border
      });

      statusPanel.innerHTML = `
        <!-- Header -->
        <div id="panelHeader" class="ol-bg ol-border" style="
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: move;
          user-select: none;
          border-bottom-width: 1px;
          border-bottom-style: solid;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="
              width: 44px; height: 44px;
              background: ${modeBg};
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${modeColor};
            " id="statusIcon">${modeIcon}</div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div id="statusTitle" class="ol-text" style="
                  font-weight: 700;
                  font-size: 16px;
                ">Đang Khởi Tạo...</div>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
                <span style="
                  background: ${modeBg};
                  padding: 2px 8px;
                  border-radius: 6px;
                  font-size: 10px;
                  font-weight: 700;
                  color: ${modeColor};
                  letter-spacing: 0.05em;
                ">${modeText}</span>
                <span id="statusSubtitle" class="ol-text-sub" style="
                  font-size: 12px;
                ">Chuẩn bị...</span>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="themeBtn" class="scraper-btn ol-border ol-text-sub ol-btn-hover" style="
              width: 32px; height: 32px;
              background: transparent;
              border-width: 1px; border-style: solid;
              border-radius: 8px;
              padding: 0;
              cursor: pointer;
              display: flex; align-items: center; justify-content: center;
            " title="Giao diện Sáng/Tối">
                ${statusPanel.classList.contains('scraper-dark') ? getIcon('sun', 'scraper-icon-sm') : getIcon('moon', 'scraper-icon-sm')}
            </button>
            <button id="feedbackBtn" class="scraper-btn ol-border ol-text-sub ol-btn-hover" style="
              width: 32px; height: 32px;
              background: transparent;
              border-width: 1px; border-style: solid;
              border-radius: 8px;
              padding: 0;
              cursor: pointer;
            " title="Góp ý">${getIcon('messageSquare', 'scraper-icon-sm')}</button>
            <button id="minimizeBtn" class="scraper-btn ol-border ol-text-sub ol-btn-hover" style="
              width: 32px; height: 32px;
              background: transparent;
              border-width: 1px; border-style: solid;
              border-radius: 8px;
              padding: 0;
            " title="Thu nhỏ">${getIcon('minus', 'scraper-icon-sm')}</button>
          </div>
        </div>
        
        <!-- Body -->
        <div id="panelBody" style="padding: 20px;">
          <!-- Live Status -->
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="scraper-live-indicator" style="
                position: relative;
                width: 8px; height: 8px;
                background: #10b981;
                border-radius: 50%;
              "></div>
              <span id="liveStatus" style="
                color: #10b981;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.05em;
              ">ĐANG HOẠT ĐỘNG</span>
            </div>
            <span class="ol-surface ol-text-sub" style="
              font-size: 12px; 
              font-family: 'JetBrains Mono', monospace;
              padding: 2px 8px;
              border-radius: 6px;
            " id="elapsedTime">00:00</span>
          </div>
          
          <!-- Progress Bar -->
          <div class="ol-surface" style="
            border-radius: 9999px;
            height: 6px;
            overflow: hidden;
            margin-bottom: 20px;
          ">
            <div id="progressBar" class="scraper-progress-bar" style="
              height: 100%;
              width: 0%;
              border-radius: 9999px;
              transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            "></div>
          </div>
          
          <!-- Stats Grid -->
          <div style="
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 20px;
          ">
            <div class="scraper-stat-card ol-surface ol-border" style="padding: 12px; text-align: center; border-width:1px; border-style:solid; border-radius:12px;">
              <div id="questionNum" class="scraper-stat-number ol-text" style="
                font-size: 24px; font-weight: 800; line-height: 1; margin-bottom: 4px;
              ">0</div>
              <div class="ol-text-sub" style="font-size: 11px; font-weight: 600; text-transform: uppercase;">Câu hỏi</div>
            </div>
            
            <div class="scraper-stat-card ol-surface ol-border" style="padding: 12px; text-align: center; border-width:1px; border-style:solid; border-radius:12px;">
              <div id="imageNum" class="scraper-stat-number ol-text" style="
                font-size: 24px; font-weight: 800; line-height: 1; margin-bottom: 4px;
              ">0</div>
              <div class="ol-text-sub" style="font-size: 11px; font-weight: 600; text-transform: uppercase;">Hình ảnh</div>
            </div>
            
            <div class="scraper-stat-card ol-surface ol-border" style="padding: 12px; text-align: center; border-width:1px; border-style:solid; border-radius:12px;">
              <div id="retryNum" class="scraper-stat-number ol-text" style="
                font-size: 24px; font-weight: 800; line-height: 1; margin-bottom: 4px;
              ">0</div>
              <div class="ol-text-sub" style="font-size: 11px; font-weight: 600; text-transform: uppercase;">${mode === 'homework' ? 'Retry' : 'Skip'}</div>
            </div>
          </div>
          
          <!-- Current Question -->
          <div id="currentQuestionCard" class="ol-surface ol-border" style="
            border-width: 1px; border-style: solid;
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 20px;
          ">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="color: #6366f1;">${getIcon('fileText', 'scraper-icon-sm')}</span>
              <span class="ol-text-sub" style="font-size: 11px; font-weight: 700; text-transform: uppercase;">
                TIẾN TRÌNH XỬ LÝ
              </span>
            </div>
            <div id="currentQText" class="ol-text" style="
              font-size: 13px;
              font-weight: 500;
              line-height: 1.5;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            ">Đang chờ...</div>
            <div id="waitingBtn" class="ol-text-sub" style="
              font-size: 12px;
              margin-top: 8px;
              display: flex; align-items: center; gap: 6px;
            ">
              <span>Đang chờ dữ liệu...</span>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button id="pauseBtn" class="scraper-btn" style="
              padding: 12px;
              background: #fffbeb;
              border: 1px solid #fcd34d;
              color: #d97706;
              border-radius: 12px;
              font-size: 13px;
            ">
              ${getIcon('pause')}
              <span>TẠM DỪNG</span>
            </button>
            
            <button id="stopBtn" class="scraper-btn" style="
              padding: 12px;
              background: #fef2f2;
              border: 1px solid #fecaca;
              color: #dc2626;
              border-radius: 12px;
              font-size: 13px;
            ">
              ${getIcon('square')}
              <span>DỪNG LẠI</span>
            </button>
          </div>
          
          <button id="modeBtn" class="scraper-btn" style="
            width: 100%;
            padding: 12px;
            margin-top: 12px;
            background: #f3f4f6;
            border: 1px solid #e5e7eb;
            color: #4b5563;
            border-radius: 12px;
            font-size: 13px;
          ">
            ${getIcon('bot')}
            <span>CHẾ ĐỘ AI</span>
          </button>
        </div>
        
        <!-- Footer -->
        <div style="
          background: #f9fafb;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #f3f4f6;
        ">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="color: #9ca3af; font-size: 11px; font-weight: 500;">v${chrome.runtime.getManifest().version}</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <div style="width: 6px; height: 6px; background: #d1d5db; border-radius: 50%;"></div>
            <div style="width: 6px; height: 6px; background: #9ca3af; border-radius: 50%;"></div>
            <div style="width: 6px; height: 6px; background: #6b7280; border-radius: 50%;"></div>
          </div>
        </div>
      `;

      document.body.appendChild(statusPanel);

      // Store element references
      panelElements = {
        header: document.getElementById('panelHeader'),
        body: document.getElementById('panelBody'),
        feedbackBtn: document.getElementById('feedbackBtn'),
        minimizeBtn: document.getElementById('minimizeBtn'),
        themeBtn: document.getElementById('themeBtn'), // Added
        statusIcon: document.getElementById('statusIcon'),
        statusTitle: document.getElementById('statusTitle'),
        statusSubtitle: document.getElementById('statusSubtitle'),
        progressBar: document.getElementById('progressBar'),
        questionNum: document.getElementById('questionNum'),
        imageNum: document.getElementById('imageNum'),
        retryNum: document.getElementById('retryNum'),
        currentQText: document.getElementById('currentQText'),
        waitingBtn: document.getElementById('waitingBtn'),
        stopBtn: document.getElementById('stopBtn'),
        pauseBtn: document.getElementById('pauseBtn'),
        modeBtn: document.getElementById('modeBtn'),
        liveStatus: document.getElementById('liveStatus'),
        elapsedTime: document.getElementById('elapsedTime')
      };

      // Theme Toggle Handler
      if (panelElements.themeBtn) {
        panelElements.themeBtn.onclick = () => {
          const isDark = statusPanel.classList.toggle('scraper-dark');
          localStorage.setItem('ol_theme', isDark ? 'dark' : 'light');
          panelElements.themeBtn.innerHTML = isDark 
            ? getIcon('sun', 'scraper-icon-sm') 
            : getIcon('moon', 'scraper-icon-sm');
        };
      }

      // Feedback button handler
      if (panelElements.feedbackBtn) {
          panelElements.feedbackBtn.onclick = () => showFeedbackModal();
      }

      // Drag functionality
      panelElements.header.addEventListener('mousedown', (e) => {
        if (e.target === panelElements.minimizeBtn) return;
        isDragging = true;
        dragOffset.x = e.clientX - statusPanel.offsetLeft;
        dragOffset.y = e.clientY - statusPanel.offsetTop;
        statusPanel.style.transition = 'none';
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        statusPanel.style.left = (e.clientX - dragOffset.x) + 'px';
        statusPanel.style.top = (e.clientY - dragOffset.y) + 'px';
        statusPanel.style.right = 'auto';
      });

      document.addEventListener('mouseup', () => {
        isDragging = false;
        statusPanel.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });

      // Minimize
      panelElements.minimizeBtn.addEventListener('click', () => {
        isMinimized = !isMinimized;
        panelElements.body.style.display = isMinimized ? 'none' : 'block';
        statusPanel.style.minWidth = isMinimized ? 'auto' : '340px';
        panelElements.minimizeBtn.innerHTML = isMinimized ? getIcon('square', 'scraper-icon-sm') : getIcon('minus', 'scraper-icon-sm');
      });

      // Update elapsed time - store interval ID for cleanup
      statusPanel.elapsedTimeInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const secs = (elapsed % 60).toString().padStart(2, '0');
        if (panelElements.elapsedTime) {
          panelElements.elapsedTime.textContent = `${mins}:${secs}`;
        }
      }, 1000);

      // Button handlers
      panelElements.stopBtn.onclick = () => {
        stopRequested = true;
        panelElements.stopBtn.innerHTML = `${getIcon('loader', 'scraper-icon-spin')} Đang dừng...`;
        panelElements.stopBtn.disabled = true;
        
        // Dừng ngay lập tức: Dọn dẹp panel
        if (statusPanel.elapsedTimeInterval) {
          clearInterval(statusPanel.elapsedTimeInterval);
        }
        
        setTimeout(() => {
          if (statusPanel) statusPanel.remove();
          if (toastContainer) toastContainer.innerHTML = '';
          showToast('Đã dừng scraper', 'warning');
          
          // Hiển thị kết quả ngay lập tức
          showResultsUI();
        }, 300);
      };

      panelElements.pauseBtn.onclick = () => {
        isPaused = !isPaused;
        if (isPaused) {
          panelElements.pauseBtn.innerHTML = `${getIcon('play')}<span>TIẾP TỤC</span>`;
          panelElements.pauseBtn.style.background = '#ecfdf5';
          panelElements.pauseBtn.style.borderColor = '#6ee7b7';
          panelElements.pauseBtn.style.color = '#059669';
          
          panelElements.liveStatus.textContent = 'TẠM DỪNG';
          panelElements.liveStatus.style.color = '#f59e0b';
          showToast('Đã tạm dừng', 'info');
        } else {
          panelElements.pauseBtn.innerHTML = `${getIcon('pause')}<span>TẠM DỪNG</span>`;
          panelElements.pauseBtn.style.background = '#fffbeb';
          panelElements.pauseBtn.style.borderColor = '#fcd34d';
          panelElements.pauseBtn.style.color = '#d97706';
          
          panelElements.liveStatus.textContent = 'ĐANG HOẠT ĐỘNG';
          panelElements.liveStatus.style.color = '#10b981';
          showToast('Tiếp tục scraper', 'success');
        }
      };

      panelElements.modeBtn.onclick = () => {
        isAIMode = !isAIMode;
        panelElements.modeBtn.innerHTML = isAIMode 
          ? `${getIcon('fileText')}<span>CHẾ ĐỘ THƯỜNG</span>`
          : `${getIcon('bot')}<span>CHẾ ĐỘ AI</span>`;
        panelElements.modeBtn.style.background = isAIMode
          ? '#f3f4f6'
          : '#eef2ff';
        panelElements.modeBtn.style.borderColor = isAIMode
          ? '#e5e7eb'
          : '#c7d2fe';
        panelElements.modeBtn.style.color = isAIMode
          ? '#4b5563'
          : '#4f46e5';
        showToast(`Chuyển sang ${isAIMode ? 'chế độ AI' : 'chế độ thường'}`, 'info');
      };
    }

    function updateStatus(title, subtitle, iconKey = 'book', btnInfo = '') {
      if (!panelElements.statusTitle) return;
      
      panelElements.statusTitle.textContent = title;
      panelElements.statusSubtitle.textContent = subtitle;

      const iconMap = {
        'book': 'book',
        'fileText': 'fileText',
        'search': 'search',
        'bot': 'bot',
        'check': 'check',
        'x': 'x',
        'rocket': 'rocket',
        'refreshCw': 'refreshCw',
        'clock': 'clock',
        'zap': 'zap'
      };

      const iconName = iconMap[iconKey] || iconKey;
      panelElements.statusIcon.innerHTML = getIcon(iconName, 'scraper-icon-md') || iconKey;
      
      const prevQ = parseInt(panelElements.questionNum.textContent);
      panelElements.questionNum.textContent = questionCount;
      if (questionCount > prevQ) {
        panelElements.questionNum.classList.add('updated');
        setTimeout(() => panelElements.questionNum.classList.remove('updated'), 400);
      }
      
      const prevI = parseInt(panelElements.imageNum.textContent);
      panelElements.imageNum.textContent = allImages.length;
      if (allImages.length > prevI) {
        panelElements.imageNum.classList.add('updated');
        setTimeout(() => panelElements.imageNum.classList.remove('updated'), 400);
      }
      
      panelElements.retryNum.textContent = retryCount;
      
      if (btnInfo) {
        panelElements.waitingBtn.innerHTML = `${getIcon('loader', 'scraper-icon-spin')} ${btnInfo}`;
      } else {
        panelElements.waitingBtn.textContent = '';
      }
      
      panelElements.progressBar.style.width = `${Math.min((questionCount * 5) % 100, 95)}%`;
    }

    // ============================================================ 
    // 🔥 MATHJAX & MATHML CONVERSION
    // ============================================================ 
    
    const greekLetters = {
      'α': 'α', 'Α': 'Α', 'alpha': 'α', 'β': 'β', 'beta': 'β',
      'γ': 'γ', 'Γ': 'Γ', 'gamma': 'γ', 'δ': 'δ', 'Δ': 'Δ', 'delta': 'δ',
      'ε': 'ε', 'epsilon': 'ε', 'ζ': 'ζ', 'zeta': 'ζ',
      'η': 'η', 'eta': 'η', 'θ': 'θ', 'Θ': 'Θ', 'theta': 'θ',
      'ι': 'ι', 'iota': 'ι', 'κ': 'κ', 'kappa': 'κ', 'λ': 'λ', 'Λ': 'Λ', 'lambda': 'λ',
      'μ': 'μ', 'mu': 'μ', 'ν': 'ν', 'nu': 'ν', 'ξ': 'ξ', 'Ξ': 'Ξ', 'xi': 'ξ',
      'π': 'π', 'Π': 'Π', 'pi': 'π', 'ρ': 'ρ', 'rho': 'ρ', 'σ': 'σ', 'Σ': 'Σ', 'sigma': 'σ',
      'τ': 'τ', 'tau': 'τ', 'υ': 'υ', 'upsilon': 'υ', 'φ': 'φ', 'Φ': 'Φ', 'phi': 'φ',
      'χ': 'χ', 'chi': 'χ', 'ψ': 'ψ', 'Ψ': 'Ψ', 'psi': 'ψ', 'ω': 'ω', 'Ω': 'Ω', 'omega': 'ω'
    };

    const mathSymbols = {
      '∞': '∞', 'infty': '∞', '∂': '∂', 'partial': '∂', '∇': '∇', 'nabla': '∇',
      '∈': '∈', 'in': '∈', '∉': '∉', 'notin': '∉', '⊂': '⊂', 'subset': '⊂',
      '⊃': '⊃', 'supset': '⊃', '⊆': '⊆', 'subseteq': '⊆', '⊇': '⊇', 'supseteq': '⊇',
      '∪': '∪', 'cup': '∪', '∩': '∩', 'cap': '∩', '∅': '∅', 'emptyset': '∅',
      '∀': '∀', 'forall': '∀', '∃': '∃', 'exists': '∃', '¬': '¬', 'neg': '¬',
      '∧': '∧', 'wedge': '∧', '∨': '∨', 'vee': '∨', '⇒': '⇒', 'Rightarrow': '⇒',
      '⇔': '⇔', 'Leftrightarrow': '⇔', '→': '→', 'to': '→', 'rightarrow': '→',
      '←': '←', 'leftarrow': '←', '↔': '↔', 'leftrightarrow': '↔',
      '≤': '≤', 'le': '≤', 'leq': '≤', '≥': '≥', 'ge': '≥', 'geq': '≥',
      '≠': '≠', 'ne': '≠', 'neq': '≠', '≈': '≈', 'approx': '≈', '≡': '≡', 'equiv': '≡',
      '±': '±', 'pm': '±', '∓': '∓', 'mp': '∓', '×': '×', 'times': '×',
      '÷': '÷', 'div': '÷', '·': '·', 'cdot': '·', '°': '°', 'circ': '°',
      '′': "'", 'prime': "'", '″': "''", '∠': '∠', 'angle': '∠',
      '⊥': '⊥', 'perp': '⊥', '∥': '∥', 'parallel': '∥', '△': '△', 'triangle': '△',
      '⁢': '', '⁡': '', '⁣': ''
    };

    const functionNames = ['sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'arcsin', 'arccos', 'arctan',
      'sinh', 'cosh', 'tanh', 'log', 'ln', 'lg', 'exp', 'lim', 'max', 'min', 'sup', 'inf',
      'det', 'dim', 'ker', 'gcd', 'lcm', 'mod', 'arg', 'deg'];

    function convertMathMLToText(mathElement) {
      if (!mathElement) return '';

      function parseNode(node) {
        if (!node) return '';
        if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';

        const tagName = node.tagName ? node.tagName.toLowerCase() : '';
        const childContent = () => Array.from(node.childNodes).map(parseNode).join('');
        const children = Array.from(node.children);

        switch (tagName) {
          case 'math': case 'mrow': case 'mstyle': case 'semantics': case 'mpadded': case 'merror':
            return childContent();

          case 'mi': {
            const text = (node.textContent || '').trim();
            if (functionNames.includes(text)) return text;
            return greekLetters[text] || text;
          }

          case 'mn': case 'mtext':
            return node.textContent || '';

          case 'mo': {
            const text = (node.textContent || '').trim();
            return mathSymbols[text] !== undefined ? mathSymbols[text] : text;
          }

          case 'msup': {
            if (children.length >= 2) {
              const base = parseNode(children[0]);
              const sup = parseNode(children[1]).trim();
              if (/^[′']+$/.test(sup)) return `${base}${"'".repeat(sup.length)}`;
              if (sup.length === 1 && /[0-9n]/.test(sup)) return `${base}^${sup}`;
              return `${base}^{${sup}}`;
            }
            return childContent();
          }

          case 'msub': {
            if (children.length >= 2) {
              const base = parseNode(children[0]);
              const sub = parseNode(children[1]).trim();
              if (sub.length <= 2 && /^[0-9a-z]+$/i.test(sub)) return `${base}_${sub}`;
              return `${base}_{${sub}}`;
            }
            return childContent();
          }

          case 'msubsup': {
            if (children.length >= 3) {
              return `${parseNode(children[0])}_{${parseNode(children[1]).trim()}}^{${parseNode(children[2]).trim()}}`;
            }
            return childContent();
          }

          case 'mfrac': {
            if (children.length >= 2) {
              const num = parseNode(children[0]).trim();
              const den = parseNode(children[1]).trim();
              if (num.length <= 3 && den.length <= 3 && !/[{}()]/.test(num + den)) return `${num}/${den}`;
              return `(${num})/(${den})`;
            }
            return childContent();
          }

          case 'msqrt':
            return `√(${childContent().trim()})`;

          case 'mroot': {
            if (children.length >= 2) {
              const content = parseNode(children[0]).trim();
              const index = parseNode(children[1]).trim();
              if (index === '2') return `√(${content})`;
              if (index === '3') return `∛(${content})`;
              if (index === '4') return `∜(${content})`;
              return `${index}√(${content})`;
            }
            return childContent();
          }

          case 'mover': {
            if (children.length >= 2) {
              const base = parseNode(children[0]).trim();
              const over = parseNode(children[1]).trim();
              if (/[¯‾―]/.test(over)) return `${base}̄`;
              if (/[ͥ͡]/.test(over)) return `${base}̂`;
              if (/[~˜∼]/.test(over)) return `${base}̃`;
              if (/[→⃗]/.test(over)) return `vec(${base})`;
              if (/[̇́]/.test(over)) return `${base}̇`;
              return base;
            }
            return childContent();
          }

          case 'munder': {
            if (children.length >= 2) {
              const base = parseNode(children[0]).trim();
              const under = parseNode(children[1]).trim();
              if (['lim', 'min', 'max', 'sup', 'inf'].includes(base)) return `${base}_{${under}}`;
              return `${base}_{${under}}`;
            }
            return childContent();
          }

          case 'munderover': {
            if (children.length >= 3) {
              const base = parseNode(children[0]).trim();
              const under = parseNode(children[1]).trim();
              const over = parseNode(children[2]).trim();
              return `${base}_{${under}}^{${over}}`;
            }
            return childContent();
          }

          case 'mtable': {
            const rows = Array.from(node.querySelectorAll('mtr'));
            if (rows.length === 0) return childContent();
            const rowsText = rows.map(row => {
              const cells = Array.from(row.querySelectorAll('mtd'));
              return cells.map(cell => parseNode(cell).trim()).join(' & ');
            });
            return `[${rowsText.join(' ; ')}]`;
          }

          case 'mtr': case 'mlabeledtr': {
            const cells = Array.from(node.querySelectorAll('mtd'));
            return cells.map(cell => parseNode(cell).trim()).join(' & ');
          }

          case 'mtd': return childContent();
          case 'mspace': return ' ';

          case 'mfenced': {
            const open = node.getAttribute('open') || '(';
            const close = node.getAttribute('close') || ')';
            const sep = node.getAttribute('separators') || ',';
            const parts = children.map(ch => parseNode(ch).trim());
            const content = parts.join(sep.charAt(0) + ' ');
            if (open === '|' && close === '|') return `|${content}|`;
            return `${open}${content}${close}`;
          }

          case 'menclose': {
            const notation = node.getAttribute('notation') || '';
            const content = childContent().trim();
            if (notation.includes('radical')) return `√(${content})`;
            if (notation.includes('box')) return `[${content}]`;
            return content;
          }

          case 'mphantom': case 'maligngroup': case 'malignmark': case 'none': return '';

          case 'annotation': case 'annotation-xml': {
            const enc = node.getAttribute('encoding') || '';
            if (enc.includes('tex') || enc.includes('latex')) return node.textContent || '';
            return '';
          }

          case 'maction': return children.length > 0 ? parseNode(children[0]) : childContent();

          default: return childContent();
        }
      }

      let result = parseNode(mathElement).trim();
      result = result.replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
      result = result.replace(/\{\s+/g, '{').replace(/\s+\}/g, '}');
      return result;
    }

    function extractMathJaxText(mjxContainer) {
      if (!mjxContainer) return '';

      const annotation = mjxContainer.querySelector('annotation[encoding*="tex"], annotation[encoding*="latex"]');
      if (annotation && annotation.textContent) return annotation.textContent.trim();

      const assistiveMml = mjxContainer.querySelector('mjx-assistive-mml math, math');
      if (assistiveMml) {
        const result = convertMathMLToText(assistiveMml);
        if (result && result.trim()) return result;
      }

      const svg = mjxContainer.querySelector('svg');
      if (svg) {
        const result = parseSVGMath(svg);
        if (result && result.trim()) return result;
      }

      return mjxContainer.textContent || '';
    }

    function parseSVGMath(svgElem) {
      if (!svgElem) return null;
      const root = svgElem.querySelector('g[data-mml-node="math"]') || svgElem.querySelector('g[data-mml-node]') || svgElem;
      return parseMathNode(root).trim();
    }

    function parseMathNode(node) {
      if (!node) return '';
      if (node.tagName && node.tagName.toLowerCase() === 'text') return (node.textContent || '').trim();

      // Fix: Handle SVG use tag with data-c (hex char code)
      if (node.tagName && node.tagName.toLowerCase() === 'use') {
        const dataC = node.getAttribute('data-c');
        if (dataC) {
          try {
            return String.fromCodePoint(parseInt(dataC, 16));
          } catch(e) {}
        }
      }

      const mml = node.getAttribute ? node.getAttribute('data-mml-node') : null;
      const children = () => Array.from(node.children || []).filter(ch => ch.getAttribute && ch.getAttribute('data-mml-node'));

      if (!mml) {
        let res = '';
        node.childNodes && Array.from(node.childNodes).forEach(ch => res += parseMathNode(ch));
        return res;
      }

      switch (mml) {
        case 'math': case 'mrow': case 'mstyle': case 'semantics': case 'mpadded': {
          let out = '';
          Array.from(node.children).forEach(ch => out += parseMathNode(ch));
          return out;
        }

        case 'mfrac': {
          const kids = children();
          if (kids.length >= 2) {
            const num = parseMathNode(kids[0]).trim();
            const den = parseMathNode(kids[1]).trim();
            return num.length <= 3 && den.length <= 3 ? `${num}/${den}` : `(${num})/(${den})`;
          }
          break;
        }

        case 'msqrt': return `√(${children().map(k => parseMathNode(k)).join('').trim()})`;

        case 'mroot': {
          const kids = children();
          if (kids.length >= 2) {
            const content = parseMathNode(kids[0]).trim();
            const index = parseMathNode(kids[1]).trim();
            if (index === '2') return `√(${content})`;
            if (index === '3') return `∛(${content})`;
            return `${index}√(${content})`;
          }
          return `√(${kids.map(k => parseMathNode(k)).join('').trim()})`;
        }

        case 'msup': {
          const kids = children();
          if (kids.length >= 2) {
            const base = parseMathNode(kids[0]).trim();
            const sup = parseMathNode(kids[1]).trim();
            if (/^[′']+$/.test(sup)) return `${base}'`;
            return sup.length === 1 ? `${base}^${sup}` : `${base}^{${sup}}`;
          }
          break;
        }

        case 'msub': {
          const kids = children();
          if (kids.length >= 2) {
            const base = parseMathNode(kids[0]).trim();
            const sub = parseMathNode(kids[1]).trim();
            return sub.length <= 2 ? `${base}_${sub}` : `${base}_{${sub}}`;
          }
          break;
        }

        case 'msubsup': {
          const kids = children();
          if (kids.length >= 3) {
            return `${parseMathNode(kids[0]).trim()}_{${parseMathNode(kids[1]).trim()}}^{${parseMathNode(kids[2]).trim()}}`;
          }
          break;
        }

        case 'mover': {
          const kids = children();
          if (kids.length >= 2) {
            const base = parseMathNode(kids[0]).trim();
            const over = parseMathNode(kids[1]).trim();
            if (/[→⃗]/.test(over)) return `vec(${base})`;
            if (/[¯‾]/.test(over)) return `${base}̄`;
            return base;
          }
          break;
        }

        case 'munder': {
          const kids = children();
          if (kids.length >= 2) {
            const base = parseMathNode(kids[0]).trim();
            const under = parseMathNode(kids[1]).trim();
            return `${base}_{${under}}`;
          }
          break;
        }

        case 'munderover': {
          const kids = children();
          if (kids.length >= 3) {
            const base = parseMathNode(kids[0]).trim();
            const under = parseMathNode(kids[1]).trim();
            const over = parseMathNode(kids[2]).trim();
            return `${base}_{${under}}^{${over}}`;
          }
          break;
        }

        case 'mtable': {
          const rows = Array.from(node.querySelectorAll('g[data-mml-node="mtr"]'));
          const rowsText = rows.map(row => {
            const cells = Array.from(row.querySelectorAll('g[data-mml-node="mtd"]'));
            return cells.map(cell => parseMathNode(cell).trim()).join(' & ');
          });
          return `[${rowsText.join(' ; ')}]`;
        }

        case 'mn': case 'mi': case 'mo': case 'mtext': {
          const t = node.querySelector ? node.querySelector('text') : null;
          if (t) {
            let text = (t.textContent || '').trim();
            return mathSymbols[text] !== undefined ? mathSymbols[text] : (greekLetters[text] || text);
          }
          let acc = '';
          node.childNodes && Array.from(node.childNodes).forEach(ch => {
            acc += ch.nodeType === Node.TEXT_NODE ? ch.textContent : parseMathNode(ch);
          });
          return acc.trim();
        }

        default: {
          let c = '';
          Array.from(node.children || []).forEach(ch => c += parseMathNode(ch));
          if (c) return c;
          const t2 = node.querySelector ? node.querySelector('text') : null;
          return t2 ? (t2.textContent || '').trim() : '';
        }
      }
      return '';
    }

    // ============================================================ 
    // 🖼️ IMAGE EXTRACTION
    // ============================================================ 
    
    function extractImages(element, includeBase64 = true) {
      if (!element) return [];
      
      const images = [];
      const imgElements = element.querySelectorAll('img');
      
      imgElements.forEach((img, index) => {
        const src = img.src || img.getAttribute('src') || img.getAttribute('data-src') || '';
        const alt = img.alt || img.getAttribute('alt') || '';
        
        if (src) {
          if (src.startsWith('data:image')) {
            if (includeBase64) {
              images.push({
                url: src.substring(0, 100) + '...[base64]',
                fullUrl: src,
                alt: alt || 'Ảnh Base64',
                index: index,
                isBase64: true
              });
            }
          } else {
            images.push({
              url: src,
              fullUrl: src,
              alt: alt,
              index: index,
              isBase64: false
            });
          }
        }
      });
      
      // Background images
      const allElements = element.querySelectorAll('*');
      allElements.forEach(el => {
        const bgImage = getComputedStyle(el).backgroundImage;
        if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
          const match = bgImage.match(/url\(['"]?(.*?)['"]?\)/);
          if (match && match[1] && !match[1].startsWith('data:')) {
            images.push({
              url: match[1],
              fullUrl: match[1],
              alt: 'Background Image',
              index: images.length,
              isBase64: false
            });
          }
        }
      });
      
      return images;
    }

    // ============================================================ 
    // 📝 INTELLIGENT TEXT EXTRACTION
    // ============================================================ 

    function escapeHTML(str) {
      if (!str) return '';
      return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    function extractIntelligentText(element, includeImages = true) {
      if (!element) return { text: '', images: [] };

      const cloned = element.cloneNode(true);
      const foundImages = includeImages ? extractImages(element) : [];

      // Replace images with placeholders
      const imgElements = cloned.querySelectorAll('img');
      imgElements.forEach((img, index) => {
        const src = img.src || '';
        const placeholder = document.createElement('span');
        if (src.startsWith('data:image')) {
          placeholder.textContent = ` [📊Hình ${index + 1}] `;
        } else if (src) {
          placeholder.textContent = ` [🖼️Ảnh ${index + 1}] `;
        }
        img.replaceWith(placeholder);
      });

      // Process MathJax
      const mjxContainers = cloned.querySelectorAll('mjx-container');
      mjxContainers.forEach(mjx => {
        const mathText = extractMathJaxText(mjx);
        if (mathText && mathText.trim()) {
          const span = document.createElement('span');
          span.textContent = ` ${mathText} `;
          mjx.replaceWith(span);
        }
      });

      // Process remaining SVGs
      const remainingSvgs = cloned.querySelectorAll('svg');
      remainingSvgs.forEach(svg => {
        if (svg.querySelector('g[data-mml-node]')) {
          const latex = parseSVGMath(svg);
          if (latex && latex.trim()) {
            const span = document.createElement('span');
            span.textContent = ` ${latex} `;
            svg.replaceWith(span);
          }
        }
      });

      // Process .math-tex
      const katexNodes = cloned.querySelectorAll('.math-tex');
      katexNodes.forEach(node => {
        const raw = node.textContent || "";
        if (raw.includes('\\')) {
          const span = document.createElement('span');
          span.textContent = ` ${raw.trim()} `;
          node.replaceWith(span);
        }
      });

      // ===== THÊM PHẦN NÀY - Xử lý định dạng TRƯỚC khi lấy text =====
      // Xử lý underline
      cloned.querySelectorAll('u').forEach(el => {
        const span = document.createElement('span');
        span.textContent = `__${el.textContent}__`;
        el.replaceWith(span);
      });

      // Xử lý bold
      cloned.querySelectorAll('strong, b').forEach(el => {
        const span = document.createElement('span');
        span.textContent = `**${el.textContent}**`;
        el.replaceWith(span);
      });

      // Xử lý italic
      cloned.querySelectorAll('em, i').forEach(el => {
        const span = document.createElement('span');
        span.textContent = `*${el.textContent}*`;
        el.replaceWith(span);
      });

      // ===== HANDLE TABLES (Ultra Robust) =====
      // Sử dụng getElementsByTagName để đảm bảo tìm thấy mọi bảng kể cả trong node tách rời
      const tables = Array.from(cloned.getElementsByTagName('table'));
      
      tables.forEach((table, idx) => {
        try {
          const md = convertTableToMarkdown(table);
          // Sử dụng placeholder cực kỳ đặc biệt để tránh bị xóa
          const mdSafe = `___START_TABLE___${md}___END_TABLE___`.replace(/\n/g, '___TABLE_NEWLINE___');
          
          const span = document.createElement('div'); // Dùng div để chắc chắn nó tách dòng
          span.textContent = mdSafe;
          
          if(table.parentNode) {
            table.parentNode.replaceChild(span, table);
          }
        } catch (err) {
        }
      });

      // ===== KẾT THÚC PHẦN THÊM =====

      let text = cloned.textContent || cloned.innerText || '';
      
      // Clean text nhưng BẢO VỆ structure
      // Xử lý xuống dòng: Thay thế nhiều xuống dòng liên tiếp bằng 2 xuống dòng
      text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      
      // Khôi phục Newline từ Table và xóa marker
      text = text.replace(/___TABLE_NEWLINE___/g, '\n');
      text = text.replace(/___START_TABLE___/g, '\n\n'); 
      text = text.replace(/___END_TABLE___/g, '\n\n');   

      // Xử lý khoảng trắng trên từng dòng
      text = text.split('\n').map(line => line.replace(/[^\S\r\n]+/g, ' ').trim()).join('\n');
      
      // Loại bỏ hơn 2 dòng trống liên tiếp
      text = text.replace(/\n{3,}/g, '\n\n');

      text = text.replace(/\s*([=+\-*^()])\s*/g, ' $1 ');
      text = text.replace(/\s*([.,:;!?])\s*/g, '$1 ');

      return { text: text.trim(), images: foundImages };
    }

    function createSeparator(type = "normal") {
      if (type === "start" || type === "end") return "";
      if (type === "thin")  return "─".repeat(40);
      return "─".repeat(40);
    }

    function formatBoxLine(prefix, text) {
      if (!text) return '';
      const lines = String(text).split('\n');
      return lines.map((line, i) => {
        const p = i === 0 ? (prefix ? prefix + ' ' : '') : ' '.repeat(prefix ? prefix.length + 1 : 0);
        return `${p}${line}\n`;
      }).join('');
    }

    // ============================================================ 
    // 📋 HOMEWORK MODE - CLICK THROUGH QUESTIONS
    // ============================================================ 

    async function waitForContentLoaded(maxWaitTime = 8000) {
      return new Promise((resolve) => {
        let timeoutId;
        let checkTimeout;
        
        const check = () => {
          const loadingElements = document.querySelectorAll('app-loading');
          if (loadingElements.length > 0) return false;

          const fadeinSpans = document.querySelectorAll('.fadein');
          for (const span of fadeinSpans) {
            // Check if span is empty or contains loading spinner
            if (span.querySelector('app-loading') || (!span.textContent.trim() && !span.querySelector('img'))) {
              return false;
            }
          }
          return true;
        };

        // Check immediately
        if (check()) {
          resolve(true);
          return;
        }

        const observer = new MutationObserver(() => {
          if (checkTimeout) return; // Debounce
          checkTimeout = setTimeout(() => {
            checkTimeout = null;
            if (check()) {
              observer.disconnect();
              clearTimeout(timeoutId);
              resolve(true);
            }
          }, 20); // Fast debounce
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        timeoutId = setTimeout(() => {
          observer.disconnect();
          resolve(true);
        }, maxWaitTime);
      });
    }

    function findClickableButton() {
      // Helper để kiểm tra nút có thực sự "sẵn sàng" để bấm không
      const isReady = (el) => {
        if (!el || el.disabled || el.classList.contains('disabled')) return false;
        
        // KIỂM TRA BLACKLIST: Không bao giờ bấm nút "Nộp bài" hoặc "Kết thúc"
        const text = (el.textContent || '').trim().toLowerCase();
        if (text.includes('nộp bài') || text.includes('nop bai') || text === 'kết thúc') {
          return false;
        }

        const style = window.getComputedStyle(el);
        return (
          el.offsetWidth > 0 && 
          el.offsetHeight > 0 && 
          style.display !== 'none' && 
          style.visibility !== 'hidden' && 
          style.opacity !== '0' &&
          el.getAttribute('aria-hidden') !== 'true'
        );
      };

      // 1. Tìm nút Trả lời (Màu xanh - Primary) - Ưu tiên cao nhất
      const primarySelectors = [
        'div.btn.btn-primary', 
        'div.btn-primary', 
        'button.btn-primary', 
        'button.btn-lg.btn-primary',
        '.questions-footer .btn-primary'
      ];
      
      for (const selector of primarySelectors) {
        const btns = document.querySelectorAll(selector);
        for (const btn of btns) {
          if (!isReady(btn)) continue;
          
          const text = (btn.textContent || '').trim().toLowerCase();
          if (text.includes('trả lời') || text.includes('tra loi') || text === 'xác nhận') {
            return { element: btn, type: 'answer', text: 'Trả lời' };
          }
          if (text.includes('tiếp theo') || text.includes('tiep theo') || text.includes('next')) {
            return { element: btn, type: 'next', text: 'Tiếp theo' };
          }
        }
      }
      
      // 2. Tìm nút Bỏ qua hoặc Tiếp theo (Màu xám/Khác)
      const secondarySelectors = [
        'button.btn-gray.btn-block', // Prioritize specific user request
        'div.btn.btn-gray', 
        'button.btn-gray', 
        '.btn-gray',
        '.btn-default',
        'button.btn-lg:not(.btn-primary)'
      ];

      for (const selector of secondarySelectors) {
        const btns = document.querySelectorAll(selector);
        for (const btn of btns) {
          if (!isReady(btn)) continue;
          
          const text = (btn.textContent || '').trim().toLowerCase();
          if (text.includes('bỏ qua') || text.includes('bo qua') || text.includes('skip')) {
            return { element: btn, type: 'skip', text: 'Bỏ qua' };
          }
          if (text.includes('tiếp') || text.includes('next') || text.includes('câu sau')) {
            return { element: btn, type: 'next', text: 'Tiếp theo' };
          }
        }
      }
      
      return null;
    }

    async function clickButtonRepeatedly(maxAttempts = 50, interval = 50) {
      const maxWaitTime = 15000; 
      const startTime = Date.now();

      return new Promise((resolve) => {
        let observer = null;
        let pollInterval = null;
        let resolved = false;

        const cleanup = () => {
          if (observer) { observer.disconnect(); observer = null; }
          if (pollInterval) { clearInterval(pollInterval); pollInterval = null; }
        };

        const triggerClick = (btn, source) => {
          if (resolved) return;
          resolved = true;
          cleanup();

          try {
            btn.element.click(); // Simple click first
            // Backup events just in case
            btn.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            btn.element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            
            resolve({ success: true, ...btn });
          } catch (e) {
            resolve({ success: false });
          }
        };

        const checkBtn = (source) => {
          if (stopRequested || isPaused || resolved) return;
          const btn = findClickableButton();
          if (btn) triggerClick(btn, source);
        };

        checkBtn('immediate');
        if (resolved) return;

        if (panelElements.waitingBtn) {
           panelElements.waitingBtn.innerHTML = `${getIcon('search', 'scraper-icon-spin')} Đang chờ nút...`;
        }

        observer = new MutationObserver(() => checkBtn('mutation'));
        observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled', 'class', 'style'] });

        pollInterval = setInterval(() => {
          checkBtn('poll');
          if (Date.now() - startTime > maxWaitTime) {
            if (!resolved) {
              resolved = true;
              cleanup();
              console.log('⚠️ Timeout waiting for button');
              resolve({ success: false });
            }
          }
        }, interval);
      });
    }

    async function waitForQuestionChange(currentId, maxWaitTime = 10000) {
      return new Promise((resolve) => {
        const numDiv = document.querySelector('.num');
        
        // Helper to extract ID
        const getNum = () => {
            const el = document.querySelector('.num');
            if (!el) return null;
            const txt = el.textContent || '';
            const idMatch = txt.match(/#(\d+)/);
            const numMatch = txt.match(/Câu[:\s]*(\d+)/i);
            return idMatch ? idMatch[1] : (numMatch ? numMatch[1] : null);
        };

        // If no numDiv, fallback to polling (legacy support)
        if (!numDiv) {
           let start = Date.now();
           let interval = setInterval(() => {
               if (Date.now() - start > maxWaitTime || stopRequested) {
                   clearInterval(interval);
                   resolve(false);
                   return;
               }
               const newId = getNum();
               if (newId && newId !== currentId) {
                   clearInterval(interval);
                   resolve(true);
               }
           }, 50);
           return;
        }

        // Check immediately
        const startId = getNum();
        if (startId && startId !== currentId) {
            resolve(true);
            return;
        }

        // Observer
        const observer = new MutationObserver(() => {
            const newId = getNum();
            if (newId && newId !== currentId) {
                observer.disconnect();
                clearTimeout(timeout);
                resolve(true);
            }
        });

        observer.observe(numDiv, { childList: true, characterData: true, subtree: true });

        const timeout = setTimeout(() => {
            observer.disconnect();
            resolve(false);
        }, maxWaitTime);
      });
    }

    async function extractQuestionHomework() {
      await waitForContentLoaded();
      
      const numDiv = document.querySelector('.num');
      let cauId = '';
      let cauText = '';
      
      if (numDiv) {
        const fullText = numDiv.textContent || '';
        const numMatch = fullText.match(/Câu[:\s]*(\d+)/i);
        const idMatch = fullText.match(/#(\d+)/);
        
        cauText = numMatch ? `Câu ${numMatch[1]}` : `Câu ${questionCount + 1}`;
        cauId = idMatch ? idMatch[1] : (numMatch ? numMatch[1] : String(questionCount + 1));
      } else {
        cauText = `Câu ${questionCount + 1}`;
        cauId = String(questionCount + 1);
      }
      
      let questionImages = [];
      
      // ===== 1. FREETEXT (TỰ LUẬN) =====
      const freetext = document.querySelector('app-test-step-question-freetext');
      if (freetext) {
        const contextDiv = freetext.querySelector('.question-text .pl-3.pr-3.pt-3, .step-content .fadein');
        const questionDiv = freetext.querySelector('.question-name .fadein, .question-name');
        
        const ctx = contextDiv ? extractIntelligentText(contextDiv) : { text: '', images: [] };
        const q = questionDiv ? extractIntelligentText(questionDiv) : { text: '', images: [] };
        
        questionImages = [...ctx.images, ...q.images];
        
        // --- DE-DUPLICATION LOGIC ---
        let finalContext = ctx.text;
        let finalQuestion = q.text;

        const cleanCtx = finalContext.trim();
        const cleanQ = finalQuestion.trim();

        if (cleanCtx === cleanQ) {
            // If identical, keep only as context (or question)
            finalQuestion = ''; 
        } else if (cleanCtx.includes(cleanQ) && cleanQ.length > 10) {
            // If Context includes Question, and Question is substantial -> Remove Question
            finalQuestion = '';
        } else if (cleanQ.includes(cleanCtx) && cleanCtx.length > 10) {
            // If Question includes Context, and Context is substantial -> Remove Context
            finalContext = '';
        }
        // -----------------------------

        let textNormal = createSeparator("start");
        if (textNormal) textNormal += "\n";
        
        if (finalContext) textNormal += formatBoxLine('', finalContext);
        if (finalQuestion) textNormal += formatBoxLine('', finalQuestion);
        
        if (questionImages.length > 0) {
          textNormal += `Ảnh: ${questionImages.length} hình\n`;
        }
        const endSep = createSeparator("end");
        if (endSep) textNormal += endSep + "\n";
        
        let textAI = `\n━━━ ${cauText} ━━━\n`;
        if (finalContext) textAI += `${finalContext}\n`;
        if (finalQuestion) textAI += `${finalQuestion}\n`;
        textAI += `\n`;
        
        return { text: textNormal.trim(), textAI, id: cauId, images: questionImages, type: 'fill-blank' };
      }
      
      // ===== 2. ĐÚNG/SAI =====
      const trueFalse = document.querySelectorAll('.true-false');
      if (trueFalse.length > 0) {
        const titleStatic = document.querySelector('.title-static');
        const questionName = document.querySelector('.question-name');

        const ts = titleStatic ? extractIntelligentText(titleStatic) : { text: '', images: [] };
        const qn = questionName ? extractIntelligentText(questionName) : { text: '', images: [] };
        
        questionImages = [...ts.images, ...qn.images];
        
        // FIX: Only select the container to avoid duplication
        const childWrappers = document.querySelectorAll('.child-content');
        
        let textNormal = createSeparator("start");
        if (textNormal) textNormal += "\n";
        textNormal += formatBoxLine('', ts.text);
        textNormal += formatBoxLine('', qn.text);
        textNormal += `${createSeparator("thin")}\n`;
        
        let textAI = `\n━━━ ${cauText} ━━━\n`;
        if (ts.text) textAI += `${ts.text}\n`;
        if (qn.text) textAI += `${qn.text}\n\n`;
        else textAI += `\n`;
        
        textNormal += `Lựa chọn:\n`;
        const opts = ['a)', 'b)', 'c)', 'd)'];
        childWrappers.forEach((wrapper, i) => {
          // Try to find the content element (.fadein) directly to get clean text
          let target = wrapper.querySelector('.fadein');
          
          // Fallback mechanism if structure is different
          if (!target) {
             const clone = wrapper.cloneNode(true);
             // Remove garbage elements that might clutter the text
             clone.querySelectorAll('.true-false, .option-char').forEach(el => el.remove());
             target = clone;
          }

          const c = extractIntelligentText(target);
          if (c.text) {
            // Clean up any potential leading labels like "a)" if they persist
            let cleanText = c.text.replace(/^[a-d]\)\s*/i, '').trim();
            
            textNormal += formatBoxLine(`${opts[i] || (i+1)+')'}`, cleanText);
            textAI += `${opts[i] || (i+1)+')'} ${cleanText}\n`;
          }
          questionImages = [...questionImages, ...c.images];
        });
        
        const endSep = createSeparator("end");
        if (endSep) textNormal += endSep + "\n";
        textAI += `\n`;
        
        return { text: textNormal.trim(), textAI, id: cauId, images: questionImages, type: 'true-false' };
      }
      
      // ===== 3. TRẮC NGHIỆM =====
      const questionName = document.querySelector('.question-name');
      const deBai = document.querySelector('.pl-3.pr-3.pt-3 .fadein, .pl-3 p');
      const options = document.querySelectorAll('.question-option');
      
      const qn = questionName ? extractIntelligentText(questionName) : { text: '', images: [] };
      const db = deBai ? extractIntelligentText(deBai) : { text: '', images: [] };
      
      if (!qn.text && !db.text && options.length === 0) return null;
      
      questionImages = [...qn.images, ...db.images];
      
      let textNormal = createSeparator("start");
      if (textNormal) textNormal += "\n";
      textNormal += formatBoxLine('', db.text);
      textNormal += formatBoxLine('', qn.text);
      
      let textAI = `\n━━━ ${cauText} ━━━\n`;
      if (db.text) textAI += `${db.text}\n`;
      if (qn.text) textAI += `${qn.text}\n\n`;
      
      if (options.length > 0) {
        textNormal += `${createSeparator("thin")}\n`;
        textNormal += `Lựa chọn:\n`;
        
        options.forEach(opt => {
          const label = opt.querySelector('.question-option-label');
          const content = opt.querySelector('.question-option-content p, .question-option-content');
          
          const lb = label ? (label.textContent || '').trim() : '?';
          const ct = content ? extractIntelligentText(content) : { text: '', images: [] };
          
          if (ct.text) {
            textNormal += formatBoxLine(`${lb}`, ct.text);
            textNormal += `${createSeparator("thin")}\n`;
            textAI += `${lb} ${ct.text}\n`;
          }
          questionImages = [...questionImages, ...ct.images];
        });
      }
      
      if (questionImages.length > 0) {
        textNormal += `${createSeparator("thin")}\n`;
        textNormal += `Ảnh: ${questionImages.length} hình\n`;
      }
      
      const endSep = createSeparator("end");
      if (endSep) textNormal += endSep + "\n";
      textAI += `\n`;
      
      return { text: textNormal.trim(), textAI, id: cauId, images: questionImages, type: 'multiple-choice' };
    }

    function formatSingleQuestionAI(q, displayNum) {
      const typeNames = {
        'multiple-choice': 'TRẮC NGHIỆM',
        'true-false': 'ĐÚNG SAI',
        'fill-blank': 'TRẢ LỜI NGẮN',
        'unknown': 'CHƯA XÁC ĐỊNH'
      };

      const systemPrompt = getEffectivePrompt();
      const type = q.type || 'unknown';
      let out = `${systemPrompt}\n\n`;
      out += `━━━ Phân tích Câu ${displayNum} [${typeNames[type]}] ━━━\n\n`;

      if (currentMode === 'homework') {
          // Homework mode usually has a pre-formatted q.textAI, but let's be safe
          if (q.textAI) return q.textAI;
          // Fallback if textAI is missing
          if (q.text) out += q.text;
      } else {
          // Exam mode structure
          if (q.title) out += `📋 Yêu cầu: ${q.title}\n`;
          if (q.content) out += `📝 Đề bài: ${q.content}\n`;
          if (q.answerPrompt) out += `✏️ ${q.answerPrompt}\n`;
          out += `\n`;

          switch(type) {
            case 'multiple-choice':
              Object.entries(q.data.answers).sort().forEach(([k, v]) => {
                out += `${k}. ${v}\n`;
              });
              break;
            case 'true-false':
              q.data.items.forEach(item => {
                out += `${item.label} ${item.statement}\n`;
              });
              break;
            case 'fill-blank':
              out += `[${q.data.blanks.length} ô trống cần điền]\n`;
              break;
          }
      }

      // Add Footer requirement
      out += `\n${'═'.repeat(40)}\n`;
      out += `📌 YÊU CẦU: Hãy giải đáp câu hỏi trên một cách chính xác nhất.\n`;
      out += `1. Chọn đáp án đúng.\n2. Giải thích ngắn gọn.\n3. Độ tin cậy (%).`;

      return out;
    }

    // ============================================================ 
    // 📋 EXAM MODE - STATIC EXTRACTION (ALL QUESTIONS ON PAGE)
    // ============================================================ 

    // MathML to LaTeX converter for Exam mode
    const MO_MAP = {
      '∈': '\\in', '∉': '\\notin', '≤': '\\le', '≥': '\\ge',
      '<': '<', '>': '>', '=': '=', '≠': '\\ne', '≈': '\\approx',
      '+': '+', '-': '-', '×': '\\times', '÷': '\\div', '±': '\\pm',
      '·': '\\cdot', '∞': '\\infty', '∅': '\\emptyset',
      '{': '\\{', '}': '\\}', '|': '|', '∣': '\\mid',
      '(': '(', ')': ')', '[': '[', ']': ']',
      '→': '\\to', '⇒': '\\Rightarrow', '⇔': '\\Leftrightarrow',
      '∀': '\\forall', '∃': '\\exists',
      '∪': '\\cup', '∩': '\\cap', '⊂': '\\subset', '⊆': '\\subseteq',
      '∑': '\\sum', '∏': '\\prod', '∫': '\\int',
      '√': '\\sqrt', '∂': '\\partial',
      'α': '\\alpha', 'β': '\\beta', 'γ': '\\gamma', 'δ': '\\delta',
      'π': '\\pi', 'θ': '\\theta', 'λ': '\\lambda', 'φ': '\\varphi',
      '.': '.', ',': ',', ':': ':', ';': ';'
    };

    const DOUBLE_STRUCK = {
      'N': '\\mathbb{N}', 'Z': '\\mathbb{Z}', 'Q': '\\mathbb{Q}',
      'R': '\\mathbb{R}', 'C': '\\mathbb{C}'
    };

    function convertTableToMarkdown(table) {
      if (!table) return '';
      try {
        // Clone table to safely modify (replace BRs) without affecting original reference
        const tClone = table.cloneNode(true);
        
        // Replace <br> with space to prevent text merging (e.g. "Header<br>Text" -> "Header Text")
        tClone.querySelectorAll('br').forEach(br => br.replaceWith(document.createTextNode(' ')));
        
        // Use querySelectorAll for maximum compatibility
        const rows = Array.from(tClone.querySelectorAll('tr'));
        if (rows.length === 0) return '';
        
        let result = '\n';
        
        rows.forEach((row, rowIndex) => {
          const cells = Array.from(row.querySelectorAll('td, th'));
          if (cells.length === 0) return;
          
          const rowText = cells.map(c => {
            // Get text, replace newlines with space, trim, and escape pipes
            let txt = (c.textContent || '').replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();
            return txt.replace(/\|/g, '\\|'); 
          }).join(' | ');
          
          result += `| ${rowText} |\n`;
          
          // Add Markdown Header Separator
          if (rowIndex === 0 && rows.length > 1) {
            const separator = cells.map(() => '---').join(' | ');
            result += `| ${separator} |\n`;
          }
        });
        
        return result + '\n';
      } catch (e) {
        console.error("Lỗi convertTableToMarkdown:", e);
        return '[Lỗi xử lý bảng]\n';
      }
    }

    function mmlToLatex(elem) {
      if (!elem) return '';
      if (elem.nodeType === Node.TEXT_NODE) return elem.textContent.trim();
      
      const tag = elem.tagName?.toLowerCase();
      const children = Array.from(elem.children);
      
      switch(tag) {
        case 'math':
          return children.map(mmlToLatex).join('');
        
        case 'mi': {
          const text = elem.textContent;
          const variant = elem.getAttribute('mathvariant') || '';
          if (variant === 'double-struck') return DOUBLE_STRUCK[text] || `\\mathbb{${text}}`;
          if (['sin','cos','tan','log','ln','lim'].includes(text)) return `\\${text}`;
          return text;
        }

        case 'mn': return elem.textContent;
        case 'mo': return MO_MAP[elem.textContent] || elem.textContent;
        case 'mtext': return elem.textContent.trim() ? `\\text{${elem.textContent}}` : '';
        case 'mspace': return ' ';
        
        case 'mrow': {
          const texclass = elem.getAttribute('data-mjx-texclass') || '';
          let content = children.map(mmlToLatex).join('');
          
          if (texclass === 'INNER' && children.length >= 2) {
            const first = children[0], last = children[children.length - 1];
            if (first.tagName?.toLowerCase() === 'mo' && last.tagName?.toLowerCase() === 'mo') {
              const left = first.textContent, right = last.textContent;
              const inner = children.slice(1, -1).map(mmlToLatex).join('');
              if (left === '{' && right === '}') return `\\{${inner}\\}`;
              if (left === '(' && right === ')') return `(${inner})`;
              if (left === '[' && right === ']') return `[${inner}]`;
            }
          }
          return content;
        }
        
        case 'msup': {
          if (children.length >= 2) {
            const base = mmlToLatex(children[0]), sup = mmlToLatex(children[1]);
            return sup.length === 1 ? `${base}^${sup}` : `${base}^{${sup}}`;
          }
          return '';
        }
        
        case 'msub': {
          if (children.length >= 2) {
            const base = mmlToLatex(children[0]), sub = mmlToLatex(children[1]);
            return sub.length === 1 ? `${base}_${sub}` : `${base}_{${sub}}`;
          }
          return '';
        }
        
        case 'mfrac': {
          if (children.length >= 2) {
            return `\\frac{${mmlToLatex(children[0])}}{${mmlToLatex(children[1])}}`;
          }
          return '';
        }
        
        case 'msqrt': return `\\sqrt{${children.map(mmlToLatex).join('')}}`;
        
        case 'mover': {
          if (children.length >= 2) {
            const base = mmlToLatex(children[0]);
            const over = children[1].textContent;
            if (over === '¯') return `\\overline{${base}}`;
            if (over === '→') return `\\vec{${base}}`;
            return base;
          }
          return '';
        }
        
        default: return children.map(mmlToLatex).join('');
      }
    }

    function mjxToLatexExam(mjxContainer) {
      const mml = mjxContainer.querySelector('mjx-assistive-mml math');
      return mml ? mmlToLatex(mml) : '';
    }

    function extractTextWithMathExam(elem) {
      if (!elem) return '';
      const clone = elem.cloneNode(true);

      // Replace MathJax with LaTeX
      clone.querySelectorAll('mjx-container').forEach(mjx => {
        let latex = mjxToLatexExam(mjx);
        
        // Fallback: Try extracting from SVG if MML failed
        if (!latex) {
           const svg = mjx.querySelector('svg');
           if (svg) {
             const svgText = parseSVGMath(svg);
             if (svgText) latex = svgText;
           }
        }

        mjx.replaceWith(latex ? ` $${latex}$ ` : '');
      });

      // Process remaining standalone SVGs or failed mathjax SVGs
      clone.querySelectorAll('svg').forEach(svg => {
         const svgText = parseSVGMath(svg);
         if (svgText) {
            const span = document.createElement('span');
            span.textContent = ` $${svgText}$ `;
            svg.replaceWith(span);
         } else {
            svg.remove();
         }
      });

      // ===== THÊM PHẦN NÀY - Chuyển định dạng thành ký hiệu =====
      // Xử lý underline trước (thường nằm trong cùng)
      clone.querySelectorAll('u').forEach(el => {
        const span = document.createElement('span');
        span.textContent = `__${el.textContent}__`;
        el.replaceWith(span);
      });

      // Xử lý bold
      clone.querySelectorAll('strong, b').forEach(el => {
        const span = document.createElement('span');
        span.textContent = `**${el.textContent}**`;
        el.replaceWith(span);
      });

      // Xử lý italic
      clone.querySelectorAll('em, i').forEach(el => {
        const span = document.createElement('span');
        span.textContent = `*${el.textContent}*`;
        el.replaceWith(span);
      });

      // ===== HANDLE TABLES =====
      clone.querySelectorAll('table').forEach(table => {
        const md = convertTableToMarkdown(table);
        const mdSafe = md.replace(/\n/g, '___TABLE_NEWLINE___');
        const span = document.createElement('span');
        span.textContent = " " + mdSafe + " ";
        table.replaceWith(span);
      });
      
      // ===== KẾT THÚC PHẦN THÊM =====

      let text = clone.textContent || '';
      text = text.replace(/\s+/g, ' ').trim();
      return text.replace(/___TABLE_NEWLINE___/g, '\n');
    }

    function detectTypeExam(q) {
      if (q.querySelector('.answer-input input, input.input-size-1, input.input-size-2')) return 'fill-blank';
      if (q.querySelector('.true-false, .true-false-an, .child-content')) return 'true-false';
      if (q.querySelector('.question-answer')) return 'multiple-choice';
      return 'unknown';
    }

    function extractMultipleChoiceExam(q) {
      const answers = {};
      q.querySelectorAll('.question-answer').forEach(ans => {
        const label = ans.querySelector('.answer')?.textContent.trim();
        const option = ans.querySelector('.option-name');
        if (label && option) answers[label] = extractTextWithMathExam(option);
      });
      return answers;
    }

    function extractTrueFalseExam(q) {
      const items = [];
      q.querySelectorAll('.child-content').forEach(child => {
        const charElem = child.querySelector('.option-char');
        const textElem = child.querySelector('.fadein') || child.querySelector('.left-content');

        let label = charElem?.textContent.trim() || '';
        let text = extractTextWithMathExam(textElem);
        text = text.replace(/^[a-d]\)\s*/i, '').trim();

        items.push({ label, statement: text });
      });
      return items;
    }

    function extractFillBlankExam(q) {
      const blanks = [];
      q.querySelectorAll('input[type="text"]').forEach((input, idx) => {
        blanks.push({
          id: input.id || `blank-${idx + 1}`,
          type: input.getAttribute('config-typeaction') || 'text'
        });
      });
      return blanks;
    }

    // NEW FUNCTIONS: Extract multiple choice and true/false with images
    function extractMultipleChoiceExamWithImages(q) {
      const answers = {};
      const images = [];

      q.querySelectorAll('.question-answer').forEach(ans => {
        const label = ans.querySelector('.answer')?.textContent.trim();
        const option = ans.querySelector('.option-name');
        if (label && option) {
          answers[label] = extractTextWithMathExam(option);
          // Lấy ảnh từ option
          const optionImages = extractImages(option);
          optionImages.forEach(img => {
            img.optionLabel = label;
            images.push(img);
          });
        }
      });

      return { answers, images };
    }

    function extractTrueFalseExamWithImages(q) {
      const items = [];
      const images = [];

      q.querySelectorAll('.child-content').forEach(child => {
        const charElem = child.querySelector('.option-char');
        const textElem = child.querySelector('.fadein') || child.querySelector('.left-content');

        let label = charElem?.textContent.trim() || '';
        let text = extractTextWithMathExam(textElem);
        text = text.replace(/^[a-d]\)\s*/i, '').trim();

        items.push({ label, statement: text });

        // Lấy ảnh
        if (textElem) {
          const itemImages = extractImages(textElem);
          itemImages.forEach(img => {
            img.optionLabel = label;
            images.push(img);
          });
        }
      });

      return { items, images };
    }

    function extractQuestionExam(q, num) {
      const result = {
        number: num,
        score: '',
        title: '',
        content: '',
        type: 'unknown',
        data: null,
        images: []
      };

      // Number & Score
      const numMatch = q.querySelector('.num')?.textContent.match(/Câu\s*(\d+)/);
      if (numMatch) result.number = parseInt(numMatch[1]);
      result.score = q.querySelector('.score-num')?.textContent.trim() || '';

      // Title - dùng extractTextWithMathExam và lấy ảnh
      const titleElem = q.querySelector('.title');
      if (titleElem) {
        result.title = extractTextWithMathExam(titleElem);
        result.images.push(...extractImages(titleElem));
      }

      // Content - thử nhiều selector
      const contentElem = q.querySelector('.content') ||
                         q.querySelector('.question-name .fadein') ||
                         q.querySelector('.question-name');
      if (contentElem) {
        result.content = extractTextWithMathExam(contentElem);
        result.images.push(...extractImages(contentElem));
      }

      // Answer prompt
      const answerInputElem = q.querySelector('.answer-input');
      if (answerInputElem) {
        result.answerPrompt = extractTextWithMathExam(answerInputElem);
        result.images.push(...extractImages(answerInputElem));
      }

      // Type & Data
      result.type = detectTypeExam(q);

      switch(result.type) {
        case 'multiple-choice':
          const mcData = extractMultipleChoiceExamWithImages(q);
          result.data = { answers: mcData.answers };
          result.images.push(...mcData.images);
          break;
        case 'true-false':
          const tfData = extractTrueFalseExamWithImages(q);
          result.data = { items: tfData.items };
          result.images.push(...tfData.images);
          break;
        case 'fill-blank':
          result.data = { blanks: extractFillBlankExam(q) };
          break;
      }

      // Loại bỏ ảnh trùng lặp
      const uniqueUrls = new Set();
      result.images = result.images.filter(img => {
        const url = img.fullUrl || img.url;
        if (uniqueUrls.has(url)) return false;
        uniqueUrls.add(url);
        return true;
      });

      return result;
    }

    function extractAllExam() {
      const questions = document.querySelectorAll('.question');
      return Array.from(questions).map((q, i) => extractQuestionExam(q, i + 1));
    }

    function formatExamResultsNormal(questions) {
      let out = [];

      questions.forEach(q => {
        out.push(createSeparator("start"));

        if (q.title) out.push(formatBoxLine('', q.title).trimEnd());
        if (q.content) out.push(formatBoxLine('', q.content).trimEnd());
        if (q.answerPrompt) out.push(formatBoxLine('', q.answerPrompt).trimEnd());

        const typeNames = {
          'multiple-choice': 'Trắc nghiệm',
          'true-false': 'Đúng/Sai',
          'fill-blank': 'Điền khuyết',
          'unknown': 'Không xác định'
        };
        out.push('');

        switch(q.type) {
          case 'multiple-choice':
            Object.entries(q.data.answers).sort().forEach(([k, v]) => {
              out.push(formatBoxLine(`${k}.`, v).trimEnd());
            });
            break;

          case 'true-false':
            q.data.items.forEach(item => {
              out.push(formatBoxLine(`${item.label}`, item.statement).trimEnd());
            });
            break;

          case 'fill-blank':
            break;
        }

        // ===== THÊM PHẦN HIỂN THỊ ẢNH =====
        if (q.images && q.images.length > 0) {
          out.push(createSeparator("thin"));
          q.images.forEach((img, idx) => {
            if (img.isBase64) {
              out.push(`[${idx + 1}] Base64 Image${img.optionLabel ? ` (${img.optionLabel})` : ''}`);
            } else {
              out.push(`[${idx + 1}] ${img.url}${img.optionLabel ? ` (${img.optionLabel})` : ''}`);
            }
          });
        }

        out.push(createSeparator("end"));
        out.push('');
      });

      return out.join('\n').replace(/\n\n+/g, '\n\n'); // Clean up excessive newlines
    }

    function formatExamResultsAI(questions) {
      let out = [];

      // ===== THÊM AI PROMPT Ở ĐẦU =====
      const effectivePrompt = getEffectivePrompt();
      out.push(effectivePrompt);
      out.push('');
      out.push('═'.repeat(60));
      out.push('📚 DỮ LIỆU CÂU HỎI CẦN PHÂN TÍCH');
      out.push('═'.repeat(60));
      out.push('');

      questions.forEach(q => {
        const typeNames = {
          'multiple-choice': 'TRẮC NGHIỆM',
          'true-false': 'ĐÚNG/SAI',
          'fill-blank': 'ĐIỀN KHUYẾT',
          'unknown': 'CHƯA XÁC ĐỊNH'
        };

        out.push(`━━━ Câu ${q.number} ━━━`);

        if (q.title) out.push(`${q.title}`);
        if (q.content) out.push(`${q.content}`);
        if (q.answerPrompt) out.push(`${q.answerPrompt}`);
        out.push('');

        switch(q.type) {
          case 'multiple-choice':
            Object.entries(q.data.answers).sort().forEach(([k, v]) => {
              out.push(`${k}. ${v}`);
            });
            break;

          case 'true-false':
            q.data.items.forEach(item => {
              out.push(`${item.label} ${item.statement}`);
            });
            break;

          case 'fill-blank':
            out.push(`[${q.data.blanks.length} ô trống cần điền]`);
            break;
        }

        // Ảnh đính kèm
        if (q.images && q.images.length > 0) {
          out.push('');
          out.push(`🖼️ Ảnh đính kèm: ${q.images.length}`);
          q.images.forEach((img, idx) => {
            if (!img.isBase64) {
              out.push(`   [${idx + 1}] ${img.url}`);
            } else {
              out.push(`   [${idx + 1}] [Base64 Image]`);
            }
          });
        }

        out.push('');
      });

      // ===== THÊM YÊU CẦU CUỐI =====
      out.push('═'.repeat(60));
      out.push('📌 YÊU CẦU: Phân tích và trả lời từng câu hỏi trên.');
      out.push('   Với mỗi câu, hãy:');
      out.push('   1. Đưa ra đáp án chính xác');
      out.push('   2. Giải thích ngắn gọn lý do');
      out.push('   3. Đánh giá độ tin cậy (%)');
      out.push('═'.repeat(60));

      return out.join('\n');
    }

    // ============================================================
    // 📋 EXAM MODE - STATIC EXTRACTION (ALL QUESTIONS ON PAGE)
    // ============================================================

    async function runExamMode() {
      showToast('Đang scrape bài thi...', 'info');
      updateStatus('Đang scrape...', 'Quét tất cả câu hỏi', 'fileText');

      // ========== SCROLL ĐỂ LOAD TẤT CẢ CÂU HỎI ==========
      updateStatus('Đang load...', 'Scroll để tải câu hỏi', 'fileText');

      const scrollContainer = document.querySelector('.questions-container') ||
                         document.querySelector('.exam-content') ||
                         document.querySelector('.test-content') ||
                         document.querySelector('.content-wrapper') ||
                         document.documentElement;

      const viewportHeight = window.innerHeight;
      const scrollStep = viewportHeight * 0.7;

      let currentScroll = 0;
      let lastQuestionCount = 0;
      let stableCount = 0;
      let maxScroll = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        scrollContainer.scrollHeight || 0
      );

      // Scroll xuống từng bước
      while (currentScroll < maxScroll + 3000 && !stopRequested) {
        // Scroll
        window.scrollTo({ top: currentScroll, behavior: 'instant' });
        if (scrollContainer !== document.documentElement) {
          scrollContainer.scrollTop = currentScroll;
        }

        await fastSleep(20); // Tăng tốc cực mạnh (80ms -> 20ms)

        // Cập nhật maxScroll (có thể tăng khi load thêm)
        maxScroll = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          scrollContainer.scrollHeight || 0
        );

        currentScroll += scrollStep;

        // Kiểm tra số câu hỏi
        const currentQuestions = document.querySelectorAll('.question').length;
        if (currentQuestions > lastQuestionCount) {
          updateStatus('Đang load...', `Đã tìm thấy ${currentQuestions} câu`, 'fileText');
          lastQuestionCount = currentQuestions;
          stableCount = 0;
        } else {
          stableCount++;
        }

        if (stableCount > 12) {
          currentScroll += scrollStep * 3;
        }
      }

      // Scroll lên xuống để chắc chắn
      window.scrollTo({ top: 0, behavior: 'instant' });
      await sleep(400);
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
      await sleep(600);
      window.scrollTo({ top: 0, behavior: 'instant' });
      await sleep(400);

      // ========== ĐỢI MATHJAX ==========
      updateStatus('Đang xử lý...', 'Chờ MathJax render', 'bot');

      if (window.MathJax) {
        try {
          if (window.MathJax.typesetPromise) {
            await window.MathJax.typesetPromise();
          } else if (window.MathJax.Hub?.Queue) {
            await new Promise(resolve => window.MathJax.Hub.Queue(() => resolve()));
          }
        } catch (e) {
        }
      }
      await sleep(500);

      // ========== EXTRACT ==========
      updateStatus('Đang trích xuất...', 'Phân tích câu hỏi & ảnh', 'fileText');

      const questions = extractAllExam();

      if (questions.length === 0) {
        showToast('Không tìm thấy câu hỏi!', 'error');
        updateStatus('Lỗi!', 'Không tìm thấy câu hỏi', 'x');
        return;
      }

      // Process results
      questionCount = questions.length;

      const typeCounts = {};
      questions.forEach(q => {
        typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
        q.images.forEach(img => {
          allImages.push({ ...img, question: q.number });
        });
      });

      retryCount = Object.keys(typeCounts).length;

      allResults = formatExamResultsNormal(questions);
      allResultsAI = formatExamResultsAI(questions);
      allQuestions = questions; // Store for dashboard

      window._examQuestions = questions;

      updateStatus('Hoàn thành!', `${questionCount} câu, ${allImages.length} ảnh`, 'check');
      showToast(`Đã scrape ${questionCount} câu, ${allImages.length} ảnh!`, 'success');
    }

    // ============================================================ 
    // 🔄 SIDEBAR NAVIGATION MODE (BETA)
    // ============================================================ 

    async function runSidebarMode() {
      showToast('Kích hoạt chế độ Sidebar (Turbo Mode 🚀)', 'success');
      updateStatus('Turbo Mode', 'Đang khởi tạo...', 'rocket');

      // Re-query to be safe
      const sidebarItems = Array.from(document.querySelectorAll('.list-item .item[id^="question-sidebar-"]'));
      
      // Sort by the number inside the div to ensure correct order 1, 2, 3...
      sidebarItems.sort((a, b) => {
        const numA = parseInt(a.textContent.trim()) || 0;
        const numB = parseInt(b.textContent.trim()) || 0;
        return numA - numB;
      });

      const totalQ = sidebarItems.length;
      updateStatus('Turbo Mode', `Tìm thấy ${totalQ} câu hỏi`, 'zap');

      for (let i = 0; i < totalQ; i++) {
        if (stopRequested) break;

        // Handle Pause
        while (isPaused && !stopRequested) {
            await fastSleep(200);
        }

        const item = sidebarItems[i];
        const qNumText = item.textContent.trim();
        
        // Scroll item into view (only if needed to save rendering time)
        // item.scrollIntoView({ behavior: 'instant', block: 'center' }); 
        
        // Visual feedback on sidebar item
        const originalBg = item.style.backgroundColor;
        item.style.backgroundColor = '#e0e7ff'; // Light indigo
        
        updateStatus('Đang xử lý...', `Câu ${qNumText} / ${totalQ}`, 'zap');
        
        // Click to navigate
        item.click();
        
        // Wait for content load
        // 1. Wait for loading spinner to clear
        await waitForContentLoaded(2000); // Reduced max wait
        
        // 2. Extra check: Wait for question number in main view to match sidebar number
        // This prevents scraping the previous question before the new one renders
        let retries = 0;
        while (retries < 100) { // More checks, faster interval
            const numDiv = document.querySelector('.num');
            if (numDiv) {
                const currentIdMatch = (numDiv.textContent || '').match(/#(\d+)/);
                const currentNumMatch = (numDiv.textContent || '').match(/Câu[:\s]*(\d+)/i);
                
                const currentNum = currentNumMatch ? currentNumMatch[1] : (currentIdMatch ? currentIdMatch[1] : null);
                
                if (currentNum && currentNum === qNumText) break;
            }
            await fastSleep(15); // Extreme speed polling
            retries++;
        }

        // Extract
        const q = await extractQuestionHomework();

        if (q) {
            // Smart UX: Highlight (Disabled in Turbo for speed or keep minimal)
            // const highlightEl = document.querySelector('app-test-step-question-freetext, .true-false, .question-name');
            // if (highlightEl) { ... }

            // Save Data (if new)
            const isDuplicate = allQuestions.some(ex => ex.id === q.id);
            if (!isDuplicate) {
                allResults += q.text;
                allResultsAI += q.textAI;
                allQuestions.push(q);
                q.images.forEach(img => allImages.push({ ...img, question: q.id }));
                questionCount++;
            }
            
            lastID = q.id;
            
            // Update UI
            if (panelElements.progressBar) {
                const percent = Math.min(100, Math.round(((i + 1) / totalQ) * 100));
                panelElements.progressBar.style.width = percent + '%';
            }
            // Update status less frequently to save DOM updates? No, keep it for feedback.
            updateStatus('Thu thập thành công!', `Câu ${qNumText}`, 'check');
        }

        // Restore sidebar item style
        item.style.backgroundColor = originalBg;
        
        // Ultra small delay between questions
        await smartSleep(50); 
      }
    }

    // ============================================================ 
    // 🔄 HOMEWORK MODE MAIN LOOP
    // ============================================================ 
    
    async function runHomeworkMode() {
      // Initialize AI Prompt for Homework Mode
      const effectivePrompt = getEffectivePrompt();
      allResultsAI = effectivePrompt + '\n\n' + '═'.repeat(60) + '\n📚 DỮ LIỆU CÂU HỎI CẦN PHÂN TÍCH\n' + '═'.repeat(60) + '\n\n';
      
      showToast('Bắt đầu scrape bài tập...', 'success');
      updateStatus('Đang khởi tạo...', 'Chuẩn bị thu thập', 'rocket');

      while (!stopRequested) {
        try {
          // Wait if paused
          while (isPaused && !stopRequested) {
            await fastSleep(200);
          }
          
          if (stopRequested) break;
          
          // Get current ID and Total
          const numDiv = document.querySelector('.num');
          const fullText = numDiv ? (numDiv.textContent || '') : '';
          const idMatch = fullText.match(/#(\d+)/);
          const progressMatch = fullText.match(/Câu[:\s]*(\d+)\s*(?:\/|trên)\s*(\d+)/i);
          const numMatch = fullText.match(/Câu[:\s]*(\d+)/i);
          
          const currentId = idMatch ? idMatch[1] : (numMatch ? numMatch[1] : null);
          const totalQ = progressMatch ? parseInt(progressMatch[2]) : null;
          
          if (panelElements.currentQText) {
            panelElements.currentQText.textContent = currentId ? `Đang xử lý: Câu #${currentId}${totalQ ? ' / ' + totalQ : ''}` : 'Đang tìm câu hỏi...';
          }

          if (totalQ && panelElements.progressBar) {
              const currentNum = progressMatch ? parseInt(progressMatch[1]) : (idMatch ? parseInt(idMatch[1]) : questionCount);
              const percent = Math.min(100, Math.round((currentNum / totalQ) * 100));
              panelElements.progressBar.style.width = percent + '%';
              panelElements.progressBar.style.background = `linear-gradient(90deg, #10b981 ${percent}%, rgba(255,255,255,0.1) ${percent}%)`;
          }

          updateStatus('Đang scrape...', `Xử lý câu ${currentId || '...'}`, 'fileText');
          
          // Extract question - cực nhanh
          const q = await extractQuestionHomework();
          
          if (q && q.id !== lastID) {
            // Smart UX: Highlight the question on the page
            const highlightEl = document.querySelector('app-test-step-question-freetext, .true-false, .question-name');
            if (highlightEl) {
                const originalOutline = highlightEl.style.outline;
                const originalTransition = highlightEl.style.transition;
                highlightEl.style.transition = 'outline 0.3s ease';
                highlightEl.style.outline = '4px solid #6366f1';
                highlightEl.style.outlineOffset = '4px';
                highlightEl.style.borderRadius = '8px';
                setTimeout(() => {
                    highlightEl.style.outline = originalOutline || 'transparent solid 0px';
                    setTimeout(() => highlightEl.style.transition = originalTransition, 300);
                }, 800);
            }

            allResults += q.text;
            allResultsAI += q.textAI;
            allQuestions.push(q); // Store for dashboard
            q.images.forEach(img => allImages.push({ ...img, question: q.id }));
            lastID = q.id;
            questionCount++;
            
            updateStatus('Thu thập thành công!', `Câu ${q.id} - Tổng: ${questionCount}`, 'check');
          }
          
          if (stopRequested) break;

          // 🆕 FEATURE: Confirmation Modal if "Kết thúc" button is found
          const scraperSettings = getScraperSettings();
          if (scraperSettings.autoStopAtEnd) {
            // Enhanced selector: include generic btn and specific classes from user feedback
            const potentialFinishBtns = document.querySelectorAll('button.btn, div.btn, .btn-block.btn-gray.btn-primary');
            let foundFinish = false;
            for (const btn of potentialFinishBtns) {
              if (btn.offsetParent !== null && !btn.disabled && !btn.classList.contains('disabled')) {
                const txt = (btn.textContent || '').trim();
                // Check exact match or if it contains the text (for cases with icons/extra whitespace)
                if (txt === 'Kết thúc' || txt.includes('Kết thúc')) {
                  foundFinish = true;
                  break;
                }
              }
            }
            if (foundFinish) {
              updateStatus('Đã xong?', 'Phát hiện nút Kết thúc', 'help');
              const confirmed = await showConfirmModal(
                'Hệ thống đã scrape xong toàn bộ các câu hỏi. Bạn có muốn kết thúc và xem dashboard kết quả không?',
                'Xác nhận kết thúc'
              );

              if (confirmed) {
                updateStatus('Đã hoàn thành', 'Xác nhận kết thúc', 'check');
                showToast('Đang tổng hợp kết quả...', 'success');
                stopRequested = true;
                break;
              } else {
                showToast('Tiếp tục chờ tác vụ mới...', 'info');
                // Đợi 5 giây trước khi check lại để tránh hiện modal liên tục
                await smartSleep(5000);
              }
            }
          }
          
          // Click button - tối ưu tần suất
          updateStatus('Tìm nút tiếp theo...', 'Click liên tục', 'refreshCw', 'Đang tìm...');
          const clickResult = await clickButtonRepeatedly(30, 80); // Giảm delay xuống 80ms
          
          if (!clickResult.success) {
            await smartSleep(1000); // Đợi ngắn nếu không thấy nút
            const retry = await clickButtonRepeatedly(15, 150);
            if (!retry.success && !stopRequested) {
              showToast('Có thể đã hết câu hỏi!', 'info');
              break;
            }
          }
          
          if (stopRequested) break;
          
          // Wait for question change - check liên tục mỗi 100ms
          updateStatus('Chờ câu mới...', 'Đang load', 'clock');
          await waitForQuestionChange(currentId, 4000);
          
        } catch (err) {
          if (stopRequested) break;
          updateStatus('Lỗi!', err.message, 'x');
          await smartSleep(1000);
        }
      }
    }

    // ============================================================ 
    // 🤖 GEMINI UI COMPONENTS
    // ============================================================ 

    // Helper: Convert URL/Base64 to raw Base64 for Gemini (Global Scope)
    const getImageData = async (imgObj) => {
        try {
            let base64Data = '';
            let mimeType = 'image/jpeg';

            if (imgObj.isBase64) {
                // Extract base64 part
                const matches = imgObj.fullUrl.match(/^data:(.+);base64,(.+)$/);
                if (matches) {
                    mimeType = matches[1];
                    base64Data = matches[2];
                } else {
                    base64Data = imgObj.fullUrl; // Fallback
                }
            } else {
                // Fetch URL
                const response = await fetch(imgObj.fullUrl);
                const blob = await response.blob();
                mimeType = blob.type;
                const reader = new FileReader();
                base64Data = await new Promise((resolve) => {
                    reader.onloadend = () => resolve(reader.result.split(',')[1]);
                    reader.readAsDataURL(blob);
                });
            }
            return { inline_data: { mime_type: mimeType, data: base64Data } };
        } catch (e) {
            return null;
        }
    };

    function getEffectivePrompt() {
        const settings = getScraperSettings();
        if (settings.customPrompt && settings.customPrompt.trim().length > 0) {
            return settings.customPrompt;
        }
        return defaultAIPrompt;
    }

    function showGeminiSettingsModal() {
        return new Promise((resolve) => {
            const config = getGeminiConfig();
            const scraperSettings = getScraperSettings();
            const effectivePrompt = getEffectivePrompt();

            const overlay = document.createElement('div');
            Object.assign(overlay.style, {
                position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
                background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(5px)',
                zIndex: '100002', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Inter', sans-serif"
            });

            const modelOptions = GEMINI_MODELS.map(m => 
                `<option value="${m.id}" ${m.id === config.model ? 'selected' : ''}>${m.name}</option>`
            ).join('');

            overlay.innerHTML = `
                <div style="
                    background: #1e293b; border-radius: 24px; padding: 32px; width: 600px;
                    border: 1px solid rgba(255,255,255,0.1); color: white;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    max-height: 90vh; overflow-y: auto;
                ">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="color: #8b5cf6; margin-bottom: 16px;">${getIcon('settings', 'scraper-icon-lg')}</div>
                        <h2 style="margin: 0; font-size: 24px;">Cấu hình</h2>
                    </div>

                    <!-- Tabs -->
                    <div style="display: flex; gap: 8px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                         <button id="tabGeneral" class="active-tab" style="background: transparent; border: none; color: #8b5cf6; font-weight: 600; padding: 8px 16px; cursor: pointer; border-bottom: 2px solid #8b5cf6;">Chung</button>
                         <button id="tabPrompt" style="background: transparent; border: none; color: #94a3b8; font-weight: 500; padding: 8px 16px; cursor: pointer;">Prompt AI</button>
                    </div>
                    
                    <div id="panelGeneral">
                        <div style="margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <h3 style="font-size: 16px; margin: 0 0 16px; color: white;">🤖 Gemini AI</h3>
                            <div style="margin-bottom: 20px;">
                                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #cbd5e1;">API Key</label>
                                <input type="password" id="geminiApiKey" value="${config.apiKey}" placeholder="Nhập Gemini API Key..." style="
                                    width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
                                    border-radius: 12px; color: white; outline: none; box-sizing: border-box;
                                ">
                                <div style="margin-top: 6px; font-size: 11px; color: #94a3b8;">
                                    Lấy key tại <a href="https://aistudio.google.com/app/apikey" target="_blank" style="color: #8b5cf6;">Google AI Studio</a>
                                </div>
                            </div>

                            <div style="margin-bottom: 0;">
                                <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #cbd5e1;">Mô hình (Model)</label>
                                <select id="geminiModel" style="
                                    width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
                                    border-radius: 12px; color: white; outline: none; box-sizing: border-box; cursor: pointer;
                                ">
                                    ${modelOptions}
                                </select>
                            </div>
                        </div>

                        <div style="margin-bottom: 32px;">
                            <h3 style="font-size: 16px; margin: 0 0 16px; color: white;">⚙️ Cài đặt chung</h3>
                            <label style="display: flex; align-items: center; gap: 12px; cursor: pointer; user-select: none;">
                                <input type="checkbox" id="autoStopAtEnd" ${scraperSettings.autoStopAtEnd ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;">
                                <span style="color: #e2e8f0; font-size: 14px;">Tự động dừng khi gặp nút "Kết thúc"</span>
                            </label>
                        </div>
                    </div>

                    <div id="panelPrompt" style="display: none;">
                        <div style="margin-bottom: 24px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <label style="font-size: 14px; color: #cbd5e1;">Nội dung Prompt</label>
                                <button id="resetPromptBtn" style="font-size: 12px; color: #f43f5e; background: transparent; border: none; cursor: pointer;">
                                    Reset về mặc định (PROMPT.md)
                                </button>
                            </div>
                            <textarea id="customPromptInput" style="
                                width: 100%; height: 300px; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
                                border-radius: 12px; color: #e2e8f0; outline: none; box-sizing: border-box;
                                font-family: 'JetBrains Mono', monospace; font-size: 12px; resize: vertical;
                            " placeholder="Nhập prompt tùy chỉnh...">${effectivePrompt}</textarea>
                            <div style="margin-top: 8px; font-size: 11px; color: #94a3b8;">
                                * Nếu để trống, hệ thống sẽ dùng file PROMPT.md gốc.
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 24px;">
                        <button id="cancelGeminiConfig" style="
                            flex: 1; padding: 12px; background: rgba(255,255,255,0.1); border: none;
                            border-radius: 12px; color: white; cursor: pointer; font-weight: 600;
                        ">Hủy</button>
                        <button id="saveGeminiConfig" style="
                            flex: 1; padding: 12px; background: #8b5cf6; border: none;
                            border-radius: 12px; color: white; cursor: pointer; font-weight: 600;
                        ">Lưu & Tiếp tục</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            // Tab switching logic
            const tabGeneral = document.getElementById('tabGeneral');
            const tabPrompt = document.getElementById('tabPrompt');
            const panelGeneral = document.getElementById('panelGeneral');
            const panelPrompt = document.getElementById('panelPrompt');

            const switchTab = (tab) => {
                if (tab === 'general') {
                    panelGeneral.style.display = 'block';
                    panelPrompt.style.display = 'none';
                    tabGeneral.style.color = '#8b5cf6';
                    tabGeneral.style.borderBottom = '2px solid #8b5cf6';
                    tabPrompt.style.color = '#94a3b8';
                    tabPrompt.style.borderBottom = 'none';
                } else {
                    panelGeneral.style.display = 'none';
                    panelPrompt.style.display = 'block';
                    tabPrompt.style.color = '#8b5cf6';
                    tabPrompt.style.borderBottom = '2px solid #8b5cf6';
                    tabGeneral.style.color = '#94a3b8';
                    tabGeneral.style.borderBottom = 'none';
                }
            };

            tabGeneral.onclick = () => switchTab('general');
            tabPrompt.onclick = () => switchTab('prompt');

            // Reset Prompt Logic
            document.getElementById('resetPromptBtn').onclick = async () => {
                 if(confirm('Bạn có chắc muốn reset về nội dung gốc từ file PROMPT.md?')) {
                     await loadDefaultPrompt(); // Reload from file
                     document.getElementById('customPromptInput').value = defaultAIPrompt;
                     showToast('Đã tải lại nội dung từ PROMPT.md', 'success');
                 }
            };

            document.getElementById('cancelGeminiConfig').onclick = () => {
                overlay.remove();
                resolve(false);
            };

            document.getElementById('saveGeminiConfig').onclick = () => {
                const newConfig = {
                    apiKey: document.getElementById('geminiApiKey').value.trim(),
                    model: document.getElementById('geminiModel').value
                };
                const promptVal = document.getElementById('customPromptInput').value;
                const newScraperSettings = {
                    autoStopAtEnd: document.getElementById('autoStopAtEnd').checked,
                    // If prompt matches default (loaded from file), don't save it as custom to allow future file updates to propagate
                    customPrompt: (promptVal === defaultAIPrompt) ? '' : promptVal
                };

                if (!newConfig.apiKey) {
                    showToast('Vui lòng nhập API Key!', 'warning');
                    return;
                }
                saveGeminiConfig(newConfig);
                saveScraperSettings(newScraperSettings);
                overlay.remove();
                resolve(true);
            };
        });
    }

    function showGeminiResponseModal(initialContent, promptData) {
        const config = getGeminiConfig();
        
        // Populate chatHistory if empty
        if (chatHistory.length === 0) {
            let initialUserMsg;
            if (typeof promptData === 'object' && promptData.role === 'user') {
                initialUserMsg = promptData;
            } else if (Array.isArray(promptData)) {
                initialUserMsg = { role: 'user', parts: promptData };
            } else {
                initialUserMsg = { role: 'user', parts: [{ text: promptData }] };
            }

            chatHistory = [
                initialUserMsg,
                { role: 'model', parts: [{ text: initialContent }] }
            ];
            
            // Set initial selected images based on promptData if it was an object
            if (typeof promptData === 'object' && promptData.parts) {
                 // Logic to sync selectedImageIndices if needed
            } else {
                 selectedImageIndices = new Set(allImages.map((_, i) => i));
            }
        }

        const overlay = document.createElement('div');
        overlay.className = 'ol-overlay';
        if (localStorage.getItem('ol_theme') === 'dark') overlay.classList.add('scraper-dark');

        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
            zIndex: '100003', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            opacity: '0', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        });



                        // Enhanced Markdown formatter
                        const formatMessage = (text) => {
                            let safeText = text;

                            // 0. Handle Thinking Blocks (<think>...</think>)
                            safeText = safeText.replace(/<think>([\s\S]*?)<\/think>/gi, (match, content) => {
                                return `<details class="ai-think-block" open>
                                    <summary class="ai-think-summary">${getIcon('brain', 'scraper-icon-xs')} Thinking Process</summary>
                                    <div class="ai-think-content">${marked.parse(content)}</div>
                                </details>`;
                            });

                            // 0.1 Handle Tool Blocks ([[TOOL: name args]])
                            safeText = safeText.replace(/\[\[TOOL:\s*(\w+)\s+(.*?)\]\]/g, (match, toolName, args) => {
                                let icon = 'zap';
                                if (toolName.toLowerCase().includes('search')) icon = 'search';
                                if (toolName.toLowerCase().includes('calc')) icon = 'calculator';
                                return `<div class="ai-tool-block">
                                    <div class="ai-tool-icon">${getIcon(icon, 'scraper-icon-sm')}</div>
                                    <div>
                                        <div style="font-weight: 700; font-size: 11px; color: var(--ol-brand); text-transform: uppercase;">USED TOOL: ${toolName}</div>
                                        <div style="font-family: monospace; opacity: 0.8;">${escapeHTML(args)}</div>
                                    </div>
                                </div>`;
                            });

                            // 1. Protect LaTeX math
                            const mathBlocks = [];
                            safeText = safeText.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?<!\\)\$[\s\S]*?(?<!\\)\$)/g, (match) => {
                                mathBlocks.push(match);
                                return `__MATH_BLOCK_${mathBlocks.length - 1}__`;
                            });

                            // 2. Custom Extensions (Smart Badge)
                            safeText = safeText.replace(/(?:📈|✅)?\s*ĐỘ TIN CẬY:\s*(\d+)%?\s*(?:🟢|🔵|🟡|🟠|🔴)?/gi, (match, score) => {
                                const s = parseInt(score);
                                let colorVar = '--ol-text-sub';
                                let icon = 'alertTriangle';
                                if (s >= 85) { colorVar = '--ol-success'; icon = 'check'; }
                                else if (s >= 70) { colorVar = '--ol-brand'; icon = 'info'; }
                                
                                return `<div style="display: inline-flex; align-items: center; gap: 8px; background: var(${colorVar}); color: white; padding: 6px 12px; border-radius: 10px; font-weight: 700; font-size: 13px; margin: 10px 0;">
                                    ${getIcon(icon, 'scraper-icon-xs')} ĐỘ TIN CẬY: ${s}%
                                </div>`;
                            });

                            // Question Analysis Highlight
                            safeText = safeText.replace(/^Câu (\d+):/gm, '<div class="ol-brand-bg ol-brand-text" style="padding: 4px 12px; border-radius: 8px; display: inline-block; font-weight: 800; margin-top: 16px;">Câu $1:</div>');

                            // 3. Marked Parse
                            if (typeof marked !== 'undefined') {
                                safeText = marked.parse(safeText);
                            } else {
                                safeText = safeText.replace(/\n/g, '<br>');
                            }

                            // 3.1 Post-process Code Blocks for Copy Button
                            safeText = safeText.replace(/<pre><code( class="language-([^"]+)")?>([\s\S]*?)<\/code><\/pre>/g, (match, classAttr, lang, codeContent) => {
                                const language = lang || 'text';
                                // Unescape HTML for the copy attribute
                                const rawCode = codeContent.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
                                const btnId = 'code-btn-' + Math.random().toString(36).substr(2, 9);
                                
                                // We add a global click handler later or inline onclick
                                return `<div class="code-block-wrapper">
                                    <div class="code-header">
                                        <span class="code-lang">${language}</span>
                                        <button class="code-copy-btn" onclick="navigator.clipboard.writeText(decodeURIComponent('${encodeURIComponent(rawCode)}')).then(() => { this.innerHTML = '${getIcon('check', 'scraper-icon-xs')} Copied!'; setTimeout(() => this.innerHTML = '${getIcon('copy', 'scraper-icon-xs')} Copy', 2000); })">
                                            ${getIcon('copy', 'scraper-icon-xs')} Copy
                                        </button>
                                    </div>
                                    <pre><code${classAttr || ''}>${codeContent}</code></pre>
                                </div>`;
                            });

                            // 4. Restore LaTeX
                            safeText = safeText.replace(/__MATH_BLOCK_(\d+)__/g, (match, index) => {
                                return mathBlocks[parseInt(index)];
                            });

                            // 5. Styles
                            safeText = safeText.replace(/<h1>/g, '<h1 class="ol-text" style="font-size: 24px; font-weight: 800; margin: 24px 0 16px; border-bottom: 2px solid var(--ol-brand); padding-bottom: 8px;">');
                            safeText = safeText.replace(/<h2>/g, '<h2 class="ol-text" style="font-size: 20px; font-weight: 700; margin: 20px 0 12px; display: flex; align-items: center; gap: 8px;">');
                            safeText = safeText.replace(/<h3>/g, '<h3 class="ol-text" style="font-size: 17px; font-weight: 600; margin: 16px 0 8px;">');
                            safeText = safeText.replace(/<hr>/g, '<hr class="ol-border" style="border: 0; border-top-width: 1px; border-top-style: solid; margin: 24px 0; opacity: 0.3;">');
                            safeText = safeText.replace(/<table>/g, '<div class="ol-table-wrapper"><table class="ol-border" style="border-collapse: collapse; width: 100%; margin: 0; border-width: 1px; border-style: solid; border-radius: 12px; overflow: hidden;">');
                            safeText = safeText.replace(/<\/table>/g, '</table></div>');
                            safeText = safeText.replace(/<th>/g, '<th class="ol-bg ol-border" style="padding: 12px; text-align: left; border-bottom: 1px solid var(--ol-border); font-weight: 700;">');
                            safeText = safeText.replace(/<td>/g, '<td class="ol-border" style="padding: 8px 12px; border-width: 1px; border-style: solid;">');
                            
                            // <code> is handled by styles mostly, but let's ensure inline code is distinct from blocks
                            safeText = safeText.replace(/<code(?! class)/g, '<code class="ol-brand-bg ol-brand-text" style="padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 0.9em;">');

                            return safeText;
                        };
        const appendMessage = (role, text, isLoading = false) => {
            const contentArea = document.getElementById('geminiContentArea');
            if (!contentArea) return;

            // Save current scroll position to see if we should auto-scroll
            const isNearBottom = contentArea.scrollHeight - contentArea.scrollTop - contentArea.clientHeight < 150;

            if (isLoading) {
                const loader = document.createElement('div');
                loader.id = 'gemini-chat-loader';
                loader.style.cssText = `
                    display: flex; flex-direction: column; gap: 12px; padding: 20px 24px;
                    background: rgba(30, 41, 59, 0.4); border-radius: 20px; border-bottom-left-radius: 4px;
                    margin-bottom: 24px; align-self: flex-start; width: 80%;
                    border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(8px);
                    animation: message-pop 0.3s ease-out;
                `;
                loader.innerHTML = `
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                        <div class="skeleton-box" style="width: 24px; height: 24px; border-radius: 50%;"></div>
                        <div class="skeleton-box" style="width: 120px; height: 12px;"></div>
                    </div>
                    <div class="skeleton-box" style="width: 90%; height: 14px; margin-bottom: 8px;"></div>
                    <div class="skeleton-box" style="width: 70%; height: 14px; margin-bottom: 8px;"></div>
                    <div class="skeleton-box" style="width: 40%; height: 14px;"></div>
                    <div style="margin-top: 12px; display: flex; gap: 5px; align-items: center;">
                        <div style="width: 5px; height: 5px; background: #6366f1; border-radius: 50%; animation: scraper-bounce 1s infinite ease-in-out both;"></div>
                        <div style="width: 5px; height: 5px; background: #8b5cf6; border-radius: 50%; animation: scraper-bounce 1s infinite ease-in-out both 0.2s;"></div>
                        <div style="width: 5px; height: 5px; background: #d946ef; border-radius: 50%; animation: scraper-bounce 1s infinite ease-in-out both 0.4s;"></div>
                    </div>
                `;
                contentArea.appendChild(loader);
            } else {
                const loader = document.getElementById('gemini-chat-loader');
                if (loader) loader.remove();

                const msgDiv = document.createElement('div');
                const isUser = role === 'user';
                
                msgDiv.style.cssText = `
                    max-width: 85%; padding: 18px 22px; border-radius: 22px; margin-bottom: 28px;
                    line-height: 1.6; font-size: 15px; position: relative;
                    transition: transform 0.2s ease;
                    ${isUser ? `
                        align-self: flex-end; 
                        background: linear-gradient(135deg, #4f46e5, #7c3aed); 
                        color: #ffffff;
                        border-bottom-right-radius: 4px; 
                        box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.3);
                    ` : `
                        align-self: flex-start; 
                        background: #1e293b; 
                        color: #e2e8f0;
                        border-bottom-left-radius: 4px; 
                        border: 1px solid rgba(255,255,255,0.08);
                        box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.5);
                    `}
                    animation: message-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                `;
                
                if (!isUser) {
                    const avatar = document.createElement('div');
                    avatar.style.cssText = `
                        position: absolute; left: -42px; bottom: 0; width: 34px; height: 34px;
                        background: linear-gradient(135deg, #6366f1, #d946ef); border-radius: 12px;
                        display: flex; align-items: center; justify-content: center; color: white;
                        box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
                        border: 1px solid rgba(255,255,255,0.2);
                    `;
                    avatar.innerHTML = getIcon('sparkles', 'scraper-icon-sm');
                    msgDiv.appendChild(avatar);
                }

                const contentSpan = document.createElement('div');
                contentSpan.className = 'chat-msg-content';
                contentSpan.innerHTML = isUser ? text : formatMessage(text);
                
                // Render Math
                if (typeof renderMathInElement !== 'undefined') {
                    renderMathInElement(contentSpan, {
                        delimiters: [
                            {left: '$$', right: '$$', display: true},
                            {left: '$', right: '$', display: false},
                            {left: '\\(', right: '\\)', display: false},
                            {left: '\\[', right: '\\]', display: true}
                        ],
                        throwOnError: false
                    });
                }

                msgDiv.appendChild(contentSpan);

                const time = document.createElement('div');
                time.style.cssText = `
                    font-size: 10px; opacity: 0.5; margin-top: 8px; font-weight: 500;
                    display: flex; align-items: center; gap: 4px; justify-content: flex-end;
                    ${isUser ? 'color: rgba(255,255,255,0.9);' : 'color: #94a3b8;'}
                `;
                time.innerHTML = `${getIcon('clock', 'scraper-icon-xs')} ${new Date().toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}`;
                msgDiv.appendChild(time);

                contentArea.appendChild(msgDiv);
            }

            // Auto-scroll logic: only scroll if the user was already near the bottom
            if (isNearBottom || role === 'user') {
                contentArea.scrollTo({
                    top: contentArea.scrollHeight,
                    behavior: 'smooth'
                });
            }
        };

        const renderImagePreviews = () => {
            const container = document.getElementById('imagePreviewContainer');
            if (!container) return;

            if (imageMode === 'none' || allImages.length === 0) {
                container.style.display = 'none';
                return;
            }

            container.style.display = 'flex';
            container.innerHTML = '';
            
            allImages.forEach((img, index) => {
                const isSelected = selectedImageIndices.has(index);
                const thumb = document.createElement('div');
                thumb.style.cssText = `
                    min-width: 60px; height: 60px; border-radius: 8px; overflow: hidden;
                    border: 2px solid ${isSelected ? '#6366f1' : 'rgba(255,255,255,0.1)'};
                    cursor: pointer; position: relative; transition: all 0.2s;
                    opacity: ${isSelected ? '1' : '0.5'};
                `;
                
                const imgEl = document.createElement('img');
                imgEl.src = img.fullUrl;
                imgEl.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
                
                thumb.appendChild(imgEl);

                if (isSelected) {
                    const check = document.createElement('div');
                    check.style.cssText = `
                        position: absolute; top: 2px; right: 2px; width: 14px; height: 14px;
                        background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center;
                        color: white; font-size: 10px;
                    `;
                    check.innerHTML = getIcon('check', 'scraper-icon-xs');
                    thumb.appendChild(check);
                }

                thumb.onclick = () => {
                    if (imageMode === 'all') {
                        imageMode = 'custom';
                        updateImageModeUI();
                    }
                    if (selectedImageIndices.has(index)) {
                        selectedImageIndices.delete(index);
                    } else {
                        selectedImageIndices.add(index);
                    }
                    renderImagePreviews();
                };

                container.appendChild(thumb);
            });
        };

        const updateImageModeUI = () => {
            const btn = document.getElementById('imageModeBtn');
            const label = document.getElementById('imageModeLabel');
            if (!btn || !label) return;

            let iconName = 'image';
            let text = 'Tất cả ảnh';
            
            if (imageMode === 'none') {
                iconName = 'x';
                text = 'Không gửi ảnh';
            } else if (imageMode === 'custom') {
                iconName = 'check';
                text = `Chọn ${selectedImageIndices.size} ảnh`;
            }

            label.textContent = text;
            // Highlight button if images are active
            if (imageMode !== 'none') {
                btn.style.color = '#6366f1';
                btn.style.background = 'rgba(99, 102, 241, 0.1)';
            } else {
                btn.style.color = '#94a3b8';
                btn.style.background = 'transparent';
            }
        };

        overlay.innerHTML = `
            <style>
                @keyframes message-pop { from { opacity: 0; transform: translateY(15px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes modal-reveal { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes scraper-bounce { 0%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
                @keyframes scraper-glow { 0% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.2); } 50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); } 100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.2); } }
                .chat-scrollbar::-webkit-scrollbar { width: 5px; }
                .chat-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .chat-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; transition: 0.2s; }
                .chat-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
                .glass-panel { 
                    background: rgba(15, 23, 42, 0.9);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.1);
                    position: relative;
                }
                .glass-panel::before {
                    content: ""; position: absolute; inset: 0; border-radius: inherit;
                    padding: 1px; background: linear-gradient(to bottom right, rgba(255,255,255,0.15), transparent, rgba(255,255,255,0.05));
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
                }
            </style>
            <div class="glass-panel ol-bg" style="
                border-radius: 32px; width: 95%; max-width: 1000px; height: 85vh;
                display: flex; flex-direction: column;
                box-shadow: 0 40px 80px -20px var(--ol-shadow); overflow: hidden;
                animation: modal-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            ">
                <!-- Header -->
                <div class="ol-bg ol-border" style="
                    padding: 24px 32px; border-bottom-width: 1px; border-bottom-style: solid;
                    display: flex; justify-content: space-between; align-items: center;
                ">
                    <div style="display: flex; align-items: center; gap: 20px;">
                        <div class="ol-brand-bg ol-brand-text" style="
                            width: 50px; height: 50px;
                            border-radius: 16px; display: flex; align-items: center; justify-content: center;
                            animation: scraper-glow 3s infinite;
                        ">
                            ${getIcon('sparkles', 'scraper-icon-md')}
                        </div>
                        <div>
                            <h3 class="ol-text" style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Plus Jakarta Sans', sans-serif;">Gemini AI Assistant</h3>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981;"></div>
                                <span id="currentModelName" class="ol-text-sub" style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                    ${GEMINI_MODELS.find(m => m.id === getGeminiConfig().model)?.name || 'Unknown Model'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button id="geminiSettingsBtn" class="ol-surface ol-border ol-text-sub ol-btn-hover" style="
                            border-width: 1px; border-style: solid;
                            padding: 10px 18px; border-radius: 14px; cursor: pointer; display: flex; align-items: center; gap: 10px;
                            font-size: 14px; transition: all 0.3s; font-weight: 600;
                        ">
                            ${getIcon('settings', 'scraper-icon-sm')} Cấu hình
                        </button>
                        <button id="closeGeminiModal" class="ol-surface ol-border" style="
                            border-width: 1px; border-style: solid; color: #f87171;
                            width: 44px; height: 44px; border-radius: 14px; cursor: pointer;
                            display: flex; align-items: center; justify-content: center; transition: all 0.3s;
                        " onmouseover="this.style.background='rgba(239, 68, 68, 0.1)';this.style.transform='rotate(90deg)'" 
                           onmouseout="this.style.background='transparent';this.style.transform='rotate(0)'">
                            ${getIcon('x')}
                        </button>
                    </div>
                </div>
                
                <!-- Chat Area -->
                <div id="geminiContentArea" class="chat-scrollbar ol-surface" style="
                    flex: 1; overflow-y: auto; padding: 40px; 
                    display: flex; flex-direction: column; gap: 10px;
                ">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <span class="ol-bg ol-border ol-text-sub" style="padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-width: 1px; border-style: solid;">Phiên làm việc mới</span>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="ol-bg ol-border" style="
                    padding: 24px 40px; border-top-width: 1px; border-top-style: solid;
                    display: flex; flex-direction: column; gap: 12px;
                ">
                    <!-- Image Preview Strip -->
                    <div id="imagePreviewContainer" class="chat-scrollbar" style="
                        display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 4px;
                        ${allImages.length === 0 ? 'display: none;' : ''}
                    "></div>

                    <div class="ol-surface ol-border" style="
                        border-radius: 24px; padding: 10px; display: flex; gap: 12px;
                        transition: all 0.3s ease; box-shadow: 0 4px 20px var(--ol-shadow);
                        align-items: flex-end; border-width: 1.5px; border-style: solid;
                    " id="inputContainer">
                        
                        <!-- Image Control Button -->
                        ${allImages.length > 0 ? `
                        <div style="position: relative;">
                            <button id="imageModeBtn" class="ol-brand-bg ol-brand-text" style="
                                width: 44px; height: 44px; border: none; border-radius: 14px; cursor: pointer;
                                display: flex; align-items: center; justify-content: center; transition: all 0.2s;
                            " title="Tùy chọn ảnh">
                                ${getIcon('image')}
                            </button>
                            <div id="imageModeMenu" class="ol-surface ol-border" style="
                                position: absolute; bottom: 55px; left: 0; width: 180px;
                                border-width: 1px; border-style: solid;
                                border-radius: 16px; padding: 6px; box-shadow: 0 10px 30px var(--ol-shadow);
                                display: none; flex-direction: column; gap: 2px; z-index: 100;
                            ">
                                <div class="mode-item" data-mode="all" style="padding: 10px; border-radius: 8px; cursor: pointer; color: #e2e8f0; font-size: 13px; display: flex; align-items: center; gap: 8px;">
                                    ${getIcon('check')} Tất cả (${allImages.length})
                                </div>
                                <div class="mode-item" data-mode="none" style="padding: 10px; border-radius: 8px; cursor: pointer; color: #e2e8f0; font-size: 13px; display: flex; align-items: center; gap: 8px;">
                                    ${getIcon('x')} Không gửi ảnh
                                </div>
                                <div class="mode-item" data-mode="custom" style="padding: 10px; border-radius: 8px; cursor: pointer; color: #e2e8f0; font-size: 13px; display: flex; align-items: center; gap: 8px;">
                                    ${getIcon('image')} Chọn ảnh...
                                </div>
                            </div>
                        </div>
                        ` : ''}

                        <textarea id="geminiChatInput" placeholder="Nhập câu hỏi tại đây..." style="
                            flex: 1; background: transparent; border: none;
                            padding: 12px 10px; color: #f1f5f9; font-family: inherit;
                            font-size: 16px; resize: none; min-height: 24px; max-height: 180px;
                            outline: none; line-height: 1.6;
                        " onfocus="document.getElementById('inputContainer').style.borderColor='#6366f1';document.getElementById('inputContainer').style.boxShadow='0 0 0 4px rgba(99, 102, 241, 0.15)'"
                        onblur="document.getElementById('inputContainer').style.borderColor='rgba(255,255,255,0.08)';document.getElementById('inputContainer').style.boxShadow='0 4px 20px rgba(0, 0, 0, 0.2)'"></textarea>
                        
                        <div style="display: flex; gap: 8px; padding: 4px;">
                            <button id="clearChatBtn" title="Reset chat" style="
                                width: 48px; height: 48px; background: rgba(255,255,255,0.03); color: #94a3b8;
                                border: 1px solid rgba(255,255,255,0.05); border-radius: 18px; cursor: pointer;
                                display: flex; align-items: center; justify-content: center; transition: all 0.2s;
                            " onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.color='#f1f5f9'"
                            onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.color='#94a3b8'">
                                ${getIcon('refreshCw')}
                            </button>
                            <button id="sendChatMessage" style="
                                width: 48px; height: 48px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;
                                border: none; border-radius: 18px; cursor: pointer;
                                display: flex; align-items: center; justify-content: center; transition: all 0.3s;
                                box-shadow: 0 8px 15px rgba(99, 102, 241, 0.4);
                            " onmouseover="this.style.transform='scale(1.08) translateY(-2px)';this.style.boxShadow='0 12px 20px rgba(99, 102, 241, 0.5)'"
                            onmouseout="this.style.transform='scale(1) translateY(0)';this.style.boxShadow='0 8px 15px rgba(99, 102, 241, 0.4)'">
                                ${getIcon('send')}
                            </button>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 0 8px;">
                         <div id="imageModeLabel" style="font-size: 11px; color: #6366f1; font-weight: 600;">
                            ${allImages.length > 0 ? `Tất cả ảnh (${allImages.length})` : ''}
                         </div>
                        <div style="font-size: 11px; color: #475569; font-weight: 500;">
                            Sử dụng <span style="color: #64748b; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">Enter</span> để gửi • <span style="color: #64748b; background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">Shift + Enter</span> để xuống dòng
                        </div>
                    </div>
                </div>
            </div>
        `;

        setTimeout(() => overlay.style.opacity = '1', 50);
        document.body.appendChild(overlay);

        // Render existing chat history
        chatHistory.forEach(msg => {
            const text = msg.parts.find(p => p.text)?.text || "";
            if (text) appendMessage(msg.role, text);
        });

        // Image Mode Events
        if (allImages.length > 0) {
            const btn = document.getElementById('imageModeBtn');
            const menu = document.getElementById('imageModeMenu');
            
            btn.onclick = (e) => {
                e.stopPropagation();
                isImageMenuOpen = !isImageMenuOpen;
                menu.style.display = isImageMenuOpen ? 'flex' : 'none';
            };

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (isImageMenuOpen && !btn.contains(e.target) && !menu.contains(e.target)) {
                    isImageMenuOpen = false;
                    menu.style.display = 'none';
                }
            });

            // Menu item clicks
            document.querySelectorAll('.mode-item').forEach(item => {
                item.onclick = () => {
                    imageMode = item.dataset.mode;
                    if (imageMode === 'all') selectedImageIndices = new Set(allImages.map((_, i) => i));
                    if (imageMode === 'none') selectedImageIndices.clear();
                    
                    updateImageModeUI();
                    renderImagePreviews();
                    
                    isImageMenuOpen = false;
                    menu.style.display = 'none';
                };
                item.onmouseover = () => item.style.background = 'rgba(255,255,255,0.1)';
                item.onmouseout = () => item.style.background = 'transparent';
            });

            renderImagePreviews();
        }

        const handleSend = async () => {
            const input = document.getElementById('geminiChatInput');
            const text = input.value.trim();
            if (!text) return;

            const config = getGeminiConfig();
            if (!config.apiKey) {
                showGeminiSettingsModal();
                return;
            }

            input.value = '';
            input.style.height = 'auto';
            
            appendMessage('user', text);
            
            // Prepare message with images
            const userMessage = { role: 'user', parts: [{ text: text }] };
            let imagesToSend = [];

            if (imageMode !== 'none' && selectedImageIndices.size > 0) {
                const indices = Array.from(selectedImageIndices).sort((a, b) => a - b);
                
                // Show loading indicator for images
                const loadingMsg = document.createElement('div');
                loadingMsg.innerHTML = `<span style="font-size: 11px; color: #94a3b8; display: flex; align-items: center; justify-content: flex-end; gap: 4px;">${getIcon('refreshCw', 'scraper-icon-spin scraper-icon-xs')} Đang xử lý ${indices.length} ảnh...</span>`;
                loadingMsg.style.cssText = "padding: 0 40px; margin-bottom: 10px; text-align: right;";
                document.getElementById('geminiContentArea').appendChild(loadingMsg);

                for (const idx of indices) {
                    const imgData = await getImageData(allImages[idx]);
                    if (imgData) imagesToSend.push(imgData);
                }
                
                if (imagesToSend.length > 0) {
                    userMessage.parts.push(...imagesToSend);
                }
                loadingMsg.remove();
            }

            chatHistory.push(userMessage);
            appendMessage('model', '', true);
            
            try {
                const response = await callGeminiAPI(chatHistory, config.apiKey, config.model);
                chatHistory.push({ role: 'model', parts: [{ text: response }] });
                appendMessage('model', response);
            } catch (e) {
                appendMessage('model', `Lỗi: ${e.message}`);
            }
        };

        document.getElementById('sendChatMessage').onclick = handleSend;
        document.getElementById('geminiChatInput').onkeydown = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
        };

        const textarea = document.getElementById('geminiChatInput');
        textarea.oninput = function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        };

        document.getElementById('clearChatBtn').onclick = async () => {
            const confirmed = await showConfirmModal('Bắt đầu lại cuộc hội thoại mới?', 'Reset Chat');
            if (confirmed) {
                document.getElementById('geminiContentArea').innerHTML = `
                    <div style="text-align: center; margin-bottom: 40px;">
                        <span style="background: rgba(255,255,255,0.03); padding: 6px 16px; border-radius: 20px; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(255,255,255,0.05);">Phiên làm việc mới</span>
                    </div>
                `;
                chatHistory = [{ role: 'user', parts: [{ text: promptText }] }];
                handleSendOriginal();
            }
        };

        const handleSendOriginal = async () => {
            const config = getGeminiConfig();
            appendMessage('user', promptText);
            appendMessage('model', '', true);
            try {
                const response = await callGeminiAPI(chatHistory, config.apiKey, config.model);
                chatHistory.push({ role: 'model', parts: [{ text: response }] });
                appendMessage('model', response);
            } catch (e) {
                appendMessage('model', `Lỗi: ${e.message}`);
            }
        };

        document.getElementById('clearChatBtn').onclick = () => {
            if (confirm('Bạn có chắc chắn muốn xóa lịch sử trò chuyện không?')) {
                chatHistory = [];
                document.getElementById('geminiContentArea').innerHTML = `
                    <div style="text-align: center; margin-bottom: 40px;">
                        <span class="ol-bg ol-border ol-text-sub" style="padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border-width: 1px; border-style: solid;">Lịch sử đã xóa</span>
                    </div>
                `;
            }
        };

        const handleClose = () => {
             overlay.style.opacity = '0';
             overlay.style.transform = 'scale(1.02)';
             setTimeout(() => {
                overlay.remove();
                document.removeEventListener('keydown', handleEsc);
             }, 400);
        };

        const handleEsc = (e) => {
            if (e.key === 'Escape') handleClose();
        };

        document.addEventListener('keydown', handleEsc);
        document.getElementById('closeGeminiModal').onclick = handleClose;

        // Scroll to bottom button logic
        const contentArea = document.getElementById('geminiContentArea');
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'chatScrollBottomBtn';
        scrollBtn.style.cssText = `
            position: absolute; bottom: 100px; right: 40px; width: 44px; height: 44px;
            background: #6366f1; color: white; border: none; border-radius: 50%;
            display: none; align-items: center; justify-content: center; cursor: pointer;
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4); z-index: 10;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: scale(0.5); opacity: 0;
        `;
        scrollBtn.innerHTML = getIcon('chevronRight', 'scraper-icon-md scraper-icon-rotate-90');
        // Need to add rotation style to the chevron
        const extraStyles = document.createElement('style');
        extraStyles.textContent = `
            .scraper-icon-rotate-90 { transform: rotate(90deg); }
            #chatScrollBottomBtn.visible { transform: scale(1); opacity: 1; display: flex; }
            @keyframes skeleton-loading { 0% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
            .skeleton-box {
                background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s infinite;
                border-radius: 8px;
            }
        `;
        document.head.appendChild(extraStyles);
        overlay.querySelector('.glass-panel').appendChild(scrollBtn);

        contentArea.onscroll = () => {
            const isNearBottom = contentArea.scrollHeight - contentArea.scrollTop - contentArea.clientHeight < 200;
            if (isNearBottom) {
                scrollBtn.classList.remove('visible');
            } else {
                scrollBtn.classList.add('visible');
            }
        };

        scrollBtn.onclick = () => {
            contentArea.scrollTo({ top: contentArea.scrollHeight, behavior: 'smooth' });
        };

        document.getElementById('geminiSettingsBtn').onclick = async () => {
             const changed = await showGeminiSettingsModal();
             if (changed) {
                 const config = getGeminiConfig();
                 const modelName = GEMINI_MODELS.find(m => m.id === config.model)?.name || 'Unknown';
                 document.getElementById('currentModelName').textContent = modelName;
             }
        };
    }

    function showLightbox(src) {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
            background: 'rgba(0,0,0,0.95)', zIndex: '200000', display: 'flex',
            alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out',
            opacity: '0', transition: 'all 0.3s ease', backdropFilter: 'blur(10px)'
        });
        
        const img = document.createElement('img');
        img.src = src;
        Object.assign(img.style, {
            maxWidth: '90%', maxHeight: '90%', borderRadius: '12px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)', transform: 'scale(0.9)',
            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        overlay.appendChild(img);
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 50);
        
        overlay.onclick = () => {
            overlay.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            setTimeout(() => overlay.remove(), 300);
        };
    }

    // ============================================================ 
    // 🎨 RESULT DISPLAY UI - MODULAR DASHBOARD v2.0
    // ============================================================ 

    const parseMarkdownTable = (text) => {
      if (!text || !text.includes('|')) return text;
      
      const lines = text.split('\n');
      let result = [];
      let tableBuffer = [];
      let inTable = false;

      const renderHTMLTable = (tableLines) => {
        if (tableLines.length === 0) return '';
        
        // Find separator line |---| or |:---| etc
        let sepIdx = tableLines.findIndex(l => {
          const trimmed = l.trim();
          return trimmed.length > 2 && trimmed.match(/^[|\s-:]+$/) && trimmed.includes('-');
        });
        
        let headerRows = [];
        let bodyRows = [];
        
        if (sepIdx !== -1) {
          headerRows = tableLines.slice(0, sepIdx);
          bodyRows = tableLines.slice(sepIdx + 1);
        } else {
          // If no separator, check if the first row has at least 2 pipes, if so, treat all as body
          bodyRows = tableLines;
        }

        const parseRow = (row) => {
          let cells = row.split('|').map(c => c.trim());
          if (row.trim().startsWith('|')) cells.shift();
          if (row.trim().endsWith('|')) cells.pop();
          return cells;
        };

        const htmlHeader = headerRows.map(row => `<tr>${parseRow(row).map(c => `<th style="border: 1px solid var(--ol-border); padding: 10px 14px; background: var(--ol-surface); text-align: left; font-weight: 700; color: var(--ol-brand);">${c}</th>`).join('')}</tr>`).join('');
        const htmlBody = bodyRows.map(row => {
          const cells = parseRow(row);
          if (cells.length === 0 || (cells.length === 1 && !cells[0])) return '';
          return `<tr>${cells.map(c => `<td style="border: 1px solid var(--ol-border); padding: 10px 14px;">${c}</td>`).join('')}</tr>`;
        }).join('');

        if (!htmlHeader && !htmlBody) return tableLines.join('\n');

        return `<div class="ol-table-wrapper" style="overflow-x: auto; margin: 16px 0; border-radius: 12px; border: 1px solid var(--ol-border); box-shadow: 0 2px 8px var(--ol-shadow-sm);">
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; background: var(--ol-bg); color: var(--ol-text); min-width: 300px;">
            ${htmlHeader ? `<thead style="border-bottom: 2px solid var(--ol-border);">${htmlHeader}</thead>` : ''}
            <tbody>${htmlBody}</tbody>
          </table>
        </div>`;
      };

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        const pipeCount = (trimmed.match(/\|/g) || []).length;
        // A row is part of a table if it has at least 2 pipes, 
        // or if it has 1 pipe and starts/ends with it.
        const isTable = pipeCount >= 2 || (pipeCount === 1 && (trimmed.startsWith('|') || trimmed.endsWith('|')));

        if (isTable) {
          inTable = true;
          tableBuffer.push(line);
        } else {
          if (inTable) {
            result.push(renderHTMLTable(tableBuffer));
            tableBuffer = [];
            inTable = false;
          }
          result.push(line);
        }
      }
      
      if (inTable) {
        result.push(renderHTMLTable(tableBuffer));
      }

      return result.join('\n');
    };

    function showResultsUI() {
      const elapsedTotal = Math.floor((Date.now() - startTime) / 1000);
      const minsTotal = Math.floor(elapsedTotal / 60);
      const secsTotal = elapsedTotal % 60;

      const resultContainer = document.createElement('div');
      resultContainer.className = 'ol-bg';
      if (localStorage.getItem('ol_theme') === 'dark') resultContainer.classList.add('scraper-dark');

      const themeOverlay = document.createElement('div');
      themeOverlay.className = 'ol-theme-overlay';
      resultContainer.appendChild(themeOverlay);

      Object.assign(resultContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '9999',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', -apple-system, sans-serif",
        animation: 'scraper-fade-in 0.4s ease'
      });

      const modeLabel = currentMode === 'homework' ? 'BÀI TẬP' : 'BÀI THI';
      const modeIcon = currentMode === 'homework' ? getIcon('book', 'scraper-icon-md') : getIcon('fileText', 'scraper-icon-md');

      // Helper: Render Question Card
      const renderQuestionCard = (q, index) => {
        const isExam = currentMode === 'exam';
        const qNum = isExam ? q.number : (index + 1);
        const qId = isExam ? `q-exam-${qNum}` : `q-hw-${q.id}`;
        
        let typeBadge = '';
        const typeNames = { 'multiple-choice': 'Trắc nghiệm', 'true-false': 'Đúng sai', 'fill-blank': 'Trả lời ngắn' };
        const displayType = typeNames[q.type] || (isExam ? q.type : 'Câu hỏi');
        
        // Badge color based on type
        let badgeColorClass = 'ol-brand-bg ol-brand-text';
        if (q.type === 'true-false') badgeColorClass = 'ol-warning-bg ol-warning-text';
        if (q.type === 'fill-blank') badgeColorClass = 'ol-success-bg ol-success-text';

        typeBadge = `<span class="ol-badge ${badgeColorClass}" style="margin-left: 12px; border: 1px solid currentColor;">${displayType}</span>`;

        let rawText = q.text || '';
        let questionContent = '';
        let parsedChoices = [];

        if (!isExam) {
            // Clean ASCII artifacts but preserve table pipes
            rawText = rawText.replace(/╔═+╗|║|╚═+╝|═+|─{4,}|-{4,}|───────────────────────────────/g, '').trim();
            
            // Try to extract choices if present in text
            if (rawText.includes('Lựa chọn:')) {
                const parts = rawText.split('Lựa chọn:');
                questionContent = parts[0].trim();
                const choicesPart = parts[1];
                const lines = choicesPart.split('\n');
                lines.forEach(line => {
                    // Match A. Content, A) Content, or just A Content
                    const match = line.trim().match(/^([A-D]|[a-d])[\s.)]+(.*)/);
                    if (match) {
                        parsedChoices.push({ 
                          key: match[1].toUpperCase(), 
                          text: match[2].replace(/\*+/g, '').trim() 
                        });
                    }
                });
            } else {
                questionContent = rawText;
            }
        }

        const renderFormattedContent = (text) => {
          if (!text) return '';
          let formatted = escapeHTML(text);
          
          // Apply basic markdown formatting (Bold, Italic)
          formatted = formatted
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

          // Only apply parseMarkdownTable if it looks like a table
          if (formatted.includes('|')) {
            return parseMarkdownTable(formatted);
          }
          return formatted;
        };

        // RENDER OPTIONS based on Type
        let optionsHTML = '';

        // 1. EXAM MODE OPTIONS
        if (isExam) {
            if (q.type === 'multiple-choice') {
                optionsHTML = `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 16px;">
                    ${Object.entries(q.data.answers).map(([k, v]) => `
                      <div class="ol-surface ol-border ol-btn-hover" style="padding: 14px 20px; border-radius: 24px; font-size: 14px; display: flex; gap: 12px; border-width: 1px; border-style: solid; cursor: default; align-items: center; transition: all 0.2s;">
                        <span style="font-weight: 800; color: var(--ol-brand); background: var(--ol-brand-bg); width: 28px; height: 28px; border-radius: 99px; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 2px 5px var(--ol-shadow); flex-shrink: 0;">${escapeHTML(k)}</span>
                        <span class="ol-text" style="font-weight: 500;">${renderFormattedContent(v)}</span>
                      </div>
                    `).join('')}
                  </div>`;
            } else if (q.type === 'true-false') {
                optionsHTML = `
                  <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
                    ${q.data.items.map(item => `
                      <div class="ol-surface ol-border ol-btn-hover" style="padding: 14px 20px; border-radius: 24px; font-size: 14px; display: flex; gap: 16px; border-width: 1px; border-style: solid; align-items: flex-start;">
                        <span style="font-weight: 800; color: var(--ol-warning); background: var(--ol-warning-bg); min-width: 30px; height: 30px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; margin-top: 2px;">${escapeHTML(item.label)}</span>
                        <span class="ol-text" style="font-weight: 500; line-height: 1.5;">${escapeHTML(item.statement)}</span>
                      </div>
                    `).join('')}
                  </div>`;
            } else if (q.type === 'fill-blank') {
                 optionsHTML = `
                    <div style="margin-top: 16px; padding: 20px; border-radius: 24px; background: var(--ol-surface); border: 1.5px dashed var(--ol-border); color: var(--ol-text-sub); font-size: 13px; font-style: italic; text-align: center;">
                        ${getIcon('pencil', 'scraper-icon-sm')} Câu hỏi tự luận / điền khuyết (Không có lựa chọn)
                    </div>
                 `;
            }
        } 
        // 2. HOMEWORK MODE OPTIONS (Parsed)
        else {
            if (parsedChoices.length > 0) {
                if (q.type === 'true-false') {
                    // Vertical Layout for True/False
                    optionsHTML = `
                      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
                        ${parsedChoices.map(choice => `
                          <div class="ol-surface ol-border ol-btn-hover" style="padding: 14px 20px; border-radius: 24px; font-size: 14px; display: flex; gap: 16px; border-width: 1px; border-style: solid; align-items: flex-start;">
                            <span style="font-weight: 800; color: var(--ol-warning); background: var(--ol-warning-bg); min-width: 30px; height: 30px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px; margin-top: 2px;">${escapeHTML(choice.key)}</span>
                            <span class="ol-text" style="font-weight: 500; line-height: 1.5;">${renderFormattedContent(choice.text)}</span>
                          </div>
                        `).join('')}
                      </div>`;
                } else if (q.type === 'multiple-choice') {
                    // Grid Layout for Multiple Choice
                    optionsHTML = `
                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; margin-top: 16px;">
                        ${parsedChoices.map(choice => `
                          <div class="ol-surface ol-border ol-btn-hover" style="padding: 14px 20px; border-radius: 24px; font-size: 14px; display: flex; gap: 12px; border-width: 1px; border-style: solid; cursor: default; align-items: center; transition: all 0.2s;">
                            <span style="font-weight: 800; color: var(--ol-brand); background: var(--ol-brand-bg); width: 28px; height: 28px; border-radius: 99px; display: flex; align-items: center; justify-content: center; font-size: 12px; box-shadow: 0 2px 5px var(--ol-shadow); flex-shrink: 0;">${escapeHTML(choice.key)}</span>
                            <span class="ol-text" style="font-weight: 500;">${renderFormattedContent(choice.text)}</span>
                          </div>
                        `).join('')}
                      </div>`;
                } else {
                    // Fallback for unknown type but has choices
                     optionsHTML = `
                      <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 16px;">
                        ${parsedChoices.map(choice => `
                          <div class="ol-surface ol-border" style="padding: 12px 16px; border-radius: 20px; font-size: 14px; display: flex; gap: 10px; border-width: 1px; border-style: solid;">
                            <span style="font-weight: 700;">${escapeHTML(choice.key)}.</span>
                            <span>${renderFormattedContent(choice.text)}</span>
                          </div>
                        `).join('')}
                      </div>`;
                }
            } else if (q.type === 'fill-blank') {
                 optionsHTML = `
                    <div style="margin-top: 16px; padding: 20px; border-radius: 24px; background: var(--ol-surface); border: 1.5px dashed var(--ol-border); color: var(--ol-text-sub); font-size: 13px; font-style: italic; text-align: center;">
                        ${getIcon('pencil', 'scraper-icon-sm')} Câu hỏi tự luận / điền khuyết
                    </div>
                 `;
            }
        }

        // Determine classification class
        let classificationClass = 'q-card-multiple-choice';
        if (q.type === 'true-false') classificationClass = 'q-card-true-false';
        if (q.type === 'fill-blank') classificationClass = 'q-card-fill-blank';

        return `
          <div class="ol-card q-card ${classificationClass}" id="${qId}" style="margin-bottom: 32px; scroll-margin-top: 100px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--ol-border);">
              <div style="display: flex; align-items: center;">
                <div class="ol-brand-bg ol-brand-text" style="width: 36px; height: 36px; border-radius: 99px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px; box-shadow: 0 4px 12px var(--ol-shadow);">
                  ${qNum}
                </div>
                <div style="margin-left: 16px;">
                  <div class="ol-text" style="font-weight: 700; font-size: 15px; display: flex; align-items: center; letter-spacing: -0.01em;">
                    Câu hỏi ${isExam && q.score ? `<span style="color: var(--ol-text-sub); font-weight: 500; font-size: 12px; margin-left: 8px;">(${q.score}đ)</span>` : ''}
                    ${typeBadge}
                  </div>
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <button class="ask-ai-btn ol-brand-bg ol-brand-text ol-btn-hover" data-index="${index}" title="Hỏi Gemini về câu này" style="border:none; cursor:pointer; padding:6px 14px; border-radius:99px; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 12px;">
                  ${getIcon('sparkles', 'scraper-icon-xs')} AI
                </button>
                <button class="copy-q-btn ol-surface ol-border ol-text-sub ol-btn-hover" data-index="${index}" style="background:transparent; border-width: 1px; border-style: solid; cursor:pointer; padding:8px; border-radius:99px;">${getIcon('copy', 'scraper-icon-sm')}</button>
              </div>
            </div>
            
            <div class="ol-text q-content-area" style="font-size: 16px; line-height: 1.7; margin-bottom: 24px; white-space: pre-wrap; overflow-wrap: break-word; word-break: break-word;">${isExam ? 
                (q.title ? `<div style="font-weight: 800; color: var(--ol-brand); margin-bottom: 12px; font-size: 18px; letter-spacing: -0.01em;">${escapeHTML(q.title)}</div>` : '') + 
                `<div style="opacity: 0.95;">${renderFormattedContent(q.content)}</div>` : 
                renderFormattedContent(questionContent)}</div>

            ${optionsHTML}

            ${q.images && q.images.length > 0 ? `
              <div style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; padding-top: 20px; border-top: 1px dashed var(--ol-border);">
                ${q.images.map((img, i) => `
                  <div class="ol-border ol-btn-hover" style="width: 100px; height: 75px; border-radius: 16px; overflow: hidden; cursor: pointer; border-width: 1px; border-style: solid;" onclick="createImageLightbox(allImages, allImages.findIndex(ai => ai.fullUrl === '${img.fullUrl}'))">
                    <img src="${img.fullUrl}" style="width: 100%; height: 100%; object-fit: cover;">
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `;
      };

      resultContainer.innerHTML = `
        <style>
          .ol-btn-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 12px var(--ol-shadow); opacity: 0.9; }
          .ol-btn-hover:active { transform: translateY(0); }
          .nav-q-btn { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); border: 1.5px solid var(--ol-border) !important; }
          .nav-q-btn:hover { background: var(--ol-brand-bg) !important; color: var(--ol-brand) !important; border-color: var(--ol-brand) !important; transform: translateY(-2px); box-shadow: 0 4px 12px var(--ol-shadow); }
          .nav-q-btn.active { background: var(--ol-brand) !important; color: white !important; border-color: var(--ol-brand) !important; }
          .q-card { transition: all 0.3s ease; border: 1px solid var(--ol-border); }
          .q-card:hover { border-color: var(--ol-brand); box-shadow: 0 10px 30px -10px var(--ol-shadow); }
          .floating-ai-btn {
            position: absolute; bottom: 40px; right: 40px; width: 64px; height: 64px;
            border-radius: 20px; background: linear-gradient(135deg, #6366f1, #d946ef);
            color: white; display: flex; align-items: center; justify-content: center;
            cursor: pointer; box-shadow: 0 15px 35px -5px rgba(99, 102, 241, 0.5);
            z-index: 1000; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .floating-ai-btn:hover { transform: scale(1.1) rotate(5deg); box-shadow: 0 20px 45px -5px rgba(99, 102, 241, 0.6); }
          .floating-ai-btn:active { transform: scale(0.95); }
        </style>
        <!-- Navbar -->
        <div class="ol-bg ol-border" style="padding: 16px 32px; border-bottom-width: 1px; border-bottom-style: solid; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div class="ol-brand-bg ol-brand-text" style="width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              ${getIcon('rocket', 'scraper-icon-md')}
            </div>
            <div>
              <h2 class="ol-text" style="margin: 0; font-size: 18px; font-weight: 800; letter-spacing: -0.5px;">Dashboard Kết Quả</h2>
              <div style="display: flex; align-items: center; gap: 8px; margin-top: 2px;">
                <span class="ol-badge ol-brand-bg ol-brand-text" style="font-size: 9px; padding: 2px 8px;">${modeLabel}</span>
                <span class="ol-text-sub" style="font-size: 12px; font-family: monospace;">${minsTotal}m ${secsTotal}s</span>
              </div>
            </div>
          </div>
          
          <div style="display: flex; align-items: center; gap: 12px; flex: 1; max-width: 400px; margin: 0 40px;">
            <div style="position: relative; width: 100%;">
              <div style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--ol-text-sub);">
                ${getIcon('search', 'scraper-icon-xs')}
              </div>
              <input type="text" id="dashboardSearch" class="ol-input" placeholder="Tìm kiếm câu hỏi..." style="width: 100%; padding-left: 40px;">
            </div>
          </div>

          <div style="display: flex; gap: 10px;">
            <button id="resultThemeBtn" class="ol-surface ol-border ol-text ol-btn-hover" style="width: 40px; height: 40px; border-radius: 16px; border-width: 1px; border-style: solid; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                ${localStorage.getItem('ol_theme') === 'dark' ? getIcon('sun', 'scraper-icon-sm') : getIcon('moon', 'scraper-icon-sm')}
            </button>
            <button id="closeResultBtn" class="ol-danger-bg ol-danger-text ol-btn-hover" style="width: 40px; height: 40px; border-radius: 16px; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                ${getIcon('x', 'scraper-icon-sm')}
            </button>
          </div>
        </div>

        <div style="display: flex; flex: 1; overflow: hidden;">
          <!-- Sidebar -->
          <div class="ol-surface ol-border" style="width: 280px; border-right-width: 1px; border-right-style: solid; display: flex; flex-direction: column;">
            <div style="padding: 24px; border-bottom: 1px solid var(--ol-border);">
              <h3 class="ol-text-sub" style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">Thống kê nhanh</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <div class="ol-bg ol-border" style="padding: 12px; border-radius: 18px; text-align: center; border-width: 1px; border-style: solid;">
                  <div class="ol-brand-text" style="font-size: 20px; font-weight: 800;">${questionCount}</div>
                  <div class="ol-text-sub" style="font-size: 10px; font-weight: 600;">CÂU HỎI</div>
                </div>
                <div class="ol-bg ol-border" style="padding: 12px; border-radius: 18px; text-align: center; border-width: 1px; border-style: solid;">
                  <div class="ol-success-text" style="font-size: 20px; font-weight: 800;">${allImages.length}</div>
                  <div class="ol-text-sub" style="font-size: 10px; font-weight: 600;">HÌNH ẢNH</div>
                </div>
              </div>
            </div>
            
            <div style="flex: 1; overflow-y: auto; padding: 20px;" class="scraper-scrollbar" id="questionNavList">
              <h3 class="ol-text-sub" style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Danh sách câu</h3>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
                ${allQuestions.map((q, i) => {
                    const id = currentMode === 'exam' ? q.number : q.id;
                    const targetId = currentMode === 'exam' ? `q-exam-${q.number}` : `q-hw-${q.id}`;
                    return `<button class="nav-q-btn ol-bg ol-border ol-text ol-btn-hover" data-target="${targetId}" style="height: 44px; border-radius: 14px; border-width: 1px; border-style: solid; font-weight: 700; font-size: 13px; cursor: pointer;">${currentMode === 'exam' ? q.number : (i + 1)}</button>`;
                }).join('')}
              </div>
            </div>

            <div style="padding: 20px; border-top: 1px solid var(--ol-border); display: flex; flex-direction: column; gap: 8px;">
              <button id="copyAllBtn" class="ol-surface ol-border ol-text ol-btn-hover" style="width: 100%; border-width: 1px; border-style: solid; padding: 12px; border-radius: 16px; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${getIcon('copy', 'scraper-icon-xs')} Copy Dữ Liệu Gốc
              </button>
              <button id="copyAIBtn" class="ol-btn-primary ol-brand-bg ol-brand-text" style="width: 100%; border: none; padding: 12px; border-radius: 16px; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${getIcon('sparkles', 'scraper-icon-xs')} Copy Kết Quả Cho AI
              </button>
              <button id="downloadBtn" class="ol-surface ol-border ol-text ol-btn-hover" style="width: 100%; border-width: 1px; border-style: solid; padding: 12px; border-radius: 16px; font-weight: 700; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${getIcon('download', 'scraper-icon-xs')} Tải File (.txt)
              </button>
            </div>
          </div>

          <!-- Main Content -->
          <div style="flex: 1; overflow-y: auto; padding: 40px; background: var(--ol-bg);" class="scraper-scrollbar" id="dashboardContent">
            
            <!-- Welcome/Summary Section -->
            <div class="ol-brand-bg" style="border-radius: 24px; padding: 32px; margin-bottom: 40px; border: 1px solid var(--ol-brand-bg); position: relative; overflow: hidden;">
              <div style="position: relative; z-index: 1;">
                <h1 class="ol-brand-text" style="font-size: 32px; font-weight: 800; margin: 0 0 8px 0; display: flex; align-items: center; gap: 12px;">
                  Thu thập ${modeLabel} hoàn tất!
                  <span style="display: inline-flex; width: auto; font-size: 28px; filter: drop-shadow(0 2px 8px var(--ol-shadow)); transform: translateY(2px);">
                    ${ICONS['celebrationLine']}
                  </span>
                </h1>
                <p class="ol-text" style="font-size: 15px; margin: 0; opacity: 0.8; max-width: 600px;">
                  Dữ liệu từ <b>${questionCount} câu hỏi</b> đã được trích xuất thành công. Bạn có thể xem chi tiết bên dưới hoặc gửi cho Gemini AI để nhận giải đáp ngay lập tức.
                </p>
                <div style="display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap;">
                  <button id="sendGeminiBtn" class="ol-brand-bg ol-brand-text" style="border: 2px solid var(--ol-brand); padding: 12px 24px; border-radius: 18px; font-weight: 800; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: all 0.2s;">
                    ${getIcon('sparkles', 'scraper-icon-md')} GỬI CHO GEMINI AI
                  </button>
                  ${chatHistory.length > 0 ? `
                  <button id="reopenChatBtn" class="ol-surface ol-border ol-text" style="border: 1px solid var(--ol-border); padding: 12px 24px; border-radius: 18px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    ${getIcon('refreshCw', 'scraper-icon-sm')} MỞ LẠI CHAT
                  </button>
                  ` : ''}
                  <button id="viewAIPromptBtn" class="ol-surface ol-border ol-text" style="border: 1px solid var(--ol-border); padding: 12px 24px; border-radius: 18px; font-weight: 700; display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    ${getIcon('eye', 'scraper-icon-sm')} XEM NỘI DUNG AI
                  </button>
                  <label class="ol-surface ol-border" style="display: flex; align-items: center; gap: 8px; padding: 0 16px; border-radius: 18px; border-width: 1px; border-style: solid; cursor: pointer; user-select: none;">
                    <input type="checkbox" id="sendWithImagesCb" checked style="width: 18px; height: 18px; accent-color: var(--ol-brand);">
                    <span class="ol-text" style="font-size: 13px; font-weight: 600;">Gửi kèm ảnh</span>
                  </label>
                </div>
              </div>
              <div style="position: absolute; right: -20px; top: -20px; opacity: 0.1; transform: rotate(-15deg);">
                ${getIcon('brain', 'scraper-icon-xl')}
              </div>
            </div>

            <!-- Question Cards Container -->
            <div id="questionsContainer">
              ${allQuestions.map((q, i) => renderQuestionCard(q, i)).join('')}
            </div>

            <!-- Gallery Section -->
            ${allImages.length > 0 ? `
              <div style="margin-top: 60px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                  <h2 class="ol-text" style="font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 12px;">
                    ${getIcon('image', 'scraper-icon-md')} Thư viện Hình ảnh
                  </h2>
                  <span class="ol-badge ol-brand-bg ol-brand-text">${allImages.length} ảnh</span>
                </div>
                <div class="scraper-image-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px;">
                  ${allImages.map((img, i) => `
                    <div class="ol-card scraper-image-card" data-img-index="${i}" style="padding: 8px; cursor: pointer;">
                      <div style="height: 100px; border-radius: 10px; overflow: hidden; margin-bottom: 8px;">
                        <img src="${img.fullUrl}" style="width: 100%; height: 100%; object-fit: cover;">
                      </div>
                      <div class="ol-text-sub" style="font-size: 11px; font-weight: 700; text-align: center;">CÂU ${img.question}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Footer -->
            <div style="margin-top: 80px; padding-top: 40px; border-top: 1px solid var(--ol-border); text-align: center; color: var(--ol-text-sub);">
              <div style="margin-bottom: 12px;">
                <a href="https://github.com/Trongdepzai-dev/onluyen-scraper-extension" target="_blank" class="ol-footer-link">
                  ${getIcon('github', 'scraper-icon-xs')} Open Source on GitHub
                </a>
              </div>
              <div style="font-size: 12px; opacity: 0.6;">
                Auto Scraper v${chrome.runtime.getManifest().version} • ${new Date().toLocaleDateString('vi-VN')}
              </div>
            </div>

            <!-- Floating Action Button -->
            <div id="floatingAI" class="floating-ai-btn" title="Hỏi Gemini nhanh">
              ${getIcon('brain', 'scraper-icon-md')}
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(resultContainer);

      // --- LOGIC: Search ---
      const searchInput = document.getElementById('dashboardSearch');
      const questionsContainer = document.getElementById('questionsContainer');
      const qCards = questionsContainer.querySelectorAll('.q-card');

      searchInput.oninput = (e) => {
        const val = e.target.value.toLowerCase();
        qCards.forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(val) ? 'block' : 'none';
        });
      };

      // --- LOGIC: Sidebar Nav ---
      document.querySelectorAll('.nav-q-btn').forEach(btn => {
        btn.onclick = () => {
          const targetId = btn.dataset.target;
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            // Highlight target
            targetEl.style.borderColor = 'var(--ol-brand)';
            targetEl.style.boxShadow = '0 0 0 4px var(--ol-brand-bg)';
            setTimeout(() => {
              targetEl.style.borderColor = '';
              targetEl.style.boxShadow = '';
            }, 2000);
          }
        };
      });

      // --- LOGIC: Ask AI Single Question ---
      document.querySelectorAll('.ask-ai-btn').forEach(btn => {
        btn.onclick = async () => {
          const config = getGeminiConfig();
          if (!config.apiKey) {
              showGeminiSettingsModal();
              return;
          }

          const idx = parseInt(btn.dataset.index);
          const q = allQuestions[idx];
          const displayNum = currentMode === 'exam' ? q.number : (idx + 1);
          const promptText = formatSingleQuestionAI(q, displayNum);
          
          // Optimization: If there are images for this question, we should include them
          let promptData = promptText;
          if (q.images && q.images.length > 0) {
              const imageParts = [];
              for (const img of q.images) {
                  const data = await getImageData(img);
                  if (data) imageParts.push(data);
              }
              if (imageParts.length > 0) {
                  promptData = { role: 'user', parts: [{ text: promptText }, ...imageParts] };
              }
          }

          // Open Gemini modal with this specific prompt
          // We clear chatHistory to focus only on this question
          chatHistory = []; 
          const response = await callGeminiAPI(typeof promptData === 'object' ? [promptData] : promptData, config.apiKey, config.model);
          showGeminiResponseModal(response, promptData);
        };
      });

      // --- LOGIC: Copy Single Question ---
      document.querySelectorAll('.copy-q-btn').forEach(btn => {
        btn.onclick = async () => {
          const idx = parseInt(btn.dataset.index);
          const q = allQuestions[idx];
          const text = currentMode === 'exam' ? `Câu ${q.number}: ${q.content}` : q.text;
          try {
            await navigator.clipboard.writeText(text);
            btn.innerHTML = getIcon('check', 'scraper-icon-sm');
            btn.style.color = 'var(--ol-success)';
            setTimeout(() => {
              btn.innerHTML = getIcon('copy', 'scraper-icon-sm');
              btn.style.color = '';
            }, 2000);
          } catch(e) {}
        };
      });

      // --- LOGIC: General Buttons ---
      document.getElementById('copyAllBtn').onclick = async () => {
        const btn = document.getElementById('copyAllBtn');
        try {
          await navigator.clipboard.writeText(allResults);
          const original = btn.innerHTML;
          btn.innerHTML = `${getIcon('check', 'scraper-icon-xs')}<span>Đã Copy Gốc!</span>`;
          btn.style.borderColor = 'var(--ol-success)';
          setTimeout(() => {
            btn.innerHTML = original;
            btn.style.borderColor = '';
          }, 2000);
        } catch (err) {}
      };

      document.getElementById('copyAIBtn').onclick = async () => {
        const btn = document.getElementById('copyAIBtn');
        try {
          await navigator.clipboard.writeText(allResultsAI);
          const original = btn.innerHTML;
          btn.innerHTML = `${getIcon('check', 'scraper-icon-xs')}<span>Đã Copy Cho AI!</span>`;
          setTimeout(() => btn.innerHTML = original, 2000);
        } catch (err) {}
      };

      document.getElementById('downloadBtn').onclick = () => {
        const content = allResults;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `onluyen_scrape_${new Date().toISOString().slice(0,10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
      };

      if (document.getElementById('reopenChatBtn')) {
          document.getElementById('reopenChatBtn').onclick = () => {
              showGeminiResponseModal();
          };
      }

      document.getElementById('viewAIPromptBtn').onclick = () => {
          showAIPromptModal(allResultsAI);
      };

      document.getElementById('sendGeminiBtn').onclick = async () => {
        const config = getGeminiConfig();
        if (!config.apiKey) {
            showGeminiSettingsModal();
            return;
        }

        const btn = document.getElementById('sendGeminiBtn');
        const originalContent = btn.innerHTML;
        const sendImages = document.getElementById('sendWithImagesCb')?.checked;

        btn.innerHTML = `${getIcon('loader', 'scraper-icon-spin')}<span>Đang gửi...</span>`;
        btn.disabled = true;

        try {
            const textContent = isAIMode ? allResultsAI : allResults;
            let finalPrompt = textContent;

            if (sendImages && allImages.length > 0) {
                 const imageParts = [];
                 for (const img of allImages) {
                     const data = await getImageData(img);
                     if (data) imageParts.push(data);
                 }
                 if (imageParts.length > 0) {
                     finalPrompt = { role: 'user', parts: [{ text: textContent }, ...imageParts] };
                 }
            }

            const response = await callGeminiAPI(typeof finalPrompt === 'object' ? [finalPrompt] : finalPrompt, config.apiKey, config.model);
            showGeminiResponseModal(response, finalPrompt);
        } catch (error) {
            showToast('Lỗi Gemini: ' + error.message, 'error');
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
      };

      document.getElementById('resultThemeBtn').onclick = (e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;
          
          const isNextDark = !resultContainer.classList.contains('scraper-dark');
          const nextBg = isNextDark ? '#0f172a' : '#ffffff';
          
          themeOverlay.style.setProperty('--clip-x', `${x}px`);
          themeOverlay.style.setProperty('--clip-y', `${y}px`);
          themeOverlay.style.background = nextBg;
          
          themeOverlay.classList.add('active');
          
          setTimeout(() => {
              resultContainer.classList.toggle('scraper-dark');
              localStorage.setItem('ol_theme', isNextDark ? 'dark' : 'light');
              document.getElementById('resultThemeBtn').innerHTML = isNextDark ? getIcon('sun', 'scraper-icon-sm') : getIcon('moon', 'scraper-icon-sm');
          }, 400); // Toggle theme halfway through animation

          themeOverlay.ontransitionend = () => {
              themeOverlay.classList.remove('active');
          };
      };

      document.getElementById('closeResultBtn').onclick = () => {
        resultContainer.remove();
        window.hasRunScraper = false;
      };

      document.getElementById('floatingAI').onclick = () => {
          if (chatHistory.length > 0) {
              showGeminiResponseModal();
          } else {
              const btn = document.getElementById('sendGeminiBtn');
              if (btn) btn.click();
          }
      };

      // Image Gallery Lightbox
      resultContainer.querySelectorAll('.scraper-image-card').forEach(card => {
        card.onclick = () => {
          const index = parseInt(card.dataset.imgIndex);
          createImageLightbox(allImages, index);
        };
      });
    }


    function showAIPromptModal(content) {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
            background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(10px)',
            zIndex: '100003', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', sans-serif", animation: 'scraper-fade-in 0.3s ease'
        });

        overlay.innerHTML = `
            <div style="background: var(--ol-bg); border: 1px solid var(--ol-border); border-radius: 24px; width: 800px; max-width: 90vw; height: 80vh; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                <div style="padding: 24px; border-bottom: 1px solid var(--ol-border); display: flex; justify-content: space-between; align-items: center;">
                    <h2 class="ol-text" style="margin: 0; font-size: 20px; font-weight: 800; display: flex; align-items: center; gap: 12px;">
                        ${getIcon('eye', 'scraper-icon-md')} Xem nội dung gửi cho AI
                    </h2>
                    <button id="closeAIPromptBtn" class="ol-surface ol-text" style="background: transparent; border: none; cursor: pointer; padding: 8px;">
                        ${getIcon('x', 'scraper-icon-sm')}
                    </button>
                </div>
                <div style="flex: 1; padding: 32px; overflow-y: auto; min-height: 0;" class="scraper-scrollbar">
                    <pre class="ol-text" style="white-space: pre-wrap; word-break: break-word; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 13px; line-height: 1.7; margin: 0; opacity: 0.9;">${escapeHTML(content)}</pre>
                </div>
                <div style="padding: 20px; border-top: 1px solid var(--ol-border); display: flex; justify-content: flex-end; gap: 12px; background: var(--ol-surface);">
                    <button id="copyAIPromptModalBtn" class="ol-brand-bg ol-brand-text" style="border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        ${getIcon('copy', 'scraper-icon-xs')} Copy nội dung
                    </button>
                    <button id="closeAIPromptBtn2" class="ol-surface ol-border ol-text" style="border-width: 1px; border-style: solid; padding: 10px 20px; border-radius: 10px; font-weight: 700; cursor: pointer;">
                        Đóng
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        const close = () => overlay.remove();
        document.getElementById('closeAIPromptBtn').onclick = close;
        document.getElementById('closeAIPromptBtn2').onclick = close;
        document.getElementById('copyAIPromptModalBtn').onclick = async () => {
            await navigator.clipboard.writeText(content);
            const btn = document.getElementById('copyAIPromptModalBtn');
            const original = btn.innerHTML;
            btn.innerHTML = `${getIcon('check', 'scraper-icon-xs')} Đã Copy!`;
            setTimeout(() => btn.innerHTML = original, 2000);
        };
    }

    function showFeedbackModal() {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
            background: 'rgba(2, 6, 23, 0.7)', backdropFilter: 'blur(8px)',
            zIndex: '100005', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', sans-serif", animation: 'scraper-fade-in 0.3s ease'
        });

        overlay.innerHTML = `
            <div style="
                background: #ffffff; border-radius: 20px; padding: 24px; width: 400px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                border: 1px solid #f3f4f6;
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <div style="
                            width: 40px; height: 40px; background: #e0e7ff; 
                            border-radius: 12px; display: flex; alignItems: center; justifyContent: center;
                            color: #4f46e5;
                        ">${getIcon('messageSquare', 'scraper-icon-md')}</div>
                        <div>
                            <h2 style="margin: 0; font-size: 18px; font-weight: 700; color: #111827;">Góp ý / Báo lỗi</h2>
                            <p style="margin: 2px 0 0; font-size: 13px; color: #6b7280;">Chúng tôi luôn lắng nghe bạn</p>
                        </div>
                    </div>
                    <button id="closeFeedbackBtn" style="
                        background: transparent; border: none; color: #9ca3af; cursor: pointer;
                        padding: 8px; border-radius: 8px; transition: all 0.2s;
                    " onmouseover="this.style.background='#f3f4f6';this.style.color='#4b5563'" 
                      onmouseout="this.style.background='transparent';this.style.color='#9ca3af'">
                        ${getIcon('x', 'scraper-icon-sm')}
                    </button>
                </div>

                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #374151;">Loại phản hồi</label>
                    <div style="display: flex; gap: 10px;">
                        <label style="flex: 1; cursor: pointer;">
                            <input type="radio" name="feedbackType" value="feedback" checked style="display: none;">
                            <div class="feedback-type-option" style="
                                padding: 10px; border: 2px solid #e5e7eb; border-radius: 10px;
                                text-align: center; font-size: 13px; font-weight: 500; color: #4b5563;
                                transition: all 0.2s;
                            ">💡 Góp ý tính năng</div>
                        </label>
                        <label style="flex: 1; cursor: pointer;">
                            <input type="radio" name="feedbackType" value="bug" style="display: none;">
                            <div class="feedback-type-option" style="
                                padding: 10px; border: 2px solid #e5e7eb; border-radius: 10px;
                                text-align: center; font-size: 13px; font-weight: 500; color: #4b5563;
                                transition: all 0.2s;
                            ">🐛 Báo lỗi</div>
                        </label>
                    </div>
                </div>

                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #374151;">Nội dung</label>
                    <textarea id="feedbackMessage" placeholder="Mô tả chi tiết ý kiến hoặc lỗi bạn gặp phải..." style="
                        width: 100%; height: 100px; padding: 12px; border: 1px solid #d1d5db;
                        border-radius: 12px; font-family: inherit; font-size: 14px; color: #1f2937;
                        resize: vertical; outline: none; box-sizing: border-box; transition: border-color 0.2s;
                    " onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#d1d5db'"></textarea>
                </div>

                <div style="margin-bottom: 24px;">
                    <label style="display: block; margin-bottom: 6px; font-size: 13px; font-weight: 600; color: #374151;">Liên hệ (Tùy chọn)</label>
                    <input type="text" id="feedbackContact" placeholder="Email hoặc Facebook (để chúng tôi phản hồi)" style="
                        width: 100%; padding: 10px 12px; border: 1px solid #d1d5db;
                        border-radius: 12px; font-family: inherit; font-size: 14px; color: #1f2937;
                        outline: none; box-sizing: border-box; transition: border-color 0.2s;
                    " onfocus="this.style.borderColor='#4f46e5'" onblur="this.style.borderColor='#d1d5db'">
                </div>

                <button id="sendFeedbackBtn" style="
                    width: 100%; padding: 12px; background: #4f46e5; color: white; border: none;
                    border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; gap: 8px;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#4338ca'" onmouseout="this.style.background='#4f46e5'">
                    ${getIcon('send', 'scraper-icon-sm')} Gửi phản hồi
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Styling logic for radio buttons
        const radioInputs = overlay.querySelectorAll('input[name="feedbackType"]');
        const updateRadioStyles = () => {
            radioInputs.forEach(input => {
                const labelDiv = input.nextElementSibling;
                if (input.checked) {
                    labelDiv.style.borderColor = '#4f46e5';
                    labelDiv.style.background = '#e0e7ff';
                    labelDiv.style.color = '#4f46e5';
                } else {
                    labelDiv.style.borderColor = '#e5e7eb';
                    labelDiv.style.background = 'transparent';
                    labelDiv.style.color = '#4b5563';
                }
            });
        };
        radioInputs.forEach(input => input.addEventListener('change', updateRadioStyles));
        updateRadioStyles(); // Initial state

        // Close handlers
        const close = () => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        };
        overlay.onclick = (e) => { if (e.target === overlay) close(); };
        document.getElementById('closeFeedbackBtn').onclick = close;

        // Send handler
        document.getElementById('sendFeedbackBtn').onclick = async () => {
            const btn = document.getElementById('sendFeedbackBtn');
            const message = document.getElementById('feedbackMessage').value.trim();
            const contact = document.getElementById('feedbackContact').value.trim();
            const type = document.querySelector('input[name="feedbackType"]:checked').value;

            if (!message) {
                showToast('Vui lòng nhập nội dung!', 'warning');
                document.getElementById('feedbackMessage').focus();
                return;
            }

            // UI Loading state
            const originalText = btn.innerHTML;
            btn.innerHTML = `${getIcon('loader', 'scraper-icon-spin')} Đang gửi...`;
            btn.disabled = true;
            btn.style.opacity = '0.7';

            try {
                // Call local server (or production URL in real app)
                const response = await fetch('http://localhost:3000/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ type, message, contact })
                });

                const data = await response.json();

                if (data.success) {
                    showToast('Cảm ơn đóng góp của bạn!', 'success');
                    close();
                } else {
                    throw new Error(data.error || 'Lỗi server');
                }
            } catch (err) {
                console.error('Feedback Error:', err);
                showToast('Gửi thất bại! Hãy thử lại sau.', 'error');
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.opacity = '1';
            }
        };
    }

    // ============================================================ 
    // 🚀 MAIN EXECUTION
    // ============================================================ 

    // Reset stop flag for new run
    stopRequested = false;

    // Check for updates first
    await checkUpdate();

    // Load AI Prompt from file
    await loadDefaultPrompt();

    // Show mode selector
    currentMode = await showModeSelector();

    if (!currentMode) {
      showToast('Đã hủy bỏ', 'info');
      toastContainer.remove();
      window.hasRunScraper = false;
      return;
    }
    // Create status panel
    createStatusPanel(currentMode);

    // Run appropriate mode
    if (currentMode === 'exam') {
      await runExamMode();
    } else {
      // Check for Sidebar Navigation
      const sidebarExists = document.querySelectorAll('.list-item .item[id^="question-sidebar-"]').length > 0;
      
      if (sidebarExists) {
          const useSidebar = await showConfirmModal(
              '🚀 HỆ THỐNG PHÁT HIỆN SIDEBAR! Bạn có muốn kích hoạt chế độ "Sidebar Turbo Mode" không?\n\n⚡ Tốc độ có thể NHANH GẤP 5 - 10 LẦN so với bình thường. Duyệt toàn bộ câu hỏi CỰC NHANH và SIÊU CHÍNH XÁC!',
              'Kích Hoạt Siêu Tốc Độ ⚡'
          );
          
          if (useSidebar) {
              await runSidebarMode();
          } else {
              await runHomeworkMode();
          }
      } else {
          await runHomeworkMode();
      }
    }

    if (stopRequested) return;

    // Finish
    showToast(`Hoàn thành! ${questionCount} câu, ${allImages.length} ảnh`, 'success', 5000);
    createConfetti();
    updateStatus('Hoàn thành!', `${questionCount} câu, ${allImages.length} ảnh`, 'rocket');

    // Make functions available globally
    window.setCustomAIPrompt = setCustomAIPrompt;
    window._scraperResults = {
      normal: allResults,
      ai: allResultsAI,
      images: allImages,
      count: questionCount,
      mode: currentMode
    };

    await sleep(1500);

    // Remove panel and show results
    if (statusPanel) {
      // Clear the elapsed time interval to prevent memory leak
      if (statusPanel.elapsedTimeInterval) {
        clearInterval(statusPanel.elapsedTimeInterval);
      }
      statusPanel.remove();
    }
    toastContainer.remove();

    showResultsUI();

  })();
}
