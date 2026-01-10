/* ==================== AI CHATBOT LOGIC ==================== */

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // Create Chatbot Elements
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.innerHTML = '<i class="fas fa-robot"></i>';

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
            <h3>DK Assistant</h3>
            <button class="close-chat"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-messages" id="chatMessages">
            <div class="message bot">Hi there! 👋 I'm Dhesurya's AI assistant. How can I help you today?</div>
        </div>
        <div class="chat-input-area">
            <input type="text" class="chat-input" id="chatInput" placeholder="Ask me something...">
            <button class="send-msg" id="sendMsg"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;

    body.appendChild(chatBubble);
    body.appendChild(chatWindow);

    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMsg');
    const messagesArea = document.getElementById('chatMessages');
    const closeBtn = chatWindow.querySelector('.close-chat');

    // Toggle Chat Window
    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // Auto-responses
    const botResponses = {
        "hello": "Hello! I'm here to help you learn more about Dhesurya's work. Try asking about 'skills', 'projects', or 'contact'.",
        "skills": "Dhesurya is proficient in Embedded Systems, AI/ML (Python, TensorFlow/PyTorch), and Web Development (JavaScript, React).",
        "projects": "Dhesurya has worked on several projects, including 'Stampede Detection System', 'Autonomous Drone Navigation', and this portfolio site!",
        "contact": "You can reach Dhesurya via the Contact page or directly at siva.jyothi@example.com",
        "embedded": "As an Embedded Systems engineer, Dhesurya works with STM32, Arduino, and NavIC systems.",
        "ai": "He focuses on Computer Vision and Crowd Analytics for safety systems.",
        "default": "That sounds interesting! I'm still learning, but you can definitely ask me about Dhesurya's skills, projects, or how to contact him."
    };

    function addMessage(text, side) {
        const msg = document.createElement('div');
        msg.className = `message ${side}`;
        msg.innerText = text;
        messagesArea.appendChild(msg);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    function handleBotResponse(userText) {
        const text = userText.toLowerCase();
        let response = botResponses["default"];

        for (let key in botResponses) {
            if (text.includes(key)) {
                response = botResponses[key];
                break;
            }
        }

        setTimeout(() => {
            addMessage(response, 'bot');
        }, 600);
    }

    function sendMessage() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';
            handleBotResponse(text);
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
