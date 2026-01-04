# Deploy to Netlify

Bạn có thể deploy giao diện Admin này lên Netlify, nhưng cần lưu ý về phần Backend.

## Cách 1: Deploy Static (Chỉ giao diện)
Nếu bạn chỉ muốn deploy giao diện `admin.html` để xem, nhưng API vẫn chạy ở máy khác (hoặc localhost).

1. Tạo file `netlify.toml` ở thư mục gốc (hoặc trong `server/` nếu deploy thư mục đó):
   ```toml
   [build]
     publish = "public"
   ```
2. Kéo thả thư mục `server` vào Netlify Drop.
3. Giao diện sẽ chạy, **NHƯNG** bạn cần sửa lại `admin.html` để trỏ API về đúng nơi (không phải relative path `/api/...`).

## Cách 2: Deploy Full Stack (Node.js trên Netlify) - ⚠️ CẢNH BÁO
Netlify hỗ trợ chạy server Node.js qua Netlify Functions, nhưng **file JSON sẽ bị reset** sau mỗi lần chạy.
*   **Lý do:** Netlify là Serverless (không có ổ cứng lưu trữ lâu dài).
*   **Giải pháp:** Bạn cần dùng cơ sở dữ liệu ngoài (MongoDB Atlas, Firebase, Supabase) thay vì lưu vào file `feedback.json`.

## Khuyến nghị hiện tại
Hãy chạy server này trên:
1.  **Localhost** (như hiện tại): `node index.js`
2.  **VPS** (DigitalOcean, AWS): Chạy ổn định 24/7.
3.  **Render.com / Glitch.com:** Có gói miễn phí hỗ trợ Node.js tốt hơn Netlify cho trường hợp lưu file đơn giản này.
