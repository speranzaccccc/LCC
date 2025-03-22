// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Language toggle functionality
    const enBtn = document.getElementById('en-btn');
    const zhBtn = document.getElementById('zh-btn');
    const body = document.body;
    
    // 重要变化：获取初始页面上的所有元素原始内容，用于恢复
    // 储存所有带有data-en或data-zh属性的元素的原始HTML
    const originalElements = {};
    document.querySelectorAll('[data-en], [data-zh]').forEach(function(element) {
        // 使用唯一ID标识元素，如果没有ID就用XPath
        const id = element.id || getXPathForElement(element);
        originalElements[id] = {
            html: element.innerHTML,
            text: element.textContent
        };
    });
    
    // 获取元素的XPath路径
    function getXPathForElement(element) {
        if (element.id !== '')
            return 'id("' + element.id + '")';
        
        if (element === document.body)
            return '//' + element.tagName.toLowerCase();
            
        let ix = 0;
        const siblings = element.parentNode.childNodes;
        
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            
            if (sibling === element)
                return getXPathForElement(element.parentNode) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
                
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
                ix++;
        }
    }
    
    // 切换语言函数
    function setLanguage(lang) {
        console.log("Setting language to:", lang);
        
        // 1. 设置body类和本地存储
        body.className = lang;
        localStorage.setItem('language', lang);
        
        // 2. 更新按钮状态
        if (lang === 'zh') {
            enBtn.classList.remove('active');
            zhBtn.classList.add('active');
        } else {
            enBtn.classList.add('active');
            zhBtn.classList.remove('active');
        }
        
        // 3. 首先恢复所有元素到原始状态
        if (lang === 'en' && body.classList.contains('en-original')) {
            // 如果是切换回英文且页面是英文原始版本，不做处理直接返回
            return;
        }
        
        // 对于其他情况，先恢复原始内容
        document.querySelectorAll('[data-en], [data-zh]').forEach(function(element) {
            const id = element.id || getXPathForElement(element);
            if (originalElements[id]) {
                element.innerHTML = originalElements[id].html;
            }
        });
        
        // 4. 然后只有在切换到中文时才替换内容
        if (lang === 'zh') {
            document.querySelectorAll('[data-zh]').forEach(function(element) {
                // 只替换文本内容，保留元素内部结构
                const zhContent = element.getAttribute('data-zh');
                
                // 特殊情况：包含图标的按钮
                if (element.querySelector('i')) {
                    const icon = element.querySelector('i');
                    const span = element.querySelector('span');
                    
                    // 如果有span标签，只更新span内容
                    if (span) {
                        if (span.hasAttribute('data-zh')) {
                            span.textContent = span.getAttribute('data-zh');
                        }
                    } else {
                        // 保存图标
                        const iconHtml = icon.outerHTML;
                        // 更新内容，保留图标
                        element.innerHTML = iconHtml + ' ' + zhContent;
                    }
                } 
                // 特殊情况：导航链接
                else if (element.parentNode && element.parentNode.tagName === 'LI' && 
                         element.parentNode.parentNode && element.parentNode.parentNode.classList.contains('nav-links')) {
                    element.textContent = zhContent;
                }
                // 一般文本元素
                else if (!element.querySelector('[data-zh]')) {
                    // 确保没有子元素也有data-zh属性
                    element.textContent = zhContent;
                }
            });
        }
    }
    
    // 获取存储的语言偏好，并设置初始按钮状态
    const savedLanguage = localStorage.getItem('language');
    
    // 设置初始语言按钮状态
    if (savedLanguage === 'zh') {
        enBtn.classList.remove('active');
        zhBtn.classList.add('active');
        body.className = 'zh';
        // 即使有保存的中文偏好，也等用户手动点击切换
    } else {
        // 默认英文
        enBtn.classList.add('active');
        zhBtn.classList.remove('active');
        body.className = 'en en-original'; // 标记为原始英文页面
    }
    
    // 添加按钮事件监听器
    enBtn.addEventListener('click', function() {
        if (body.className !== 'en' && body.className !== 'en en-original') {
            setLanguage('en');
        }
    });
    
    zhBtn.addEventListener('click', function() {
        if (!body.className.includes('zh')) {
            setLanguage('zh');
        }
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