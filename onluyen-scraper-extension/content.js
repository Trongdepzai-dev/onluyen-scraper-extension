// Kiểm tra xem script đã chạy chưa
if (window.hasRunScraper) {
  // Nếu đã chạy, chỉ thông báo nhẹ nhàng rồi thoát
  const existingToast = document.querySelector('.scraper-toast-already-running');
  if (!existingToast) {
    const toast = document.createElement('div');
    toast.className = 'scraper-toast scraper-toast-already-running';
    Object.assign(toast.style, {
      position: 'fixed', bottom: '20px', left: '20px', zIndex: '100000',
      background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white',
      padding: '16px 24px', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
      fontFamily: "'Inter', sans-serif", fontWeight: '600', animation: 'scraper-slide-up 0.4s ease'
    });
    toast.innerHTML = '🚀 Scraper đang hoạt động!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
} else if (!window.location.hostname.endsWith('onluyen.vn')) {
  // Kiểm tra domain: Nếu không phải onluyen.vn thì cảnh báo và thoát
  const toast = document.createElement('div');
  Object.assign(toast.style, {
    position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: '100000',
    background: 'linear-gradient(135deg, #ef4444, #b91c1c)', color: 'white',
    padding: '16px 28px', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    fontFamily: "'Inter', sans-serif", fontWeight: '700', fontSize: '15px',
    display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid rgba(255,255,255,0.2)'
  });
  toast.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    Trang web không hỗ trợ! Tiện ích chỉ chạy trên OnLuyen.vn
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s ease';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
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
      search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      refreshCw: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
      loader: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>',
      sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>',
      settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
      send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
      github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>'
    };

    const getIcon = (name, className = '') => {
      const svg = ICONS[name] || '';
      if (!svg) return '';
      return svg.replace('<svg ', `<svg class="scraper-icon ${className}" `);
    };
    
    let allResults = "";
    let allResultsAI = "";
    let allImages = [];
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
    let defaultAIPrompt = `# 🧠 HỆ THỐNG PHÂN TÍCH CÂU HỎI THÔNG MINH v${chrome.runtime.getManifest().version} - ENHANCED

## 🎯 VAI TRÒ & NĂNG LỰC NÂNG CAO

Bạn là **EXPERT ANALYST AI PRO** - Trợ lý AI cấp cao với khả năng:

### 📋 XỬ LÝ ĐA DẠNG CÂU HỎI
- ✅ Câu hỏi trắc nghiệm (Multiple Choice)
- ✅ Câu hỏi tự luận (Essay)
- ✅ Câu hỏi đúng/sai (True/False)
- ✅ Câu hỏi điền khuyết (Fill-in-the-blank)
- ✅ Câu hỏi ghép đôi (Matching)
- ✅ Câu hỏi tình huống (Case Study)
- ✅ Câu hỏi so sánh/phân tích (Compare/Analyze)

### 🔧 CÔNG CỤ TÍCH HỢP
\`\`\`
┌─────────────────────────────────────────────────────────┐
│  🔍 WEB_SEARCH    - Tìm kiếm thông tin mới nhất        │
│  📊 CALCULATOR    - Tính toán phức tạp                 │
│  📚 KNOWLEDGE_DB  - Tra cứu cơ sở dữ liệu kiến thức    │
│  🔬 FACT_CHECK    - Xác minh thông tin                 │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## ⚡ NGUYÊN TẮC VÀNG: TỰ ĐÁNH GIÁ & TÌM KIẾM

\`\`\`
┌────────────────────────────────────────────────────────────┐
│  🚨 TRƯỚC KHI TRẢ LỜI, LUÔN TỰ HỎI:                       │
│                                                            │
│  1️⃣ Tôi có CHẮC CHẮN 100% về thông tin này không?         │
│  2️⃣ Thông tin này có thể đã THAY ĐỔI/CẬP NHẬT không?      │
│  3️⃣ Đây có phải kiến thức CHUYÊN MÔN SÂU cần xác minh?    │
│  4️⃣ Có SỐ LIỆU/THỐNG KÊ cụ thể cần kiểm tra không?        │
│                                                            │
│  ➡️ NẾU BẤT KỲ CÂU NÀO = CÓ → BẮT BUỘC DÙNG SEARCH       │
└────────────────────────────────────────────────────────────┘
\`\`\`

---

## 🔬 PHƯƠNG PHÁP TƯ DUY 7 LỚP (NÂNG CẤP)

### 🔷 LỚP 1: PHÂN TÍCH ĐỀ BÀI (DECODE)
\`\`\`
📌 Checklist:
□ Đọc kỹ TỪNG TỪ trong câu hỏi
□ Highlight TỪ KHÓA chính (in đậm khi trả lời)
□ Nhận diện LOẠI CÂU HỎI
□ Phát hiện "bẫy ngôn ngữ" (luôn, không bao giờ, tất cả, duy nhất...)
□ Xác định LĨNH VỰC chuyên môn
□ Đánh giá MỨC ĐỘ KHÓ (1-5)
\`\`\`

### 🔷 LỚP 2: TỰ ĐÁNH GIÁ KIẾN THỨC (SELF-ASSESSMENT) ⭐ MỚI
\`\`\`
┌─────────────────────────────────────────────────────────┐
│  🧠 KIỂM TRA NỘI BỘ:                                    │
│                                                         │
│  ❓ Tôi biết chắc câu trả lời? ──→ ✅ Tiếp tục LỚP 3   │
│                                                         │
│  ❓ Tôi KHÔNG CHẮC hoặc:                                │
│     • Thông tin có thể outdated                         │
│     • Cần số liệu/dữ kiện cụ thể                       │
│     • Liên quan đến sự kiện gần đây                    │
│     • Kiến thức chuyên ngành sâu                       │
│     • Có nhiều nguồn khác nhau                         │
│                                                         │
│     ──→ 🔍 BẮT BUỘC: KÍCH HOẠT SEARCH                  │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔷 LỚP 3: TRÍCH XUẤT THÔNG TIN (EXTRACT)
\`\`\`
📌 Phân loại dữ kiện:
┌──────────────────┬──────────────────┐
│  📗 CHÍNH        │  📘 PHỤ          │
│  (Core Facts)    │  (Supporting)    │
├──────────────────┼──────────────────┤
│  • ...           │  • ...           │
│  • ...           │  • ...           │
└──────────────────┴──────────────────┘

📌 Dữ kiện CẦN XÁC MINH (nếu có):
→ [Danh sách cần search]
\`\`\`

### 🔷 LỚP 4: TÌM KIẾM BỔ SUNG (SEARCH) ⭐ MỚI
\`\`\`
┌─────────────────────────────────────────────────────────┐
│  🔍 KÍCH HOẠT SEARCH KHI:                               │
│                                                         │
│  ⚠️ Trigger tự động:                                    │
│  • Câu hỏi về sự kiện sau 2023                         │
│  • Yêu cầu số liệu thống kê cụ thể                     │
│  • Tên người/tổ chức/địa điểm cần xác minh             │
│  • Luật pháp/quy định (có thể thay đổi)                │
│  • Công nghệ/sản phẩm mới                              │
│  • Giá cả/thị trường                                   │
│  • Nghiên cứu khoa học mới                             │
│  • Khi độ tin cậy nội bộ < 85%                         │
│                                                         │
│  📋 Format search query:                                │
│  [SEARCH]: "keyword chính xác + context"               │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔷 LỚP 5: XỬ LÝ & SUY LUẬN (PROCESS)
\`\`\`
📌 Áp dụng:
• Kiến thức NỀN TẢNG đã verified
• Kết quả từ SEARCH (nếu có)
• Suy luận LOGIC đa chiều
• So sánh NHIỀU NGUỒN (nếu có conflict)

📌 Phương pháp suy luận:
□ Deductive (Diễn dịch)
□ Inductive (Quy nạp)  
□ Abductive (Suy luận tốt nhất)
\`\`\`

### 🔷 LỚP 6: XÁC MINH CHÉO (CROSS-VERIFY) ⭐ NÂNG CẤP
\`\`\`
┌─────────────────────────────────────────────────────────┐
│  ✅ CHECKLIST XÁC MINH:                                 │
│                                                         │
│  □ Logic NHẤT QUÁN?                                     │
│  □ Khớp với thông tin GỐC từ đề bài?                   │
│  □ Phù hợp với kết quả SEARCH?                         │
│  □ Không có CONTRADICTION?                              │
│  □ Nguồn thông tin ĐÁNG TIN CẬY?                       │
│  □ Thông tin CÒN HIỆU LỰC (không outdated)?            │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 🔷 LỚP 7: TỔNG HỢP & TRÌNH BÀY (SYNTHESIZE)
\`\`\`
📌 Output bao gồm:
• ĐÁP ÁN chính xác (highlight rõ ràng)
• GIẢI THÍCH logic từng bước
• NGUỒN THAM KHẢO (nếu có search)
• MỨC ĐỘ TIN CẬY
• LƯU Ý bổ sung (nếu cần)
\`\`\`

---

## 📊 THANG ĐỘ TIN CẬY NÂNG CAO

| Mức | Icon | Trạng thái | Mô tả | Hành động |
|-----|------|------------|-------|-----------|
| 100% | 🟢 | CHẮC CHẮN | Bằng chứng trực tiếp + đã verify | Trả lời ngay |
| 85-99% | 🔵 | RẤT CAO | Logic mạnh + kiến thức vững | Trả lời + ghi chú |
| 70-84% | 🟡 | CAO | Có cơ sở tốt | Khuyến nghị search |
| 50-69% | 🟠 | TRUNG BÌNH | Cần thêm thông tin | **BẮT BUỘC search** |
| <50% | 🔴 | THẤP | Không đủ dữ liệu | **BẮT BUỘC search + cảnh báo** |

---

## 🚀 QUY TRÌNH TRẢ LỜI CHUẨN

\`\`\`
╔═══════════════════════════════════════════════════════════╗
║                   WORKFLOW XỬ LÝ                          ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║   📥 NHẬN CÂU HỎI                                         ║
║         ↓                                                 ║
║   🔍 PHÂN TÍCH (Lớp 1)                                    ║
║         ↓                                                 ║
║   🧠 TỰ ĐÁNH GIÁ (Lớp 2)                                  ║
║         ↓                                                 ║
║   ┌─────────────────────────────────────┐                 ║
║   │  Độ tin cậy ≥ 85%?                  │                 ║
║   │                                     │                 ║
║   │  ✅ CÓ → Tiếp tục xử lý            │                 ║
║   │  ❌ KHÔNG → 🔍 SEARCH trước         │                 ║
║   └─────────────────────────────────────┘                 ║
║         ↓                                                 ║
║   📊 TRÍCH XUẤT + XỬ LÝ (Lớp 3-5)                        ║
║         ↓                                                 ║
║   ✅ XÁC MINH CHÉO (Lớp 6)                                ║
║         ↓                                                 ║
║   📝 TỔNG HỢP & OUTPUT (Lớp 7)                            ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
\`\`\`

---

## 📋 TEMPLATE OUTPUT CHUẨN

\`\`\`
═══════════════════════════════════════════════════════════
📊 KẾT QUẢ PHÂN TÍCH
═══════════════════════════════════════════════════════════

🎯 LOẠI CÂU HỎI: [Trắc nghiệm/Tự luận/...]
📚 LĨNH VỰC: [Tên lĩnh vực]
⚡ ĐỘ KHÓ: [1-5]/5

───────────────────────────────────────────────────────────
✅ ĐÁP ÁN: [ĐÁP ÁN RÕ RÀNG]
───────────────────────────────────────────────────────────

📖 GIẢI THÍCH:
[Giải thích logic từng bước]

🔍 NGUỒN THAM KHẢO: (nếu có search)
[Link/nguồn đã tra cứu]

📈 ĐỘ TIN CẬY: [X]% [Icon tương ứng]

💡 LƯU Ý THÊM: (nếu có)
[Các lưu ý quan trọng]

═══════════════════════════════════════════════════════════
\`\`\`

---

## ⚠️ HƯỚNG DẪN ĐẶC BIỆT

### 🔴 LUÔN SEARCH KHI:
\`\`\`
• Không chắc chắn 100%
• Câu hỏi về thời sự/sự kiện gần đây
• Cần số liệu/thống kê cụ thể
• Liên quan đến luật pháp/quy định
• Thông tin khoa học/y tế cần cập nhật
• Giá cả/thị trường/kinh tế
• Công nghệ mới
\`\`\`

### 🟢 CÓ THỂ TRẢ LỜI TRỰC TIẾP KHI:
\`\`\`
• Kiến thức cơ bản/nền tảng ổn định
• Định nghĩa/khái niệm chuẩn
• Công thức toán/khoa học đã verified
• Logic/suy luận thuần túy
• Ngữ pháp/ngôn ngữ cơ bản
\`\`\`

---`;

    // Function to customize AI prompt
    function setCustomAIPrompt(newPrompt) {
      defaultAIPrompt = newPrompt;
      showToast('Đã cập nhật prompt AI!', 'success');
      console.log('✅ Custom AI prompt set');
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
        } catch (e) { console.error('Error loading Gemini config', e); }
        return { apiKey: '', model: defaultModel };
    }

    function saveGeminiConfig(config) {
        localStorage.setItem('scraper_gemini_config', JSON.stringify(config));
    }

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
            console.error('Gemini Call Failed:', error);
            throw error;
        }
    }

    // ============================================================ 
    // 🎨 INJECT STYLES
    // ============================================================ 
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
      
      :root {
        --scraper-primary: #6366f1;
        --scraper-primary-dark: #4f46e5;
        --scraper-success: #10b981;
        --scraper-warning: #f59e0b;
        --scraper-danger: #ef4444;
        --scraper-info: #3b82f6;
        --scraper-bg-glass: rgba(17, 24, 39, 0.85);
        --scraper-border-glass: rgba(255, 255, 255, 0.1);
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
      
      @keyframes scraper-gradient-flow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
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
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }
      
      .scraper-btn {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        letter-spacing: 0.01em;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 12px;
      }

      .scraper-btn-rounded {
        border-radius: 9999px;
      }
      
      .scraper-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
      }
      
      .scraper-btn:hover::before {
        left: 100%;
      }
      
      .scraper-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.3);
        filter: brightness(1.1);
      }
      
      .scraper-btn:active {
        transform: translateY(0) scale(0.96);
      }
      
      .scraper-stat-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        backdrop-filter: blur(10px);
        border-radius: 20px;
      }
      
      .scraper-stat-card:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 20px 40px -12px rgba(0,0,0,0.4);
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
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        transition: all 0.3s;
      }
      
      .scraper-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      
      .scraper-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 3px;
      }
      
      .scraper-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 3px;
      }
      
      .scraper-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
      
      .scraper-image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 12px;
      }
      
      .scraper-image-card {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      
      .scraper-image-card:hover {
        transform: scale(1.05);
        z-index: 10;
        box-shadow: 0 12px 36px rgba(0,0,0,0.3);
      }

      .scraper-lightbox {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(5, 5, 10, 0.95);
        z-index: 100000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: scraper-fade-in 0.3s ease;
        backdrop-filter: blur(10px);
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
      }

      @keyframes scraper-zoom-in {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      .scraper-lightbox img {
        max-width: 90vw;
        max-height: 85vh;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
      }

      .scraper-lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        width: 44px;
        height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        cursor: pointer;
      }

      .scraper-lightbox-close:hover {
        background: rgba(239, 68, 68, 0.8);
        transform: rotate(90deg);
      }

      .scraper-lightbox-info {
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 255, 255, 0.1);
        padding: 10px 24px;
        border-radius: 20px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .scraper-lightbox-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        backdrop-filter: blur(4px);
      }

      .scraper-lightbox-nav:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-50%) scale(1.1);
      }

      .scraper-lightbox-nav.prev { left: -70px; }
      .scraper-lightbox-nav.next { right: -70px; }

      .scraper-image-card {
        cursor: pointer;
      }

      .scraper-image-card:hover::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
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
      }

      .scraper-mode-select-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      }
      
      .scraper-mode-select-btn:active {
        transform: scale(0.98);
      }
    `;
    document.head.appendChild(styleSheet);

    // ============================================================ 
    // 🔔 TOAST NOTIFICATION SYSTEM
    // ============================================================ 
    const toastContainer = document.createElement('div');
    Object.assign(toastContainer.style, {
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      zIndex: '200000',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    });
    document.body.appendChild(toastContainer);

    function showToast(message, type = 'info', duration = 3000) {
      // Giới hạn tối đa 3 toasts cùng lúc để tránh spam
      if (toastContainer.children.length >= 3) {
        toastContainer.children[0].remove();
      }

      const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
      };
      
      const icons = {
        success: getIcon('check', 'scraper-icon-md'),
        error: getIcon('x', 'scraper-icon-md'),
        warning: getIcon('alertTriangle', 'scraper-icon-md'),
        info: getIcon('info', 'scraper-icon-md')
      };
      
      const toast = document.createElement('div');
      toast.className = 'scraper-toast';
      Object.assign(toast.style, {
        background: colors[type],
        color: 'white',
        padding: '14px 20px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '350px'
      });
      
      toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
      toastContainer.appendChild(toast);
      
      setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.transform = 'translateX(-120%)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
      }, duration);
    }

    // ============================================================ 
    // 🎊 CONFETTI EFFECT
    // ============================================================ 
    function createConfetti() {
      const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];
      const shapes = ['●', '■', '▲', '★', '♦'];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'scraper-confetti-piece';
        confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        confetti.style.cssText = `
          left: ${Math.random() * 100}vw;
          top: -20px;
          color: ${colors[Math.floor(Math.random() * colors.length)]};
          font-size: ${Math.random() * 20 + 10}px;
          animation-delay: ${Math.random() * 0.5}s;
          animation-duration: ${Math.random() * 2 + 2}s;
        `;
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
        console.warn('[Scraper] Extension context invalidated. Vui lòng tải lại trang.');
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
                console.warn('[Scraper] Extension context invalidated. Vui lòng tải lại trang.');
              } else {
                console.error('[Scraper] Lỗi gửi tin nhắn kiểm tra cập nhật:', errMsg);
                if (manual) showToast('Lỗi kết nối hệ thống', 'error');
              }
              resolve();
              return;
            }

            if (response && response.success) {
              const updateInfo = response.data;
              const currentVersion = chrome.runtime.getManifest().version;
              console.log(`[Scraper] Version check: Current ${currentVersion} | Latest ${updateInfo.version}`);
              
              if (isNewerVersion(updateInfo.version, currentVersion)) {
                showUpdateModal(updateInfo).then(resolve);
              } else {
                if (manual) showToast('Bạn đang sử dụng phiên bản mới nhất!', 'success');
                resolve();
              }
            } else {
              console.warn('[Scraper] Không thể kiểm tra cập nhật:', response ? response.error : 'No response');
              if (manual) showToast('Không thể kiểm tra cập nhật lúc này', 'warning');
              resolve();
            }
          });
        } catch (e) {
          isCheckingUpdate = false;
          if (e.message.includes("context invalidated")) {
            console.warn('[Scraper] Extension context invalidated. Vui lòng tải lại trang.');
          } else {
            console.error('[Scraper] Lỗi checkUpdate:', e);
          }
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
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
          position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
          background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(8px)',
          zIndex: '100001', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Inter', sans-serif", animation: 'scraper-fade-in 0.4s ease'
        });

        overlay.innerHTML = `
          <div style="
            background: linear-gradient(135deg, #1e1b4b, #312e81);
            border-radius: 32px; padding: 40px; max-width: 500px; width: 90%;
            box-shadow: 0 40px 100px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);
            text-align: center; color: white;
          ">
            <div style="color: #818cf8; margin-bottom: 24px; animation: scraper-float 3s ease-in-out infinite;">
              ${getIcon('refreshCw', 'scraper-icon-lg')}
            </div>
            <h2 style="font-size: 26px; font-weight: 800; margin-bottom: 12px; background: linear-gradient(135deg, #fff, #a5b4fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Cập Nhật Mới Sẵn Sàng!</h2>
            <div style="background: rgba(255,255,255,0.05); padding: 12px 20px; border-radius: 16px; margin-bottom: 24px; display: inline-block; border: 1px solid rgba(255,255,255,0.1);">
              <span style="color: #a5b4fc; font-weight: 700;">v${info.version}</span>
              <span style="color: rgba(255,255,255,0.4); margin: 0 10px;">•</span>
              <span style="color: rgba(255,255,255,0.6);">${info.release_date}</span>
            </div>
            <p style="color: rgba(255,255,255,0.8); font-size: 15px; line-height: 1.6; margin-bottom: 32px; text-align: left; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 16px;">
              ${info.message}
            </p>
            <div id="updateActionButtons" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <!-- Edge Button (Recommended) -->
              <a href="${info.links.edge}" target="_blank" style="
                background: linear-gradient(135deg, #06b6d4, #0891b2); color: white; padding: 16px; border-radius: 16px;
                text-decoration: none; font-weight: 700; font-size: 14px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
                box-shadow: 0 10px 20px -5px rgba(8, 145, 178, 0.4);
              " onmouseover="this.style.transform='translateY(-2px)';this.style.filter='brightness(1.1)'" onmouseout="this.style.transform='translateY(0)';this.style.filter='none'">
                <div style="display: flex; align-items: center; gap: 8px;">
                   Microsoft Edge
                </div>
                <span style="font-size: 11px; background: rgba(0,0,0,0.2); padding: 2px 8px; border-radius: 10px;">Khuyên dùng</span>
              </a>
              
              <!-- Chrome/Brave Button -->
              <a href="#" id="chromeUpdateBtn" style="
                background: rgba(255,255,255,0.05); color: white; padding: 16px; border-radius: 16px;
                text-decoration: none; font-weight: 700; font-size: 14px; transition: all 0.3s ease;
                display: flex; align-items: center; justify-content: center; gap: 8px;
                border: 1px solid rgba(255,255,255,0.1);
              " onmouseover="this.style.background='rgba(255,255,255,0.15)';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='rgba(255,255,255,0.05)';this.style.transform='translateY(0)'">
                ${getIcon('download', 'scraper-icon-sm')} Chrome / Brave
              </a>
            </div>
            
            <!-- Custom Confirmation Step (Hidden by default) -->
            <div id="chromeConfirmStep" style="display: none; flex-direction: column; gap: 12px; animation: scraper-fade-in 0.3s ease;">
                <p style="color: #a5b4fc; font-weight: 600; margin-bottom: 8px;">Bạn đã biết cách cập nhật Extension thủ công chưa?</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <button id="knowUpdateBtn" style="
                        background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white;
                        padding: 12px; border-radius: 12px; cursor: pointer; font-weight: 600;
                        transition: all 0.2s;
                    " onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">
                        Rồi (Tải ngay)
                    </button>
                    <button id="dontKnowUpdateBtn" style="
                        background: linear-gradient(135deg, #6366f1, #4f46e5); border: none; color: white;
                        padding: 12px; border-radius: 12px; cursor: pointer; font-weight: 600;
                        transition: all 0.2s;
                    " onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='none'">
                        Chưa (Xem hướng dẫn)
                    </button>
                </div>
                <button id="backToOptionsBtn" style="
                    margin-top: 8px; background: transparent; border: none; color: rgba(255,255,255,0.4);
                    font-size: 12px; cursor: pointer; text-decoration: underline;
                ">Quay lại</button>
            </div>

            <button id="skipUpdateBtn" style="
              margin-top: 24px; background: transparent; border: none; color: rgba(255,255,255,0.4);
              font-size: 14px; cursor: pointer; transition: color 0.2s;
              font-weight: 500;
            " onmouseover="this.style.color='rgba(255,255,255,0.8)'" onmouseout="this.style.color='rgba(255,255,255,0.4)'">Để sau</button>
          </div>
        `;

        document.body.appendChild(overlay);
        
        const actionButtons = document.getElementById('updateActionButtons');
        const confirmStep = document.getElementById('chromeConfirmStep');
        const skipBtn = document.getElementById('skipUpdateBtn');

        // Handle Chrome/Brave click
        document.getElementById('chromeUpdateBtn').onclick = (e) => {
            e.preventDefault();
            actionButtons.style.display = 'none';
            confirmStep.style.display = 'flex';
            skipBtn.style.display = 'none'; // Hide skip button during confirmation to focus user
        };

        // Handle "Know how to update" (Yes)
        document.getElementById('knowUpdateBtn').onclick = () => {
             window.open(info.links.chrome, '_blank');
             overlay.remove(); // Close modal after action
             resolve();
        };

        // Handle "Don't know how to update" (No)
        document.getElementById('dontKnowUpdateBtn').onclick = () => {
             window.open('https://github.com/Trongdepzai-dev/onluyen-scraper-extension/blob/main/HOW2UPDATE.md', '_blank');
             window.location.href = info.links.chrome;
             overlay.remove(); // Close modal after action
             resolve();
        };

        // Handle "Back"
        document.getElementById('backToOptionsBtn').onclick = () => {
            confirmStep.style.display = 'none';
            actionButtons.style.display = 'grid';
            skipBtn.style.display = 'block';
        };

        document.getElementById('skipUpdateBtn').onclick = () => {
          overlay.remove();
          resolve();
        };
      });
    }

    // ============================================================
    // 🎯 MODE SELECTION DIALOG
    // ============================================================
    function showModeSelector() {
      return new Promise((resolve) => {
        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: '99999',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Inter', sans-serif"
        });

        overlay.innerHTML = `
          <div style="
            background: linear-gradient(135deg, rgba(17, 24, 39, 0.98), rgba(31, 41, 55, 0.98));
            border-radius: 32px;
            padding: 48px;
            max-width: 700px;
            width: 90%;
            box-shadow: 0 40px 100px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
          ">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="color: #a5b4fc; margin-bottom: 16px;">
                ${getIcon('rocket', 'scraper-icon-lg')}
              </div>
              <h1 style="
                font-size: 32px;
                font-weight: 800;
                background: linear-gradient(135deg, #fff, #a5b4fc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 0 0 12px 0;
              ">Auto Scraper v${chrome.runtime.getManifest().version}</h1>
              <p style="color: rgba(255,255,255,0.6); font-size: 16px; margin: 0;">
                Chọn chế độ scrape phù hợp với loại bài của bạn
              </p>
              <a href="https://github.com/Trongdepzai-dev/" target="_blank" style="
                display: inline-block;
                margin-top: 12px;
                color: rgba(255,255,255,0.3);
                font-size: 12px;
                text-decoration: none;
                transition: color 0.2s;
                font-weight: 500;
              " onmouseover="this.style.color='#a5b4fc'" onmouseout="this.style.color='rgba(255,255,255,0.3)'">
                Made by B.Trọng
              </a>
            </div>
            
            <!-- Mode Buttons -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px;">
              
              <!-- Homework Mode -->
              <div id="homeworkModeBtn" class="scraper-mode-select-btn" style="
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05));
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 24px;
                padding: 32px 24px;
                text-align: center;
              ">
                <div style="color: #10b981; margin-bottom: 16px;">
                  ${getIcon('book', 'scraper-icon-lg')}
                </div>
                <div style="font-size: 20px; font-weight: 700; color: #10b981; margin-bottom: 8px;">
                  BÀI TẬP
                </div>
                <div style="font-size: 14px; font-weight: 600; color: #6ee7b7; margin-bottom: 12px;">
                  HOMEWORK MODE
                </div>
                <div style="color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.6;">
                  Click qua từng câu<br>
                  Có nút "Trả lời", "Bỏ qua"<br>
                  Scrape động từng câu
                </div>
                <div style="
                  margin-top: 16px;
                  background: rgba(16, 185, 129, 0.2);
                  padding: 8px 16px;
                  border-radius: 20px;
                  display: inline-block;
                  color: #6ee7b7;
                  font-size: 12px;
                  font-weight: 600;
                ">
                  ✓ Dành riêng OnLuyen.vn
                </div>
              </div>
              
              <!-- Exam Mode -->
              <div id="examModeBtn" class="scraper-mode-select-btn" style="
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05));
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-radius: 24px;
                padding: 32px 24px;
                text-align: center;
              ">
                <div style="color: #6366f1; margin-bottom: 16px;">
                  ${getIcon('fileText', 'scraper-icon-lg')}
                </div>
                <div style="font-size: 20px; font-weight: 700; color: #6366f1; margin-bottom: 8px;">
                  BÀI THI
                </div>
                <div style="font-size: 14px; font-weight: 600; color: #a5b4fc; margin-bottom: 12px;">
                  EXAM MODE
                </div>
                <div style="color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.6;">
                  Tất cả câu trên 1 trang<br>
                  Không cần click<br>
                  Scrape tĩnh toàn bộ
                </div>
                <div style="
                  margin-top: 16px;
                  background: rgba(99, 102, 241, 0.2);
                  padding: 8px 16px;
                  border-radius: 20px;
                  display: inline-block;
                  color: #a5b4fc;
                  font-size: 12px;
                  font-weight: 600;
                ">
                  ✓ Bài kiểm tra, Đề thi
                </div>
              </div>
            </div>
            
            <!-- Cancel Button -->
            <div style="text-align: center; display: flex; flex-direction: column; gap: 16px; align-items: center;">
              <button id="checkUpdateBtn" style="
                background: rgba(99, 102, 241, 0.1);
                border: 1px solid rgba(99, 102, 241, 0.2);
                color: #a5b4fc;
                padding: 8px 16px;
                border-radius: 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: 600;
              " onmouseover="this.style.background='rgba(99, 102, 241, 0.2)'" onmouseout="this.style.background='rgba(99, 102, 241, 0.1)'">
                ${getIcon('refreshCw', 'scraper-icon-sm')} Kiểm tra cập nhật
              </button>

              <button id="cancelModeBtn" style="
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                color: rgba(255,255,255,0.5);
                padding: 12px 32px;
                border-radius: 12px;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                margin: 0 auto;
              ">
                ${getIcon('x', 'scraper-icon-sm')} Hủy bỏ
              </button>
            </div>
          </div>
        `;

        document.body.appendChild(overlay);

        // Event handlers
        document.getElementById('homeworkModeBtn').onclick = () => {
          overlay.remove();
          resolve('homework');
        };

        document.getElementById('examModeBtn').onclick = () => {
          overlay.remove();
          resolve('exam');
        };

        document.getElementById('checkUpdateBtn').onclick = (e) => {
          e.stopPropagation();
          checkUpdate(true);
        };

        document.getElementById('cancelModeBtn').onclick = () => {
          overlay.remove();
          resolve(null);
        };

        // Hover effects
        const btns = overlay.querySelectorAll('.scraper-mode-select-btn');
        btns.forEach(btn => {
          btn.onmouseenter = () => {
            btn.style.borderColor = btn.id === 'homeworkModeBtn' 
              ? 'rgba(16, 185, 129, 0.8)' 
              : 'rgba(99, 102, 241, 0.8)';
          };
          btn.onmouseleave = () => {
            btn.style.borderColor = btn.id === 'homeworkModeBtn'
              ? 'rgba(16, 185, 129, 0.4)'
              : 'rgba(99, 102, 241, 0.4)';
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
      statusPanel.className = 'scraper-panel';
      let isDragging = false;
      let dragOffset = { x: 0, y: 0 };
      let isMinimized = false;

      const modeColor = mode === 'homework' ? '#10b981' : '#6366f1';
      const modeIcon = mode === 'homework' ? getIcon('book', 'scraper-icon-md') : getIcon('fileText', 'scraper-icon-md');
      const modeText = mode === 'homework' ? 'HOMEWORK' : 'EXAM';

      Object.assign(statusPanel.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '10000',
        background: 'rgba(17, 24, 39, 0.95)',
        borderRadius: '24px',
        padding: '0',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        minWidth: '360px',
        fontFamily: "'Inter', -apple-system, sans-serif",
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(20px)'
      });

      statusPanel.innerHTML = `
        <!-- Header -->
        <div id="panelHeader" style="
          background: linear-gradient(135deg, ${modeColor}, ${mode === 'homework' ? '#059669' : '#4f46e5'});
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: move;
        ">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="
              width: 50px; height: 50px;
              background: rgba(255,255,255,0.2);
              border-radius: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            " id="statusIcon">${modeIcon}</div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <div id="statusTitle" style="
                  font-weight: 700;
                  font-size: 18px;
                  color: white;
                  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                ">Đang Khởi Tạo...</div>
                <span style="
                  background: rgba(255,255,255,0.2);
                  padding: 2px 8px;
                  border-radius: 8px;
                  font-size: 10px;
                  font-weight: 700;
                  color: white;
                ">${modeText}</span>
              </div>
              <div id="statusSubtitle" style="
                font-size: 13px;
                color: rgba(255,255,255,0.8);
                margin-top: 2px;
              ">Chuẩn bị thu thập dữ liệu</div>
            </div>
          </div>
          <button id="minimizeBtn" class="scraper-btn scraper-btn-rounded" style="
            width: 36px; height: 36px;
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          " title="Thu nhỏ">${getIcon('minus', 'scraper-icon-sm')}</button>
        </div>
        
        <!-- Body -->
        <div id="panelBody" style="padding: 20px 24px;">
          <!-- Live Status -->
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
            <div class="scraper-live-indicator" style="
              position: relative;
              width: 10px; height: 10px;
              background: #10b981;
              border-radius: 50%;
            "></div>
            <span id="liveStatus" style="
              background: rgba(16, 185, 129, 0.2);
              color: #10b981;
              padding: 4px 10px;
              border-radius: 20px;
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
            ">ĐANG HOẠT ĐỘNG</span>
            <span style="color: #9ca3af; font-size: 12px;" id="elapsedTime">00:00</span>
          </div>
          
          <!-- Progress Bar -->
          <div style="
            background: rgba(255,255,255,0.1);
            border-radius: 12px;
            height: 8px;
            overflow: hidden;
            margin-bottom: 20px;
          ">
            <div id="progressBar" class="scraper-progress-bar" style="
              height: 100%;
              width: 0%;
              border-radius: 12px;
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
            <div class="scraper-stat-card" style="
              background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1));
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 16px;
              padding: 16px;
              text-align: center;
            ">
              <div id="questionNum" class="scraper-stat-number" style="
                font-size: 28px;
                font-weight: 800;
                color: #10b981;
                line-height: 1;
              ">0</div>
              <div style="
                font-size: 11px;
                color: #6ee7b7;
                margin-top: 6px;
                font-weight: 600;
                text-transform: uppercase;
              ">Câu hỏi</div>
            </div>
            
            <div class="scraper-stat-card" style="
              background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
              border: 1px solid rgba(59, 130, 246, 0.3);
              border-radius: 16px;
              padding: 16px;
              text-align: center;
            ">
              <div id="imageNum" class="scraper-stat-number" style="
                font-size: 28px;
                font-weight: 800;
                color: #3b82f6;
                line-height: 1;
              ">0</div>
              <div style="
                font-size: 11px;
                color: #93c5fd;
                margin-top: 6px;
                font-weight: 600;
                text-transform: uppercase;
              ">Hình ảnh</div>
            </div>
            
            <div class="scraper-stat-card" style="
              background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1));
              border: 1px solid rgba(245, 158, 11, 0.3);
              border-radius: 16px;
              padding: 16px;
              text-align: center;
            ">
              <div id="retryNum" class="scraper-stat-number" style="
                font-size: 28px;
                font-weight: 800;
                color: #f59e0b;
                line-height: 1;
              ">0</div>
              <div style="
                font-size: 11px;
                color: #fcd34d;
                margin-top: 6px;
                font-weight: 600;
                text-transform: uppercase;
              ">${mode === 'homework' ? 'Retry' : 'Loại'}</div>
            </div>
          </div>
          
          <!-- Current Question -->
          <div id="currentQuestionCard" style="
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1));
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 20px;
          ">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: white;">
              ${getIcon('fileText')}
              <span style="color: #a5b4fc; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                Đang xử lý
              </span>
            </div>
            <div id="currentQText" style="
              color: white;
              font-size: 14px;
              font-weight: 500;
              line-height: 1.5;
            ">Đang chờ...</div>
            <div id="waitingBtn" style="
              color: #9ca3af;
              font-size: 12px;
              margin-top: 8px;
            "></div>
          </div>
          
          <!-- Action Buttons -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
            <button id="pauseBtn" class="scraper-btn" style="
              padding: 14px;
              background: linear-gradient(135deg, #f59e0b, #d97706);
              color: white;
              border: none;
              border-radius: 14px;
              font-size: 14px;
              cursor: pointer;
            ">
              ${getIcon('pause')}
              <span>TẠM DỪNG</span>
            </button>
            
            <button id="stopBtn" class="scraper-btn" style="
              padding: 14px;
              background: linear-gradient(135deg, #ef4444, #dc2626);
              color: white;
              border: none;
              border-radius: 14px;
              font-size: 14px;
              cursor: pointer;
            ">
              ${getIcon('square')}
              <span>DỪNG</span>
            </button>
          </div>
          
          <button id="modeBtn" class="scraper-btn" style="
            width: 100%;
            padding: 14px;
            margin-top: 10px;
            background: linear-gradient(135deg, #8b5cf6, #6366f1);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 14px;
            cursor: pointer;
          ">
            ${getIcon('bot')}
            <span>CHẾ ĐỘ AI</span>
          </button>
        </div>
        
        <!-- Footer -->
        <div style="
          background: rgba(0,0,0,0.2);
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <span style="color: #6b7280; font-size: 11px;">Auto Scraper v${chrome.runtime.getManifest().version} • ${modeText}</span>
          <div style="display: flex; gap: 4px;">
            <span style="width: 6px; height: 6px; background: #10b981; border-radius: 50%;"></span>
            <span style="width: 6px; height: 6px; background: #3b82f6; border-radius: 50%;"></span>
            <span style="width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%;"></span>
          </div>
        </div>
      `;

      document.body.appendChild(statusPanel);

      // Store element references
      panelElements = {
        header: document.getElementById('panelHeader'),
        body: document.getElementById('panelBody'),
        minimizeBtn: document.getElementById('minimizeBtn'),
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
        statusPanel.style.minWidth = isMinimized ? 'auto' : '360px';
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
          panelElements.pauseBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          panelElements.liveStatus.textContent = 'TẠM DỪNG';
          panelElements.liveStatus.style.background = 'rgba(245, 158, 11, 0.2)';
          panelElements.liveStatus.style.color = '#f59e0b';
          showToast('Đã tạm dừng', 'info');
        } else {
          panelElements.pauseBtn.innerHTML = `${getIcon('pause')}<span>TẠM DỪNG</span>`;
          panelElements.pauseBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
          panelElements.liveStatus.textContent = 'ĐANG HOẠT ĐỘNG';
          panelElements.liveStatus.style.background = 'rgba(16, 185, 129, 0.2)';
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
          ? 'linear-gradient(135deg, #10b981, #059669)'
          : 'linear-gradient(135deg, #8b5cf6, #6366f1)';
        showToast(`Chuyển sang ${isAIMode ? 'chế độ AI' : 'chế độ thường'}`, 'info');
      };
    }

    function updateStatus(title, subtitle, iconKey = 'book', btnInfo = '') {
      if (!panelElements.statusTitle) return;
      
      panelElements.statusTitle.textContent = title;
      panelElements.statusSubtitle.textContent = subtitle;

      const iconMap = {
        '📚': 'book',
        '📝': 'fileText',
        '🔍': 'search',
        '📜': 'fileText',
        '🔢': 'bot',
        '✅': 'check',
        '❌': 'x',
        '🚀': 'rocket',
        '🔄': 'refreshCw',
        '⏳': 'clock',
        '🎊': 'rocket'
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
      
      if (tables.length > 0) {
        console.log(`[Scraper] 🔍 Tìm thấy ${tables.length} bảng (getElementsByTagName).`);
      }

      tables.forEach((table, idx) => {
        try {
          const md = convertTableToMarkdown(table);
          // Sử dụng placeholder cực kỳ đặc biệt để tránh bị xóa
          const mdSafe = `___START_TABLE___${md}___END_TABLE___`.replace(/\n/g, '___TABLE_NEWLINE___');
          
          const span = document.createElement('div'); // Dùng div để chắc chắn nó tách dòng
          span.textContent = mdSafe;
          
          if(table.parentNode) {
            table.parentNode.replaceChild(span, table);
            console.log(`[Scraper] ✅ Đã thay thế bảng #${idx + 1}`);
          }
        } catch (err) {
          console.error(`[Scraper] ❌ Lỗi convert bảng #${idx + 1}:`, err);
        }
      });

      // ===== KẾT THÚC PHẦN THÊM =====

      let text = cloned.textContent || cloned.innerText || '';
      
      // Clean text nhưng BẢO VỆ placeholder
      text = text.replace(/\s+/g, ' ').trim();
      
      // Khôi phục Newline và xóa marker
      text = text.replace(/___TABLE_NEWLINE___/g, '\n');
      text = text.replace(/___START_TABLE___/g, '\n'); // Thêm dòng trống trước bảng
      text = text.replace(/___END_TABLE___/g, '\n');   // Thêm dòng trống sau bảng
      text = text.replace(/\s*([=+\-*^()])\s*/g, ' $1 ');
      text = text.replace(/\s*([.,:;!?])\s*/g, '$1 ');

      return { text: text.trim(), images: foundImages };
    }

    function createSeparator(type = "normal") {
      const separators = {
        normal: "═══════════════════════════════════════════════════════════════",
        start: "╔═══════════════════════════════════════════════════════════════╗",
        end: "╚═══════════════════════════════════════════════════════════════╝",
        thin: "───────────────────────────────────────────────────────────────",
        section: "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
      };
      return separators[type] || separators.normal;
    }

    // ============================================================ 
    // 📋 HOMEWORK MODE - CLICK THROUGH QUESTIONS
    // ============================================================ 

    async function waitForContentLoaded(maxWaitTime = 8000) {
      return new Promise((resolve) => {
        let timeoutId;
        let resolved = false;

        const observer = new MutationObserver(() => {
          const loadingElements = document.querySelectorAll('app-loading');
          let allContentLoaded = true;
          
          const fadeinSpans = document.querySelectorAll('.fadein');
          fadeinSpans.forEach(span => {
            if (span.querySelector('app-loading') || !span.textContent.trim()) {
              allContentLoaded = false;
            }
          });
          
          if (allContentLoaded && loadingElements.length === 0 && !resolved) {
            resolved = true;
            observer.disconnect();
            clearTimeout(timeoutId);
            resolve(true);
          }
        });
        
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true
        });
        
        timeoutId = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            observer.disconnect();
            resolve(true);
          }
        }, maxWaitTime);
        
        // Check immediately
        const loadingElements = document.querySelectorAll('app-loading');
        if (loadingElements.length === 0 && !resolved) {
          const fadeinSpans = document.querySelectorAll('.fadein');
          let allLoaded = true;
          fadeinSpans.forEach(span => {
            if (span.querySelector('app-loading') || !span.textContent.trim()) {
              allLoaded = false;
            }
          });
          if (allLoaded) {
            resolved = true;
            observer.disconnect();
            clearTimeout(timeoutId);
            resolve(true);
          }
        }
      });
    }

    function findClickableButton() {
      // Helper để kiểm tra nút có thực sự "sẵn sàng" để bấm không
      const isReady = (el) => {
        if (!el || el.disabled || el.classList.contains('disabled')) return false;
        
        // KIỂM TRA BLACKLIST: Không bao giờ bấm nút "Nộp bài"
        const text = (el.textContent || '').trim().toLowerCase();
        if (text.includes('nộp bài') || text.includes('nop bai')) {
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

    async function clickButtonRepeatedly(maxAttempts = 50, interval = 200) {
      // Chuyển đổi logic cũ sang thời gian chờ tối đa (mặc định khoảng 10s)
      const maxWaitTime = 15000; 
      const startTime = Date.now();

      return new Promise((resolve) => {
        let observer = null;
        let pollInterval = null;
        let resolved = false;

        // Hàm dọn dẹp
        const cleanup = () => {
          if (observer) { observer.disconnect(); observer = null; }
          if (pollInterval) { clearInterval(pollInterval); pollInterval = null; }
        };

        // Hàm thực hiện click "thần tốc"
        const triggerClick = (btn, source) => {
          if (resolved) return;
          resolved = true;
          cleanup();

          try {
            // Combo click hủy diệt: Mousedown -> Mouseup -> Click
            btn.element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, view: window }));
            btn.element.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, view: window }));
            btn.element.click();
            
            console.log(`⚡ TRIGGERED (${source}): ${btn.text}`);
            resolve({ success: true, ...btn });
          } catch (e) {
            console.log(`⚠️ Click error:`, e);
            resolve({ success: false });
          }
        };

        // Hàm kiểm tra
        const checkBtn = (source) => {
          if (stopRequested || isPaused || resolved) return;
          
          const btn = findClickableButton();
          if (btn) {
            triggerClick(btn, source);
          }
        };

        // 1. Check ngay lập tức
        checkBtn('immediate');
        if (resolved) return;

        // 2. Cập nhật UI
        if (panelElements.waitingBtn) {
           panelElements.waitingBtn.innerHTML = `${getIcon('search', 'scraper-icon-spin')} Đang chờ nút...`;
        }

        // 3. Thiết lập Observer (Bắt biến động DOM)
        observer = new MutationObserver(() => checkBtn('mutation'));
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['disabled', 'class', 'style', 'hidden']
        });

        // 4. Thiết lập Fast Polling 50ms (Backup cho trường hợp Observer miss)
        pollInterval = setInterval(() => {
          checkBtn('poll-50ms');
          
          // Kiểm tra timeout
          if (Date.now() - startTime > maxWaitTime) {
            if (!resolved) {
              resolved = true;
              cleanup();
              console.log('⚠️ Timeout waiting for button');
              resolve({ success: false });
            }
          }
        }, 50); // Kiểm tra mỗi 50ms = 20 lần/giây
      });
    }

    async function waitForQuestionChange(currentId, maxWaitTime = 10000) {
      const startTime = Date.now();
      
      while (Date.now() - startTime < maxWaitTime) {
        if (stopRequested) return false;
        
        const numDiv = document.querySelector('.num');
        const fullText = numDiv ? (numDiv.textContent || '') : '';
        
        const idMatch = fullText.match(/#(\d+)/);
        const numMatch = fullText.match(/Câu[:\s]*(\d+)/i);
        const newId = idMatch ? idMatch[1] : (numMatch ? numMatch[1] : null);
        
                if (newId && newId !== currentId) {
        
                  await fastSleep(100);
        
                  return true;
        
                }
        
                await fastSleep(50);
        
              }
        
              return false;
        
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
        
        let textNormal = `\n${createSeparator("start")}\n`;
        textNormal += `║ 📝 ${cauText} • TỰ LUẬN\n`;
        textNormal += `${createSeparator("thin")}\n`;
        if (ctx.text) textNormal += `║ 📋 Đề bài: ${ctx.text}\n`;
        if (q.text) textNormal += `║ ❓ Câu hỏi: ${q.text}\n`;
        if (questionImages.length > 0) {
          textNormal += `║ 🖼️ Ảnh: ${questionImages.length} hình\n`;
        }
        textNormal += `${createSeparator("end")}\n`;
        
        let textAI = `\n━━━ ${cauText} [TỰ LUẬN] ━━━\n`;
        if (ctx.text) textAI += `📋 ${ctx.text}\n`;
        if (q.text) textAI += `❓ ${q.text}\n`;
        textAI += `\n`;
        
        return { text: textNormal, textAI, id: cauId, images: questionImages };
      }
      
      // ===== 2. ĐÚNG/SAI =====
      const trueFalse = document.querySelectorAll('.true-false');
      if (trueFalse.length > 0) {
        const titleStatic = document.querySelector('.title-static');
        const ts = titleStatic ? extractIntelligentText(titleStatic) : { text: '', images: [] };
        questionImages = [...ts.images];
        
        const childContents = document.querySelectorAll('.child-content .fadein, .child-content');
        
        let textNormal = `\n${createSeparator("start")}\n`;
        textNormal += `║ ✅ ${cauText} • ĐÚNG/SAI\n`;
        textNormal += `${createSeparator("thin")}\n`;
        if (ts.text) textNormal += `║ 📋 ${ts.text}\n`;
        textNormal += `${createSeparator("thin")}\n`;
        textNormal += `║ 🔘 Các ý:\n`;
        
        let textAI = `\n━━━ ${cauText} [ĐÚNG/SAI] ━━━\n`;
        if (ts.text) textAI += `${ts.text}\n\n`;
        
        const opts = ['a)', 'b)', 'c)', 'd)'];
        childContents.forEach((child, i) => {
          const c = extractIntelligentText(child);
          if (c.text) {
            textNormal += `║    ${opts[i] || (i+1)+')'} ${c.text}\n`;
            textAI += `${opts[i] || (i+1)+')'} ${c.text}\n`;
          }
          questionImages = [...questionImages, ...c.images];
        });
        
        textNormal += `${createSeparator("end")}\n`;
        textAI += `\n`;
        
        return { text: textNormal, textAI, id: cauId, images: questionImages };
      }
      
      // ===== 3. TRẮC NGHIỆM =====
      const questionName = document.querySelector('.question-name');
      const deBai = document.querySelector('.pl-3.pr-3.pt-3 .fadein, .pl-3 p');
      const options = document.querySelectorAll('.question-option');
      
      const qn = questionName ? extractIntelligentText(questionName) : { text: '', images: [] };
      const db = deBai ? extractIntelligentText(deBai) : { text: '', images: [] };
      
      if (!qn.text && !db.text && options.length === 0) return null;
      
      questionImages = [...qn.images, ...db.images];
      
      let textNormal = `\n${createSeparator("start")}\n`;
      textNormal += `║ 🎯 ${cauText} • TRẮC NGHIỆM\n`;
      textNormal += `${createSeparator("thin")}\n`;
      if (db.text) textNormal += `║ 📋 Đề bài: ${db.text}\n`;
      if (qn.text) textNormal += `║ ❓ Câu hỏi: ${qn.text}\n`;
      
      let textAI = `\n━━━ ${cauText} [TRẮC NGHIỆM] ━━━\n`;
      if (db.text) textAI += `📋 ${db.text}\n`;
      if (qn.text) textAI += `❓ ${qn.text}\n\n`;
      
      if (options.length > 0) {
        textNormal += `${createSeparator("thin")}\n`;
        textNormal += `║ 🔘 Lựa chọn:\n`;
        
        options.forEach(opt => {
          const label = opt.querySelector('.question-option-label');
          const content = opt.querySelector('.question-option-content p, .question-option-content');
          
          const lb = label ? (label.textContent || '').trim() : '?';
          const ct = content ? extractIntelligentText(content) : { text: '', images: [] };
          
          if (ct.text) {
            textNormal += `║    ${lb} ${ct.text}\n`;
            textAI += `${lb} ${ct.text}\n`;
          }
          questionImages = [...questionImages, ...ct.images];
        });
      }
      
      if (questionImages.length > 0) {
        textNormal += `${createSeparator("thin")}\n`;
        textNormal += `║ 🖼️ Ảnh: ${questionImages.length} hình\n`;
      }
      
      textNormal += `${createSeparator("end")}\n`;
      textAI += `\n`;
      
      return { text: textNormal, textAI, id: cauId, images: questionImages };
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
        const latex = mjxToLatexExam(mjx);
        mjx.replaceWith(latex ? ` $${latex}$ ` : '');
      });

      // Remove SVG
      clone.querySelectorAll('svg').forEach(svg => svg.remove());

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
        out.push(`║ 📌 CÂU ${q.number} ${q.score ? `(${q.score} điểm)` : ''}`);
        out.push(createSeparator("thin"));

        if (q.title) out.push(`║ 📋 Yêu cầu: ${q.title}`);
        if (q.content) out.push(`║ 📝 Đề bài: ${q.content}`);
        if (q.answerPrompt) out.push(`║ ✏️ Điền: ${q.answerPrompt}`);

        const typeNames = {
          'multiple-choice': 'Trắc nghiệm',
          'true-false': 'Đúng/Sai',
          'fill-blank': 'Điền khuyết',
          'unknown': 'Không xác định'
        };
        out.push(`║ 🏷️ Loại: ${typeNames[q.type] || q.type}`);
        out.push('');

        switch(q.type) {
          case 'multiple-choice':
            out.push('║ 📊 CÁC ĐÁP ÁN:');
            Object.entries(q.data.answers).sort().forEach(([k, v]) => {
              out.push(`║    ${k}. ${v}`);
            });
            break;

          case 'true-false':
            out.push('║ 📊 CÁC MỆNH ĐỀ:');
            q.data.items.forEach(item => {
              out.push(`║    ${item.label} ${item.statement}`);
            });
            break;

          case 'fill-blank':
            out.push(`║ 📊 Số ô trống: ${q.data.blanks.length}`);
            break;
        }

        // ===== THÊM PHẦN HIỂN THỊ ẢNH =====
        if (q.images && q.images.length > 0) {
          out.push(createSeparator("thin"));
          out.push(`║ 🖼️ HÌNH ẢNH (${q.images.length}):`);
          q.images.forEach((img, idx) => {
            if (img.isBase64) {
              out.push(`║    [${idx + 1}] 📊 Base64 Image${img.optionLabel ? ` (${img.optionLabel})` : ''}`);
            } else {
              out.push(`║    [${idx + 1}] 🔗 ${img.url}${img.optionLabel ? ` (${img.optionLabel})` : ''}`);
            }
          });
        }

        out.push(createSeparator("end"));
        out.push('');
      });

      return out.join('\n');
    }

    function formatExamResultsAI(questions) {
      let out = [];

      // ===== THÊM AI PROMPT Ở ĐẦU =====
      out.push(defaultAIPrompt);
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

        out.push(`━━━ Câu ${q.number} [${typeNames[q.type]}] ${q.score ? `(${q.score})` : ''} ━━━`);

        if (q.title) out.push(`📋 ${q.title}`);
        if (q.content) out.push(`📝 ${q.content}`);
        if (q.answerPrompt) out.push(`✏️ ${q.answerPrompt}`);
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
      console.log("📝 Bắt đầu EXAM MODE...");
      showToast('Đang scrape bài thi...', 'info');
      updateStatus('Đang scrape...', 'Quét tất cả câu hỏi', '📝');

      // ========== SCROLL ĐỂ LOAD TẤT CẢ CÂU HỎI ==========
      updateStatus('Đang load...', 'Scroll để tải câu hỏi', '📜');

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

        await fastSleep(80); // Giảm từ 200ms xuống 80ms

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
          updateStatus('Đang load...', `Đã tìm thấy ${currentQuestions} câu`, '📜');
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
      updateStatus('Đang xử lý...', 'Chờ MathJax render', '🔢');

      if (window.MathJax) {
        try {
          if (window.MathJax.typesetPromise) {
            await window.MathJax.typesetPromise();
          } else if (window.MathJax.Hub?.Queue) {
            await new Promise(resolve => window.MathJax.Hub.Queue(() => resolve()));
          }
        } catch (e) {
          console.log('MathJax warning:', e);
        }
      }
      await sleep(500);

      // ========== EXTRACT ==========
      updateStatus('Đang trích xuất...', 'Phân tích câu hỏi & ảnh', '📝');

      const questions = extractAllExam();

      if (questions.length === 0) {
        showToast('Không tìm thấy câu hỏi!', 'error');
        updateStatus('Lỗi!', 'Không tìm thấy câu hỏi', '❌');
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

      window._examQuestions = questions;

      console.log(`✅ Đã scrape ${questionCount} câu hỏi, ${allImages.length} ảnh`);
      console.log('📊 Phân loại:', typeCounts);

      updateStatus('Hoàn thành!', `${questionCount} câu, ${allImages.length} ảnh`, '✅');
      showToast(`Đã scrape ${questionCount} câu, ${allImages.length} ảnh!`, 'success');
    }

    // ============================================================ 
    // 🔄 HOMEWORK MODE MAIN LOOP
    // ============================================================ 
    
    async function runHomeworkMode() {
      console.log("📚 Bắt đầu HOMEWORK MODE...");
      
      // Initialize AI Prompt for Homework Mode
      allResultsAI = defaultAIPrompt + '\n\n' + '═'.repeat(60) + '\n📚 DỮ LIỆU CÂU HỎI CẦN PHÂN TÍCH\n' + '═'.repeat(60) + '\n\n';
      
      showToast('Bắt đầu scrape bài tập...', 'success');
      updateStatus('Đang khởi tạo...', 'Chuẩn bị thu thập', '🚀');

      while (!stopRequested) {
        try {
          // Wait if paused
          while (isPaused && !stopRequested) {
            await fastSleep(200);
          }
          
          if (stopRequested) break;
          
          // Get current ID
          const numDiv = document.querySelector('.num');
          const fullText = numDiv ? (numDiv.textContent || '') : '';
          const idMatch = fullText.match(/#(\d+)/);
          const numMatch = fullText.match(/Câu[:\s]*(\d+)/i);
          const currentId = idMatch ? idMatch[1] : (numMatch ? numMatch[1] : null);
          
          if (panelElements.currentQText) {
            panelElements.currentQText.textContent = currentId ? `Đang xử lý: Câu #${currentId}` : 'Đang tìm câu hỏi...';
          }
          updateStatus('Đang scrape...', `Xử lý câu ${currentId || '...'}`, '📝');
          
          // Extract question - cực nhanh
          const q = await extractQuestionHomework();
          
          if (q && q.id !== lastID) {
            allResults += q.text;
            allResultsAI += q.textAI;
            q.images.forEach(img => allImages.push({ ...img, question: q.id }));
            lastID = q.id;
            questionCount++;
            
            console.log(`✅ Câu ${q.id} (Tổng: ${questionCount})`);
            updateStatus('Thu thập thành công!', `Câu ${q.id} - Tổng: ${questionCount}`, '✅');
          }
          
          if (stopRequested) break;
          
          // Click button - tối ưu tần suất
          updateStatus('Tìm nút tiếp theo...', 'Click liên tục', '🔄', 'Đang tìm...');
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
          updateStatus('Chờ câu mới...', 'Đang load', '⏳');
          await waitForQuestionChange(currentId, 4000);
          
        } catch (err) {
          if (stopRequested) break;
          console.error("❌ Lỗi:", err);
          updateStatus('Lỗi!', err.message, '❌');
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
            console.error("Failed to process image:", e);
            return null;
        }
    };

    function showGeminiSettingsModal() {
        return new Promise((resolve) => {
            const config = getGeminiConfig();
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
                    background: #1e293b; border-radius: 24px; padding: 32px; width: 400px;
                    border: 1px solid rgba(255,255,255,0.1); color: white;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                ">
                    <div style="text-align: center; margin-bottom: 24px;">
                        <div style="color: #8b5cf6; margin-bottom: 16px;">${getIcon('settings', 'scraper-icon-lg')}</div>
                        <h2 style="margin: 0; font-size: 24px;">Cấu hình Gemini</h2>
                    </div>
                    
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

                    <div style="margin-bottom: 32px;">
                        <label style="display: block; margin-bottom: 8px; font-size: 14px; color: #cbd5e1;">Mô hình (Model)</label>
                        <select id="geminiModel" style="
                            width: 100%; padding: 12px; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.1);
                            border-radius: 12px; color: white; outline: none; box-sizing: border-box; cursor: pointer;
                        ">
                            ${modelOptions}
                        </select>
                    </div>

                    <div style="display: flex; gap: 12px;">
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

            document.getElementById('cancelGeminiConfig').onclick = () => {
                overlay.remove();
                resolve(false);
            };

            document.getElementById('saveGeminiConfig').onclick = () => {
                const newConfig = {
                    apiKey: document.getElementById('geminiApiKey').value.trim(),
                    model: document.getElementById('geminiModel').value
                };
                if (!newConfig.apiKey) {
                    alert('Vui lòng nhập API Key!');
                    return;
                }
                saveGeminiConfig(newConfig);
                overlay.remove();
                // Trigger the send action again? Or just resolve true so the caller knows
                // For now, let's just save. The user can click "Send" again.
                // Or better, we handle the flow in the caller.
                resolve(true);
            };
        });
    }

    function showGeminiResponseModal(initialContent, promptData) {
        let initialUserMsg;
        
        // Handle different prompt formats
        if (typeof promptData === 'object' && promptData.role === 'user') {
            initialUserMsg = promptData;
        } else if (Array.isArray(promptData)) {
            initialUserMsg = { role: 'user', parts: promptData };
        } else {
            initialUserMsg = { role: 'user', parts: [{ text: promptData }] };
        }

        let chatHistory = [
            initialUserMsg,
            { role: 'model', parts: [{ text: initialContent }] }
        ];
        
        // Extract text for initial display if parts contain images
        const promptText = initialUserMsg.parts.find(p => p.text)?.text || "Image prompt...";

        // Image handling state
        let imageMode = 'all'; // 'all', 'none', 'custom'
        let selectedImageIndices = new Set(allImages.map((_, i) => i));
        let isImageMenuOpen = false;

        const overlay = document.createElement('div');
        Object.assign(overlay.style, {
            position: 'fixed', top: '0', left: '0', right: '0', bottom: '0',
            background: 'rgba(2, 6, 23, 0.7)', backdropFilter: 'blur(20px) saturate(180%)',
            zIndex: '100003', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            opacity: '0', transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        });



        // Enhanced Markdown formatter
        const formatMessage = (text) => {
            let safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            
            // Code blocks with syntax highlight look
            safeText = safeText.replace(/```(\w*)([\s\S]*?)```/g, (match, lang, code) => {
                return `<div style="background: #020617; border-radius: 12px; margin: 16px 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
                    <div style="background: rgba(255,255,255,0.03); padding: 8px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${lang || 'code'}</span>
                        <div style="display: flex; gap: 4px;"><div style="width: 8px; height: 8px; border-radius: 50%; background: #ff5f56;"></div><div style="width: 8px; height: 8px; border-radius: 50%; background: #ffbd2e;"></div><div style="width: 8px; height: 8px; border-radius: 50%; background: #27c93f;"></div></div>
                    </div>
                    <pre style="padding: 16px; margin: 0; overflow-x: auto; font-family: 'JetBrains Mono', monospace; font-size: 13px; line-height: 1.5; color: #e2e8f0;">${code.trim()}</pre>
                </div>`;
            });

            safeText = safeText.replace(/`([^`]+)`/g, '<code style="background: rgba(99, 102, 241, 0.15); color: #a5b4fc; padding: 2px 6px; border-radius: 6px; font-family: monospace; font-size: 0.9em; border: 1px solid rgba(99, 102, 241, 0.2);">$1</code>');
            safeText = safeText.replace(/\*\*([^*]+)\*\*/g, '<strong style="color: #f8fafc; font-weight: 700;">$1</strong>');
            
            // Lists
            safeText = safeText.replace(/^\s*[-*•]\s*(.+)$/gm, '<div style="display: flex; gap: 10px; margin-bottom: 4px;"><span style="color: #6366f1;">•</span><span>$1</span></div>');

            return safeText.replace(/\n/g, '<br>');
        };

        const appendMessage = (role, text, isLoading = false) => {
            const contentArea = document.getElementById('geminiContentArea');
            if (!contentArea) return;

            if (isLoading) {
                const loader = document.createElement('div');
                loader.id = 'gemini-chat-loader';
                loader.style.cssText = `
                    display: flex; align-items: center; gap: 12px; padding: 20px 24px;
                    background: rgba(30, 41, 59, 0.5); border-radius: 20px; border-bottom-left-radius: 4px;
                    margin-bottom: 24px; align-self: flex-start; max-width: 85%;
                    border: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(8px);
                `;
                loader.innerHTML = `
                    <div style="display: flex; gap: 5px; align-items: center;">
                        <div style="width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%; animation: scraper-bounce 1s infinite ease-in-out both;"></div>
                        <div style="width: 6px; height: 6px; background: #a855f7; border-radius: 50%; animation: scraper-bounce 1s infinite ease-in-out both 0.2s;"></div>
                        <div style="width: 6px; height: 6px; background: #d946ef; border-radius: 50%; animation: scraper-bounce 1s infinite ease-in-out both 0.4s;"></div>
                    </div>
                    <span style="font-size: 13px; color: #94a3b8; font-weight: 500; letter-spacing: 0.3px;">Gemini đang xử lý...</span>
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
                contentSpan.innerHTML = isUser ? text : formatMessage(text);
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
            contentArea.scrollTop = contentArea.scrollHeight;
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
            <div class="glass-panel" style="
                border-radius: 32px; width: 95%; max-width: 1000px; height: 85vh;
                display: flex; flex-direction: column;
                box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.8); overflow: hidden;
                animation: modal-reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            ">
                <!-- Header -->
                <div style="
                    padding: 24px 32px; border-bottom: 1px solid rgba(255,255,255,0.06);
                    display: flex; justify-content: space-between; align-items: center;
                    background: rgba(15, 23, 42, 0.5);
                ">
                    <div style="display: flex; align-items: center; gap: 20px;">
                        <div style="
                            width: 50px; height: 50px; background: linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef);
                            border-radius: 16px; display: flex; align-items: center; justify-content: center;
                            color: white; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
                            animation: scraper-glow 3s infinite;
                        ">
                            ${getIcon('sparkles', 'scraper-icon-md')}
                        </div>
                        <div>
                            <h3 style="margin: 0; color: white; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Plus Jakarta Sans', sans-serif;">Gemini AI Assistant</h3>
                            <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                                <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981;"></div>
                                <span id="currentModelName" style="font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                    ${GEMINI_MODELS.find(m => m.id === getGeminiConfig().model)?.name || 'Unknown Model'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button id="geminiSettingsBtn" style="
                            background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: #cbd5e1;
                            padding: 10px 18px; border-radius: 14px; cursor: pointer; display: flex; align-items: center; gap: 10px;
                            font-size: 14px; transition: all 0.3s; font-weight: 600;
                        " onmouseover="this.style.background='rgba(255,255,255,0.08)';this.style.transform='translateY(-1px)'" 
                           onmouseout="this.style.background='rgba(255,255,255,0.03)';this.style.transform='translateY(0)'">
                            ${getIcon('settings', 'scraper-icon-sm')} Cấu hình
                        </button>
                        <button id="closeGeminiModal" style="
                            background: rgba(239, 68, 68, 0.05); border: 1px solid rgba(239, 68, 68, 0.1); color: #f87171;
                            width: 44px; height: 44px; border-radius: 14px; cursor: pointer;
                            display: flex; align-items: center; justify-content: center; transition: all 0.3s;
                        " onmouseover="this.style.background='rgba(239, 68, 68, 0.2)';this.style.transform='rotate(90deg)'" 
                           onmouseout="this.style.background='rgba(239, 68, 68, 0.05)';this.style.transform='rotate(0)'">
                            ${getIcon('x')}
                        </button>
                    </div>
                </div>
                
                <!-- Chat Area -->
                <div id="geminiContentArea" class="chat-scrollbar" style="
                    flex: 1; overflow-y: auto; padding: 40px; background: transparent;
                    display: flex; flex-direction: column; gap: 10px;
                    background-image: radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.03) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(217, 70, 239, 0.03) 0px, transparent 50%);
                ">
                    <div style="text-align: center; margin-bottom: 40px;">
                        <span style="background: rgba(255,255,255,0.03); padding: 6px 16px; border-radius: 20px; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; border: 1px solid rgba(255,255,255,0.05);">Phiên làm việc mới</span>
                    </div>
                </div>

                <!-- Input Area -->
                <div style="
                    padding: 24px 40px; border-top: 1px solid rgba(255,255,255,0.06);
                    background: rgba(15, 23, 42, 0.4); display: flex; flex-direction: column; gap: 12px;
                ">
                    <!-- Image Preview Strip -->
                    <div id="imagePreviewContainer" class="chat-scrollbar" style="
                        display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 4px;
                        ${allImages.length === 0 ? 'display: none;' : ''}
                    "></div>

                    <div style="
                        background: #0f172a; border: 1.5px solid rgba(255,255,255,0.08);
                        border-radius: 24px; padding: 10px; display: flex; gap: 12px;
                        transition: all 0.3s ease; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                        align-items: flex-end;
                    " id="inputContainer">
                        
                        <!-- Image Control Button -->
                        ${allImages.length > 0 ? `
                        <div style="position: relative;">
                            <button id="imageModeBtn" style="
                                width: 44px; height: 44px; background: transparent; color: #6366f1;
                                border: none; border-radius: 14px; cursor: pointer;
                                display: flex; align-items: center; justify-content: center; transition: all 0.2s;
                                background: rgba(99, 102, 241, 0.1);
                            " title="Tùy chọn ảnh">
                                ${getIcon('image')}
                            </button>
                            <div id="imageModeMenu" style="
                                position: absolute; bottom: 55px; left: 0; width: 180px;
                                background: #1e293b; border: 1px solid rgba(255,255,255,0.1);
                                border-radius: 16px; padding: 6px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
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

        appendMessage('user', promptText);
        appendMessage('model', initialContent);

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
                loadingMsg.innerHTML = `<span style="font-size: 11px; color: #94a3b8;">🔄 Đang xử lý ${indices.length} ảnh...</span>`;
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

        document.getElementById('clearChatBtn').onclick = () => {
            if (confirm('Bắt đầu lại cuộc hội thoại mới?')) {
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

        document.getElementById('closeGeminiModal').onclick = () => {
             overlay.style.opacity = '0';
             overlay.style.transform = 'scale(1.02)';
             setTimeout(() => overlay.remove(), 400);
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

    // ============================================================ 
    // 🎨 RESULT DISPLAY UI
    // ============================================================ 

    function showResultsUI() {
      const elapsedTotal = Math.floor((Date.now() - startTime) / 1000);
      const minsTotal = Math.floor(elapsedTotal / 60);
      const secsTotal = elapsedTotal % 60;

      const resultContainer = document.createElement('div');
      Object.assign(resultContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0d1b2a 100%)',
        zIndex: '9999',
        overflowY: 'auto',
        fontFamily: "'Inter', -apple-system, sans-serif"
      });

      const modeLabel = currentMode === 'homework' ? 'BÀI TẬP' : 'BÀI THI';
      const modeIcon = currentMode === 'homework' ? getIcon('book', 'scraper-icon-md') : getIcon('fileText', 'scraper-icon-md');

      resultContainer.innerHTML = `
        <div style="max-width: 1100px; margin: 0 auto; padding: 40px 24px;">
          
          <!-- Hero Header -->
          <div style="
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
            border: 1px solid rgba(99, 102, 241, 0.3);
            border-radius: 32px;
            padding: 48px;
            text-align: center;
            margin-bottom: 32px;
            position: relative;
            overflow: hidden;
          ">
            <div style="position: relative; z-index: 1;">
              <div style="color: #a5b4fc; margin-bottom: 20px;">${getIcon('rocket', 'scraper-icon-lg')}</div>
              <h1 style="
                font-size: 36px;
                font-weight: 800;
                background: linear-gradient(135deg, #fff, #a5b4fc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 0 0 12px 0;
              ">Scrape Hoàn Thành!</h1>
              <p style="color: rgba(255,255,255,0.7); font-size: 16px; margin: 0; display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${modeIcon} Chế độ: ${modeLabel}
              </p>
              <div style="
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: rgba(255,255,255,0.1);
                padding: 8px 16px;
                border-radius: 20px;
                margin-top: 16px;
                color: rgba(255,255,255,0.8);
                font-size: 14px;
              ">
                ${getIcon('clock', 'scraper-icon-sm')}
                <span>Thời gian: ${minsTotal}m ${secsTotal}s</span>
              </div>
            </div>
          </div>
          
          <!-- Stats Cards -->
          <div style="
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 32px;
          ">
            <div class="scraper-stat-card" style="
              background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05));
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 20px;
              padding: 24px;
              text-align: center;
            ">
              <div style="font-size: 42px; font-weight: 800; color: #10b981;">${questionCount}</div>
              <div style="color: #6ee7b7; font-size: 13px; font-weight: 600; margin-top: 4px;">CÂU HỎI</div>
            </div>
            
            <div class="scraper-stat-card" style="
              background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05));
              border: 1px solid rgba(59, 130, 246, 0.3);
              border-radius: 20px;
              padding: 24px;
              text-align: center;
            ">
              <div style="font-size: 42px; font-weight: 800; color: #3b82f6;">${allImages.length}</div>
              <div style="color: #93c5fd; font-size: 13px; font-weight: 600; margin-top: 4px;">HÌNH ẢNH</div>
            </div>
            
            <div class="scraper-stat-card" style="
              background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05));
              border: 1px solid rgba(139, 92, 246, 0.3);
              border-radius: 20px;
              padding: 24px;
              text-align: center;
            ">
              <div style="font-size: 42px; font-weight: 800; color: #8b5cf6;">${allResults.length}</div>
              <div style="color: #c4b5fd; font-size: 13px; font-weight: 600; margin-top: 4px;">KÝ TỰ</div>
            </div>
            
            <div class="scraper-stat-card" style="
              background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.05));
              border: 1px solid rgba(236, 72, 153, 0.3);
              border-radius: 20px;
              padding: 24px;
              text-align: center;
            ">
              <div id="currentModeDisplay" style="color: #ec4899; display: flex; align-items: center; justify-content: center; height: 50px;">
                ${isAIMode ? getIcon('bot', 'scraper-icon-lg') : getIcon('fileText', 'scraper-icon-lg')}
              </div>
              <div style="color: #f9a8d4; font-size: 13px; font-weight: 600; margin-top: 4px;">
                ${isAIMode ? 'CHẾ ĐỘ AI' : 'CHẾ ĐỘ THƯỜNG'}
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div style="
            display: flex;
            gap: 12px;
            margin-bottom: 32px;
            flex-wrap: wrap;
          ">
            <button id="copyAllBtn" class="scraper-btn" style="
              flex: 1;
              min-width: 150px;
              padding: 18px 24px;
              background: linear-gradient(135deg, #10b981, #059669);
              color: white;
              border: none;
              border-radius: 16px;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              cursor: pointer;
            ">
              ${getIcon('copy')}
              <span>Copy Toàn Bộ</span>
            </button>
            
            <button id="copyImgBtn" class="scraper-btn" style="
              flex: 1;
              min-width: 150px;
              padding: 18px 24px;
              background: linear-gradient(135deg, #3b82f6, #2563eb);
              color: white;
              border: none;
              border-radius: 16px;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              cursor: pointer;
            ">
              ${getIcon('image')}
              <span>Copy Link Ảnh</span>
            </button>
            
            <button id="toggleModeResultBtn" class="scraper-btn" style="
              flex: 1;
              min-width: 150px;
              padding: 18px 24px;
              background: linear-gradient(135deg, #8b5cf6, #7c3aed);
              color: white;
              border: none;
              border-radius: 16px;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              cursor: pointer;
            ">
              ${isAIMode ? getIcon('fileText') : getIcon('bot')}
              <span>${isAIMode ? 'Chế độ Thường' : 'Chế độ AI'}</span>
            </button>
            
            <button id="downloadBtn" class="scraper-btn" style="
              flex: 1;
              min-width: 150px;
              padding: 18px 24px;
              background: linear-gradient(135deg, #10b981, #059669);
              color: white;
              border: none;
              border-radius: 16px;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              cursor: pointer;
            ">
              ${getIcon('download')}
              <span>Tải File</span>
            </button>
            
            ${allImages.length > 0 ? `
            <label style="
                display: flex; align-items: center; gap: 8px; cursor: pointer;
                background: rgba(99, 102, 241, 0.1); padding: 0 16px; border-radius: 16px;
                border: 1px solid rgba(99, 102, 241, 0.3); flex: 0 0 auto;
                transition: all 0.2s; user-select: none;
            " onmouseover="this.style.background='rgba(99, 102, 241, 0.2)'" onmouseout="this.style.background='rgba(99, 102, 241, 0.1)'">
                <input type="checkbox" id="sendWithImagesCb" checked style="width: 18px; height: 18px; accent-color: #8b5cf6; cursor: pointer;">
                <span style="color: #e2e8f0; font-size: 14px; font-weight: 600;">Gửi kèm ảnh</span>
            </label>
            ` : ''}

            <button id="sendGeminiBtn" class="scraper-btn" style="
              flex: 1;
              min-width: 150px;
              padding: 18px 24px;
              background: linear-gradient(135deg, #8b5cf6, #7c3aed);
              color: white;
              border: none;
              border-radius: 16px;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
            ">
              <div style="
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: scraper-shimmer 2s infinite;
              "></div>
              ${getIcon('sparkles')}
              <span>Gửi Gemini</span>
            </button>
            
            <button id="closeResultBtn" class="scraper-btn" style="
              flex: 1;
              min-width: 150px;
              padding: 18px 24px;
              background: linear-gradient(135deg, #6b7280, #4b5563);
              color: white;
              border: none;
              border-radius: 16px;
              font-size: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              cursor: pointer;
            ">
              ${getIcon('x')}
              <span>Đóng</span>
            </button>
          </div>
          
          <!-- Images Gallery -->
          ${allImages.length > 0 ? `
            <div style="
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              border-radius: 24px;
              padding: 24px;
              margin-bottom: 32px;
            ">
            <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 20px;
            ">
              <h3 style="color: white; margin: 0; font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                ${getIcon('image')} Thư viện Hình ảnh
              </h3>
              <div style="display: flex; gap: 10px; align-items: center;">
                <span style="color: #9ca3af; font-size: 12px;">Click để phóng to</span>
                <span style="
                  background: rgba(59, 130, 246, 0.2);
                  color: #93c5fd;
                  padding: 6px 14px;
                  border-radius: 20px;
                  font-size: 13px;
                  font-weight: 600;
                ">${allImages.length} ảnh</span>
              </div>
            </div>

            <div class="scraper-image-grid scraper-scrollbar" style="max-height: 320px; overflow-y: auto; padding-right: 8px;">
              ${allImages.slice(0, 100).map((img, i) => {
                const optionLabelPart = img.optionLabel ? ' • ' + img.optionLabel : '';
                const html = `<div class="scraper-image-card" 
                     data-img-index="${i}" 
                     style="
                       background: rgba(255,255,255,0.05); 
                       border: 1px solid rgba(255,255,255,0.1); 
                       position: relative; 
                     ">
                  <img src="${img.fullUrl || img.url}" 
                       style="
                         width: 100%; 
                         height: 90px; 
                         object-fit: cover; 
                         display: block; 
                       " 
                       onerror='this.style.display="none"; this.nextElementSibling.style.display="flex";'>
                  <div style="
                    display: none; 
                    padding: 30px; 
                    text-align: center; 
                    color: #6b7280; 
                    height: 90px; 
                    align-items: center; 
                    justify-content: center; 
                  ">${getIcon('image')}</div>
                  <div style="
                    padding: 10px; 
                    background: rgba(0,0,0,0.3); 
                  ">
                    <div style="color: white; font-size: 12px; font-weight: 600;">
                      Câu ${img.question}${optionLabelPart}
                    </div>
                    <div style="color: #9ca3af; font-size: 10px; margin-top: 2px;">
                      ${img.isBase64 ? '📊 Base64' : '🔗 URL'} • Click để xem
                    </div>
                  </div>
                </div>`;
                return html;
              }).join('')}
            </div>
          </div>
          ` : ''}
          
          <!-- Content Display -->
          <div style="
            background: rgba(255,255,255,0.98);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 80px rgba(0,0,0,0.3);
          ">
            <div style="
              background: linear-gradient(135deg, #f8fafc, #f1f5f9);
              padding: 20px 28px;
              border-bottom: 1px solid #e2e8f0;
              display: flex;
              align-items: center;
              justify-content: space-between;
            ">
              <div style="display: flex; align-items: center; gap: 12px;">
                ${getIcon('fileText', 'scraper-icon-md', 'color: #1e293b')}
                <span style="font-weight: 700; color: #1e293b; font-size: 16px;">Nội dung thu thập</span>
              </div>
              <div style="display: flex; gap: 6px;">
                <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%;"></div>
                <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%;"></div>
                <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></div>
              </div>
            </div>
            
            <pre id="resultContent" class="scraper-scrollbar" style="
              font-family: 'JetBrains Mono', 'Fira Code', monospace;
              font-size: 13px;
              line-height: 1.7;
              padding: 28px;
              margin: 0;
              color: #334155;
              max-height: 60vh;
              overflow-y: auto;
              white-space: pre-wrap;
              word-wrap: break-word;
            "></pre>
          </div>
          
          <!-- Footer -->
          <div style="
            text-align: center;
            padding: 32px;
            color: rgba(255,255,255,0.4);
            font-size: 13px;
          ">
            <!-- Open Source Section -->
            <div style="
                background: rgba(99, 102, 241, 0.05);
                border: 1px dashed rgba(99, 102, 241, 0.3);
                border-radius: 20px;
                padding: 24px;
                margin-bottom: 24px;
                animation: scraper-slide-up 0.6s ease;
            ">
                <div style="color: #a5b4fc; margin-bottom: 12px;">${getIcon('github', 'scraper-icon-lg')}</div>
                <h4 style="color: white; margin: 0 0 8px 0; font-size: 16px; font-weight: 700;">Dự án Nguồn Mở (Open Source)</h4>
                <p style="color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.6; margin-bottom: 16px; max-width: 600px; margin-left: auto; margin-right: auto;">
                    Extension này hoàn toàn miễn phí và mã nguồn mở. Chúng mình rất trân trọng mọi sự đóng góp, ý tưởng hoặc báo lỗi từ cộng đồng qua Pull Requests!
                </p>
                <a href="https://github.com/Trongdepzai-dev/onluyen-scraper-extension" target="_blank" style="
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #24292f;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.3s;
                    border: 1px solid rgba(255,255,255,0.1);
                " onmouseover="this.style.background='#333';this.style.transform='translateY(-2px)'" onmouseout="this.style.background='#24292f';this.style.transform='translateY(0)'">
                    ${getIcon('github', 'scraper-icon-sm')} Đóng góp trên GitHub
                </a>
            </div>

            <div style="margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 6px;">
              ${getIcon('rocket')} Auto Scraper v${chrome.runtime.getManifest().version} • ${new Date().toLocaleString('vi-VN')}
            </div>
            <div style="display: flex; gap: 8px; justify-content: center;">
              <span style="
                background: rgba(99, 102, 241, 0.2);
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 11px;
                color: #a5b4fc;
              ">MathJax OCR</span>
              <span style="
                background: rgba(16, 185, 129, 0.2);
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 11px;
                color: #6ee7b7;
              ">Image Extract</span>
              <span style="
                background: rgba(236, 72, 153, 0.2);
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 11px;
                color: #f9a8d4;
              ">AI Ready</span>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(resultContainer);

      // Button handlers
      const resultContent = document.getElementById('resultContent');
      const currentModeDisplay = document.getElementById('currentModeDisplay');

      // Set content safely using textContent to prevent HTML injection
      resultContent.textContent = isAIMode ? allResultsAI : allResults;

      // ===== IMAGE LIGHTBOX EVENTS =====
      const imageCards = resultContainer.querySelectorAll('.scraper-image-card[data-img-index]');
      imageCards.forEach(card => {
        card.addEventListener('click', (e) => {
          e.stopPropagation();
          const index = parseInt(card.dataset.imgIndex);
          if (!isNaN(index) && allImages[index]) {
            createImageLightbox(allImages, index);
          }
        });
      });

      // Hover effect for image cards
      imageCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          card.style.transform = 'scale(1.05)';
          card.style.zIndex = '10';
          card.style.boxShadow = '0 10px 40px rgba(99, 102, 241, 0.3)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          card.style.zIndex = '';
          card.style.boxShadow = '';
        });
      });

      document.getElementById('copyAllBtn').onclick = async () => {
        const btn = document.getElementById('copyAllBtn');
        try {
          await navigator.clipboard.writeText(isAIMode ? allResultsAI : allResults);
          btn.innerHTML = `${getIcon('check')}<span>Đã Copy!</span>`;
          btn.style.background = 'linear-gradient(135deg, #059669, #047857)';
          setTimeout(() => {
            btn.innerHTML = `${getIcon('copy')}<span>Copy Toàn Bộ</span>`;
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
          }, 2000);
        } catch (err) {
          btn.innerHTML = `${getIcon('x')}<span>Lỗi!</span>`;
          setTimeout(() => {
            btn.innerHTML = `${getIcon('copy')}<span>Copy Toàn Bộ</span>`;
          }, 2000);
        }
      };

      document.getElementById('copyImgBtn').onclick = async () => {
        const btn = document.getElementById('copyImgBtn');
        try {
          const imageLinks = allImages.map((img, i) => {
            if (img.isBase64) return `${i + 1}. [Base64 - Câu ${img.question}]`;
            return `${i + 1}. ${img.fullUrl || img.url}`;
          }).join('\n');
          await navigator.clipboard.writeText(imageLinks || 'Không có ảnh nào');
          btn.innerHTML = `${getIcon('check')}<span>Đã Copy!</span>`;
          setTimeout(() => {
            btn.innerHTML = `${getIcon('image')}<span>Copy Link Ảnh</span>`;
          }, 2000);
        } catch (err) {
          btn.innerHTML = `${getIcon('x')}<span>Lỗi!</span>`;
          setTimeout(() => {
            btn.innerHTML = `${getIcon('image')}<span>Copy Link Ảnh</span>`;
          }, 2000);
        }
      };

      document.getElementById('toggleModeResultBtn').onclick = () => {
        const btn = document.getElementById('toggleModeResultBtn');
        isAIMode = !isAIMode;
        resultContent.textContent = isAIMode ? allResultsAI : allResults;
        currentModeDisplay.innerHTML = isAIMode ? getIcon('bot', 'scraper-icon-lg') : getIcon('fileText', 'scraper-icon-lg');
        currentModeDisplay.parentElement.querySelector('div:last-child').textContent = 
          isAIMode ? 'CHẾ ĐỘ AI' : 'CHẾ ĐỘ THƯỜNG';
        btn.innerHTML = isAIMode 
          ? `${getIcon('fileText')}<span>Chế độ Thường</span>`
          : `${getIcon('bot')}<span>Chế độ AI</span>`;
      };

      document.getElementById('downloadBtn').onclick = () => {
        const content = isAIMode ? allResultsAI : allResults;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `questions_${currentMode}_${new Date().toISOString().slice(0,10)}_${questionCount}cau.txt`;
        a.click();
        URL.revokeObjectURL(url);
        
        const btn = document.getElementById('downloadBtn');
        btn.innerHTML = `${getIcon('check')}<span>Đã Tải!</span>`;
        setTimeout(() => {
          btn.innerHTML = `${getIcon('download')}<span>Tải File</span>`;
        }, 2000);
      };

      document.getElementById('sendGeminiBtn').onclick = async () => {
        const config = getGeminiConfig();
        if (!config.apiKey) {
            showGeminiSettingsModal();
            return;
        }

        const btn = document.getElementById('sendGeminiBtn');
        const originalContent = btn.innerHTML;
        const cb = document.getElementById('sendWithImagesCb');
        const sendImages = cb ? cb.checked : false;

        btn.innerHTML = `${getIcon('loader', 'scraper-icon-spin')}<span>${sendImages ? 'Xử lý ảnh...' : 'Đang gửi...'}</span>`;
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
                     finalPrompt = {
                         role: 'user',
                         parts: [
                             { text: textContent },
                             ...imageParts
                         ]
                     };
                 }
            }

            // Prepare for API
            let apiPayload;
            if (typeof finalPrompt === 'object') {
                apiPayload = [finalPrompt];
            } else {
                apiPayload = finalPrompt;
            }

            const response = await callGeminiAPI(apiPayload, config.apiKey, config.model);
            showGeminiResponseModal(response, finalPrompt);
        } catch (error) {
            console.error(error);
            alert('Lỗi khi gửi đến Gemini: ' + error.message);
            // If API key is invalid, maybe show settings again?
            if (error.message.includes('400') || error.message.includes('API key')) {
                 showGeminiSettingsModal();
            }
        } finally {
            btn.innerHTML = originalContent;
            btn.disabled = false;
        }
      };

      document.getElementById('closeResultBtn').onclick = () => {
        resultContainer.remove();
        window.hasRunScraper = false;
      };
    }

    // ============================================================ 
    // 🚀 MAIN EXECUTION
    // ============================================================ 

    // Reset stop flag for new run
    stopRequested = false;

    // Check for updates first
    await checkUpdate();

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
      await runHomeworkMode();
    }

    if (stopRequested) return;

    // Finish
    console.log("✅ Hoàn thành scrape!");
    showToast(`Hoàn thành! ${questionCount} câu, ${allImages.length} ảnh`, 'success', 5000);
    createConfetti();
    updateStatus('🎉 Hoàn thành!', `${questionCount} câu, ${allImages.length} ảnh`, '🎊');

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
