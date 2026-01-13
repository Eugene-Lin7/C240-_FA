// ===== SwimHub - Interactive JavaScript Features =====
// This file includes performance optimization and user interaction enhancements

/**
 * Smooth scroll to section
 * @param {string} sectionId - The ID of the section to scroll to
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Lazy Loading Images - Intersection Observer API
 * Loads images only when they're visible in the viewport
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize lazy loading for images
    initializeLazyLoading();
    
    // Initialize smooth scroll links
    initializeSmoothScrollLinks();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Initialize accessibility features
    initializeAccessibility();
    
    // Initialize interactive elements
    initializeInteractiveElements();
});

/**
 * Lazy Loading Implementation
 * Uses Intersection Observer API for better performance
 */
function initializeLazyLoading() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('image-loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with loading="lazy"
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Smooth Scroll Links
 * Enhances navigation with smooth scrolling
 */
function initializeSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            // Don't prevent default if it's just a hash
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Update active nav link
                    updateActiveNavLink(href);
                }
            }
        });
    });
}

/**
 * Update Active Navigation Link
 * Highlights the current section in navigation
 */
function updateActiveNavLink(targetId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

/**
 * Performance Monitoring
 * Logs Core Web Vitals and page performance metrics
 */
function initializePerformanceMonitoring() {
    // Log page load time
    window.addEventListener('load', () => {
        if (window.performance && window.performance.timing) {
            const pageLoadTime = window.performance.timing.loadEventEnd - 
                                window.performance.timing.navigationStart;
            console.log(`🏊 SwimHub loaded in ${pageLoadTime}ms`);
        }
    });

    // Log resource timing for optimization
    if (window.performance && window.performance.getEntriesByType) {
        window.addEventListener('load', () => {
            const resources = window.performance.getEntriesByType('resource');
            console.log(`📊 Total resources loaded: ${resources.length}`);
        });
    }
}

/**
 * Accessibility Features
 * Ensures keyboard navigation and screen reader support
 */
function initializeAccessibility() {
    // Add ARIA labels and roles where needed
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    // Keyboard navigation for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });

    // Add skip to main content link (for screen readers)
    const skipLink = document.createElement('a');
    skipLink.href = '#basics';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

/**
 * Interactive Elements
 * Enhances user experience with interactive features
 */
function initializeInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            createRipple(e, button);
        });
    });

    // Gallery image modal/preview on click
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('p');
            showImagePreview(img.src, caption.textContent);
        });
    });

    // Add scroll animations for cards
    observeElementsForAnimation();

    // Technique cards counter animation
    animateTechniqueSteps();
}

/**
 * Create Ripple Effect on Button Click
 * @param {Event} event - Click event
 * @param {Element} button - Button element
 */
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Remove existing ripples
    const ripples = button.querySelectorAll('.ripple');
    ripples.forEach(r => r.remove());

    button.appendChild(ripple);
}

/**
 * Show Image Preview Modal
 * @param {string} imageSrc - Image source
 * @param {string} caption - Image caption
 */
function showImagePreview(imageSrc, caption) {
    // Check if modal already exists
    let modal = document.getElementById('imageModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'imageModal';
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img id="modalImage" src="" alt="Preview" class="modal-image">
                <p id="modalCaption" class="modal-caption"></p>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close button
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }

    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalCaption').textContent = caption;
    modal.style.display = 'block';
}

/**
 * Observe Elements for Scroll Animation
 * Animates elements as they scroll into view
 */
function observeElementsForAnimation() {
    if ('IntersectionObserver' in window) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    elementObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe technique and basic cards
        document.querySelectorAll('.technique-card, .basic-card').forEach(card => {
            elementObserver.observe(card);
        });
    }
}

/**
 * Animate Technique Steps
 * Creates a counting animation for technique steps
 */
function animateTechniqueSteps() {
    document.querySelectorAll('.technique-steps').forEach(stepsList => {
        const items = stepsList.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.opacity = '0';
            item.style.animation = 'fadeInUp 0.5s ease forwards';
        });
    });
}

/**
 * Handle Navigation on Scroll
 * Updates active nav link based on scroll position
 */
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Show/hide header shadow on scroll
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 4px 15px rgba(0, 102, 204, 0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
});

/**
 * Debounce Function
 * Prevents function from being called too frequently
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * Throttle Function
 * Limits function execution rate
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            func.apply(this, args);
            lastCall = now;
        }
    };
}

// Add CSS for animations and modal dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .image-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        margin: 5% auto;
        max-width: 80%;
        max-height: 80vh;
        position: relative;
        background-color: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    }

    .modal-image {
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
        display: block;
    }

    .modal-caption {
        padding: 1.5rem;
        text-align: center;
        color: #222;
        font-weight: 600;
        background-color: #f0f4f8;
    }

    .modal-close {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 2rem;
        font-weight: bold;
        color: #999;
        cursor: pointer;
        background-color: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        z-index: 2001;
    }

    .modal-close:hover {
        color: #333;
        background-color: #f0f4f8;
    }

    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    }

    .skip-link:focus {
        top: 0;
    }

    .nav-link.active {
        color: #00D4FF;
        background-color: rgba(0, 212, 255, 0.1);
    }

    /* Smooth transitions for better UX */
    button {
        position: relative;
        overflow: hidden;
    }

    @media (max-width: 768px) {
        .modal-content {
            max-width: 90%;
            margin: 20% auto;
        }
    }
`;
document.head.appendChild(style);

console.log('🏊 SwimHub interactive features loaded successfully!');
