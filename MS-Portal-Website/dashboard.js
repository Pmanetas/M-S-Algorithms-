// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Set immediate background to match transition
    document.body.style.backgroundColor = '#0f0f0f';
    document.body.style.opacity = '1';
    document.body.style.visibility = 'visible';
    
    // Check if user is logged in
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
        return;
    }
    
    // Check if coming from menu page (fast load) or login (slow animations)
    const isFromMenuPage = document.referrer.includes('menu-page.html');
    const isReturnFromMenu = sessionStorage.getItem('returnFromMenu') === 'true';
    
    // Animate PRAXIS coming from bottom of screen
    const praxisLogo = document.querySelector('.praxis-logo');
    const logoutButton = document.getElementById('logoutBtn');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Get chat container for animation handling
    const chatContainer = document.getElementById('chatContainer');

    // Force white background and proper sizing - prevent flicker
    if (chatContainer) {
        chatContainer.classList.add('page-transitioning');
        chatContainer.style.setProperty('width', '280px', 'important');
        document.body.style.setProperty('margin-right', '280px', 'important');
        
        // Remove transitioning class after setup
        setTimeout(() => {
            chatContainer.classList.remove('page-transitioning');
        }, 100);
    }

    if (isFromMenuPage || isReturnFromMenu) {
        // Clear the return flag
        if (isReturnFromMenu) {
            sessionStorage.removeItem('returnFromMenu');
        }
        // FAST LOAD: Coming from menu page - smooth positioning
        praxisLogo.style.cssText = `
            position: absolute !important;
            top: 20px !important;
            left: 20px !important;
            opacity: 0.7 !important;
            font-size: 1.2rem !important;
            z-index: auto !important;
        `;
        
        if (isReturnFromMenu) {
            // Smooth slide-in animation for logout button when returning from menu
            logoutButton.style.cssText = `
                visibility: visible !important;
                opacity: 0 !important;
                position: absolute !important;
                top: 20px !important;
                right: 20px !important;
                z-index: auto !important;
                display: block !important;
                transform: translateX(150px) !important;
                transition: none !important;
            `;
            
            // Slide in logout button smoothly after a brief delay
            setTimeout(() => {
                logoutButton.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.5s ease-out';
                logoutButton.style.transform = 'translateX(0)';
                logoutButton.style.opacity = '1';
            }, 100);
        } else {
            // Direct navigation - just position normally
        logoutButton.style.cssText = `
            visibility: visible !important;
            opacity: 1 !important;
            position: absolute !important;
            top: 20px !important;
            right: 20px !important;
            z-index: auto !important;
            display: block !important;
        `;
        }
        
        // Navigation items appearance
        if (isReturnFromMenu) {
            // Smooth slide-in animation for nav items when returning from menu
            navItems.forEach((item, index) => {
                // Start items off-screen left
                item.style.opacity = '0';
                item.style.transform = 'translateX(-50px)';
                item.style.transition = 'none';
                
                setTimeout(() => {
                    item.style.transition = 'opacity 0.4s ease-out, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                    item.classList.add('animate-in');
                }, 200 + (index * 50));
            });
        } else {
            // Quick appearance for direct navigation
            setTimeout(() => {
                navItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate-in');
                    }, index * 15);
            });
        }, 100);
        }
        
        if (chatContainer) {
            chatContainer.classList.add('fast-load');
        }
        
    } else {
        // SLOW LOAD: Coming from login - full animations
        console.log("Setting up slide animation from login");
        
        praxisLogo.style.position = 'fixed';
        praxisLogo.style.bottom = '-50px';
        praxisLogo.style.left = '20px';
        praxisLogo.style.opacity = '0';
        praxisLogo.style.fontSize = '1.2rem';
        praxisLogo.style.zIndex = '1000';
        
        logoutButton.style.position = 'fixed';
        logoutButton.style.bottom = '-50px';
        logoutButton.style.right = '20px';
        logoutButton.style.opacity = '0';
        logoutButton.style.zIndex = '1000';
        logoutButton.style.visibility = 'hidden';
        
        // Animate PRAXIS from bottom to top-left corner
        setTimeout(() => {
            praxisLogo.style.transition = 'all 2s ease-out';
            praxisLogo.style.position = 'absolute';
            praxisLogo.style.bottom = 'auto';
            praxisLogo.style.top = '20px';
            praxisLogo.style.left = '20px';
            praxisLogo.style.opacity = '0.7';
            praxisLogo.style.zIndex = 'auto';
        }, 500);
        
        // Animate LOGOUT from bottom to top-right corner
        setTimeout(() => {
            logoutButton.style.cssText = `
                visibility: visible !important;
                opacity: 1 !important;
                position: absolute !important;
                top: 20px !important;
                right: 20px !important;
                bottom: auto !important;
                transition: all 1.5s ease-out !important;
                z-index: auto !important;
                display: block !important;
            `;
        }, 1500);
        
        // Animate navigation items in one by one - SLIGHTLY FASTER STAGGERED SLIDING
        setTimeout(() => {
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate-in');
                }, index * 140); // Slightly faster stagger delay
            });
        }, 1600); // Slightly earlier start
    }
    
    // Chat system initialization
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const agentToggle = document.getElementById('agentToggle');
    const agentDropdown = document.getElementById('agentDropdown');
    const agentName = document.getElementById('agentName');
    const agentArrow = document.getElementById('agentArrow');
    const newChatBtn = document.getElementById('newChatBtn');
    
    // Initialize selected agent
    let selectedAgent = localStorage.getItem('selectedAgent') || 'openai';
    
    // Restore chat history
    restoreChatHistory();
    
    // Auto-resize chat input
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    
    // Send message on Enter (but not Shift+Enter)
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
    }
    });
    
    // Handle chat send button
    chatSend.addEventListener('click', sendMessage);
    
    // Handle agent toggle
    agentToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isVisible = agentDropdown.style.display === 'block';
        if (isVisible) {
            hideAgentDropdown();
        } else {
            showAgentDropdown();
        }
    });
    
    // Handle agent selection
    document.querySelectorAll('.agent-option').forEach(option => {
        option.addEventListener('click', function() {
            selectedAgent = this.getAttribute('data-agent');
                localStorage.setItem('selectedAgent', selectedAgent);
                updateAgentToggle();
            hideAgentDropdown();
        });
    });
    
    // Handle new chat button
    newChatBtn.addEventListener('click', function() {
        chatMessages.innerHTML = '';
        localStorage.removeItem('chatHistory');
        chatInput.value = '';
        chatInput.style.height = 'auto';
        chatInput.focus();
    });
    
    // Hide dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!agentToggle.contains(e.target)) {
            hideAgentDropdown();
        }
    });
    
    // Initialize agent toggle display
    updateAgentToggle();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBottomBtn = document.getElementById('logoutBottomBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', performSpectacularLogout);
    }
    
    if (logoutBottomBtn) {
        logoutBottomBtn.addEventListener('click', performSpectacularLogout);
    }
    
    // Setup navigation click handlers
    initializeDashboardNavigation();
    
    // Setup chat container resize handle
    initializeResize();
    
    // Set up session timeout (10 minutes)
    let sessionTimeout = setTimeout(() => {
        performSpectacularLogout();
    }, 10 * 60 * 1000);
    
    // Reset session timeout on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
        document.addEventListener(event, resetSessionTimeout, true);
    });
    
    // Initialize from URL hash if present
    const hash = window.location.hash.substring(1);
    if (hash) {
        const page = hash.toLowerCase();
        const pageMap = {
            'funds': 'FUNDS',
            'assets': 'ASSETS',
            'markets': 'MARKETS',
            'forex': 'FOREX',
            'headlines': 'HEADLINES TODAY',
            'ai': 'LATEST ON A.I',
            'calendar': 'CALENDAR',
            'trading': 'TRADING TERMINAL',
            'accounting': 'ACCOUNTING',
            'shortterm': 'SHORT TERM DEBT CYCLE',
            'longterm': 'LONG TERM DEBT CYCLE',
            'bigcycle': 'BIG CYCLE',
            'settings': 'SETTINGS',
            'company-goals': 'COMPANY GOALS',
            'agent-tab': 'AGENT TAB',
            'email': 'EMAIL',
            'praxis': 'PRAXIS 1.0'
        };
        
        if (pageMap[page]) {
            setTimeout(() => {
                const selectedElement = document.querySelector(`[data-page="${page}"]`);
                if (selectedElement) {
                    selectedElement.click();
                }
            }, 100);
        }
    }
    
    // FUNCTIONS
    
    function resetSessionTimeout() {
        clearTimeout(sessionTimeout);
        sessionTimeout = setTimeout(() => {
            performSpectacularLogout();
        }, 10 * 60 * 1000);
    }
    
    function updateAgentToggle() {
        const agentNames = {
            'openai': 'ChatGPT',
            'claude': 'Claude'
        };
        
        if (agentName) {
            agentName.textContent = agentNames[selectedAgent] || 'ChatGPT';
        }
    }
    
    function showAgentDropdown() {
        if (agentDropdown) {
        agentDropdown.style.display = 'block';
            agentArrow.style.transform = 'rotate(180deg)';
        }
    }
    
    function hideAgentDropdown() {
        if (agentDropdown) {
        agentDropdown.style.display = 'none';
            agentArrow.style.transform = 'rotate(0deg)';
    }
    }
    
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        chatInput.disabled = true;
        chatSend.disabled = true;
        
        addTypingIndicator();
        
        try {
            const response = await callSelectedAgent(message);
            removeTypingIndicator();
            addMessage(response, 'ai');
        } catch (error) {
            console.error('Agent API Error:', error);
            removeTypingIndicator();
            addMessage("sorry, i'm having trouble connecting right now. please try again later.", 'ai');
        } finally {
            chatInput.disabled = false;
            chatSend.disabled = false;
            chatInput.focus();
        }
    }
    
    async function callSelectedAgent(message) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    chatHistory: chatHistory
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `API request failed: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            return structureResponse(data.response);
            
        } catch (error) {
            console.error('Live data API failed, using fallback:', error);
                return await callOpenAI(message);
        }
    }
    
    async function callOpenAI(message) {
        // Use server proxy endpoint to keep API key secure
        const API_URL = '/api/chat';
        
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        
        // Format chat history for the API
        const recentHistory = chatHistory.slice(-10);
        const formattedHistory = recentHistory.map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
        }));
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                chatHistory: formattedHistory,
                systemPrompt: 'You are a knowledgeable and conversational AI assistant. Structure your responses naturally with:\n\n- Use paragraphs for explanations and context\n- Use bullet points only for lists, key points, or multiple items\n- Write in a conversational, engaging tone\n- Be thorough but clear\n\n**ANSWER:** Always end your response with a clear, direct answer to the user\'s question under this heading.\n\nUse lowercase styling (except proper nouns and sentence beginnings) for a casual feel.'
            })
        });
        
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        return structureResponse(data.reply);
    }
    
    function structureResponse(response) {
        // If response already has proper structure, return as is
        if (response.includes('**ANSWER:**')) {
            return response;
        }
        
        // Split response into paragraphs
        const paragraphs = response.split('\n\n').filter(p => p.trim());
        let structuredResponse = '';
        let hasAnswer = false;
        
        // Look for existing answer section
        const answerMatch = response.match(/(?:answer|conclusion|summary):\s*(.*?)$/i);
        if (answerMatch) {
            hasAnswer = true;
        }
        
        // Process paragraphs - keep them as paragraphs but clean up
        paragraphs.forEach((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (trimmed) {
                // Keep paragraphs as paragraphs unless they're clearly lists
                if (trimmed.includes('\n-') || trimmed.includes('\n•') || trimmed.includes('\n*')) {
                    // This looks like a list, add proper spacing between bullet points
                    const bulletPoints = trimmed.split('\n').filter(line => line.trim());
                    const spacedBullets = bulletPoints.map(point => point.trim()).join('\n\n');
                    structuredResponse += spacedBullets + '\n\n';
                } else {
                    // Regular paragraph, clean up line breaks within it
                    const cleanParagraph = trimmed.replace(/\n/g, ' ').replace(/\s+/g, ' ');
                    structuredResponse += cleanParagraph + '\n\n';
                }
            }
        });
        
        // Add answer section if not present
        if (!hasAnswer) {
            // Try to extract a concise answer from the last paragraph
            const lastParagraph = paragraphs[paragraphs.length - 1];
            if (lastParagraph) {
                const cleanAnswer = lastParagraph.trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
                const shortAnswer = cleanAnswer.length > 150 ? cleanAnswer.substring(0, 150) + '...' : cleanAnswer;
                structuredResponse += `**ANSWER:** ${shortAnswer}`;
        }
        } else {
            structuredResponse += response.match(/(?:answer|conclusion|summary):\s*(.*?)$/i)[0];
        }
        
        return structuredResponse;
    }
    
    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator-input';
        typingDiv.innerHTML = `
            Generating<div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        // Insert above the input container
        const inputContainer = document.querySelector('.chat-input-container');
        inputContainer.parentNode.insertBefore(typingDiv, inputContainer);
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator-input');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${sender === 'ai' ? '' : text}</div>
                <div class="message-time">${timestamp}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add typing animation for AI messages
        if (sender === 'ai') {
            const messageTextDiv = messageDiv.querySelector('.message-text');
            messageTextDiv.classList.add('typing');
            typeWriter(messageTextDiv, text, 0, () => {
                messageTextDiv.classList.remove('typing');
                // Save to localStorage after typing is complete
                saveChatMessage(text, sender);
            });
        } else {
            // Save to localStorage immediately for user messages
            saveChatMessage(text, sender);
        }
    }
    
    function typeWriter(element, text, index, callback) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            element.parentElement.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            setTimeout(() => typeWriter(element, text, index + 1, callback), 10); // 10ms delay between characters (faster)
        } else {
            callback();
        }
    }
    
    function saveChatMessage(text, sender) {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        const message = {
            text: text,
            sender: sender,
            timestamp: Date.now()
        };
        
        chatHistory.push(message);
        
        // Keep only last 50 messages
        if (chatHistory.length > 50) {
            chatHistory.splice(0, chatHistory.length - 50);
        }
        
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
    
    function restoreChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
        chatHistory.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `${msg.sender}-message`;
            
            const timestamp = new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${msg.text}</div>
                    <div class="message-time">${timestamp}</div>
                </div>
            `;
            
            chatMessages.appendChild(messageDiv);
        });
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function performSpectacularLogout() {
        console.log('🚪 Starting spectacular logout sequence');
        
        // Prevent any user interaction during logout
        document.body.style.pointerEvents = 'none';
        
        // Get elements for animation
        const navItems = document.querySelectorAll('.nav-item');
        const praxisLogo = document.querySelector('.praxis-logo');
        const chatContainer = document.getElementById('chatContainer');
        const logoutButton = document.getElementById('logoutBtn');
        const logoutBottomButton = document.getElementById('logoutBottomBtn');
        const animatedNav = document.querySelector('.animated-nav');
        
        // Trigger divider slide-up animation
        if (animatedNav) {
            animatedNav.classList.add('exit');
        }
        
        // Step 1: Explode navigation items in different directions (300ms)
        navItems.forEach((item, index) => {
            const directions = ['explode-top-left', 'explode-top-right', 'explode-bottom-left', 'explode-bottom-right', 'explode-up', 'explode-down'];
            const direction = directions[index % directions.length];
            
            setTimeout(() => {
                item.classList.add('logout-explode', direction);
            }, index * 50);
        });
        
        // Step 2: Praxis logo zoom out and spin (400ms delay)
        setTimeout(() => {
            praxisLogo.classList.add('logout-praxis-zoom');
        }, 400);
        
        // Step 3: Chat panel slide away (600ms delay)
        setTimeout(() => {
            if (chatContainer) {
                chatContainer.classList.add('logout-chat-slide');
            }
        }, 600);
        
        // Step 4: Control buttons fly away (800ms delay)
        setTimeout(() => {
            if (logoutButton) {
                logoutButton.classList.add('logout-control-fly');
            }
            if (logoutBottomButton) {
                logoutBottomButton.classList.add('logout-control-fly');
            }
        }, 800);
        
        // Step 5: Create dramatic screen shatter effect (1000ms delay)
        setTimeout(() => {
            createShatterEffect();
        }, 1000);
    
        // Step 6: Final white fade and redirect (1800ms delay)
        setTimeout(async () => {
            // Call server-side logout
            try {
                await fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
            } catch (error) {
                console.error('Logout error:', error);
            }
            
            // Clear session data
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('username');
            localStorage.removeItem('chatHistory');
            
            // Create white fade overlay
            const whiteOverlay = document.createElement('div');
            whiteOverlay.className = 'logout-white-fade';
            document.body.appendChild(whiteOverlay);
            
            // Redirect after white fade completes
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 800);
        }, 1800);
    }
    
    function createShatterEffect() {
        // Create shatter overlay
        const shatterOverlay = document.createElement('div');
        shatterOverlay.className = 'shatter-overlay';
        document.body.appendChild(shatterOverlay);
        
        // Create multiple shatter pieces
        for (let i = 0; i < 12; i++) {
            const piece = document.createElement('div');
            piece.className = 'shatter-piece';
            
            // Random positioning and rotation
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const rotation = Math.random() * 360;
            const scale = 0.3 + Math.random() * 0.7;
            
            piece.style.left = x + '%';
            piece.style.top = y + '%';
            piece.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            piece.style.animationDelay = (i * 0.1) + 's';
            
            shatterOverlay.appendChild(piece);
        }
        
        // Activate shatter animation
        setTimeout(() => {
            shatterOverlay.classList.add('shatter-activate');
        }, 100);
    
        // Add screen ripple effect
        setTimeout(() => {
            const rippleOverlay = document.createElement('div');
            rippleOverlay.className = 'logout-ripple-overlay';
            document.body.appendChild(rippleOverlay);
        }, 300);
    }
    
    function initializeDashboardNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                const selectedText = this.textContent.trim();
                handleNavigation(page, selectedText, this);
            });
        });
    }
    
    function handleNavigation(page, selectedText, selectedElement) {
        console.log('🚀 Navigating to:', page, selectedText);
        console.log('🎯 Starting enhanced slide-out animation...');
    
        // Get elements for smooth transition
        const logoutButton = document.getElementById('logoutBtn');
        const praxisLogo = document.querySelector('.praxis-logo');
        const navItems = document.querySelectorAll('.nav-item');
        const animatedNav = document.querySelector('.animated-nav');
        
        // Trigger divider slide-up animation
        if (animatedNav) {
            animatedNav.classList.add('exit');
        }
        
        // Prevent multiple clicks during animation
        document.body.style.pointerEvents = 'none';
        
        // Slide out logout button to the right
        if (logoutButton) {
            logoutButton.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out';
            logoutButton.style.transform = 'translateX(200px)';
            logoutButton.style.opacity = '0';
        }
        
        // ENHANCED DRAMATIC slide-out animation for menu items
        navItems.forEach((item, index) => {
            console.log(`🎬 Animating item ${index}: ${item.textContent}`);
            
            // More dramatic slide directions - full screen width plus extra
            const slideDirection = index % 2 === 0 ? '-120vw' : '120vw';
            
            setTimeout(() => {
                // Apply dramatic transform with rotation and scale
                item.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out, filter 0.6s ease-out';
                item.style.transform = `translateX(${slideDirection}) rotate(${index % 2 === 0 ? '-10deg' : '10deg'}) scale(0.8)`;
                item.style.opacity = '0';
                item.style.filter = 'blur(2px)';
                
                console.log(`✨ Item ${index} sliding ${slideDirection}`);
            }, index * 60); // Slower stagger for more visible effect
        });
        
        // Fade and shrink the PRAXIS logo
        if (praxisLogo) {
            praxisLogo.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            praxisLogo.style.opacity = '0.1';
            praxisLogo.style.transform = 'scale(0.8)';
        }
        
        // Set flag for smooth transition and navigate after animation completes
        setTimeout(() => {
            console.log('🎯 Animation complete, navigating...');
            sessionStorage.setItem('dashboardTransition', 'true');
            const params = new URLSearchParams({
                page: page,
                selected: selectedText
            });
            
            // Navigate to calendar page for calendar menu item, otherwise menu-page
            if (page === 'calendar') {
                window.location.href = `calendar.html?${params.toString()}`;
            } else {
            window.location.href = `menu-page.html?${params.toString()}`;
            }
        }, 1000); // Longer delay to allow the dramatic animation to complete
    }

}); // End DOMContentLoaded

// Resize functionality
function initializeResize() {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;
    
    let isResizing = false;
    let startX, startWidth;
    
    const resizeHandle = document.createElement('div');
    resizeHandle.style.cssText = `
        position: absolute;
        top: 0;
        left: -3px;
        width: 6px;
        height: 100%;
        cursor: ew-resize;
        background: transparent;
        z-index: 9999;
    `;
    
    chatContainer.appendChild(resizeHandle);
    
    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = parseInt(document.defaultView.getComputedStyle(chatContainer).width, 10);

        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
        
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        
        e.preventDefault();
    });
    
    function handleResize(e) {
        if (!isResizing) return;
        
        const deltaX = e.clientX - startX;
        const width = startWidth - deltaX;
        const minWidth = 200;
        const maxWidth = 500;
        const constrainedWidth = Math.min(Math.max(width, minWidth), maxWidth);
        
        chatContainer.style.setProperty('width', constrainedWidth + 'px', 'important');
        document.body.style.setProperty('margin-right', constrainedWidth + 'px', 'important');
        
        localStorage.setItem('agentPanelWidth', constrainedWidth.toString());
        
        e.preventDefault();
    }
    
    function stopResize() {
        isResizing = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
    }
} 