# 🚀 GitHub Pages Deploy Checklist

## ✅ Pre-Deploy Checklist

### 1. Files cần thiết
- [x] `index.html` - Trang chính
- [x] `style.css` - Stylesheet
- [x] `script.js` - JavaScript
- [x] `manifest.json` - PWA manifest
- [x] `sw.js` - Service worker
- [x] `robots.txt` - SEO
- [x] `sitemap.xml` - SEO
- [x] `.nojekyll` - GitHub Pages config
- [x] `README.md` - Documentation

### 2. Code Quality
- [x] No JavaScript errors
- [x] Valid HTML5
- [x] CSS responsive design
- [x] All images have alt text
- [x] Meta tags present

### 3. GitHub Setup
- [ ] Repository public
- [ ] Code pushed to main branch
- [ ] GitHub Pages enabled

## 🛠️ Deploy Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy profile website"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: "Deploy from a branch"
4. Branch: `main` / `/ (root)`
5. Click "Save"

### Step 3: Wait for deployment
- Usually takes 1-5 minutes
- Check Actions tab for build status
- URL will be: `https://anhquan789.github.io/profile/`

## 🔧 Troubleshooting

### ❌ Website không hiển thị

**Kiểm tra:**
1. Repository có public không?
2. File `index.html` có ở root directory không?
3. Đợi 5-10 phút sau khi enable Pages

**Fix:**
```bash
# Đảm bảo file ở đúng vị trí
ls -la
# Phải thấy index.html ở root

# Push lại nếu cần
git add index.html
git commit -m "Fix index.html location"
git push origin main
```

### ❌ CSS/JS không load

**Lỗi thường gặp:**
- Đường dẫn file sai
- HTTPS mixed content
- File không được commit

**Fix:**
```html
<!-- Đảm bảo đường dẫn relative -->
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

### ❌ 404 Error

**Nguyên nhân:**
- Không có file `index.html`
- Repository private
- Branch sai

**Fix:**
1. Đổi repository thành public
2. Đảm bảo có `index.html` ở root
3. Check branch settings

### ❌ Form không gửi được

**Bình thường!** Form hiện tại cần cấu hình:

**Option 1: EmailJS (Khuyến nghị)**
```javascript
const EMAILJS_CONFIG = {
    SERVICE_ID: 'your_service_id',
    TEMPLATE_ID: 'your_template_id',
    PUBLIC_KEY: 'your_public_key'
};
```

**Option 2: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option 3: Demo mode**
Form sẽ hiển thị thông báo demo

## 🌐 URLs

### Development
- Local: `file:///path/to/index.html`
- Test page: `file:///path/to/test.html`

### Production
- GitHub Pages: `https://anhquan789.github.io/profile/`
- Test page: `https://anhquan789.github.io/profile/test.html`

## 📊 Performance Check

### Speed Test
- GTmetrix: https://gtmetrix.com/
- PageSpeed: https://pagespeed.web.dev/
- WebPageTest: https://www.webpagetest.org/

### Expected Scores
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 🔄 Update Workflow

```bash
# Làm thay đổi
git add .
git commit -m "Update: your changes"
git push origin main

# GitHub Pages tự động deploy
# Chờ 1-2 phút để update
```

## 📱 Mobile Test

### Test URLs
```
# Mobile simulators
https://www.responsinator.com/?url=https://anhquan789.github.io/profile/

# Browser dev tools
F12 → Device toolbar → Choose mobile device
```

## ⚡ Quick Test

Sau khi deploy, test ngay:

1. **Trang chính**: https://anhquan789.github.io/profile/
2. **Test page**: https://anhquan789.github.io/profile/test.html
3. **Mobile**: Mở trên điện thoại
4. **Form**: Thử gửi contact form
5. **Navigation**: Test menu mobile

## 🎯 Success Indicators

✅ Website load < 3 seconds
✅ Mobile responsive
✅ All images display
✅ Navigation works
✅ Typing animation works
✅ Contact form shows (even if demo)
✅ Dark mode toggle works
✅ PWA installable

## 🚨 Emergency Fix

Nếu có lỗi nghiêm trọng:

```bash
# Revert về commit trước
git revert HEAD
git push origin main

# Hoặc rollback
git reset --hard HEAD~1
git push --force origin main
```

---

**🎉 Chúc mừng! Website đã sẵn sàng deploy!**