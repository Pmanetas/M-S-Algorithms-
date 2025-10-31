// Authentication is now handled server-side via the backend API

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Logging in...';
        submitButton.disabled = true;
        
        try {
            console.log('🔐 Attempting login with:', { username, password: '***' });
            
            // Call backend API for authentication
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });
            
            console.log('📡 Login response status:', response.status);
            
            const result = await response.json();
            console.log('📡 Login response data:', result);
            
            if (response.ok && result.success) {
                console.log('✅ Login successful');
                
            // Successful login - start animation
            startLoginAnimation();
            
            // Store session information
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', username);
            
        } else {
                console.log('❌ Login failed:', result.message);
                
            // Failed login
                showError(result.message || 'Invalid username or password. Please try again.');
                
                // Clear password field
                document.getElementById('password').value = '';
            }
        } catch (error) {
            console.error('❌ Login error:', error);
            showError('Connection error. Please try again.');
            
            // Clear password field
            document.getElementById('password').value = '';
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});

// Login validation is now handled server-side

// Logout function for server-side session
async function logout() {
    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        
        if (response.ok) {
            sessionStorage.removeItem('loggedIn');
            sessionStorage.removeItem('username');
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Logout error:', error);
        // Still clear local storage even if server call fails
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        window.location.href = '/';
    }
}

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.background = '#fee';
    errorMessage.style.color = '#c53030';
    
    // Hide error message after 5 seconds
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.style.background = '#f0fff4';
    errorMessage.style.color = '#38a169';
    errorMessage.style.borderColor = '#9ae6b4';
}

// Add some visual feedback for input fields
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});

// Prevent back button after logout (additional security)
window.addEventListener('popstate', function(event) {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
        history.pushState(null, null, window.location.pathname);
    }
});

// Login animation function
function startLoginAnimation() {
    // Hide the login form
    const loginContainer = document.querySelector('.login-container');
    const container = document.querySelector('.container');
    const praxisElement = document.querySelector('.praxis');
    
    // Fade out login form
    loginContainer.style.opacity = '0';
    loginContainer.style.transition = 'opacity 0.5s ease';
    
    // Move m&s to center smoothly (slower)
    praxisElement.style.transition = 'all 2.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
    praxisElement.style.position = 'fixed';
    praxisElement.style.top = '45%';
    praxisElement.style.left = '50%';
    praxisElement.style.transform = 'translate(-50%, -50%)';
    praxisElement.style.fontSize = '2.5rem';
    praxisElement.style.zIndex = '1000';
    praxisElement.style.opacity = '1';
    
    // After movement, start typewriter effect
    setTimeout(() => {
        typewriterEffect(praxisElement, 'm&s', 'Manetas & Stevens', () => {
            // Create and animate associates element
            const associatesElement = document.createElement('div');
            associatesElement.textContent = '';
            associatesElement.style.fontFamily = 'JetBrains Mono, monospace';
            associatesElement.style.fontSize = '1rem';
            associatesElement.style.fontWeight = '300';
            associatesElement.style.color = 'rgba(74, 85, 104, 0.7)';
            associatesElement.style.letterSpacing = '0.3em';
            associatesElement.style.textTransform = 'lowercase';
            associatesElement.style.position = 'fixed';
            associatesElement.style.top = '50%';
            associatesElement.style.left = '50%';
            associatesElement.style.transform = 'translate(-50%, 30px)';
            associatesElement.style.opacity = '0';
            associatesElement.style.zIndex = '1000';
            associatesElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
            
            document.body.appendChild(associatesElement);
            
            // Slide up and type associates
            setTimeout(() => {
                associatesElement.style.transform = 'translate(-50%, 0)';
                associatesElement.style.opacity = '1';
                
                // Type associates after slide animation
                setTimeout(() => {
                    typewriterText(associatesElement, 'associates', 60, () => {
                        // Create and animate terminal element in neon green
                        const terminalElement = document.createElement('div');
                        terminalElement.textContent = '';
                        terminalElement.style.fontFamily = 'JetBrains Mono, monospace';
                        terminalElement.style.fontSize = '0.8rem';
                        terminalElement.style.fontWeight = '400';
                        terminalElement.style.color = '#00ff41'; // Neon green
                        terminalElement.style.letterSpacing = '0.2em';
                        terminalElement.style.textTransform = 'lowercase';
                        terminalElement.style.position = 'fixed';
                        terminalElement.style.top = '50%';
                        terminalElement.style.left = '50%';
                        terminalElement.style.transform = 'translate(-50%, 40px)';
                        terminalElement.style.opacity = '0';
                        terminalElement.style.zIndex = '1000';
                        terminalElement.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                        terminalElement.style.textShadow = '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41';
                        
                        document.body.appendChild(terminalElement);
                        
                        // Slide up and type terminal
                        setTimeout(() => {
                            terminalElement.style.transform = 'translate(-50%, 25px)';
                            terminalElement.style.opacity = '1';
                            
                            // Type terminal after slide animation
                            setTimeout(() => {
                                typewriterText(terminalElement, 'terminal', 60, () => {
                                    // Wait a moment then start fizzle out with all three elements
                                    setTimeout(() => {
                                        fizzleOutAnimation(praxisElement, associatesElement, terminalElement);
                                    }, 1000);
                                });
                            }, 300);
                        }, 200);
                    });
                }, 300);
            }, 200);
        });
    }, 2200);
}

