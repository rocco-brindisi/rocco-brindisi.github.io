// Portfolio PCTO - Rocco Brindisi
// Script JavaScript per funzionalità interattive

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== INIZIALIZZAZIONE ==========
    
    // Elementi DOM principali
    const nav = document.querySelector('nav');
    const navMenu = document.getElementById('nav-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const fabMain = document.getElementById('fab-main');
    const fabMenu = document.getElementById('fab-menu');
    const fabIcon = document.getElementById('fab-icon');
    const themeToggle = document.getElementById('theme-toggle');
    const scrollTop = document.getElementById('scroll-top');
    
    // Variabili di stato
    let fabMenuOpen = false;
    let isScrolling = false;
    
    // ========== PARTICLES BACKGROUND ==========
    
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posizione casuale
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Dimensione casuale
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Durata animazione casuale
            particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // ========== NAVIGATION ==========
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animazione hamburger menu
        const spans = mobileMenu.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = '';
                span.style.opacity = '';
            }
        });
    });
    
    // Navigation smooth scroll e active state
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Rimuovi active da tutti i link
            navLinks.forEach(l => l.classList.remove('active'));
            // Aggiungi active al link cliccato
            this.classList.add('active');
            
            // Smooth scroll alla sezione
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Chiudi mobile menu se aperto
            navMenu.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
    
    // ========== SCROLL EFFECTS ==========
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.05)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(10px)';
        }
        
        // Update active navigation based on scroll position
        updateActiveNav();
    });
    
    function updateActiveNav() {
        if (isScrolling) return;
        
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
    
    // ========== INTERSECTION OBSERVER ==========
    
    // Observer per animazioni scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate');
                }
                
                if (entry.target.classList.contains('skill-card')) {
                    entry.target.classList.add('animate');
                    // Animazione progress bar
                    setTimeout(() => {
                        const progressFill = entry.target.querySelector('.progress-fill');
                        const width = progressFill.getAttribute('data-width');
                        progressFill.style.width = width + '%';
                        
                        // Animazione percentuale
                        const percentageEl = entry.target.querySelector('.skill-percentage');
                        const targetPercentage = parseInt(percentageEl.getAttribute('data-percentage'));
                        animateNumber(percentageEl, 0, targetPercentage, 1500, '%');
                    }, 300);
                }
                
                if (entry.target.classList.contains('stat-card')) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    const target = parseInt(numberEl.getAttribute('data-target'));
                    animateNumber(numberEl, 0, target, 2000);
                }
            }
        });
    }, observerOptions);
    
    // Osserva elementi per animazioni
    document.querySelectorAll('.timeline-item, .skill-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
    
    // ========== COUNTER ANIMATION ==========
    
    function animateNumber(element, start, end, duration, suffix = '') {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
    
    // ========== FAB MENU ==========
    
    // Toggle FAB menu
    fabMain.addEventListener('click', function() {
        fabMenuOpen = !fabMenuOpen;
        
        if (fabMenuOpen) {
            fabMenu.classList.add('active');
            fabIcon.style.transform = 'rotate(45deg)';
        } else {
            fabMenu.classList.remove('active');
            fabIcon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', function() {
        const body = document.body;
        const icon = this.querySelector('i');
        
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
        
        // Chiudi FAB menu
        fabMenuOpen = false;
        fabMenu.classList.remove('active');
        fabIcon.style.transform = 'rotate(0deg)';
    });
    
    // Scroll to top
    scrollTop.addEventListener('click', function() {
        isScrolling = true;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
        
        // Chiudi FAB menu
        fabMenuOpen = false;
        fabMenu.classList.remove('active');
        fabIcon.style.transform = 'rotate(0deg)';
    });
    
    // ========== THEME INITIALIZATION ==========
    
    function initTheme() {
        const savedTheme = localStorage.getItem('theme');
        const themeIcon = themeToggle.querySelector('i');
        
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
    
    // ========== SMOOTH SCROLL POLYFILL ==========
    
    // Per browser che non supportano scroll-behavior: smooth
    function smoothScrollTo(element, to, duration) {
        const start = element.scrollTop;
        const change = to - start;
        const startDate = new Date().getTime();
        
        const easeInOutQuart = function(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t * t + b;
            t -= 2;
            return -c / 2 * (t * t * t * t - 2) + b;
        };
        
        const animateScroll = function() {
            const currentDate = new Date().getTime();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuart(currentTime, start, change, duration));
            
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            }
        };
        
        animateScroll();
    }
    
    // ========== KEYBOARD NAVIGATION ==========
    
    // Supporto tastiera per accessibilità
    document.addEventListener('keydown', function(e) {
        // Escape chiude il mobile menu
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = mobileMenu.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
            
            if (fabMenuOpen) {
                fabMenuOpen = false;
                fabMenu.classList.remove('active');
                fabIcon.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // ========== RESIZE HANDLER ==========
    
    window.addEventListener('resize', function() {
        // Chiudi mobile menu su resize
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        }
    });
    
    // ========== PERFORMANCE OPTIMIZATION ==========
    
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollElements() {
        // Update navbar background
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.05)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(10px)';
        }
        
        updateActiveNav();
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    });
    
    // ========== INITIALIZATION ==========
    
    // Inizializza tutto quando il DOM è pronto
    createParticles();
    initTheme();
    
    // Mostra il contenuto con fade-in
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Console log per debugging
    console.log('🚀 Portfolio PCTO - Rocco Brindisi inizializzato correttamente!');
    
    // ========== UTILITY FUNCTIONS ==========
    
    // Funzione per aggiungere effetti hover dinamici
    function addHoverEffects() {
        const hoverElements = document.querySelectorAll('.stat-card, .skill-card, .timeline-content');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    addHoverEffects();
    
    // ========== EASTER EGG ==========
    
    // Konami Code easter egg
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg attivato!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            
            console.log('🎉 Konami Code attivato! Rocco approva! 🎉');
        }
    });
    
    // Aggiungi CSS per l'effetto rainbow
    const rainbowCSS = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = rainbowCSS;
    document.head.appendChild(style);
});