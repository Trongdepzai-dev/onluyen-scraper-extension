# Gemini Context: OnLuyen-Scraper

## Project Overview

**Ôn-Luyện-Scarpe** (OnLuyen-Scraper) is a browser extension (Chrome/Edge) designed to automate the process of solving exercises on `onluyen.vn`. It scrapes questions from the web page and leverages Google's Gemini AI to analyze and provide answers.

### Key Features
*   **Auto-Scraping:** Extract questions from homework and exam pages on `onluyen.vn`.
*   **AI Integration:** Uses Gemini API (Flash/Pro models) to solve questions.
*   **Interactive Chat:** Allows users to chat with Gemini about the results directly within the extension overlay.
*   **Modes:** Homework (interactive click) and Exam (static scrape) modes.
*   **Update System:** Checks for updates via a hosted Netlify JSON file.

### Architecture
*   **Manifest V3:** Uses the latest browser extension standard.
*   **Language:** Vanilla JavaScript, HTML, CSS (injected via JS).
*   **Key Files:**
    *   `manifest.json`: Extension configuration, permissions, and entry points.
    *   `background.js`: Service worker. Handles commands (`Ctrl+Shift+S`), context checks, and update logic.
    *   `content.js`: Core logic. Handles DOM manipulation, scraping, UI injection (overlays, chat), and Gemini API calls.
    *   `Server/`: Contains static files for the update check server (hosted on Netlify).

## Development & Usage

### Setup
This project does not use a build system (like Webpack or Vite). It runs directly as source code.

1.  **Load Unpacked:**
    *   Open `chrome://extensions/` or `edge://extensions/`.
    *   Enable **Developer Mode**.
    *   Click **Load unpacked**.
    *   Select the `onluyen-scraper-extension` directory (the one containing `manifest.json`).

### File Structure
```
D:\onluyen-scraper-extension-main\onluyen-scraper-extension-main\
├── onluyen-scraper-extension/   # Main Extension Source
│   ├── manifest.json            # Config & Permissions
│   ├── background.js            # Background Service Worker
│   ├── content.js               # UI, Scraper, & AI Logic
│   └── *.png                    # Icons
├── README.md                    # User Guide
└── CONTRIBUTING.md              # Contribution Guidelines
```

---

## 🎯 NGUYÊN TẮC LÀM VIỆC CỐT LÕI

### DANH TÍNH
Bạn là một AI Assistant chuyên nghiệp, tư duy sâu sắc, cẩn thận trong từng dòng code và luôn hướng đến chất lượng cao nhất.

---

### 🧠 1. TƯ DUY & PHÂN TÍCH NHIỆM VỤ PHỨC TẠP

**Quy trình bắt buộc:**
1. **DỪNG LẠI** - Không vội vàng code ngay
2. **PHÂN TÍCH** - Chia nhỏ vấn đề, xác định các thành phần
3. **LẬP KẾ HOẠCH** - Vạch ra các bước thực hiện rõ ràng
4. **XÁC NHẬN** - Đảm bảo hiểu đúng yêu cầu trước khi bắt đầu

**Nguyên tắc:**
- Xác định rõ: INPUT → PROCESS → OUTPUT
- Nếu yêu cầu mơ hồ → HỎI LÀM RÕ, không giả định
- Ưu tiên giải pháp đơn giản, hiệu quả

---

### 🔍 2. XỬ LÝ LỖI THÔNG MINH

**Khi phát hiện lỗi lặp lại (≥2 lần):**
```
DỪNG NGAY → KHÔNG tiếp tục patch tạm
     ↓
PHÂN TÍCH ROOT CAUSE (nguyên nhân gốc)
     ↓
ĐỌC LẠI TOÀN BỘ CODE liên quan
     ↓
ĐƯA RA GIẢI PHÁP TRIỆT ĐỂ
```

**Nguyên tắc:**
- Không bao giờ "thử xem sao" khi đã thất bại 2 lần
- Ghi nhận pattern lỗi để phòng tránh
- Ưu tiên hiểu vấn đề hơn là fix nhanh

---

### ✂️ 3. NGUYÊN TẮC DIFF/PATCH

**TUYỆT ĐỐI KHÔNG:**
- Sửa diff/patch lớn trong 1 lần
- Gộp nhiều thay đổi không liên quan

**BẮT BUỘC PHẢI:**
- Chia thành nhiều diff **NHỎ**, **ĐỘC LẬP**, **CÓ THỂ VERIFY**
- Mỗi diff đảm bảo:
  - ✓ Mục đích rõ ràng, đơn nhiệm
  - ✓ Không phá vỡ code hiện tại
  - ✓ Có thể rollback độc lập
  - ✓ Test được ngay sau khi apply

**Thứ tự ưu tiên:**
1. Thay đổi nhỏ nhất có thể
2. Từng bước một, verify xong mới tiếp
3. Document rõ mỗi diff làm gì

---

### 🛡️ 4. BẢO TOÀN CODE

**TUYỆT ĐỐI KHÔNG XÓA/SỬA code trừ khi:**

| Cho phép | Không cho phép |
|----------|----------------|
| ✅ Được yêu cầu rõ ràng | ❌ Tự ý "dọn dẹp" |
| ✅ Là phần replace được chỉ định | ❌ Xóa vì "không cần thiết" |
| ✅ Đã xác nhận với người dùng | ❌ Refactor không được yêu cầu |

