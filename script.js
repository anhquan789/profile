// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const typingText = document.querySelector('.typing-text');
const skillFills = document.querySelectorAll('.skill-fill');
const statNumbers = document.querySelectorAll('.stat-number');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.querySelector('#contact-form');

// Typing Animation
const phrases = [
    'Web Developer',
    'Frontend Developer', 
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Mobile Navigation
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

function closeMobileNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth Scrolling
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Back to Top Button
function handleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Skills Animation
function animateSkills() {
    skillFills.forEach(fill => {
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth + '%';
    });
}

// Counter Animation
function animateCounters() {
    statNumbers.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Intersection Observer for Animations
function createObserver() {
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
                if (entry.target.classList.contains('skills')) {
                    animateSkills();
                }
                
                // Add fade-in animation
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Project Filter
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
}

// EmailJS Configuration
const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_quan_profile', // Bạn cần tạo service trên EmailJS
    TEMPLATE_ID: 'template_quan_profile', // Bạn cần tạo template trên EmailJS
    PUBLIC_KEY: 'YOUR_EMAILJS_PUBLIC_KEY' // Bạn cần lấy public key từ EmailJS
};

// Initialize EmailJS
function initEmailJS() {
    // Khởi tạo EmailJS với public key
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
}

// Form Validation
function validateForm(formData) {
    const errors = {};
    
    if (!formData.get('from_name').trim()) {
        errors.from_name = 'Vui lòng nhập họ và tên';
    }
    
    const email = formData.get('from_email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.from_email = 'Vui lòng nhập email';
    } else if (!emailRegex.test(email)) {
        errors.from_email = 'Email không hợp lệ';
    }
    
    if (!formData.get('subject').trim()) {
        errors.subject = 'Vui lòng nhập chủ đề';
    }
    
    if (!formData.get('message').trim()) {
        errors.message = 'Vui lòng nhập tin nhắn';
    }
    
    return errors;
}

// Show Form Errors
function showFormErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    
    Object.keys(errors).forEach(field => {
        const input = document.querySelector(`#${field}`);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errors[field];
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    });
}

// Clear Form Errors
function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('input, textarea').forEach(input => {
        input.style.borderColor = '#e9ecef';
    });
}

// Send Email using EmailJS
async function sendEmail(formData) {
    try {
        // Kiểm tra xem EmailJS đã được load chưa
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS chưa được tải. Vui lòng thử lại sau.');
        }

        // Chuẩn bị template parameters
        const templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            to_name: formData.get('to_name'),
            to_email: formData.get('to_email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            reply_to: formData.get('from_email')
        };

        // Gửi email
        const response = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            templateParams
        );

        return {
            success: true,
            message: 'Email đã được gửi thành công!',
            response: response
        };

    } catch (error) {
        console.error('Lỗi khi gửi email:', error);
        
        // Xử lý các loại lỗi khác nhau
        let errorMessage = 'Có lỗi xảy ra khi gửi email. ';
        
        if (error.text) {
            errorMessage += error.text;
        } else if (error.message) {
            errorMessage += error.message;
        } else {
            errorMessage += 'Vui lòng thử lại sau.';
        }

        return {
            success: false,
            message: errorMessage,
            error: error
        };
    }
}

