import { AuthService } from '../api';
import { Router } from '../router';
import { UserInfo } from '../types';

export class DashboardComponent {
  private container: HTMLElement;
  private user: UserInfo | null = null;
  private isLoading = true;

  constructor(container: HTMLElement) {
    this.container = container;
    this.init();
  }

  private async init(): Promise<void> {
    await this.checkAuth();
    this.render();
    this.bindEvents();
    this.startAnimations();
  }

  private async checkAuth(): Promise<void> {
    try {
      this.user = await AuthService.checkAuth();
      if (!this.user.logged_in) {
        Router.navigate('login');
        return;
      }
    } catch (error) {
      Router.navigate('login');
      return;
    }
    this.isLoading = false;
  }

  private render(): void {
    if (this.isLoading) {
      this.container.innerHTML = `
        <div class="loading-container">
          <style>
            .loading-container {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background-color: #000000;
            }

            .loading-spinner {
              width: 40px;
              height: 40px;
              border: 3px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              border-top-color: rgba(255, 255, 255, 0.5);
              animation: spin 1s ease-in-out infinite;
            }

            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          </style>
          <div class="loading-spinner"></div>
        </div>
      `;
      return;
    }

    this.container.innerHTML = `
      <div class="dashboard-page">
        <style>
          .dashboard-page {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: #000000;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: white;
            position: relative;
          }

          .praxis-logo {
            position: absolute;
            top: 20px;
            left: 20px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 1.2rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 0.1em;
            opacity: 0;
            transform: translateY(50px);
            transition: all 2s ease-out;
          }

          .praxis-logo.show {
            opacity: 0.7;
            transform: translateY(0);
          }

          .logout-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: rgba(255, 255, 255, 0.7);
            padding: 0.3rem 0.7rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.8rem;
            font-weight: 500;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(50px);
          }

          .logout-btn.show {
            opacity: 1;
            transform: translateY(0);
          }

          .logout-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
            color: rgba(255, 255, 255, 0.9);
          }

          .dashboard-content {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
          }

          .welcome-message {
            text-align: center;
            font-size: 1.5rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 0.05em;
          }
        </style>

        <div class="praxis-logo">PRAXIS 1.0</div>
        
        <button class="logout-btn" id="logoutBtn">Logout</button>
        
        <div class="dashboard-content">
          <div class="welcome-message">
            Welcome, ${this.user?.username || 'User'}
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    const logoutBtn = this.container.querySelector('#logoutBtn') as HTMLButtonElement;
    
    logoutBtn.addEventListener('click', async () => {
      try {
        await AuthService.logout();
        
        // Create smooth logout transition
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
          document.body.style.opacity = '1';
          document.body.style.transition = '';
          Router.navigate('login');
        }, 500);
      } catch (error) {
        console.error('Logout error:', error);
        Router.navigate('login');
      }
    });
  }

  private startAnimations(): void {
    if (this.isLoading) return;

    const praxisLogo = this.container.querySelector('.praxis-logo') as HTMLElement;
    const logoutBtn = this.container.querySelector('.logout-btn') as HTMLElement;

    // Animate PRAXIS from bottom to top-left corner
    setTimeout(() => {
      praxisLogo.classList.add('show');
    }, 500);

    // Animate LOGOUT from bottom to top-right corner (delayed)
    setTimeout(() => {
      logoutBtn.classList.add('show');
    }, 1500);
  }

  destroy(): void {
    // Cleanup if needed
    this.container.innerHTML = '';
  }
} 