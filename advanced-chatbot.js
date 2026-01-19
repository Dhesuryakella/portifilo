/* ==================== ADVANCED AI CHATBOT - INTELLIGENT ASSISTANT ==================== */
// Features: Smart responses, typing indicator, quick replies, context awareness, animations

class AdvancedChatbot {
    constructor() {
        this.conversationHistory = [];
        this.isTyping = false;
        this.quickRepliesShown = false;
        this.portfolioData = {
            name: "Dhesurya Kella",
            role: "Embedded Systems & AI/ML Engineer",
            email: "dhesuryak@gmail.com",
            phone: "+91 88979 90490",
            location: "Vizianagaram, Andhra Pradesh, India",
            education: "B.Tech ECE at MVGR College of Engineering (2022-2026)",
            github: "https://github.com/Dhesuryakella",
            linkedin: "https://in.linkedin.com/in/dhesuryakella",
            skills: {
                programming: ["Python", "Embedded C", "C/C++", "JavaScript"],
                ai_ml: ["YOLOv8", "OpenCV", "TensorFlow", "PyTorch", "LSTM", "ByteTrack"],
                embedded: ["ESP32", "Arduino", "Raspberry Pi", "I2C", "SPI", "UART", "ESP-NOW"],
                tools: ["ROS", "Gazebo", "Git", "MATLAB", "Streamlit"]
            },
            projects: [
                { name: "Smart Stampede Detection System", tech: "YOLOv8, ByteTrack, Computer Vision", desc: "Real-time crowd analytics with spatiotemporal heatmaps" },
                { name: "Cadastral Map OCR System", tech: "EasyOCR, OpenCV, Python", desc: "95% accuracy document AI for map digitization" },
                { name: "ESP32 Multi-Node Communication", tech: "ESP32, ESP-NOW, Embedded C", desc: "Low-latency wireless firmware for robotics" },
                { name: "WiFi Camera Car", tech: "ESP32-CAM, WebSocket, Motor Control", desc: "Real-time video streaming with web control" },
                { name: "4DOF Robotic Arm", tech: "ESP32, PWM, Servo Motors", desc: "Real-time servo control with feedback" }
            ],
            internships: [
                { title: "STAR-PNT Summer Intern", org: "IIT Tirupati Navavishkar I-Hub", period: "July 2025 - Present" },
                { title: "Research Intern", org: "NITK Surathkal (Center for System Design)", period: "May - July 2025" }
            ],
            publication: "IEEE ICRM 2025 - Communication Protocols with Vision-Based Localization"
        };

        this.init();
    }

    init() {
        this.createChatElements();
        this.bindEvents();
        this.showQuickReplies();
        console.log('🤖 Advanced Chatbot Initialized');
    }

    createChatElements() {
        // Remove old chatbot elements if exist
        document.querySelectorAll('.chat-bubble, .chat-window').forEach(el => el.remove());

        // Create chat bubble
        this.chatBubble = document.createElement('div');
        this.chatBubble.className = 'chat-bubble';
        this.chatBubble.innerHTML = '<i class="fas fa-robot"></i>';
        document.body.appendChild(this.chatBubble);

        // Create chat window
        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'chat-window';
        this.chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="chat-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="chat-header-info">
                    <h3>DK Assistant</h3>
                    <span><i class="fas fa-circle"></i> Always here to help</span>
                </div>
                <button class="close-chat"><i class="fas fa-times"></i></button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="bot-message-wrapper">
                    <div class="bot-avatar-small"><i class="fas fa-robot"></i></div>
                    <div class="message bot">
                        Hey there! 👋 I'm Dhesurya's AI assistant. I can tell you about his skills, projects, experience, or help you get in touch!
                        <span class="message-time">${this.getTime()}</span>
                    </div>
                </div>
            </div>
            <div class="quick-replies" id="quickReplies"></div>
            <div class="chat-input-area">
                <div class="chat-actions">
                    <button class="chat-action-btn" title="Emoji"><i class="far fa-smile"></i></button>
                </div>
                <input type="text" class="chat-input" id="chatInput" placeholder="Type your message...">
                <button class="send-msg" id="sendMsg"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;
        document.body.appendChild(this.chatWindow);

        // Cache DOM elements
        this.messagesArea = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendMsg');
        this.quickRepliesContainer = document.getElementById('quickReplies');
        this.closeBtn = this.chatWindow.querySelector('.close-chat');
    }

