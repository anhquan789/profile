# Personal Profile Website

Trang profile cá nhân được tạo bằng HTML, CSS và JavaScript thuần, tối ưu cho GitHub Pages.

## 🌟 Tính năng

- **Responsive Design**: Hoạt động tốt trên mọi thiết bị
- **Modern UI/UX**: Thiết kế hiện đại với animations mượt mà
- **Interactive Elements**: Menu mobile, smooth scroll, typing animation
- **Project Portfolio**: Showcase các dự án với filter
- **Contact Form**: Form liên hệ với validation
- **Performance Optimized**: Tối ưu tốc độ tải trang
- **SEO Friendly**: Meta tags và structured data
- **Dark Mode**: Chế độ tối cho trải nghiệm tốt hơn
- **PWA Ready**: Sẵn sàng cho Progressive Web App

## 🚀 Cách deploy lên GitHub Pages

### Bước 1: Push code lên GitHub

```bash
git add .
git commit -m "Add personal profile website"
git push origin main
```

### Bước 2: Cấu hình GitHub Pages

1. Vào repository trên GitHub
2. Chọn **Settings** > **Pages**
3. Trong phần **Source**, chọn **Deploy from a branch**
4. Chọn branch **main** và folder **/ (root)**
5. Clicks **Save**

Website sẽ được deploy tại: `https://anhquan789.github.io/profile/`

## 📁 Cấu trúc project

```
profile/
├── index.html          # Trang chủ
├── style.css           # Styles chính
├── script.js           # JavaScript functionality
├── README.md           # Documentation
├── favicon.ico         # Favicon (tùy chọn)
└── assets/             # Thư mục assets (tùy chọn)
    ├── images/         # Hình ảnh
    └── documents/      # CV, documents
```

## 🎨 Customization

### Thay đổi thông tin cá nhân

Chỉnh sửa file `index.html`:

1. **Thông tin cá nhân**: Tìm và thay đổi các thông tin như tên, email, số điện thoại
2. **Social Links**: Cập nhật các link mạng xã hội trong `.hero-social` và `.contact-social`
3. **Projects**: Thêm/sửa các dự án trong section `.projects-grid`
4. **Skills**: Cập nhật kỹ năng và tỷ lệ phần trăm trong section `.skills`

### Thay đổi màu sắc

Chỉnh sửa file `style.css`:

```css
/* Màu chính */
--primary-color: #667eea;
--secondary-color: #764ba2;

/* Hoặc thay đổi gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Thêm hình ảnh

1. Tạo thư mục `assets/images/`
2. Thêm hình ảnh profile và project
3. Cập nhật đường dẫn trong HTML

## 🔧 Tính năng nâng cao

### Thêm Google Analytics

Thêm vào `<head>` trong `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Thêm contact form backend

Form liên hệ đã được tích hợp sẵn với EmailJS để gửi email thực sự. 

**Cách cấu hình:**

1. **EmailJS (Khuyến nghị)**: 
   - Xem file `EMAILJS_SETUP.md` để hướng dẫn chi tiết
   - Miễn phí 200 email/tháng
   - Không cần backend server

2. **Formspree**: 
   - Truy cập https://formspree.io/
   - Tạo form và lấy endpoint URL
   - Cập nhật trong `script.js`

3. **Netlify Forms**: 
   - Tự động hoạt động khi deploy trên Netlify
   - Thêm `data-netlify="true"` vào form

**Để kích hoạt ngay:**
1. Mở file `script.js`
2. Tìm phần `EMAILJS_CONFIG`
3. Thay thế với thông tin EmailJS của bạn:
   ```javascript
   const EMAILJS_CONFIG = {
       SERVICE_ID: 'your_service_id',
       TEMPLATE_ID: 'your_template_id', 
       PUBLIC_KEY: 'your_public_key'
   };
   ```

### Thêm blog

Tạo thêm trang blog bằng cách:

1. Tạo file `blog.html`
2. Thêm link navigation
3. Sử dụng Jekyll cho GitHub Pages blog tự động

## 📱 PWA Setup

Để biến website thành Progressive Web App:

1. Tạo file `manifest.json`
2. Thêm service worker `sw.js`
3. Thêm icons trong các kích thước khác nhau

## 🔍 SEO Tips

1. **Meta Description**: Đã thêm sẵn, có thể tùy chỉnh
2. **Open Graph**: Đã cấu hình cho social sharing
3. **Structured Data**: Có thể thêm JSON-LD
4. **Sitemap**: Tạo file `sitemap.xml` cho Google

## 🎯 Performance Tips

1. **Optimize Images**: Sử dụng WebP format
2. **Minify CSS/JS**: Sử dụng tools như Parcel/Webpack
3. **CDN**: Sử dụng CDN cho fonts và icons
4. **Lazy Loading**: Đã implement sẵn

## 🐛 Troubleshooting

### Website không hiển thị

1. Kiểm tra GitHub Pages settings
2. Đảm bảo file `index.html` ở root directory
3. Chờ 5-10 phút sau khi push code

### CSS/JS không load

1. Kiểm tra đường dẫn file
2. Đảm bảo files đã được commit và push
3. Clear browser cache

### Form không hoạt động

Form hiện tại chỉ là demo. Để hoạt động thực sự cần backend service.

## 📞 Support

Nếu gặp vấn đề, có thể:

1. Tạo issue trên GitHub
2. Xem documentation của GitHub Pages
3. Tham khảo ví dụ trực tiếp trên repository

## 📄 License

MIT License - Free to use for personal and commercial projects.

---

⭐ Nếu thấy hữu ích, hãy star repository này!

🚀 **Happy coding!**