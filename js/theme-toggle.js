// ==================== THEME TOGGLE FUNCTIONALITY ====================
class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.theme);

        // Create toggle button
        this.createToggleButton();

        // Listen for toggle clicks
        this.toggleButton.addEventListener('click', () => this.toggle());
    }

    createToggleButton() {
        this.toggleButton = document.createElement('button');
        this.toggleButton.className = 'theme-toggle';
        this.toggleButton.setAttribute('aria-label', 'Toggle theme');
        this.toggleButton.innerHTML = `
      <i class="fas fa-sun"></i>
      <i class="fas fa-moon"></i>
    `;
        document.body.appendChild(this.toggleButton);
    }

    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);

        // Add animation effect
        this.toggleButton.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.toggleButton.style.transform = '';
        }, 300);
    }

    applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }
}

// Initialize theme toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ThemeToggle();
});

// Optional: Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newTheme = e.matches ? 'dark' : 'light';
        // Only apply if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            new ThemeToggle().applyTheme(newTheme);
        }
    });
}