    bindEvents() {
        // Toggle chat
        this.chatBubble.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Remove notification badge on first open
        this.chatBubble.addEventListener('click', () => {
            this.chatBubble.classList.add('no-notification');
        }, { once: true });
    }

    toggleChat() {
        this.chatWindow.classList.toggle('active');
        document.body.classList.toggle('chat-open');
        if (this.chatWindow.classList.contains('active')) {
            this.chatInput.focus();
            this.scrollToBottom();
        }
    }

    closeChat() {
        this.chatWindow.classList.remove('active');
        document.body.classList.remove('chat-open');
    }

    showQuickReplies() {
        const quickReplies = [
            { text: '💼 Projects', query: 'projects' },
            { text: '🛠️ Skills', query: 'skills' },
            { text: '📧 Contact', query: 'contact' },
            { text: '🎓 Experience', query: 'experience' }
        ];

        this.quickRepliesContainer.innerHTML = quickReplies.map(qr =>
            `<button class="quick-reply-btn" data-query="${qr.query}">${qr.text}</button>`
        ).join('');

        this.quickRepliesContainer.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleQuickReply(btn.dataset.query);
            });
        });
    }

    handleQuickReply(query) {
        this.addMessage(query.charAt(0).toUpperCase() + query.slice(1), 'user');
        this.generateResponse(query);
        this.updateQuickReplies(query);
    }

    updateQuickReplies(lastQuery) {
        const contextReplies = {
            'projects': [
                { text: '🎯 Stampede Detection', query: 'stampede project' },
                { text: '🗺️ OCR System', query: 'ocr project' },
                { text: '🤖 Robotics', query: 'robotics projects' }
            ],
            'skills': [
                { text: '🐍 Python', query: 'python skills' },
                { text: '📟 Embedded', query: 'embedded skills' },
                { text: '🧠 AI/ML', query: 'ai skills' }
            ],
            'contact': [
                { text: '📧 Email', query: 'email' },
                { text: '💼 LinkedIn', query: 'linkedin' },
                { text: '🐙 GitHub', query: 'github' }
            ],
            'experience': [
                { text: '🏛️ IIT Tirupati', query: 'iit internship' },
                { text: '🔬 NITK', query: 'nitk internship' },
                { text: '📄 Publication', query: 'publication' }
            ]
        };

        const replies = contextReplies[lastQuery] || [
            { text: '💼 Projects', query: 'projects' },
            { text: '🛠️ Skills', query: 'skills' },
            { text: '📧 Contact', query: 'contact' }
        ];

        this.quickRepliesContainer.innerHTML = replies.map(qr =>
            `<button class="quick-reply-btn" data-query="${qr.query}">${qr.text}</button>`
        ).join('');

        this.quickRepliesContainer.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleQuickReply(btn.dataset.query);
            });
        });
    }

    sendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        this.chatInput.value = '';
        this.generateResponse(text);
    }

    addMessage(text, sender) {
        const messageWrapper = document.createElement('div');

        if (sender === 'bot') {
            messageWrapper.className = 'bot-message-wrapper';
            messageWrapper.innerHTML = `
                <div class="bot-avatar-small"><i class="fas fa-robot"></i></div>
                <div class="message bot">
                    ${text}
                    <span class="message-time">${this.getTime()}</span>
                </div>
            `;
        } else {
            messageWrapper.innerHTML = `
                <div class="message user">
                    ${text}
                    <span class="message-time">${this.getTime()}</span>
                </div>
            `;
        }

        this.messagesArea.appendChild(messageWrapper);
        this.scrollToBottom();
        this.conversationHistory.push({ role: sender, content: text });
    }

    showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = '<span></span><span></span><span></span>';
        this.messagesArea.appendChild(typing);
        this.scrollToBottom();
        this.isTyping = true;
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
        this.isTyping = false;
    }

    generateResponse(userInput) {
        this.showTypingIndicator();

        const input = userInput.toLowerCase();
        let response = this.getSmartResponse(input);

        // Simulate typing delay based on response length
        const delay = Math.min(800 + response.length * 10, 2500);

        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
        }, delay);
    }

    getSmartResponse(input) {
        const d = this.portfolioData;

        // Greetings
        if (/(hello|hi|hey|howdy|greetings)/i.test(input)) {
            return `Hello! 👋 Great to meet you! I'm here to help you learn about ${d.name}. What would you like to know? You can ask about his projects, skills, or how to get in touch!`;
        }

        // Projects - General
        if (/(project|work|portfolio|built|created)/i.test(input) && !/(stampede|ocr|robot|car|arm)/i.test(input)) {
            const projectList = d.projects.map(p => `• <b>${p.name}</b>: ${p.desc}`).join('<br>');
            return `🚀 Here are Dhesurya's key projects:<br><br>${projectList}<br><br>Which project interests you most?`;
        }

        // Stampede Project
        if (/(stampede|crowd|detection|safety|yolo|bytetrack)/i.test(input)) {
            return `🎯 <b>Smart Stampede Detection System</b><br><br>This is a real-time crowd analytics system using:<br>• YOLOv8 for person detection<br>• ByteTrack for multi-object tracking<br>• 4 spatiotemporal heatmaps (position, path, dwell time, velocity)<br>• 30-50 FPS performance<br>• Privacy-preserving architecture<br><br>It's designed for public safety monitoring at events and gatherings!`;
        }

        // OCR Project
        if (/(ocr|cadastral|map|document)/i.test(input)) {
            return `🗺️ <b>Cadastral Map OCR System</b><br><br>A domain-specific document AI pipeline:<br>• 95% text detection accuracy<br>• 92% symbol detection precision<br>• Built with EasyOCR and OpenCV<br>• 2-3 seconds average processing<br>• Outputs structured JSON/Excel for GIS analytics`;
        }

        // Robotics Projects
        if (/(robot|car|arm|servo|motor)/i.test(input)) {
            return `🤖 <b>Robotics Projects:</b><br><br>• <b>WiFi Camera Car</b>: ESP32-CAM with real-time streaming and WebSocket control<br>• <b>4DOF Robotic Arm</b>: Precise servo control with PWM and feedback monitoring<br>• <b>Joystick-Controlled Robot</b>: ESP-NOW wireless communication<br>• <b>Pan-Tilt Camera System</b>: 2-axis servo control for camera positioning`;
        }

        // Skills - General
        if (/(skill|tech|know|expertise|proficient)/i.test(input) && !/(python|embed|ai|ml)/i.test(input)) {
            return `🛠️ <b>Technical Skills:</b><br><br>💻 <b>Programming:</b> ${d.skills.programming.join(', ')}<br><br>🧠 <b>AI/ML:</b> ${d.skills.ai_ml.join(', ')}<br><br>📟 <b>Embedded:</b> ${d.skills.embedded.join(', ')}<br><br>🔧 <b>Tools:</b> ${d.skills.tools.join(', ')}`;
        }

        // Python Skills
        if (/python/i.test(input)) {
            return `🐍 <b>Python Expertise:</b><br><br>Dhesurya is an expert Python developer with 95% proficiency, specializing in:<br>• AI/ML development with TensorFlow & PyTorch<br>• Computer Vision applications with OpenCV<br>• Data processing with NumPy & Pandas<br>• GUI development with Tkinter & Streamlit<br>• Automation and scripting`;
        }

        // Embedded Skills
        if (/(embedded|esp32|arduino|microcontroller|firmware)/i.test(input)) {
            return `📟 <b>Embedded Systems Expertise:</b><br><br>• ESP32 Platform (Expert - 92%)<br>• Communication Protocols: UART, I2C, SPI, ESP-NOW, WiFi, BLE<br>• Sensor Integration: MPU6050, GPS, Cameras<br>• Firmware Development & Testing<br>• Real-time systems optimization`;
        }

        // AI/ML Skills
        if (/(ai|ml|machine learning|deep|neural|computer vision)/i.test(input)) {
            return `🧠 <b>AI/ML Expertise:</b><br><br>• YOLOv8 & Object Detection (Expert)<br>• OpenCV & Image Processing (Expert)<br>• Multi-Object Tracking (ByteTrack)<br>• Deep Learning (LSTM, CNN)<br>• Spatiotemporal Analysis<br>• Model training and optimization`;
        }

        // Contact
        if (/(contact|reach|email|phone|connect)/i.test(input)) {
            return `📬 <b>Let's Connect!</b><br><br>📧 Email: <a href="mailto:${d.email}">${d.email}</a><br>📱 Phone: ${d.phone}<br>📍 Location: ${d.location}<br><br>Or use the Contact page to send a direct message! 💬`;
        }

        // LinkedIn
        if (/linkedin/i.test(input)) {
            return `💼 Connect with Dhesurya on LinkedIn:<br><br><a href="${d.linkedin}" target="_blank">${d.linkedin}</a><br><br>Great for professional networking and opportunities!`;
        }

        // GitHub
        if (/github/i.test(input)) {
            return `🐙 Check out Dhesurya's code on GitHub:<br><br><a href="${d.github}" target="_blank">${d.github}</a><br><br>You'll find open-source projects and contributions there!`;
        }

        // Experience / Internships
        if (/(experience|intern|work|job|research)/i.test(input) && !/(iit|nitk)/i.test(input)) {
            const internList = d.internships.map(i => `• <b>${i.title}</b> at ${i.org} (${i.period})`).join('<br>');
            return `💼 <b>Professional Experience:</b><br><br>${internList}<br><br>Both focused on embedded systems, AI/ML, and robotics research!`;
        }

        // IIT Internship
        if (/iit|tirupati|star-pnt/i.test(input)) {
            return `🏛️ <b>IIT Tirupati Internship</b><br><br>Role: STAR-PNT Summer Intern<br>Organization: Navavishkar I-Hub Foundation<br>Period: July 2025 - Present<br><br>Working on embedded vision systems for drone-based safety monitoring and computer vision pipelines!`;
        }

        // NITK Internship
        if (/nitk|surathkal|system design/i.test(input)) {
            return `🔬 <b>NITK Surathkal Internship</b><br><br>Role: Research Intern (Center for System Design)<br>Period: May - July 2025<br><br>• Developed ESP32 firmware for robotic agents<br>• ROS 2 and Gazebo simulation<br>• Co-authored IEEE paper on communication protocols!`;
        }

        // Publication
        if (/(publication|paper|ieee|research paper)/i.test(input)) {
            return `📄 <b>IEEE Publication</b><br><br>Title: "Comparative Evaluation of Communication Protocols with Vision-Based Localization"<br><br>Published at: IEEE ICRM 2025<br>Status: ✅ Accepted<br><br>Co-authored with researchers at NITK Surathkal!`;
        }

        // Education
        if (/(education|study|college|university|degree)/i.test(input)) {
            return `🎓 <b>Education:</b><br><br>${d.education}<br><br>Currently in final year, specializing in:<br>• Embedded Systems<br>• Signal Processing<br>• AI/ML Applications`;
        }

        // About
        if (/(about|who|tell me about|introduce)/i.test(input)) {
            return `👨‍💻 <b>About ${d.name}</b><br><br>A passionate ${d.role} from India. Currently pursuing ${d.education}.<br><br>He specializes in building intelligent systems that bridge hardware and software - from ESP32 firmware to AI-powered crowd analytics!<br><br>🏆 Published at IEEE ICRM 2025<br>🎯 Focus: Safety-critical systems & Embedded AI`;
        }

        // Thank you
        if (/(thank|thanks|thx|appreciate)/i.test(input)) {
            return `You're welcome! 😊 Feel free to ask anything else about Dhesurya's work. I'm always happy to help!`;
        }

        // Goodbye
        if (/(bye|goodbye|see you|later)/i.test(input)) {
            return `Goodbye! 👋 It was great chatting with you. Feel free to come back anytime. Good luck with your projects!`;
        }

        // Hire
        if (/(hire|job|position|opportunity|full-time)/i.test(input)) {
            return `💼 <b>Hiring Dhesurya?</b><br><br>He's currently available for:<br>• Embedded Systems Internships<br>• Research Collaborations<br>• Freelance Projects<br>• Full-Time Opportunities (from May 2026)<br><br>📧 Reach out: ${d.email}`;
        }

        // Default response
        return `I'm not sure I understand that completely, but I'd love to help! 🤔<br><br>You can ask me about:<br>• Dhesurya's <b>projects</b> and work<br>• His technical <b>skills</b><br>• Research <b>experience</b><br>• How to <b>contact</b> him<br><br>What would you like to know?`;
    }

    getTime() {
        return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messagesArea.scrollTop = this.messagesArea.scrollHeight;
        }, 50);
    }
}

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedChatbot();
});
