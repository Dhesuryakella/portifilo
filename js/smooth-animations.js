// ==================== SMOOTH SCROLL REVEAL ANIMATIONS ====================
class ScrollReveal {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Select all elements to animate
        this.elements = document.querySelectorAll('.fade-on-scroll, .card, .testimonial-card, .skill-badge-large');

        // Create observer
        const options = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: unobserve after animation
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all elements
        this.elements.forEach(el => {
            el.classList.add('fade-on-scroll');
            this.observer.observe(el);
        });
    }
}

// ==================== SMOOTH PARALLAX EFFECT ====================
class ParallaxEffect {
    constructor() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        if (this.parallaxElements.length > 0) {
            this.init();
        }
    }

    init() {
        window.addEventListener('scroll', () => this.update(), { passive: true });
    }

    update() {
        const scrolled = window.pageYOffset;

        this.parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ==================== TYPING EFFECT ENHANCEMENT ====================
class TypingEffect {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==================== MAGNETIC BUTTON EFFECT ====================
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-magnetic, .btn-primary, .btn-outline');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => this.handleMove(e, button));
            button.addEventListener('mouseleave', () => this.handleLeave(button));
        });
    }

    handleMove(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const strength = 0.3; // Adjust magnetic strength
        button.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.05)`;
    }

    handleLeave(button) {
        button.style.transform = 'translate(0, 0) scale(1)';
    }
}

// ==================== INITIALIZE ALL EFFECTS ====================
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll reveal
    new ScrollReveal();

    // Parallax effect
    new ParallaxEffect();

    // Magnetic buttons
    new MagneticButtons();

    // Optional: Add typing effect to subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle && !heroSubtitle.dataset.typed) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.dataset.typed = 'true';
        // Uncomment to enable multi-text rotation
        // new TypingEffect(heroSubtitle, [
        //   'Embedded Systems & AI/ML Engineer',
        //   'Computer Vision Specialist',
        //   'Robotics Enthusiast'
        // ]);
    }

    // Enhance skill badges animation
    const skillBadges = document.querySelectorAll('.skill-badge-large');
    skillBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        setTimeout(() => {
            badge.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// ==================== SMOOTH SCROLL TO SECTION ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed header
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
