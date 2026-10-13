import { Component, inject } from '@angular/core';
import { ModeService } from '../mode.service';

/** Theme 9 (headings, lists, quotes, abbreviations) and, on every page, theme 8 (duplicate ids). */
@Component({
  selector: 'app-structure',
  template: `
    @if (m.ok()) {
      <h1>Structuration de l’information</h1>

      <section aria-labelledby="h">
        <h2 id="h">Titres</h2>
        <h3>Un sous-titre de niveau 3</h3>
        <p>Les niveaux de titres se suivent sans saut : h1, h2, h3.</p>
      </section>

      <section aria-labelledby="l">
        <h2 id="l">Listes</h2>
        <ul><li>Une liste à puces</li><li>Avec de vrais éléments de liste</li></ul>
        <ol><li>Une liste ordonnée</li><li>Pour des étapes</li></ol>
        <dl><dt>RGAA</dt><dd>Référentiel général d’amélioration de l’accessibilité.</dd></dl>
      </section>

      <section aria-labelledby="q">
        <h2 id="q">Citations et abréviations</h2>
        <blockquote cite="https://accessibilite.numerique.gouv.fr"><p>L’accessibilité numérique, c’est permettre à tous d’accéder à l’information.</p></blockquote>
        <p>Le <abbr title="Référentiel général d’amélioration de l’accessibilité">RGAA</abbr> s’appuie sur les <abbr title="Web Content Accessibility Guidelines">WCAG</abbr>.</p>
        <p>Une courte citation : <q>le web est fait pour tous</q>.</p>
      </section>
    } @else {
      <div class="big">Structuration de l’information</div>

      <div class="big small">Titres</div>
      <h4>Un titre de niveau 4 juste après un titre de page inexistant</h4>
      <p><b>Un faux titre en gras</b></p>

      <div class="big small">Listes</div>
      <p>
        - Une liste faite avec des tirets<br>
        - Qui ne sont pas de vrais éléments de liste<br>
        - Et des sauts de ligne
      </p>

      <div class="big small">Citations</div>
      <blockquote>Un bloc de citation utilisé seulement pour décaler un paragraphe vers la droite.</blockquote>
      <p>Le RGAA s’appuie sur les WCAG (abréviations sans explication).</p>

      <div class="big small">Identifiants</div>
      <p id="dup">Premier élément avec l’identifiant « dup ».</p>
      <p id="dup">Deuxième élément avec le même identifiant.</p>
    }
  `,
  styles: `blockquote { border-left: 4px solid #94a3b8; margin-inline: 0; padding-left: 1rem } .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }`,
})
export class Structure {
  protected readonly m = inject(ModeService);
}
