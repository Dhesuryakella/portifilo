// ==================== PROFESSIONAL CURSOR EFFECTS ====================
class ProfessionalCursor {
    constructor() {
        this.cursorDot = null;
        this.cursorRing = null;
        this.trails = [];
        this.maxTrails = 8;
        this.init();
    }

    init() {
        // Create custom cursor dot
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor';
        document.body.appendChild(this.cursorDot);

        // Create cursor ring
        this.cursorRing = document.createElement('div');
        this.cursorRing.className = 'cursor-ring';
        document.body.appendChild(this.cursorRing);

        // Mouse move handler
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update dot position (fast)
            this.cursorDot.style.left = mouseX + 'px';
            this.cursorDot.style.top = mouseY + 'px';

            // Create trail
            if (Math.random() > 0.7) {
                this.createTrail(mouseX, mouseY);
            }
        });

        // Smooth ring follow
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            this.cursorRing.style.left = ringX - 20 + 'px';
            this.cursorRing.style.top = ringY - 20 + 'px';

            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card, input, textarea');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursorDot.classList.add('hover');
                this.cursorRing.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursorDot.classList.remove('hover');
                this.cursorRing.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursorDot.style.opacity = '0';
            this.cursorRing.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursorDot.style.opacity = '1';
            this.cursorRing.style.opacity = '0.6';
        });
    }

    createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);

        // Fade in
        setTimeout(() => {
            trail.style.opacity = '0.6';
        }, 10);

        // Fade out and remove
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                trail.remove();
            }, 300);
        }, 200);
    }
}

// Initialize cursor effects when DOM is ready
if (window.innerWidth > 768) { // Only on desktop
    document.addEventListener('DOMContentLoaded', () => {
        new ProfessionalCursor();
    });
}
