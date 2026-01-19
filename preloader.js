/* ==================== CINEMATIC PRELOADER ==================== */
// "Hello" in 15+ languages with smooth transitions

class CinematicPreloader {
    constructor() {
        this.greetings = [
            { text: "Hello", lang: "English" },
            { text: "नमस्ते", lang: "Hindi" },
            { text: "హలో", lang: "Telugu" },
            { text: "Hola", lang: "Spanish" },
            { text: "Bonjour", lang: "French" },
            { text: "こんにちは", lang: "Japanese" },
            { text: "안녕하세요", lang: "Korean" },
            { text: "مرحبا", lang: "Arabic" },
            { text: "Ciao", lang: "Italian" },
            { text: "Hallo", lang: "German" },
            { text: "Olá", lang: "Portuguese" },
            { text: "Привет", lang: "Russian" },
            { text: "你好", lang: "Chinese" },
            { text: "Merhaba", lang: "Turkish" },
            { text: "Γειά σου", lang: "Greek" }
        ];

        this.currentIndex = 0;
        this.wordDuration = 600; // ms per word
        this.totalWords = 8; // Show 8 words before revealing page

        this.init();
    }

    init() {
        // Add loading class to body
        document.body.classList.add('loading');

        // Create preloader HTML
        this.createPreloader();

        // Start the animation
        this.animateWords();
    }

    createPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.id = 'preloader';

        preloader.innerHTML = `
            <div class="preloader-text" id="preloaderText">Hello</div>
            <div class="preloader-progress">
                <div class="preloader-progress-bar" id="progressBar"></div>
            </div>
        `;

        // Insert at the very beginning of body
        document.body.insertBefore(preloader, document.body.firstChild);

        this.preloader = preloader;
        this.textElement = document.getElementById('preloaderText');
        this.progressBar = document.getElementById('progressBar');
    }

    animateWords() {
        let wordsShown = 0;

        const showNextWord = () => {
            if (wordsShown >= this.totalWords) {
                // All words shown, fade out preloader
                this.hidePreloader();
                return;
            }

            // Get random greeting (avoid repeating the previous one)
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * this.greetings.length);
            } while (newIndex === this.currentIndex && this.greetings.length > 1);

            this.currentIndex = newIndex;
            const greeting = this.greetings[this.currentIndex];

            // Update text with fresh animation
            this.textElement.style.animation = 'none';
            this.textElement.offsetHeight; // Trigger reflow
            this.textElement.textContent = greeting.text;
            this.textElement.setAttribute('data-text', greeting.text);
            this.textElement.style.animation = `fadeInWord ${this.wordDuration}ms ease forwards`;

            // Update progress bar
            wordsShown++;
            const progress = (wordsShown / this.totalWords) * 100;
            this.progressBar.style.width = progress + '%';

            // Schedule next word
            setTimeout(showNextWord, this.wordDuration);
        };

        // Start showing words
        showNextWord();
    }

    hidePreloader() {
        // Complete the progress bar
        this.progressBar.style.width = '100%';

        // Small delay before fade out
        setTimeout(() => {
            this.preloader.classList.add('fade-out');
            document.body.classList.remove('loading');

            // Remove preloader from DOM after animation
            setTimeout(() => {
                this.preloader.remove();
            }, 800);
        }, 200);
    }
}

// Initialize preloader when DOM starts loading
document.addEventListener('DOMContentLoaded', () => {
    new CinematicPreloader();
});
