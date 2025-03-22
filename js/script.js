// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const enBtn = document.getElementById('en-btn');
    const zhBtn = document.getElementById('zh-btn');
    const body = document.body;
    
    // Function to safely update content
    function setLanguage(lang) {
        console.log("Setting language to:", lang);
        
        // Set body class
        body.className = lang;
        localStorage.setItem('language', lang);
        
        // Update button states
        if (lang === 'zh') {
            enBtn.classList.remove('active');
            zhBtn.classList.add('active');
        } else {
            enBtn.classList.add('active');
            zhBtn.classList.remove('active');
        }
        
        // 更简单、更直接的方法：维护一个要处理的元素选择器列表
        const selectors = [
            // 标题和一般文本
            '.section-title',
            '.hero-content h2',
            '.about-text p',
            '.contact-direct h3',
            '.contact-direct p',
            '.contact-info h3',
            'footer p span',
            // 各部分标题
            '.skills-category h3',
            '.certificate-content h3',
            '.certificate-issuer',
            '.certificate-date',
            '.certificate-desc',
            // 导航链接
            '.nav-links a',
            // 按钮中的文本
            '.download-btn span',
            '.email-btn span',
            '.call-btn span',
            '.or-divider span'
        ];
        
        // 1. 处理所有带有data-lang属性的元素
        selectors.forEach(selector => {
            document.querySelectorAll(selector + '[data-' + lang + ']').forEach(element => {
                element.textContent = element.getAttribute('data-' + lang);
            });
        });
        
        // 2. 特别处理所有带有data-lang属性的普通元素（不在上面列表中的）
        document.querySelectorAll('[data-' + lang + ']').forEach(element => {
            // 排除INPUT, TEXTAREA和嵌套很复杂的元素
            if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA' && 
                !selectors.some(s => element.matches(s))) {
                // 如果是单一文本节点，直接更新
                if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
                    element.textContent = element.getAttribute('data-' + lang);
                }
                // 如果只包含图标+文本，只更新文本部分
                else if (element.childNodes.length === 2 && 
                        element.firstChild.nodeType === 1 && 
                        element.firstChild.tagName === 'I') {
                    // 保留图标，更新文本
                    const icon = element.firstChild;
                    element.textContent = element.getAttribute('data-' + lang);
                    element.insertBefore(icon, element.firstChild);
                }
            }
        });
        
        // 3. 专门处理所有span元素（因为它们通常是内联文本）
        document.querySelectorAll('span[data-' + lang + ']').forEach(span => {
            span.textContent = span.getAttribute('data-' + lang);
        });
        
        // 4. 下载CV按钮特殊处理（因为它非常重要）
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn && downloadBtn.hasAttribute('data-' + lang)) {
            const icon = downloadBtn.querySelector('i');
            const span = downloadBtn.querySelector('span');
            
            if (span && span.hasAttribute('data-' + lang)) {
                span.textContent = span.getAttribute('data-' + lang);
            } else if (downloadBtn.hasAttribute('data-' + lang)) {
                // 如果span不存在或没有data属性，使用按钮的data属性
                if (icon) {
                    // 保留图标
                    const iconClone = icon.cloneNode(true);
                    downloadBtn.innerHTML = '';
                    downloadBtn.appendChild(iconClone);
                    
                    // 添加文本
                    const newSpan = document.createElement('span');
                    newSpan.textContent = downloadBtn.getAttribute('data-' + lang);
                    downloadBtn.appendChild(newSpan);
                } else {
                    downloadBtn.textContent = downloadBtn.getAttribute('data-' + lang);
                }
            }
        }
    }
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    
    // Add event listeners to language buttons
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