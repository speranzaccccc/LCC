// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // 添加调试信息
    console.log("Script loaded and DOM ready");
    
    // Language toggle functionality
    const enBtn = document.getElementById('en-btn');
    const zhBtn = document.getElementById('zh-btn');
    const body = document.body;
    
    console.log("Language buttons:", enBtn, zhBtn);
    
    // 初始化页面语言
    const savedLanguage = localStorage.getItem('language') || 'en';
    console.log("Initial language from storage:", savedLanguage);
    
    // 电话号码元素
    const phoneElements = document.querySelectorAll('.phone-number-en');
    console.log("Phone elements found:", phoneElements.length);
    
    // 确保section可见
    document.querySelectorAll("section").forEach(section => {
        section.style.display = "block";
        section.style.visibility = "visible";
        section.style.opacity = "1";
        console.log("Made section visible:", section.id);
    });
    
    // 全面的语言切换函数
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
        
        // 根据语言切换简历下载链接
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            if (lang === 'zh') {
                downloadBtn.setAttribute('href', 'CV Chinese.pdf');
            } else {
                downloadBtn.setAttribute('href', 'CV English.pdf');
            }
        }
        
        // 更新电话号码的href和显示文本
        phoneElements.forEach(phone => {
            console.log("Processing phone element:", phone);
            const phoneNumber = phone.getAttribute(`data-${lang}`);
            console.log("Phone number for", lang, ":", phoneNumber);
            phone.textContent = phoneNumber;
            phone.href = `tel:${phoneNumber}`;
        });
        
        // 更新所有带data-en/data-zh属性的元素
        document.querySelectorAll(`[data-${lang}]`).forEach(element => {
            try {
                element.textContent = element.getAttribute(`data-${lang}`);
                console.log("Updated element:", element.tagName, "with text:", element.textContent.substring(0, 20) + "...");
            } catch (e) {
                console.error("Error updating element:", element, e);
            }
        });
    }
    
    // 语言切换事件监听
    if (enBtn) {
        enBtn.addEventListener('click', function() {
            console.log("English button clicked");
            setLanguage('en');
        });
    }
    
    if (zhBtn) {
        zhBtn.addEventListener('click', function() {
            console.log("Chinese button clicked");
            setLanguage('zh');
        });
    }
    
    // 初始调用一次设置语言
    setLanguage(savedLanguage);
    
    // Navigation Toggle for Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
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
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        skillBars.forEach(item => {
            observer.observe(item);
        });
    }

    // Add animation classes on scroll for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (timelineItems.length > 0) {
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // Add scroll to top button functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scroll');
        } else {
            navbar.classList.remove('scroll');
        }
    });
    
    // Animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    function checkProjectCards() {
        projectCards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight - 100) {
                card.classList.add('animate');
            }
        });
    }
    
    if (projectCards.length > 0) {
        window.addEventListener('scroll', checkProjectCards);
        window.addEventListener('load', checkProjectCards);
        
        // Add animation CSS
        const style = document.createElement('style');
        style.textContent = `
            .project-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .project-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        `;
        document.head.appendChild(style);
    }
}); 