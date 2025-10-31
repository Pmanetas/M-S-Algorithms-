import { Router } from './router';
import './style.css';

class App {
  private container: HTMLElement;

  constructor() {
    this.container = document.getElementById('app')!;
    this.init();
  }

  private init(): void {
    if (!this.container) {
      throw new Error('App container not found');
    }

    // Initialize router
    Router.init(this.container);

    // Add global styles for preventing back button issues
    this.setupGlobalBehavior();
    
    console.log('MS Portal TypeScript Frontend Initialized');
  }

  private setupGlobalBehavior(): void {
    // Prevent back button after logout (additional security)
    window.addEventListener('popstate', (event) => {
      // This will be handled by the router
    });

    // Session timeout functionality (optional - 30 minutes)
    this.setupSessionTimeout();
  }

  private setupSessionTimeout(): void {
    let sessionTimeout: number;
    
    const resetSessionTimeout = () => {
      clearTimeout(sessionTimeout);
      sessionTimeout = window.setTimeout(() => {
        alert('Your session has expired. Please log in again.');
        Router.navigate('login');
      }, 30 * 60 * 1000); // 30 minutes
    };

    // Reset timeout on user activity
    document.addEventListener('click', resetSessionTimeout);
    document.addEventListener('keypress', resetSessionTimeout);
    document.addEventListener('mousemove', resetSessionTimeout);

    // Initialize session timeout
    resetSessionTimeout();
  }
}

// Initialize the application
new App(); 