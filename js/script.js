// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const enBtn = document.getElementById('en-btn');
    const zhBtn = document.getElementById('zh-btn');
    const body = document.body;
    
    // 初始化页面语言
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // 电话号码元素
    const phoneElements = document.querySelectorAll('.phone-number-en');
    
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
            const phoneNumber = phone.getAttribute(`data-${lang}`);
            phone.textContent = phoneNumber;
            phone.href = `tel:${phoneNumber}`;
        });
        
        // 1. 确保导航链接正确显示
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            if (link.hasAttribute('data-' + lang)) {
                link.textContent = link.getAttribute('data-' + lang);
            }
        });
        
        // 2. 确保下载按钮正确显示
        const downloadBtnSpan = document.querySelector('.download-btn span');
        if (downloadBtnSpan && downloadBtnSpan.hasAttribute('data-' + lang)) {
            console.log('Setting download button text to:', downloadBtnSpan.getAttribute('data-' + lang));
            downloadBtnSpan.textContent = downloadBtnSpan.getAttribute('data-' + lang);
            downloadBtnSpan.style.display = 'inline-block';
            downloadBtnSpan.style.visibility = 'visible';
            downloadBtnSpan.style.opacity = '1';
        }
        
        // 3. 确保所有带data-en/data-zh属性的元素正确显示
        document.querySelectorAll('[data-' + lang + ']').forEach(function(element) {
            // 跳过已经处理过的导航链接和下载按钮
            if (element.matches('.nav-links a') || element.matches('.download-btn span')) {
                return;
            }
            
            // 对于其他元素，更新文本内容
            if (element.children.length === 0 || 
                (element.children.length === 1 && element.firstElementChild.tagName === 'I')) {
                element.textContent = element.getAttribute('data-' + lang);
                
                // 如果元素包含图标，保留图标
                if (element.children.length === 1 && element.firstElementChild.tagName === 'I') {
                    const icon = element.firstElementChild;
                    element.textContent = element.getAttribute('data-' + lang);
                    element.insertBefore(icon.cloneNode(true), element.firstChild);
                }
            }
        });
        
        // 4. 处理特殊内容区域
        // 处理各部分的标题（如教育经历、工作经历等）
        document.querySelectorAll('.section-title').forEach(function(element) {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // 处理教育经历内容
        document.querySelectorAll('.timeline-content h3, .timeline-content h4, .timeline-content p').forEach(function(element) {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // 处理工作经历和项目经历中的列表项
        document.querySelectorAll('.timeline-content li, .project-content li').forEach(function(element) {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // 项目卡片标题和内容
        document.querySelectorAll('.project-header h3, .project-content p, .project-content li, .project-tags .tag').forEach(function(element) {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // 活动卡片内容
        document.querySelectorAll('.activity-card h3, .activity-date, .activity-role, .activity-desc').forEach(function(element) {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // 5. 处理技能类别和内容
        document.querySelectorAll('.skills-category h3, .skill-name').forEach(function(element) {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // 6. 处理联系部分
        document.querySelectorAll('.contact-info h3, .contact-direct h3, .contact-direct p, .address').forEach(function(element) {
            if (element.hasAttribute('data-' + lang)) {
                element.textContent = element.getAttribute('data-' + lang);
            }
        });
        
        // 7. 处理按钮内的span元素
        document.querySelectorAll('.btn span').forEach(function(span) {
            if (span.hasAttribute('data-' + lang)) {
                span.textContent = span.getAttribute('data-' + lang);
            }
        });
        
        // 8. 处理页脚文本
        document.querySelectorAll('footer p span').forEach(function(span) {
            if (span.hasAttribute('data-' + lang)) {
                span.textContent = span.getAttribute('data-' + lang);
            }
        });
    }
    
    // 语言切换事件监听
    enBtn.addEventListener('click', () => setLanguage('en'));
    zhBtn.addEventListener('click', () => setLanguage('zh'));
    
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