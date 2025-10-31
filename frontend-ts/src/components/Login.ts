import { AuthService } from '../api';
import { Router } from '../router';

export class LoginComponent {
  private container: HTMLElement;
  private isLoading = false;
  private isAnimating = false;

  constructor(container: HTMLElement) {
    this.container = container;
    this.render();
    this.bindEvents();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="login-page">
        <style>
          .login-page {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            overflow: hidden;
            transition: all 0.5s ease;
          }

          .login-page.animating {
            background-color: #000000;
          }

          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            position: relative;
          }

          .praxis {
            position: absolute;
            top: 20px;
            left: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.2rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 0.1em;
            z-index: 100;
            transition: all 2s ease;
          }

          .praxis.animating {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            z-index: 1000;
            opacity: 1;
            animation: fizzleOut 4s ease-out forwards;
          }

          @keyframes fizzleOut {
            0% {
              opacity: 1;
              filter: blur(0px);
              text-shadow: none;
              letter-spacing: 0.1em;
            }
            50% {
              opacity: 1;
              filter: blur(5px);
              text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
              letter-spacing: 0.3em;
            }
            70% {
              opacity: 0.3;
              filter: blur(10px);
              text-shadow: 0 0 40px rgba(255, 255, 255, 0.4);
              letter-spacing: 0.5em;
            }
            100% {
              opacity: 0;
              filter: blur(15px);
              text-shadow: 0 0 60px rgba(255, 255, 255, 0.2);
              letter-spacing: 0.7em;
            }
          }

          .login-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 3rem;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
            width: 100%;
            max-width: 400px;
            margin: 2rem;
            transition: opacity 0.5s ease;
          }

          .login-container.animating {
            opacity: 0;
          }

          .login-form h2 {
            text-align: center;
            margin-bottom: 2rem;
            color: #2d3748;
            font-weight: 600;
            font-size: 1.5rem;
          }

          .input-group {
            margin-bottom: 1.5rem;
            position: relative;
          }

          .input-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: #4a5568;
            font-weight: 500;
            font-size: 0.9rem;
          }

          .input-group input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
            box-sizing: border-box;
          }

          .input-group input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            background: rgba(255, 255, 255, 1);
          }

          .login-btn {
            width: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 0.875rem 1.5rem;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
          }

          .login-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          }

          .login-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .error-message {
            background: #fed7d7;
            color: #c53030;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border: 1px solid #feb2b2;
            font-size: 0.9rem;
            display: none;
          }

          .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #ffffff;
            animation: spin 0.8s ease-in-out infinite;
            margin-right: 8px;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        </style>

        <div class="container">
          <div class="praxis">PRAXIS 1.0</div>
          
          <main class="login-container">
            <div class="login-form">
              <h2>Portal Access</h2>
              <form id="loginForm">
                <div class="input-group">
                  <label for="username">Key</label>
                  <input type="text" id="username" name="username" required>
                </div>
                
                <div class="input-group">
                  <label for="password">Password</label>
                  <input type="password" id="password" name="password" required>
                </div>
                
                <button type="submit" class="login-btn" id="loginBtn">
                  Login
                </button>
              </form>
              
              <div id="errorMessage" class="error-message"></div>
            </div>
          </main>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    const form = this.container.querySelector('#loginForm') as HTMLFormElement;
    const usernameInput = this.container.querySelector('#username') as HTMLInputElement;
    const passwordInput = this.container.querySelector('#password') as HTMLInputElement;
    const errorMessage = this.container.querySelector('#errorMessage') as HTMLElement;
    const loginBtn = this.container.querySelector('#loginBtn') as HTMLButtonElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (this.isLoading || this.isAnimating) return;

      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      if (!username || !password) {
        this.showError('Please fill in all fields');
        return;
      }

      this.setLoading(true);
      this.hideError();

      try {
        const response = await AuthService.login(username, password);
        
        if (response.success) {
          this.startLoginAnimation();
          setTimeout(() => {
            Router.navigate('dashboard');
          }, 4000);
        } else {
          this.showError(response.message);
          passwordInput.value = '';
        }
      } catch (error) {
        this.showError('Network error. Please try again.');
        passwordInput.value = '';
      } finally {
        this.setLoading(false);
      }
    });

    // Add input focus effects
    const inputs = this.container.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement?.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement?.classList.remove('focused');
      });
    });
  }

  private setLoading(loading: boolean): void {
    this.isLoading = loading;
    const loginBtn = this.container.querySelector('#loginBtn') as HTMLButtonElement;
    const usernameInput = this.container.querySelector('#username') as HTMLInputElement;
    const passwordInput = this.container.querySelector('#password') as HTMLInputElement;

    if (loading) {
      loginBtn.innerHTML = '<span class="loading-spinner"></span>Authenticating...';
      loginBtn.disabled = true;
      usernameInput.disabled = true;
      passwordInput.disabled = true;
    } else {
      loginBtn.innerHTML = 'Login';
      loginBtn.disabled = false;
      usernameInput.disabled = false;
      passwordInput.disabled = false;
    }
  }

  private showError(message: string): void {
    const errorMessage = this.container.querySelector('#errorMessage') as HTMLElement;
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    
    setTimeout(() => {
      errorMessage.style.display = 'none';
    }, 5000);
  }

  private hideError(): void {
    const errorMessage = this.container.querySelector('#errorMessage') as HTMLElement;
    errorMessage.style.display = 'none';
  }

  private startLoginAnimation(): void {
    this.isAnimating = true;
    const loginPage = this.container.querySelector('.login-page') as HTMLElement;
    const loginContainer = this.container.querySelector('.login-container') as HTMLElement;
    const praxis = this.container.querySelector('.praxis') as HTMLElement;

    // Add animation classes
    loginPage.classList.add('animating');
    loginContainer.classList.add('animating');
    praxis.classList.add('animating');

    // After 2 seconds, start the fizzle out effect
    setTimeout(() => {
      // Create flickering effect
      let flickers = 0;
      const flickerInterval = setInterval(() => {
        if (flickers < 6) {
          praxis.style.opacity = praxis.style.opacity === '0' ? '0.3' : '0';
          flickers++;
        } else {
          clearInterval(flickerInterval);
          praxis.style.opacity = '0';
        }
      }, 150);
    }, 2000);
  }

  destroy(): void {
    // Cleanup if needed
    this.container.innerHTML = '';
  }
} 