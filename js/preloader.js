/* ==================== CINEMATIC PRELOADER ==================== */
// "Hello" in languages - Indian first, then International

class CinematicPreloader {
    constructor() {
        // Ordered: English → Hindi → Telugu → Indian → International
        this.greetings = [
            // Start with English
            { text: "Hello", lang: "English" },
            // Then Hindi
            { text: "नमस्ते", lang: "Hindi" },
            // Then Telugu
            { text: "హలో", lang: "Telugu" },
            // Other Indian languages
            { text: "ನಮಸ್ಕಾರ", lang: "Kannada" },
            { text: "வணக்கம்", lang: "Tamil" },
            { text: "നമസ്കാരം", lang: "Malayalam" },
            { text: "નમસ્તે", lang: "Gujarati" },
            { text: "নমস্কার", lang: "Bengali" },
            { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", lang: "Punjabi" },
            { text: "नमस्कार", lang: "Marathi" },
            // International languages
            { text: "Hola", lang: "Spanish" },
            { text: "Bonjour", lang: "French" },
            { text: "こんにちは", lang: "Japanese" },
            { text: "안녕하세요", lang: "Korean" },
            { text: "你好", lang: "Chinese" },
            { text: "مرحبا", lang: "Arabic" },
            { text: "Ciao", lang: "Italian" },
            { text: "Привет", lang: "Russian" }
        ];

        this.currentIndex = 0;
        this.wordDuration = 500; // ms per word
        this.totalWords = 10; // Show 10 words

        this.init();
    }

    init() {
        const lastVisitStr = localStorage.getItem('portfolio_last_visit');
        const now = Date.now();
        const sessionDuration = 3600000; // 1 hour in milliseconds

        // Parse the stored timestamp properly
        if (lastVisitStr) {
            const lastVisit = parseInt(lastVisitStr, 10);
            if (!isNaN(lastVisit) && (now - lastVisit < sessionDuration)) {
                // Recently visited (within 1 hour), don't show preloader
                console.log('Preloader skipped - visited recently');
                return;
            }
        }

        // First visit or session expired
        console.log('Showing preloader - first visit or session expired');
        document.body.classList.add('loading');
        this.createPreloader();
        this.animateWords();

        // Mark visit time
        localStorage.setItem('portfolio_last_visit', now.toString());
    }

    createPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.id = 'preloader';

        preloader.innerHTML = `
            <div class="preloader-text" id="preloaderText"></div>
        `;

        document.body.insertBefore(preloader, document.body.firstChild);

        this.preloader = preloader;
        this.textElement = document.getElementById('preloaderText');
    }

    animateWords() {
        let wordsShown = 0;

        const showNextWord = () => {
            if (wordsShown >= this.totalWords) {
                this.hidePreloader();
                return;
            }

            // Use sequential order for first 10 words
            const greeting = this.greetings[wordsShown % this.greetings.length];

            // Smooth crossfade animation
            this.textElement.classList.remove('visible');

            setTimeout(() => {
                this.textElement.textContent = greeting.text;
                this.textElement.classList.add('visible');
            }, 150);

            wordsShown++;
            setTimeout(showNextWord, this.wordDuration);
        };

        // Start after a tiny delay
        setTimeout(showNextWord, 100);
    }

    hidePreloader() {
        this.textElement.classList.remove('visible');

        setTimeout(() => {
            this.preloader.classList.add('fade-out');
            document.body.classList.remove('loading');

            setTimeout(() => {
                this.preloader.remove();
            }, 600);
        }, 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CinematicPreloader();
});
