// Dark Mode Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIconLight = document.getElementById('theme-icon-light');
const themeIconDark = document.getElementById('theme-icon-dark');
const html = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIconLight.classList.add('hidden');
    themeIconDark.classList.remove('hidden');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIconLight.classList.add('hidden');
        themeIconDark.classList.remove('hidden');
    } else {
        localStorage.setItem('theme', 'light');
        themeIconLight.classList.remove('hidden');
        themeIconDark.classList.add('hidden');
    }
});

// Mobile Drawer Functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileDrawer = document.getElementById('mobile-drawer');
const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
const closeDrawerButton = document.getElementById('close-drawer');
const drawerLinks = document.querySelectorAll('.drawer-link');

// Function to open drawer
function openDrawer() {
    mobileDrawer.classList.remove('translate-x-full');
    mobileDrawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Animate hamburger to X
    const spans = mobileMenuButton.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
}

// Function to close drawer
function closeDrawer() {
    mobileDrawer.classList.add('translate-x-full');
    mobileDrawerOverlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = ''; // Restore scrolling
    
    // Animate X back to hamburger
    const spans = mobileMenuButton.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
}

// Toggle drawer on hamburger click
mobileMenuButton.addEventListener('click', () => {
    if (mobileDrawer.classList.contains('translate-x-full')) {
        openDrawer();
    } else {
        closeDrawer();
    }
});

// Close drawer on close button click
closeDrawerButton.addEventListener('click', closeDrawer);

// Close drawer on overlay click
mobileDrawerOverlay.addEventListener('click', closeDrawer);

// Close drawer when clicking on a link
drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeDrawer();
    });
});

// Close drawer on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileDrawer.classList.contains('translate-x-full')) {
        closeDrawer();
    }
});

// Smooth scroll with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add playful interactions to cards
const cards = document.querySelectorAll('.card-hover');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animated counter for numbers (if you want to add stats later)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll('button, a[class*="bg-primary"], a[class*="bg-secondary"]');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
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
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('section');
    if (heroSection) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to emojis
const emojis = document.querySelectorAll('.pulse');
emojis.forEach((emoji, index) => {
    emoji.style.animationDelay = `${index * 0.2}s`;
});

// Dynamic pricing button text based on scroll position
const pricingSection = document.getElementById('pricing');
const ctaButtons = document.querySelectorAll('a[href="#pricing"]');

if (pricingSection) {
    window.addEventListener('scroll', () => {
        const pricingTop = pricingSection.offsetTop;
        const scrollPos = window.pageYOffset + window.innerHeight;
        
        if (scrollPos > pricingTop) {
            ctaButtons.forEach(btn => {
                if (btn.textContent.includes('Get Started') || btn.textContent.includes('Start Free')) {
                    btn.innerHTML = '<span class="material-symbols-outlined inline-block align-middle">rocket_launch</span> Choose Plan';
                }
            });
        } else {
            ctaButtons.forEach(btn => {
                if (btn.textContent.includes('Choose')) {
                    btn.textContent = 'Start Free Today';
                }
            });
        }
    });
}

// Add hover sound effect (optional - commented out by default)
// Uncomment if you want to add playful sound effects
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYHGGS57OahUBELTKXh8LdjHAU2jdXxzIAuBSJ0w+/glEoOF2O66+2gUhELSKPg8LhlHgU0iNLvz4cyBSJuwO7inVoUDllwvOvnoVIRC0mi4PCxZSAGMoTM7tGIOwcibLzs5qVcFgtTrOPusmgjBi59v+rhnlcVC1Kl4O+uZSQFMH+/6tqQQQsVXKzi56haFgpQn93wtmkkBSp4u+HSj0QMFVW14OqsYh0FMH+94d2TRAwUV63f6qxiHQUwfL3h3I9EDRVVtuDqrGIdBTB7vOHckEQNFFeu4OqtYR0FMHq74NyQRA0UVbXe6q1hHQUwerze3I9FDRRUr97rrmEdBS55vODdj0YOE1Sr3+uuYx4FLnm64N2PSQ4TU6rg66xiHgUveLrg3YZKG');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => console.log('Audio play failed'));
    });
});
*/

// Mobile menu toggle (if you add hamburger menu later)
function initMobileMenu() {
    const menuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 TaskBnb loaded successfully!');
    initMobileMenu();
});



// Add Easter egg - Konami code
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        document.body.style.animation = 'wiggle 0.5s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
        console.log('🎮 Secret code activated! You are a property management ninja! 🥷');
    }
});

