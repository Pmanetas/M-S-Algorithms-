import { Route } from './types';

export class Router {
  private static currentRoute: Route = 'login';
  private static container: HTMLElement | null = null;
  private static currentComponent: any = null;

  static init(container: HTMLElement): void {
    this.container = container;
    this.handleInitialRoute();
    this.bindPopstateEvent();
  }

  static navigate(route: Route): void {
    if (this.currentRoute === route) return;
    
    this.currentRoute = route;
    this.updateURL(route);
    this.renderRoute();
  }

  private static handleInitialRoute(): void {
    const path = window.location.pathname;
    
    if (path === '/dashboard') {
      this.currentRoute = 'dashboard';
    } else {
      this.currentRoute = 'login';
    }
    
    this.renderRoute();
  }

  private static updateURL(route: Route): void {
    const url = route === 'login' ? '/' : `/${route}`;
    window.history.pushState({}, '', url);
  }

  private static bindPopstateEvent(): void {
    window.addEventListener('popstate', () => {
      this.handleInitialRoute();
    });
  }

  private static async renderRoute(): Promise<void> {
    if (!this.container) return;

    // Clean up previous component
    if (this.currentComponent && typeof this.currentComponent.destroy === 'function') {
      this.currentComponent.destroy();
    }

    // Dynamically import and render new component
    try {
      if (this.currentRoute === 'login') {
        const { LoginComponent } = await import('./components/Login');
        this.currentComponent = new LoginComponent(this.container);
      } else if (this.currentRoute === 'dashboard') {
        const { DashboardComponent } = await import('./components/Dashboard');
        this.currentComponent = new DashboardComponent(this.container);
      }
    } catch (error) {
      console.error('Error loading component:', error);
      // Fallback to login on error
      if (this.currentRoute !== 'login') {
        this.navigate('login');
      }
    }
  }

  static getCurrentRoute(): Route {
    return this.currentRoute;
  }
} 