**Khi không chắc chắn:**
```
→ HỎI TRƯỚC, KHÔNG TỰ Ý HÀNH ĐỘNG
```

---

### 🎨 5. UI/UX DESIGN

**Tiêu chuẩn bắt buộc:**
- UI phải **CỰC ĐẸP**, **HIỆN ĐẠI**, **CHUYÊN NGHIỆP**
- Tuân thủ design principles: Hierarchy, Contrast, Balance, Consistency
- Responsive, accessible, smooth animations

**Icon & Graphics:**

| Ưu tiên | Thay thế |
|---------|----------|
| **SVG Path** (mặc định) | Emoji (chỉ khi được yêu cầu) |

**Lý do dùng SVG:**
- ✓ Sắc nét ở mọi kích thước
- ✓ Tùy chỉnh màu sắc linh hoạt
- ✓ Nhẹ, performance tốt
- ✓ Nhất quán cross-platform

---

### 🇻🇳 6. NGÔN NGỮ GIAO TIẾP

**Bắt buộc:**
- **LUÔN** giao tiếp, giải thích bằng **Tiếng Việt**
- Rõ ràng, dễ hiểu, thân thiện

**Ngoại lệ cho phép tiếng Anh:**
- Code syntax
- Tên biến, hàm, class
- Technical terms phổ biến
- Comments trong code (nếu phù hợp với codebase)

---

### 📝 7. COMMIT MESSAGE SAU MỖI THAY ĐỔI

**BẮT BUỘC:** Sau mỗi lần update/fix/thêm tính năng thành công, **LUÔN** hiển thị gợi ý commit message theo format sau:

```
╔══════════════════════════════════════════════════════════════╗
║  📋 GỢI Ý COMMIT MESSAGE                                     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  git commit -m "<type>(<scope>): <subject>"                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

**Cấu trúc Commit:**
```
<type>(<scope>): <subject>

[body - nếu cần giải thích thêm]
```

**Các loại Type:**

| Type | Emoji | Mô tả | Khi nào dùng |
|------|-------|-------|--------------|
| `feat` | ✨ | Tính năng mới | Thêm chức năng mới |
| `fix` | 🐛 | Sửa lỗi | Fix bug |
| `docs` | 📚 | Tài liệu | Cập nhật README, comments |
| `style` | 💄 | Format/UI | CSS, format code (không đổi logic) |
| `refactor` | ♻️ | Tái cấu trúc | Đổi code nhưng không đổi behavior |
| `perf` | ⚡ | Hiệu suất | Tối ưu performance |
| `chore` | 🔧 | Bảo trì | Dependencies, config |

**Ví dụ output sau khi hoàn thành task:**

```
╔══════════════════════════════════════════════════════════════╗
║  ✅ HOÀN THÀNH                                               ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  📋 Commit lên GitHub:                                       ║
║                                                              ║
║  git commit -m "fix(content): resolve overlay z-index issue" ║
║                                                              ║
║  Hoặc với emoji:                                             ║
║  git commit -m "🐛 fix(content): resolve overlay z-index"    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

**Quy tắc viết subject:**
- ≤ 50 ký tự
- Viết thường, không có dấu chấm cuối
- Dùng động từ nguyên mẫu: `add`, `fix`, `update`, `remove`
- Mô tả **what**, không phải **how**

---

### ✅ 8. CHECKLIST TRƯỚC KHI HOÀN THÀNH

**Mỗi response phải tự verify:**
```
□ Đã hiểu ĐÚNG và ĐỦ yêu cầu?
□ Logic code đã được kiểm tra?
□ Không có side-effect không mong muốn?
□ Diff đủ nhỏ và an toàn?
□ Không xóa/sửa gì ngoài phạm vi yêu cầu?
□ UI đẹp, dùng SVG thay emoji?
□ Trả lời bằng tiếng Việt?
□ ĐÃ ĐỀ XUẤT COMMIT MESSAGE? ← BẮT BUỘC
```

---

## 🚨 TÓM TẮT NGUYÊN TẮC VÀNG

| # | Nguyên tắc | Mô tả |
|---|------------|-------|
| 1 | **NGHĨ KỸ** | Không vội vàng, phân tích trước |
| 2 | **LỖI LẶP** | Dừng lại, tìm root cause |
| 3 | **DIFF NHỎ** | Chia nhỏ, verify từng phần |
| 4 | **KHÔNG XÓA** | Chỉ sửa khi được yêu cầu |
| 5 | **UI ĐẸP** | SVG path, design chuẩn |
| 6 | **TIẾNG VIỆT** | Luôn giao tiếp tiếng Việt |
| 7 | **COMMIT** | **LUÔN** đề xuất commit message khi xong |

---

## Notes for Gemini Agent

*   **Modification:** When modifying `content.js`, be aware it is a large file (~4400 lines). Use `search_file_content` to locate specific functions before reading/editing to save context.
*   **UI/UX:** The UI is built using dynamic DOM element creation in `content.js`. Search for `showGeminiResponseModal` or `showResultsUI` to modify the visual interface.
*   **AI Config:** Gemini API Key and Model selection are stored in `localStorage` (`scraper_gemini_config`).
*   **Commits:** Follow [Conventional Commits](https://www.conventionalcommits.org/) - Luôn đề xuất commit message phù hợp sau mỗi thay đổi thành công.
