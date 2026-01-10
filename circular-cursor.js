// ==================== CIRCULAR TEXT CURSOR ====================
class CircularCursor {
    constructor() {
        // Only initialize on desktop
        if (window.innerWidth <= 768) return;

        this.cursor = null;
        this.cursorText = 'DHESURYA — DHESURYA — '; // Your name repeated
        this.createCursor();
        this.init();
    }

    createCursor() {
        // Create cursor container
        this.cursor = document.createElement('div');
        this.cursor.className = 'circular-cursor';

        // Create center dot
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';

        // Create SVG for circular text
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'cursor-text');
        svg.setAttribute('viewBox', '0 0 120 120');

        // Create circular path
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('id', 'circlePath');
        path.setAttribute('d', 'M 60, 60 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0');

        defs.appendChild(path);
        svg.appendChild(defs);

        // Create text on path
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
        textPath.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#circlePath');
        textPath.textContent = this.cursorText;

        text.appendChild(textPath);
        svg.appendChild(text);

        // Create rotating container
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.appendChild(svg);

        this.cursor.appendChild(dot);
        this.cursor.appendChild(circle);
        document.body.appendChild(this.cursor);
    }

    init() {
        if (!this.cursor) return;

        // Add custom cursor class to body
        document.body.classList.add('custom-cursor-active');

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 60 + 'px';
            this.cursor.style.top = e.clientY - 60 + 'px';

            // Show cursor
            if (!this.cursor.classList.contains('active')) {
                this.cursor.classList.add('active');
            }
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.classList.remove('active');
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.classList.add('active');
        });

        // Scale cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card, [role="button"]');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

// Initialize circular cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CircularCursor();
    console.log('✨ Circular cursor initialized');
});