// Prevent animation on page load
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add festive confetti on CTA button click (playful touch)
function createConfetti(x, y) {
    const colors = ['#6b9d5f', '#3d88b3', '#fcfcfc'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let velocityY = vy;
        const gravity = 500;
        let opacity = 1;
        
        const startTime = Date.now();
        
        function animate() {
            const elapsed = (Date.now() - startTime) / 1000;
            
            posX += vx * 0.016;
            posY += velocityY * 0.016;
            velocityY += gravity * 0.016;
            opacity -= 0.016 * 2;
            
            confetti.style.left = posX + 'px';
            confetti.style.top = posY + 'px';
            confetti.style.opacity = opacity;
            
            if (opacity > 0 && posY < window.innerHeight) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        }
        
        animate();
    }
}

// Add confetti to main CTA buttons
const mainCTAs = document.querySelectorAll('a[href="#pricing"]');
mainCTAs.forEach(cta => {
    cta.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createConfetti(x, y);
    });
});

// Enrollment Form Handling
const enrollmentForm = document.getElementById('enrollment-form');
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(enrollmentForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual API call)
        console.log('Form submitted:', data);
        
        // Show success message
        const formContainer = enrollmentForm.parentElement;
        formContainer.innerHTML = `
            <div class="text-center py-12 animate-fadeInUp">
                <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <span class="material-symbols-outlined text-5xl text-white">check_circle</span>
                </div>
                <h3 class="text-3xl font-bold mb-4">Welcome to TaskBnb! 🎉</h3>
                <p class="text-xl text-gray-600 mb-6">Your enrollment is complete.</p>
                <p class="text-gray-600 mb-8">We'll send you an email with next steps within the next few minutes.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#pricing" class="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition transform shadow-lg">
                        View Plans
                    </a>
                    <a href="#features" class="bg-white text-dark px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition transform shadow-lg border-2 border-gray-200">
                        Explore Features
                    </a>
                </div>
            </div>
        `;
        
        // Add confetti effect
        const rect = formContainer.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createConfetti(x, y), i * 20);
        }
        
        // Scroll to success message
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.phone || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9+\-\s()]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        console.log('Contact form submitted:', data);
        
        // Show success message
        const formContainer = contactForm.parentElement;
        formContainer.innerHTML = `
            <div class="text-center py-12 animate-fadeInUp">
                <div class="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span class="material-symbols-outlined text-5xl text-white">check_circle</span>
                </div>
                <h3 class="text-3xl font-bold mb-4">Message Sent! 🎉</h3>
                <p class="text-xl text-gray-600 mb-6">Thanks for reaching out!</p>
                <p class="text-gray-600 mb-8">We'll get back to you within 24 hours.</p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#enrollment" class="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition transform shadow-lg">
                        Enroll Now
                    </a>
                    <a href="https://wa.me/919876543210" target="_blank" class="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition transform shadow-lg">
                        Chat on WhatsApp
                    </a>
                </div>
            </div>
        `;
        
        // Add confetti effect
        const rect = formContainer.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createConfetti(x, y), i * 20);
        }
        
        // Scroll to success message
        formContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// ============================================
// GSAP HERO SECTION ANIMATIONS - MOUSE INTERACTION
// ============================================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero Section with Mouse-Driven Animations
function initHeroAnimations() {
    // Initial entrance animations
    initEntranceAnimations();
    
    // Setup mouse-driven parallax
    setupMouseParallax();
    
    // Setup scroll animations
    setupScrollAnimations();
}

// Initial entrance animations
function initEntranceAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate left side (text content)
    tl.fromTo('#hero-badge',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo('#hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.5'
    )
    .fromTo('#hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
    )
    .fromTo('#hero-buttons',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
    )
    // Animate right side (image)
    .fromTo('#hero-right',
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power2.out' },
        '-=1'
    );
}

// Mouse-driven parallax effect
function setupMouseParallax() {
    // Mouse parallax disabled
}

// Scroll-based animations
function setupScrollAnimations() {
    // Parallax scroll for hero sections - only left side
    gsap.to('#hero-left', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -50,
        opacity: 0.5,
        ease: 'none'
    });
    
    // Keep image visible while scrolling - subtle movement only
    gsap.to('#hero-right', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -30,
        ease: 'none'
    });
}


// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAnimations);
} else {
    initHeroAnimations();
}