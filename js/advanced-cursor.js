// ==================== ULTRA SMOOTH CURSOR SYSTEM ====================
// Premium cursor with butter-smooth animations, magnetic effects & particles

class AdvancedCursor {
    constructor() {
        // Skip on mobile/touch devices
        if (this.isTouchDevice()) return;

        // State
        this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.followerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.auroraPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.velocity = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        this.isHovering = false;
        this.hoverElement = null;
        this.particles = [];
        this.maxParticles = 15;
        this.trailPoints = [];
        this.maxTrailPoints = 12;

        // Smoothing factors (higher = faster, lower = smoother)
        this.cursorEase = 0.25;      // Main cursor
        this.followerEase = 0.08;    // Follower ring
        this.auroraEase = 0.04;      // Aurora glow

        // Cursor label texts for different elements
        this.labelTexts = {
            'a[href^="http"]': 'Visit',
            'a[href^="mailto"]': 'Email',
            'a[href$=".pdf"]': 'Download',
            '.btn-primary': 'Click Me',
            '.btn-outline': 'Explore',
            '.project-card': 'View Project',
            '.card': 'Learn More',
            'img': 'View',
            '.social-link': 'Connect',
            '.nav-links a': 'Navigate',
            'button': 'Click'
        };

        this.createElements();
        this.bindEvents();
        this.animate();

        console.log('✨ Advanced Cursor System Initialized');
    }

    isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0) ||
            window.innerWidth <= 768);
    }

    createElements() {
        // Main cursor dot
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-main';
        document.body.appendChild(this.cursor);

        // Follower ring
        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower';
        document.body.appendChild(this.follower);

        // Magnetic field indicator
        this.magnetic = document.createElement('div');
        this.magnetic.className = 'cursor-magnetic';
        document.body.appendChild(this.magnetic);

        // Text label
        this.label = document.createElement('div');
        this.label.className = 'cursor-text-label';
        document.body.appendChild(this.label);

        // Aurora glow
        this.aurora = document.createElement('div');
        this.aurora.className = 'cursor-aurora';
        document.body.appendChild(this.aurora);

        // Morph shape
        this.morph = document.createElement('div');
        this.morph.className = 'cursor-morph';
        document.body.appendChild(this.morph);
    }

    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));

        // Mouse enter/leave window
        document.addEventListener('mouseleave', () => this.hideCursor());
        document.addEventListener('mouseenter', () => this.showCursor());

        // Click events
        document.addEventListener('mousedown', (e) => this.onMouseDown(e));
        document.addEventListener('mouseup', () => this.onMouseUp());

        // Hover events for interactive elements
        this.bindHoverEvents();

        // Re-bind on dynamic content changes
        this.observeDOM();
    }

    bindHoverEvents() {
        const interactiveElements = document.querySelectorAll(
            'a, button, .btn, .card, .project-card, input, textarea, [role="button"], img, .social-link, .nav-links a, .profile-image-wrapper'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => this.onElementEnter(e));
            el.addEventListener('mouseleave', (e) => this.onElementLeave(e));
        });

        // Add magnetic effect to buttons
        const magneticElements = document.querySelectorAll('.btn, .social-link, .mobile-menu-btn');
        magneticElements.forEach(el => {
            el.setAttribute('data-cursor', 'magnetic');
            el.addEventListener('mousemove', (e) => this.magneticPull(e, el));
            el.addEventListener('mouseleave', () => this.magneticReset(el));
        });
    }

    observeDOM() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length) {
                    setTimeout(() => this.bindHoverEvents(), 100);
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    onMouseMove(e) {
        this.lastMouse.x = this.mouse.x;
        this.lastMouse.y = this.mouse.y;
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        // Calculate velocity
        this.velocity.x = this.mouse.x - this.lastMouse.x;
        this.velocity.y = this.mouse.y - this.lastMouse.y;
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);

        // Create particles based on speed
        if (speed > 5 && this.particles.length < this.maxParticles) {
            this.createParticle();
        }

        // Update glow trail
        this.updateTrail();
    }

    onMouseDown(e) {
        this.cursor.classList.add('click');
        this.follower.classList.add('click');
        this.createRipple(e.clientX, e.clientY);

        // Create burst of particles
        for (let i = 0; i < 8; i++) {
            setTimeout(() => this.createParticle(true), i * 20);
        }
    }

    onMouseUp() {
        this.cursor.classList.remove('click');
        this.follower.classList.remove('click');
    }

    onElementEnter(e) {
        const el = e.currentTarget;
        this.isHovering = true;
        this.hoverElement = el;

        this.cursor.classList.add('hover');
        this.follower.classList.add('hover');
        this.magnetic.classList.add('active');

        // Show label with appropriate text
        const labelText = this.getLabelText(el);
        if (labelText) {
            this.label.textContent = labelText;
            this.label.classList.add('active');
        }

        // Add morph effect for specific elements
        if (el.matches('img, .profile-image-wrapper')) {
            this.cursor.classList.add('image-hover');
        } else if (el.matches('input, textarea')) {
            this.cursor.classList.add('text-hover');
        }

        // Morph shape based on element
        if (el.matches('.card, .project-card')) {
            this.morph.classList.add('square');
        }
    }

    onElementLeave(e) {
        this.isHovering = false;
        this.hoverElement = null;

        this.cursor.classList.remove('hover', 'image-hover', 'text-hover');
        this.follower.classList.remove('hover');
        this.magnetic.classList.remove('active');
        this.label.classList.remove('active');
        this.morph.classList.remove('square', 'triangle');
    }

    getLabelText(el) {
        for (const [selector, text] of Object.entries(this.labelTexts)) {
            if (el.matches(selector)) {
                return text;
            }
        }
        return null;
    }

    magneticPull(e, el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;

        // Maximum pull distance
        const maxDist = 15;
        const pullX = (distX / rect.width) * maxDist;
        const pullY = (distY / rect.height) * maxDist;

        el.style.transform = `translate(${pullX}px, ${pullY}px)`;
        el.style.transition = 'transform 0.3s ease';
    }

    magneticReset(el) {
        el.style.transform = '';
    }

    createParticle(burst = false) {
        const particle = document.createElement('div');
        const colors = ['cyan', 'magenta', 'yellow', 'green'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        particle.className = `cursor-particle ${randomColor}`;

        // Add random offset for burst effect
        const offsetX = burst ? (Math.random() - 0.5) * 30 : 0;
        const offsetY = burst ? (Math.random() - 0.5) * 30 : 0;

        particle.style.left = (this.mouse.x + offsetX) + 'px';
        particle.style.top = (this.mouse.y + offsetY) + 'px';

        document.body.appendChild(particle);
        this.particles.push(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
            this.particles = this.particles.filter(p => p !== particle);
        }, 800);
    }

    updateTrail() {
        // Add current position to trail
        this.trailPoints.unshift({ x: this.mouse.x, y: this.mouse.y });

        // Limit trail length
        if (this.trailPoints.length > this.maxTrailPoints) {
            this.trailPoints.pop();
        }
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);

        // Remove after animation
        setTimeout(() => ripple.remove(), 600);
    }

    hideCursor() {
        this.cursor.style.opacity = '0';
        this.follower.style.opacity = '0';
        this.aurora.style.opacity = '0';
        this.morph.style.opacity = '0';
    }

    showCursor() {
        this.cursor.style.opacity = '1';
        this.follower.style.opacity = '1';
        this.aurora.style.opacity = '0.6';
        this.morph.style.opacity = '1';
    }

    animate() {
        // Lerp function for smooth interpolation
        const lerp = (start, end, factor) => start + (end - start) * factor;

        // Ultra-smooth cursor movement with configurable easing
        this.pos.x = lerp(this.pos.x, this.mouse.x, this.cursorEase);
        this.pos.y = lerp(this.pos.y, this.mouse.y, this.cursorEase);

        // Smoother follower ring
        this.followerPos.x = lerp(this.followerPos.x, this.mouse.x, this.followerEase);
        this.followerPos.y = lerp(this.followerPos.y, this.mouse.y, this.followerEase);

        // Even smoother aurora glow
        this.auroraPos.x = lerp(this.auroraPos.x, this.mouse.x, this.auroraEase);
        this.auroraPos.y = lerp(this.auroraPos.y, this.mouse.y, this.auroraEase);

        // Apply positions using transform for better performance (GPU accelerated)
        this.cursor.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%)`;
        this.follower.style.transform = `translate3d(${this.followerPos.x}px, ${this.followerPos.y}px, 0) translate(-50%, -50%)`;

        // Update other elements with transform
        this.magnetic.style.transform = `translate3d(${this.followerPos.x}px, ${this.followerPos.y}px, 0) translate(-50%, -50%)`;
        this.aurora.style.transform = `translate3d(${this.auroraPos.x}px, ${this.auroraPos.y}px, 0) translate(-50%, -50%)`;
        this.morph.style.transform = `translate3d(${this.followerPos.x}px, ${this.followerPos.y}px, 0) translate(-50%, -50%)`;
        this.label.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y + 30}px, 0) translate(-50%, 0)`;

        // Calculate velocity-based stretch effect
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);

        if (speed > 3 && !this.isHovering) {
            const stretch = Math.min(speed * 0.03, 0.4);
            const angle = Math.atan2(this.velocity.y, this.velocity.x) * (180 / Math.PI);
            this.cursor.style.transform =
                `translate3d(${this.pos.x}px, ${this.pos.y}px, 0) translate(-50%, -50%) scaleX(${1 + stretch}) rotate(${angle}deg)`;
        }

        // Smooth decay of velocity for natural feel
        this.velocity.x *= 0.85;
        this.velocity.y *= 0.85;

        requestAnimationFrame(() => this.animate());
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedCursor();
});

// Reinitialize on page navigation (for SPAs)
window.addEventListener('popstate', () => {
    document.querySelectorAll('.cursor-main, .cursor-follower, .cursor-magnetic, .cursor-text-label, .cursor-aurora, .cursor-morph').forEach(el => el.remove());
    new AdvancedCursor();
});
