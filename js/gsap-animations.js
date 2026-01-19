// ==================== GSAP PROFESSIONAL ANIMATIONS ====================
// Inspired by adeolaadeoti-v2 repository

gsap.registerPlugin(ScrollTrigger);

class ProfessionalAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.heroAnimations();
        this.scrollRevealAnimations();
        this.staggerAnimations();
        this.smoothScrollSetup();
    }

    // Hero Section Animations (Only on home page)
    heroAnimations() {
        // Check if hero elements exist
        const profileImage = document.querySelector('.profile-image-wrapper');
        const heroGreeting = document.querySelector('.hero-greeting');
        const heroTitle = document.querySelector('.hero-title');

        // Only run hero animations if elements exist
        if (!profileImage || !heroGreeting || !heroTitle) {
            return; // Exit if not on home page
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.from('.profile-image-wrapper', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        })
            .from('.hero-greeting', {
                y: 30,
                opacity: 0,
                duration: 0.6
            }, '-=0.5')
            .from('.hero-title', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power4.out'
            }, '-=0.4')
            .from('.hero-subtitle', {
                y: 30,
                opacity: 0,
                duration: 0.6
            }, '-=0.3')
            .from('.hero-description', {
                y: 20,
                opacity: 0,
                duration: 0.6
            }, '-=0.2');

        // Only animate skill badges if they exist
        const skillBadges = document.querySelectorAll('.skill-badge-large');
        if (skillBadges.length > 0) {
            tl.from('.skill-badge-large', {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'back.out(2)'
            }, '-=0.3');
        }

        // Only animate buttons if they exist
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        if (heroButtons.length > 0) {
            tl.from('.hero-buttons .btn', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.15
            }, '-=0.4');
        }

        // Only animate social links if they exist
        const socialLinks = document.querySelectorAll('.social-link');
        if (socialLinks.length > 0) {
            tl.from('.social-link', {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                stagger: 0.1,
                ease: 'back.out(1.5)'
            }, '-=0.3');
        }
    }

    // Scroll-Triggered Reveal Animations
    scrollRevealAnimations() {
        // Section Titles - check if they exist
        const sectionTitles = document.querySelectorAll('.section-title');
        if (sectionTitles.length > 0) {
            gsap.utils.toArray('.section-title').forEach(section => {
                gsap.from(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            });
        }

        // Cards - check if they exist
        const cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            gsap.utils.toArray('.card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: 'power3.out'
                });
            });
        }

        // Project Cards - check if they exist
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            gsap.utils.toArray('.project-card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    scale: 0.95,
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: 'power2.out'
                });
            });
        }

        // Testimonial Cards - check if they exist
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        if (testimonialCards.length > 0) {
            gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    x: index % 2 === 0 ? -20 : 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            });
        }
    }

    // Stagger Animations
    staggerAnimations() {
        // Animate lists - check if they exist
        const projectTags = document.querySelectorAll('.project-tags');
        if (projectTags.length > 0) {
            gsap.utils.toArray('.project-tags').forEach(tags => {
                ScrollTrigger.create({
                    trigger: tags,
                    start: 'top 95%',
                    onEnter: () => {
                        gsap.from(tags.querySelectorAll('.tag, .tech-badge'), {
                            scale: 0.9,
                            opacity: 0,
                            duration: 0.3,
                            stagger: 0.05,
                            ease: 'power2.out'
                        });
                    },
                    once: true
                });
            });
        }

        // About cards icons - check if they exist
        const cardIcons = document.querySelectorAll('.card-icon');
        if (cardIcons.length > 0) {
            gsap.utils.toArray('.card-icon').forEach(icon => {
                ScrollTrigger.create({
                    trigger: icon,
                    start: 'top 90%',
                    onEnter: () => {
                        gsap.from(icon, {
                            scale: 0.8,
                            rotation: -90,
                            opacity: 0,
                            duration: 0.5,
                            ease: 'back.out(1.5)'
                        });
                    },
                    once: true
                });
            });
        }
    }

    // Smooth Scroll Setup
    smoothScrollSetup() {
        // Parallax for profile image - only if it exists
        const profileImage = document.querySelector('.profile-image-wrapper');
        if (profileImage) {
            gsap.to('.profile-image-wrapper', {
                scrollTrigger: {
                    trigger: '.hero-section',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                },
                y: 150,
                ease: 'none'
            });
        }
    }
}

// ==================== MAGNETIC HOVER EFFECTS ====================
class MagneticEffect {
    constructor() {
        this.magneticElements = document.querySelectorAll('.btn, .card, .social-link, .skill-badge-large');
        this.init();
    }

    init() {
        this.magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => this.magnetize(e, el));
            el.addEventListener('mouseleave', () => this.demagnetize(el));
        });
    }

    magnetize(e, element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        gsap.to(element, {
            x: deltaX,
            y: deltaY,
            duration: 0.4,
            ease: 'power2.out'
        });
    }

    demagnetize(element) {
        gsap.to(element, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
        });
    }
}

// ==================== TEXT REVEAL ANIMATIONS ====================
class TextReveal {
    constructor() {
        this.init();
    }

    init() {
        // Split text into lines for reveal effect
        const titles = document.querySelectorAll('h1, h2, h3');

        titles.forEach(title => {
            const text = title.textContent;
            title.setAttribute('data-text', text);

            ScrollTrigger.create({
                trigger: title,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from(title, {
                        opacity: 0,
                        y: 30,
                        duration: 0.8,
                        ease: 'power3.out'
                    });
                },
                once: true
            });
        });
    }
}

// ==================== CURSOR FOLLOWER ENHANCEMENT ====================
class CursorFollower {
    constructor() {
        this.cursor = document.querySelector('.custom-cursor');
        this.cursorRing = document.querySelector('.cursor-ring');
        this.init();
    }

    init() {
        if (!this.cursor || !this.cursorRing) return;

        document.addEventListener('mousemove', (e) => {
            gsap.to(this.cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            gsap.to(this.cursorRing, {
                x: e.clientX - 20,
                y: e.clientY - 20,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Interactive elements
        const interactive = document.querySelectorAll('a, button, .btn, .card');
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to([this.cursor, this.cursorRing], {
                    scale: 1.5,
                    duration: 0.3,
                    ease: 'back.out(2)'
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to([this.cursor, this.cursorRing], {
                    scale: 1,
                    duration: 0.3,
                    ease: 'back.out(2)'
                });
            });
        });
    }
}

// ==================== INITIALIZE ALL ANIMATIONS ====================
window.addEventListener('DOMContentLoaded', () => {
    // Initialize professional animations
    new ProfessionalAnimations();

    // Initialize magnetic effects
    new MagneticEffect();

    // Initialize text reveal
    new TextReveal();

    // Enhance cursor follower with GSAP
    new CursorFollower();

    console.log('✨ Professional animations loaded');
});
