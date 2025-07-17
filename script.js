document.addEventListener('DOMContentLoaded', function() {
    // Set active navigation link based on current page
    setActiveNavLink();
    
    // Add smooth scrolling for internal links
    addSmoothScrolling();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add click tracking
    addClickTracking();
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    function addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    function addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const elementsToAnimate = [
            '.product-card',
            '.overview-card',
            '.feature-item'
        ];
        
        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(element);
            });
        });
    }
    
    function addClickTracking() {
        document.querySelectorAll('.product-link, .hero-btn, .overview-link').forEach(link => {
            link.addEventListener('click', function() {
                // You can add analytics tracking here
                console.log('Link clicked:', this.href);
                
                // Optional: Add a small delay to ensure tracking is sent
                // before navigation (useful for analytics)
                if (this.target === '_blank') {
                    // For external links, no delay needed
                    return true;
                }
            });
        });
    }
    
    function addKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
        
        // Add focus styles for keyboard navigation
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-nav *:focus {
                outline: 2px solid #2563eb !important;
                outline-offset: 2px !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add loading animation for page transitions
    function addPageTransitions() {
        const links = document.querySelectorAll('a:not([target="_blank"])');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only add transition for internal page links
                if (href && !href.startsWith('#') && !href.startsWith('http')) {
                    e.preventDefault();
                    
                    // Add fade out effect
                    document.body.style.opacity = '0.7';
                    document.body.style.transition = 'opacity 0.3s ease';
                    
                    // Navigate after animation
                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                }
            });
        });
    }
    
    // Initialize page transitions
    addPageTransitions();
    
    // Add fade in effect when page loads
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Add hover effects for better interactivity
    function addHoverEffects() {
        const cards = document.querySelectorAll('.product-card, .overview-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Initialize hover effects
    addHoverEffects();
});