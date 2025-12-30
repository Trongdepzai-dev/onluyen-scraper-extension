<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=Update%20Guide&fontSize=42&fontColor=fff&animation=fadeIn&fontAlignY=35&desc=Hướng%20dẫn%20cập%20nhật%20Extension%20Chrome&descSize=18&descAlignY=55"/>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Chrome Extension"/>
  <img src="https://img.shields.io/badge/Manual-Update-FF9800?style=for-the-badge&logo=update&logoColor=white" alt="Manual Update"/>
  <img src="https://img.shields.io/badge/Version-Latest-00C853?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Latest Version"/>
</p>

<br/>

### 📌 *Hướng dẫn chi tiết cài đặt và cập nhật extension thủ công trên Chrome*

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

## 📋 Mục Lục

<div align="center">

| # | Nội dung | Mô tả |
|:---:|:---|:---|
| 1️⃣ | [Mở trang Extensions](#-bước-1-mở-trang-extensions) | Truy cập trang quản lý |
| 2️⃣ | [Giải nén file](#-bước-2-giải-nén-file) | Chuẩn bị thư mục |
| 3️⃣ | [Tải tiện ích](#-bước-3-tải-tiện-ích) | Load extension |
| 4️⃣ | [Chọn thư mục](#-bước-4-chọn-thư-mục) | Chọn đúng folder |
| 5️⃣ | [Tắt phiên bản cũ](#-bước-5-tắt-phiên-bản-cũ) | Quản lý version |

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

## 🚀 Các Bước Thực Hiện

<div align="center">

```mermaid
graph LR
    A[🌐 Mở Extensions] --> B[📦 Giải nén file]
    B --> C[⬆️ Load unpacked]
    C --> D[📁 Chọn thư mục]
    D --> E[🔄 Tắt bản cũ]
    E --> F[✅ Hoàn tất]
    
    style A fill:#E3F2FD,stroke:#1976D2,stroke-width:2px
    style B fill:#E8F5E9,stroke:#388E3C,stroke-width:2px
    style C fill:#FFF3E0,stroke:#F57C00,stroke-width:2px
    style D fill:#FCE4EC,stroke:#C2185B,stroke-width:2px
    style E fill:#EDE7F6,stroke:#7B1FA2,stroke-width:2px
    style F fill:#E0F7FA,stroke:#0097A7,stroke-width:2px
```

</div>

<br/>

### 📍 Bước 1: Mở trang Extensions

<div align="center">

> Truy cập vào trang quản lý tiện ích của Chrome

<br/>

```
chrome://extensions/
```

<br/>

💡 **Mẹo:** Copy đường dẫn trên và paste trực tiếp vào thanh địa chỉ của Chrome

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

### 📍 Bước 2: Giải nén file

<div align="center">

> Giải nén file extension vừa được tải về máy

<br/>

| Định dạng | Cách giải nén | Công cụ |
|:---:|:---|:---:|
| `.zip` | Click chuột phải → **Extract All** | 🪟 Windows |
| `.rar` | Dùng phần mềm giải nén | WinRAR / 7-Zip |
| `.7z` | Dùng phần mềm giải nén | 7-Zip |

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

### 📍 Bước 3: Tải tiện ích

<div align="center">

| Bước | Hành động |
|:---:|:---|
| 1️⃣ | Bật **Developer mode** ở góc phải trên |
| 2️⃣ | Click nút **"Load unpacked"** |

<br/>

> 🔧 Developer mode cho phép bạn cài đặt extension từ thư mục local

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

### 📍 Bước 4: Chọn thư mục

<div align="center">

> Chọn đúng thư mục extension

<br/>

<img width="117" height="129" alt="Thư mục extension" src="https://github.com/user-attachments/assets/5e073b18-8f0d-4016-bfc2-1a0245073d99" />

</div>

<br/>

> ⚠️ **Lưu ý quan trọng:** 
> 
> Bên trong thư mục chính có thể có **thư mục con cùng tên** → **Double-click** vào thư mục con đó

<br/>


```
📁 extension-folder/
   └── 📁 extension-folder/    ← ✅ Chọn thư mục này
          ├── 📄 manifest.json
          ├── 📁 assets/
          └── ...
```


<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

### 📍 Bước 5: Tắt phiên bản cũ

<div align="center">

> Sau khi cài đặt thành công, **tắt phiên bản cũ hơn** để tránh xung đột

<br/>

<img width="824" height="219" alt="Quản lý phiên bản" src="https://github.com/user-attachments/assets/b1fb4ae8-d51b-45ee-8bb9-2d01c43821d3" />

<br/>

| Phiên bản | Trạng thái | Hành động |
|:---:|:---:|:---|
| `v3.6.3` | ✅ **BẬT** | Phiên bản mới - Giữ nguyên |
| `v3.6.2` | ❌ **TẮT** | Phiên bản cũ - Vô hiệu hóa |

</div>

<br/>

> 🗑️ **Khuyến nghị:** Sau khi xác nhận phiên bản mới hoạt động ổn định, có thể **xóa hoàn toàn** phiên bản cũ

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

## ✅ Hoàn Tất

<div align="center">

### 🎉 Chúc mừng! Extension đã được cập nhật thành công.

<br/>

<img src="https://img.shields.io/badge/Status-Updated-00C853?style=for-the-badge&logo=checkmarx&logoColor=white" alt="Updated"/>

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

## ❓ Xử Lý Lỗi Thường Gặp

<div align="center">

| # | Lỗi | Nguyên nhân | Cách khắc phục |
|:---:|:---|:---|:---|
| 1️⃣ | `Manifest file is missing` | Chọn sai thư mục | Chọn thư mục chứa file `manifest.json` |
| 2️⃣ | `Invalid manifest` | File bị lỗi | Tải lại file extension |
| 3️⃣ | Extension không hoạt động | Chưa bật extension | Kiểm tra toggle đã **BẬT** chưa |
| 4️⃣ | Không thấy extension | Chưa bật Developer mode | Bật **Developer mode** ở góc phải |

</div>

<img width="100%" src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=6,11,20&height=2"/>

<br/>

<div align="center">

### 💬 Có thắc mắc? Hãy tạo Issue để được hỗ trợ!

<br/>

[![Create Issue](https://img.shields.io/badge/🐛_Tạo_Issue-FF6B6B?style=for-the-badge)](../../issues)
[![Back to README](https://img.shields.io/badge/📖_Về_trang_chủ-2196F3?style=for-the-badge)](./README.md)

<br/>

---

<br/>

**Made with ❤️ by Vietnamese Vibe Developers**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer"/>

</div>
