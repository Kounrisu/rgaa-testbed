import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ModeService } from './mode.service';

export const PAGES = [
  { path: '/images', label: 'Images', themes: '1' },
  { path: '/cadres', label: 'Cadres', themes: '2' },
  { path: '/presentation', label: 'Couleurs et présentation', themes: '3, 10' },
  { path: '/multimedia', label: 'Multimédia', themes: '4' },
  { path: '/tableau', label: 'Tableau', themes: '5' },
  { path: '/popin', label: 'Popin et scripts', themes: '7' },
  { path: '/structure', label: 'Structuration', themes: '9' },
  { path: '/formulaires', label: 'Formulaires', themes: '11' },
  { path: '/navigation', label: 'Navigation', themes: '6, 12, 13' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    @if (m.ok()) {
      <a class="skip-link" href="#main" (click)="skip($event)">Aller au contenu principal</a>
      <header>
        <p class="brand"><a routerLink="/" queryParamsHandling="preserve">RGAA Testbed</a></p>
        <nav aria-label="Principale">
          <ul>
            @for (p of pages; track p.path) {
              <li><a [routerLink]="p.path" queryParamsHandling="preserve" routerLinkActive="current" ariaCurrentWhenActive="page">{{ p.label }}</a></li>
            }
          </ul>
        </nav>
      </header>
      <main id="main" tabindex="-1" #main><router-outlet /></main>
      <footer>
        <p>Site de test pour RGAA Assistant. Version affichée : <strong>conforme</strong>.</p>
        <p><a routerLink="." [queryParams]="{ mode: 'broken' }" queryParamsHandling="merge">Voir la version avec erreurs</a></p>
      </footer>
    } @else {
      <!-- the broken shell: no skip link, no landmarks, divs instead of header/nav/main/footer, low-contrast nav links -->
      <div class="bad-header">
        <div class="brand"><a routerLink="/" queryParamsHandling="preserve">RGAA Testbed</a></div>
        <div class="bad-nav">
          @for (p of pages; track p.path) {
            <a [routerLink]="p.path" queryParamsHandling="preserve">{{ p.label }}</a>
          }
        </div>
      </div>
      <div class="bad-main"><router-outlet /></div>
      <div class="bad-footer">
        Version affichée : <b>avec erreurs</b> —
        <a routerLink="." [queryParams]="{ mode: null }" queryParamsHandling="merge">revenir à la version conforme</a>
      </div>
    }
  `,
})
export class App {
  protected readonly m = inject(ModeService);
  protected readonly pages = PAGES;
  private readonly main = viewChild<ElementRef<HTMLElement>>('main');

  protected skip(event: Event): void {
    event.preventDefault();
    this.main()?.nativeElement.focus();
  }
}
