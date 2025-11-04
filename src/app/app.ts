import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ThemeService } from './theme/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Blood Bowl 3 League Visualizer');
  private readonly router = inject(Router);
  protected readonly themeService = inject(ThemeService);
  
  // Expose theme signal for template
  readonly theme = this.themeService.theme;

  ngOnInit(): void {
    // Theme service initializes automatically on construction
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
