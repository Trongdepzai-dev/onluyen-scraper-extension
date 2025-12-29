# 🔄 Hướng Dẫn Cập Nhật Extension Chrome

> 📌 **Hướng dẫn chi tiết** cách cài đặt và cập nhật extension thủ công trên trình duyệt Chrome

---

## 📋 Mục Lục

- [Bước 1: Mở trang Extensions](#-bước-1-mở-trang-extensions)
- [Bước 2: Giải nén file](#-bước-2-giải-nén-file)
- [Bước 3: Tải tiện ích](#-bước-3-tải-tiện-ích)
- [Bước 4: Chọn thư mục](#-bước-4-chọn-thư-mục)
- [Bước 5: Tắt phiên bản cũ](#-bước-5-tắt-phiên-bản-cũ)

---

## 🚀 Các Bước Thực Hiện

### 📍 Bước 1: Mở trang Extensions

Truy cập vào trang quản lý tiện ích của Chrome:

```
chrome://extensions/
```

> 💡 **Mẹo:** Copy đường dẫn trên và paste trực tiếp vào thanh địa chỉ của Chrome

---

### 📍 Bước 2: Giải nén file

Giải nén file extension vừa được tải về máy

| Định dạng | Cách giải nén |
|-----------|---------------|
| `.zip` | Click chuột phải → **Extract All** |
| `.rar` | Dùng WinRAR hoặc 7-Zip |

---

### 📍 Bước 3: Tải tiện ích

1. Bật **Developer mode** (Chế độ nhà phát triển) ở góc phải trên
2. Click vào nút **"Load unpacked"** (Tải tiện ích đã giải nén)

---

### 📍 Bước 4: Chọn thư mục

Chọn đúng thư mục extension:

<img width="117" height="129" alt="Thư mục extension" src="https://github.com/user-attachments/assets/5e073b18-8f0d-4016-bfc2-1a0245073d99" />

> ⚠️ **Lưu ý quan trọng:** 
> 
> Bên trong thư mục chính có thể có **thư mục con cùng tên** → **Double-click** vào thư mục con đó

```
📁 extension-folder/
   └── 📁 extension-folder/    ← Chọn thư mục này
          ├── 📄 manifest.json
          ├── 📁 assets/
          └── ...
```

---

### 📍 Bước 5: Tắt phiên bản cũ

Sau khi cài đặt thành công, **tắt phiên bản cũ hơn** để tránh xung đột:

<img width="824" height="219" alt="Quản lý phiên bản" src="https://github.com/user-attachments/assets/b1fb4ae8-d51b-45ee-8bb9-2d01c43821d3" />

**Ví dụ:**

| Phiên bản | Trạng thái |
|-----------|------------|
| `v3.6.3` | ✅ **BẬT** (phiên bản mới) |
| `v3.6.2` | ❌ **TẮT** (phiên bản cũ) |

> 🗑️ **Khuyến nghị:** Sau khi xác nhận phiên bản mới hoạt động ổn định, có thể **xóa hoàn toàn** phiên bản cũ

---

## ✅ Hoàn Tất

🎉 **Chúc mừng!** Extension đã được cập nhật thành công.

---

## ❓ Xử Lý Lỗi Thường Gặp

| Lỗi | Nguyên nhân | Cách khắc phục |
|-----|-------------|----------------|
| `Manifest file is missing` | Chọn sai thư mục | Chọn thư mục chứa file `manifest.json` |
| `Invalid manifest` | File bị lỗi | Tải lại file extension |
| Extension không hoạt động | Chưa bật extension | Kiểm tra toggle đã BẬT chưa |

---

<div align="center">

**💬 Có thắc mắc?** Hãy tạo [Issue](../../issues) để được hỗ trợ!

</div>
