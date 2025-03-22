// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const enBtn = document.getElementById('en-btn');
    const zhBtn = document.getElementById('zh-btn');
    const body = document.body;
    
    // 更加简单的语言切换函数
    function setLanguage(lang) {
        console.log("Setting language to:", lang);
        
        // 设置body类
        body.className = lang;
        localStorage.setItem('language', lang);
        
        // 更新按钮状态
        if (lang === 'zh') {
            enBtn.classList.remove('active');
            zhBtn.classList.add('active');
        } else {
            enBtn.classList.add('active');
            zhBtn.classList.remove('active');
        }
        
        // 确保导航和下载按钮正确显示
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            if (lang === 'zh') {
                if (link.hasAttribute('data-zh')) {
                    link.textContent = link.getAttribute('data-zh');
                }
            } else {
                if (link.hasAttribute('data-en')) {
                    link.textContent = link.getAttribute('data-en');
                }
            }
        });
        
        // 确保下载按钮正确显示
        const downloadBtn = document.querySelector('.download-btn span');
        if (downloadBtn) {
            if (lang === 'zh') {
                if (downloadBtn.hasAttribute('data-zh')) {
                    downloadBtn.textContent = downloadBtn.getAttribute('data-zh');
                }
            } else {
                if (downloadBtn.hasAttribute('data-en')) {
                    downloadBtn.textContent = downloadBtn.getAttribute('data-en');
                }
            }
        }
    }
    
    // 从本地存储获取语言设置
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    // 设置初始状态
    body.className = savedLanguage;
    if (savedLanguage === 'zh') {
        enBtn.classList.remove('active');
        zhBtn.classList.add('active');
        setLanguage('zh');
    } else {
        enBtn.classList.add('active');
        zhBtn.classList.remove('active');
    }
    
    // 添加按钮事件监听器
    enBtn.addEventListener('click', function() {
        setLanguage('en');
    });
    
    zhBtn.addEventListener('click', function() {
        setLanguage('zh');
    });
    
    // Navigation Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // Adjusted for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission - removing the preventDefault since we want the form to actually submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields');
                return;
            }
            
            // Form will now submit to Formspree
        });
    }

    // Add active class to nav items on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animate skills bars on scroll
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillsSection) {
        window.addEventListener('scroll', function() {
            if (isInViewport(skillsSection)) {
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.transition = 'width 1s ease-in-out';
                        bar.style.width = width;
                    }, 100);
                });
                // Remove event listener after animation is triggered
                window.removeEventListener('scroll', arguments.callee);
            }
        });
    }

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Add animation classes on scroll for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineItems() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight - 100) {
                item.classList.add('animate');
            }
        });
    }
    
    if (timelineItems.length > 0) {
        window.addEventListener('scroll', checkTimelineItems);
        window.addEventListener('load', checkTimelineItems);
    }
    
    // Add scroll to top button functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add this CSS for the scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: var(--white);
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 100;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background-color: var(--secondary-color);
            transform: translateY(-3px);
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateX(-50px);
            transition: all 0.8s ease;
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(style);
}); 