// Alternative: Send via Formspree (Backup method)
async function sendViaFormspree(formData) {
    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('from_name'),
                email: formData.get('from_email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            })
        });

        if (response.ok) {
            return {
                success: true,
                message: 'Email đã được gửi thành công qua Formspree!'
            };
        } else {
            throw new Error('Lỗi từ server Formspree');
        }
    } catch (error) {
        return {
            success: false,
            message: 'Lỗi khi gửi qua Formspree: ' + error.message
        };
    }
}
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #c3e6cb;
            text-align: center;
        ">
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất có thể.
        </div>
    `;
    
    contactForm.insertBefore(successDiv.firstElementChild, contactForm.firstElementChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        const successMessage = contactForm.querySelector('div[style*="background: #d4edda"]');
        if (successMessage) {
            successMessage.remove();
        }
    }, 5000);
}

// Show Success Message
function showSuccessMessage(message = 'Tin nhắn đã được gửi thành công! Tôi sẽ phản hồi sớm nhất có thể.') {
    const successDiv = document.createElement('div');
    successDiv.innerHTML = `
        <div style="
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #c3e6cb;
            text-align: center;
        ">
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            ${message}
        </div>
    `;
    
    contactForm.insertBefore(successDiv.firstElementChild, contactForm.firstElementChild);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        const successMessage = contactForm.querySelector('div[style*="background: #d4edda"]');
        if (successMessage) {
            successMessage.remove();
        }
    }, 5000);
}

// Show Error Message
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
        <div style="
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #f5c6cb;
            text-align: center;
        ">
            <i class="fas fa-exclamation-circle" style="margin-right: 10px;"></i>
            ${message}
        </div>
    `;
    
    contactForm.insertBefore(errorDiv.firstElementChild, contactForm.firstElementChild);
    
    // Remove error message after 5 seconds
    setTimeout(() => {
        const errorMessage = contactForm.querySelector('div[style*="background: #f8d7da"]');
        if (errorMessage) {
            errorMessage.remove();
        }
    }, 5000);
}

// Handle Form Submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const errors = validateForm(formData);
    
    clearFormErrors();
    
    if (Object.keys(errors).length > 0) {
        showFormErrors(errors);
        return;
    }
    
    // Update button state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const originalText = btnText.innerHTML;
    
    submitBtn.disabled = true;
    btnText.innerHTML = 'Đang gửi...';
    submitBtn.querySelector('i').className = 'fas fa-spinner fa-spin';
    
    try {
        // Thử gửi qua EmailJS trước
        let result = await sendEmail(formData);
        
        // Nếu EmailJS thất bại, thử Formspree
        if (!result.success && typeof sendViaFormspree === 'function') {
            console.log('EmailJS failed, trying Formspree...');
            result = await sendViaFormspree(formData);
        }
        
        if (result.success) {
            showSuccessMessage(result.message);
            contactForm.reset();
            
            // Reset form focus states
            const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
            formInputs.forEach(input => {
                input.parentNode.classList.remove('focused');
            });
        } else {
            showErrorMessage(result.message);
        }
        
    } catch (error) {
        console.error('Unexpected error:', error);
        showErrorMessage('Có lỗi không mong muốn xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua email.');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.innerHTML = originalText;
        submitBtn.querySelector('i').className = 'fas fa-paper-plane';
    }
}

// Parallax Effect
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// Lazy Loading Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add CSS for fadeInUp animation
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Initialize Everything
function init() {
    // Add animation styles
    addAnimationStyles();
    
    // Initialize EmailJS
    initEmailJS();
    
    // Start typing animation
    if (typingText) {
        typeWriter();
    }
    
    // Initialize observers
    createObserver();
    lazyLoadImages();
    
    // Mobile navigation events
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileNav);
    }
    
    // Navigation link events
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            smoothScroll(target);
            closeMobileNav();
        });
    });
    
    // Back to top button event
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Project filter events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
    
    // Contact form event
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Scroll events
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleNavbarScroll();
                handleBackToTop();
                updateActiveNavLink();
                // handleParallax(); // Commented out as it can affect performance
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileNav();
        }
    });
    
    // Handle form input focus/blur for better UX
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentNode.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentNode.classList.add('focused');
        }
    });
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileNav();
        }
    });
    
    // Preload critical images
    const criticalImages = [
        'https://via.placeholder.com/240x240/ffffff/333333?text=QP'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Performance optimization: Use requestIdleCallback if available
if (window.requestIdleCallback) {
    requestIdleCallback(init);
} else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(init, 1);
}

// Export functions for potential module use
window.profileApp = {
    init,
    smoothScroll,
    filterProjects,
    toggleMobileNav,
    closeMobileNav
};

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Dark mode toggle (bonus feature)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #667eea;
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Initialize dark mode after page load
window.addEventListener('load', initDarkMode);