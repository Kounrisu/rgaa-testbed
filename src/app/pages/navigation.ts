import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModeService } from '../mode.service';
import { PAGES } from '../app';

const SLIDES = ['Première actualité : nouveau référentiel.', 'Deuxième actualité : formation en ligne.', 'Troisième actualité : événement à Paris.'];

/** Theme 6 (links), theme 12 (navigation: breadcrumb, search, site map) and theme 13 (consultation: new windows, files, moving content). */
@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  template: `
    @if (m.ok()) {
      <nav aria-label="Fil d’Ariane"><ol class="crumbs"><li><a routerLink="/" queryParamsHandling="preserve">Accueil</a></li><li aria-current="page">Navigation</li></ol></nav>
      <h1>Navigation, liens et consultation</h1>

      <section aria-labelledby="links">
        <h2 id="links">Liens</h2>
        <ul>
          <li><a href="https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/" target="_blank" rel="noreferrer">Critères et tests du RGAA <span class="sr-only">(s’ouvre dans un nouvel onglet)</span></a></li>
          <li><a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noreferrer">Les WCAG au W3C <span class="sr-only">(s’ouvre dans un nouvel onglet)</span></a></li>
          <li><a href="files/rapport.csv" download>Télécharger le rapport (CSV, 1 Ko)</a></li>
        </ul>
      </section>

      <section aria-labelledby="search">
        <h2 id="search">Recherche et plan du site</h2>
        <form role="search" (submit)="$event.preventDefault()">
          <label for="q">Rechercher dans le site</label>
          <input id="q" type="search" name="q" autocomplete="off"> <button type="submit">Rechercher</button>
        </form>
        <h3>Plan du site</h3>
        <ul>@for (p of pages; track p.path) { <li><a [routerLink]="p.path" queryParamsHandling="preserve">{{ p.label }}</a></li> }</ul>
      </section>

      <section aria-labelledby="news">
        <h2 id="news">Actualités</h2>
        <div class="slide" role="region" aria-roledescription="carrousel" aria-label="Défilement des actualités">
          <p>{{ slides[i()] }}</p>
          <button type="button" class="secondary" (click)="i.set((i() + slides.length - 1) % slides.length)">Actualité précédente</button>
          <button type="button" class="secondary" (click)="i.set((i() + 1) % slides.length)">Actualité suivante</button>
        </div>
        <p class="note">Aucun défilement automatique : l’utilisateur garde la main.</p>
      </section>
    } @else {
      <div class="big">Navigation, liens et consultation</div>

      <div class="big small">Liens</div>
      <p>Pour le RGAA, <a href="https://accessibilite.numerique.gouv.fr/" target="_blank">cliquez ici</a>.
         Pour les WCAG, <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">cliquez ici</a>.
         Pour la page de test, <a href="#">cliquez ici</a>. <a href="https://www.w3.org/">Lire la suite</a> <a href="https://www.w3.org/">Lire la suite</a></p>
      <p><a href="files/rapport.csv">rapport</a> <a>Lien sans destination</a> <a href="#"></a></p>

      <div class="big small">Actualités</div>
      <div class="slide-auto">{{ slides[i()] }}</div>
      <p>Les actualités défilent seules toutes les 3 secondes, sans bouton de pause.</p>
      <div class="big small">Navigation</div>
      <p>Pas de fil d’Ariane, de moteur de recherche, ni de plan du site : un seul moyen d’accéder aux pages.</p>
    }
  `,
  styles: `
    .crumbs { display: flex; gap: .5rem; list-style: none; padding: 0 } .crumbs li + li::before { content: '›'; margin-right: .5rem }
    .slide, .slide-auto { border: 1px solid #94a3b8; padding: .75rem 1rem; min-height: 4rem }
    .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }
  `,
})
export class Navigation {
  protected readonly m = inject(ModeService);
  protected readonly pages = PAGES;
  protected readonly slides = SLIDES;
  protected readonly i = signal(0);

  constructor() {
    if (this.m.broken()) {
      const timer = setInterval(() => this.i.set((this.i() + 1) % SLIDES.length), 3000);
      inject(DestroyRef).onDestroy(() => clearInterval(timer));
    }
  }
}