// Smooth typewriter effect that transforms one text to another
function typewriterEffect(element, fromText, toText, callback) {
    element.style.fontSize = '2.2rem';
    element.style.letterSpacing = '0.1em';
    element.style.transition = 'all 0.3s ease';
    
    // First, delete the original text
    let currentText = fromText;
    element.textContent = currentText;
    
    const deleteInterval = setInterval(() => {
        if (currentText.length > 0) {
            currentText = currentText.slice(0, -1);
            element.textContent = currentText + '|';
        } else {
            clearInterval(deleteInterval);
            element.textContent = '';
            
            // Now type the new text
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < toText.length) {
                    element.textContent = toText.substring(0, index + 1) + '|';
                    index++;
                } else {
                    clearInterval(typeInterval);
                    element.textContent = toText;
                    if (callback) callback();
                }
            }, 80);
        }
    }, 100);
}

// Type text letter by letter
function typewriterText(element, text, speed, callback) {
    let index = 0;
    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent = text.substring(0, index + 1) + '|';
            index++;
        } else {
            clearInterval(typeInterval);
            element.textContent = text;
            if (callback) callback();
        }
    }, speed);
}

// Smooth fizzle out animation
function fizzleOutAnimation(praxisElement, associatesElement, terminalElement) {
    praxisElement.style.transition = 'all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    associatesElement.style.transition = 'all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    if (terminalElement) {
        terminalElement.style.transition = 'all 1.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
    }
    
    // Add glow effect before fading
    praxisElement.style.textShadow = '0 0 10px rgba(74, 85, 104, 0.6), 0 0 20px rgba(74, 85, 104, 0.4), 0 0 30px rgba(74, 85, 104, 0.2)';
    associatesElement.style.textShadow = '0 0 10px rgba(74, 85, 104, 0.6), 0 0 20px rgba(74, 85, 104, 0.4)';
    if (terminalElement) {
        terminalElement.style.textShadow = '0 0 15px #00ff41, 0 0 30px #00ff41, 0 0 45px #00ff41';
    }
    
    setTimeout(() => {
        praxisElement.style.opacity = '0';
        associatesElement.style.opacity = '0';
        praxisElement.style.filter = 'blur(20px)';
        associatesElement.style.filter = 'blur(20px)';
        praxisElement.style.transform = 'translate(-50%, -50%) scale(1.1)';
        associatesElement.style.transform = 'translate(-50%, 0) scale(1.1)';
        
        if (terminalElement) {
            terminalElement.style.opacity = '0';
            terminalElement.style.filter = 'blur(20px)';
            terminalElement.style.transform = 'translate(-50%, 25px) scale(1.1)';
        }
        
        // Gentle flickering effect
        let flickers = 0;
        const flickerInterval = setInterval(() => {
            if (flickers < 4) {
                const opacity = Math.random() * 0.4 + 0.1;
                praxisElement.style.opacity = opacity;
                associatesElement.style.opacity = opacity * 0.7;
                if (terminalElement) {
                    terminalElement.style.opacity = opacity * 0.8;
                }
                flickers++;
            } else {
                clearInterval(flickerInterval);
                praxisElement.style.opacity = '0';
                associatesElement.style.opacity = '0';
                if (terminalElement) {
                    terminalElement.style.opacity = '0';
                }
                
                // Smooth fade to dashboard background color
                document.body.style.transition = 'background-color 1.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
                document.body.style.backgroundColor = '#0f0f0f';
                
                // Reset agent for fresh login
                localStorage.setItem('chatFirstOpen', 'true');
                
                // Redirect after fade
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1200);
            }
        }, 200);
    }, 300);
}

 