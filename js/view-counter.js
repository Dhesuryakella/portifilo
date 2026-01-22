/* ==================== VIEW COUNTER ==================== */
// Uses CountAPI for tracking page views across all visitors

class ViewCounter {
    constructor() {
        // Unique namespace and key for your portfolio
        this.namespace = 'dhesuryakella-portfolio';
        this.key = 'visits';
        this.apiUrl = `https://api.countapi.xyz/hit/${this.namespace}/${this.key}`;

        this.init();
    }

    init() {
        this.createCounterElement();
        this.fetchAndDisplayCount();
    }

    createCounterElement() {
        // Create footer counter container
        const counter = document.createElement('div');
        counter.className = 'view-counter';
        counter.id = 'viewCounter';
        counter.innerHTML = `
            <div class="counter-content">
                <i class="fas fa-eye"></i>
                <span class="counter-label">Total Visits:</span>
                <span class="counter-value" id="visitCount">
                    <i class="fas fa-spinner fa-spin"></i>
                </span>
            </div>
        `;

        document.body.appendChild(counter);
    }

    async fetchAndDisplayCount() {
        const countElement = document.getElementById('visitCount');

        try {
            const response = await fetch(this.apiUrl);

            if (response.ok) {
                const data = await response.json();
                // Animate the number
                this.animateCount(countElement, data.value);
            } else {
                // Fallback to localStorage if API fails
                this.useFallbackCounter(countElement);
            }
        } catch (error) {
            console.log('CountAPI unavailable, using fallback');
            this.useFallbackCounter(countElement);
        }
    }

    useFallbackCounter(element) {
        // Fallback: localStorage-based counter (per-browser only)
        let count = parseInt(localStorage.getItem('portfolio_view_count') || '0');
        count++;
        localStorage.setItem('portfolio_view_count', count.toString());
        this.animateCount(element, count);
    }

    animateCount(element, targetValue) {
        const duration = 1500;
        const startTime = performance.now();
        const startValue = 0;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);

            element.textContent = this.formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = this.formatNumber(targetValue);
            }
        };

        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        // Format with commas for readability
        return num.toLocaleString();
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new ViewCounter();
});
