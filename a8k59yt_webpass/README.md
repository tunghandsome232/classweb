# Hướng Dẫn Tích Hợp Cơ Sở Dữ Liệu (Database) Miễn Phí Trên Vercel Cho Web a8k59yt

Trang web quản lý và thi đua lớp **a8k59yt** của bạn đã được thiết kế sẵn hệ thống đồng bộ đám mây hai chiều. Khi chạy trên **Vercel**, bạn có **2 cách miễn phí 100%** để tích hợp Database giúp mọi học sinh, Tổ trưởng, Giáo viên và Admin truy cập từ điện thoại hay máy tính đều thấy dữ liệu chung theo thời gian thực.

---

## Cách 1: Tích Hợp Database Trực Tiếp Ngay Trong Bảng Điều Khiển Vercel (Vercel Storage)
*(Khuyên dùng nếu bạn muốn gắn Database ngay trong tài khoản Vercel — mọi học sinh vào link `.vercel.app` sẽ tự động đồng bộ ngay mà không cần dán link cấu hình)*

Trong gói mã nguồn `a8k59yt_web.zip`, mình đã lập trình sẵn cổng kết nối Serverless **`/api/db.js`**. Bạn chỉ cần bật Database miễn phí trong mục **Storage** của Vercel theo 4 bước sau:

### Bước 1: Mở mục Storage trong Project Vercel
1. Đăng nhập vào [Vercel Dashboard](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdashboard) và bấm vào project web lớp **a8k59yt** của bạn.
2. Trên thanh menu ngang của project, bấm vào tab **Storage** ([Vercel Storage Marketplace](https://www.google.com/search?q=https%3A%2F%2Fvercel.com%2Fdocs%2Fstorage)).

### Bước 2: Tạo Database Miễn Phí (Upstash Redis KV)
1. Bấm nút **Create Database** (hoặc **Browse Marketplace**).
2. Chọn **Upstash** (mục **Serverless Redis / KV** — giải pháp lưu trữ JSON tốc độ cao, miễn phí 10.000 lượt đọc/ghi mỗi ngày, không cần thẻ tín dụng).
3. Chọn gói **Free (0$/tháng)** -> Chọn khu vực **Singapore (`ap-southeast-1`)** hoặc **US East** -> Bấm **Create**.

### Bước 3: Kết nối Database vào Project (Connect Project)
1. Sau khi tạo xong, bấm nút **Connect Project** và tích chọn project **a8k59yt** của bạn.
2. Vercel sẽ tự động chèn các biến môi trường (`UPSTASH_REDIS_REST_URL` và `UPSTASH_REDIS_REST_TOKEN` hoặc `KV_REST_API_URL` và `KV_REST_API_TOKEN`) vào project.

### Bước 4: Redeploy để kích hoạt
1. Vào tab **Deployments** trên Vercel -> Bấm biểu tượng `•••` ở bản chạy mới nhất -> Chọn **Redeploy** (hoặc đẩy bản code mới trong file `a8k59yt_web.zip` lên).
2. Ngay lập tức, cổng `/api/db` sẽ hoạt động: bất kỳ ai mở trang web trên điện thoại hay máy tính cũng tự động dùng chung 1 cơ sở dữ liệu duy nhất!

---

## Cách 2: Dùng Google Firebase Realtime Database (Không Cần Cấu Hình Server)
*(Khuyên dùng nếu bạn thích tốc độ nhảy số tức thì qua WebSockets của Google hoặc chạy trực tiếp từ file `index.html`)*

### Bước 1: Tạo Realtime Database trên Google Firebase (Mất 2 phút)
1. Truy cập [Google Firebase Console](https://www.google.com/search?q=https%3A%2F%2Fconsole.firebase.google.com%2F) và đăng nhập bằng Gmail.
2. Bấm **Add project (Thêm dự án)** -> Đặt tên `a8k59yt-db` -> Tắt Google Analytics -> Bấm **Create project**.
3. Ở menu bên trái, vào mục **Build -> Realtime Database** -> Bấm **Create Database**.
4. Chọn vị trí **Singapore (`asia-southeast1`)** -> Chọn chế độ **Start in test mode** (`.read: true, .write: true`) -> Bấm **Enable**.
5. Sao chép đường link Database URL có dạng:
   `https://a8k59yt-db-default-rtdb.asia-southeast1.firebasedatabase.app/` (hoặc `.firebaseio.com`).

### Bước 2: Gắn vào Web (Chọn 1 trong 2 cách nhỏ dưới đây)
- **Cách 2A (Dán trực tiếp trên giao diện Web)**: Mở trang web -> Bấm nút **☁️ Đám Mây** trên thanh công cụ -> Dán link Database URL vào ô và bấm **🚀 Lưu & Bật Đồng Bộ Đám Mây**.
- **Cách 2B (Gắn cố định cho cả lớp cùng nhận tự động)**:
  - Mở file `index.html`, tìm dòng `const DEFAULT_FIREBASE_DB_URL = "";` ở đầu phần `<script>` và dán link của bạn vào giữa dấu ngoặc kép, HOẶC
  - Vào mục **Settings -> Environment Variables** trên Vercel, thêm biến tên là `FIREBASE_DATABASE_URL` với giá trị là link Firebase của bạn rồi Redeploy.

---

## Bảng So Sánh Các Lựa Chọn Database Miễn Phí Trên Vercel

| Dịch vụ Database | Nơi cài đặt | Gói miễn phí (Free Tier) | Điểm mạnh nhất cho web lớp a8k59yt |
| :--- | :--- | :--- | :--- |
| **Upstash Redis (Vercel KV)** | Ngay trong tab **Storage** của Vercel | 256 MB lưu trữ, 10.000 lệnh/ngày, miễn phí vĩnh viễn | Tích hợp 1-click ngay trên Vercel, tự động kết nối với file `/api/db.js` có sẵn trong bộ code. |
| **Google Firebase Realtime DB** | Tại `console.firebase.google.com` | 1 GB lưu trữ, 10 GB băng thông/tháng, miễn phí vĩnh viễn | Đồng bộ tức thì qua WebSockets (không cần tải lại trang), dán 1 link là chạy ngay. |
| **Supabase (PostgreSQL)** | Ngay trong tab **Storage** của Vercel | 500 MB Database, 5 GB băng thông | Phù hợp nếu sau này bạn muốn mở rộng thêm bảng SQL phức tạp hoặc lưu trữ file lớn. |
| **Neon (Serverless Postgres)** | Ngay trong tab **Storage** của Vercel | 0.5 GB lưu trữ SQL, tự động co giãn | Chuẩn cơ sở dữ liệu quan hệ PostgreSQL tích hợp trực tiếp hóa đơn 0đ trong Vercel. |
