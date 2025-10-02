# Hướng dẫn cấu hình EmailJS cho Contact Form

## Bước 1: Tạo tài khoản EmailJS

1. Truy cập [EmailJS.com](https://www.emailjs.com/)
2. Đăng ký tài khoản miễn phí (có 200 email/tháng)
3. Xác nhận email đăng ký

## Bước 2: Tạo Email Service

1. Đăng nhập vào EmailJS Dashboard
2. Chọn **Email Services** > **Add New Service**
3. Chọn email provider (Gmail, Outlook, Yahoo, etc.)
4. Điền thông tin đăng nhập email của bạn
5. Lưu **Service ID** (ví dụ: `service_quan_profile`)

## Bước 3: Tạo Email Template

1. Chọn **Email Templates** > **Create New Template**
2. Thiết kế template với các biến:

```html
Subject: {{subject}}

Xin chào {{to_name}},

Bạn có tin nhắn mới từ {{from_name}} ({{from_email}}):

Chủ đề: {{subject}}

Tin nhắn:
{{message}}

---
Gửi từ website portfolio
```

3. Lưu **Template ID** (ví dụ: `template_quan_profile`)

## Bước 4: Lấy Public Key

1. Vào **Account** > **General**
2. Copy **Public Key** (ví dụ: `user_abc123xyz`)

## Bước 5: Cập nhật code

Mở file `script.js` và cập nhật cấu hình:

```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_quan_profile', // Thay bằng Service ID của bạn
    TEMPLATE_ID: 'template_quan_profile', // Thay bằng Template ID của bạn
    PUBLIC_KEY: 'user_abc123xyz' // Thay bằng Public Key của bạn
};
```

## Bước 6: Test chức năng

1. Mở website
2. Điền form contact
3. Gửi tin nhắn
4. Kiểm tra email nhận được

## Phương án dự phòng: Formspree

Nếu không muốn dùng EmailJS, có thể dùng Formspree:

1. Truy cập [Formspree.io](https://formspree.io/)
2. Tạo form mới với email của bạn
3. Lấy Form ID
4. Cập nhật trong code:

```javascript
// Trong hàm sendViaFormspree
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    // ... rest of code
});
```

## Phương án khác

### 1. Netlify Forms
- Miễn phí cho 100 form submissions/tháng
- Tự động hoạt động khi deploy trên Netlify

### 2. Web3Forms
- Miễn phí, không cần đăng ký
- Chỉ cần thêm access key vào form

### 3. GetForm
- Miễn phí cho 50 submissions/tháng
- API đơn giản

## Troubleshooting

### Lỗi "EmailJS is not defined"
- Kiểm tra internet connection
- Đảm bảo script EmailJS được load

### Lỗi "Template not found"
- Kiểm tra Template ID
- Đảm bảo template đã được publish

### Lỗi "Service not found" 
- Kiểm tra Service ID
- Đảm bảo service đã được kích hoạt

### Email không nhận được
- Kiểm tra spam folder
- Xác nhận email service đã được verify
- Kiểm tra quota limit (200 emails/tháng cho free plan)

## Bảo mật

- Không để lộ Private Key trong frontend code
- Sử dụng template parameters để tránh injection
- Validate input ở cả frontend và backend
- Cân nhắc thêm reCAPTCHA để chống spam

## Nâng cấp

- EmailJS Pro: $15/tháng (1000 emails)
- EmailJS Pro+: $35/tháng (5000 emails)
- Hoặc chuyển sang backend solution riêng