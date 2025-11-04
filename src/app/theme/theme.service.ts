import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeKey = 'bb3-theme';
  private readonly themeSignal = signal<Theme>(this.getInitialTheme());

  // Expose theme as a signal for reactive updates
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    // Apply theme when it changes
    effect(() => {
      const currentTheme = this.themeSignal();
      this.applyTheme(currentTheme);
    });

    // Listen for system theme changes (only in browser)
    if (typeof window !== 'undefined' && window.matchMedia) {
      try {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // Use addEventListener if available, fallback to addListener for older browsers
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', () => {
            // Only update if user hasn't manually set a preference
            try {
              if (!localStorage.getItem(this.themeKey)) {
                const systemTheme = this.getSystemTheme();
                this.themeSignal.set(systemTheme);
              }
            } catch (e) {
              // If localStorage check fails, just update theme
              const systemTheme = this.getSystemTheme();
              this.themeSignal.set(systemTheme);
            }
          });
        } else if (mediaQuery.addListener) {
          // Fallback for older browsers
          mediaQuery.addListener(() => {
            try {
              if (!localStorage.getItem(this.themeKey)) {
                const systemTheme = this.getSystemTheme();
                this.themeSignal.set(systemTheme);
              }
            } catch (e) {
              const systemTheme = this.getSystemTheme();
              this.themeSignal.set(systemTheme);
            }
          });
        }
      } catch (e) {
        // Silently fail if media query is not supported
        console.warn('Theme detection not supported:', e);
      }
    }

    // Apply initial theme
    this.applyTheme(this.themeSignal());
  }

  /**
   * Get the initial theme based on:
   * 1. User's saved preference
   * 2. System preference
   * 3. Default to dark mode
   */
  private getInitialTheme(): Theme {
    // Check for saved preference (only in browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const savedTheme = localStorage.getItem(this.themeKey) as Theme | null;
        if (savedTheme === 'light' || savedTheme === 'dark') {
          return savedTheme;
        }
      } catch (e) {
        // localStorage might not be available (e.g., private browsing)
        console.warn('Could not access localStorage:', e);
      }
    }

    // Check system preference
    return this.getSystemTheme();
  }

  /**
   * Get system theme preference, defaulting to dark if unavailable
   */
  private getSystemTheme(): Theme {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return 'dark'; // Fallback to dark
    }

    try {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'dark'; // Fallback to dark if detection fails
    }
  }

  /**
   * Set the theme
   */
  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    
    // Save to localStorage (only in browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(this.themeKey, theme);
      } catch (e) {
        // localStorage might not be available (e.g., private browsing)
        console.warn('Could not save theme preference:', e);
      }
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.themeSignal() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Apply theme to the document
   */
  private applyTheme(theme: Theme): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }
}

