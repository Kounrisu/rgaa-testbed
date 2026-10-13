import { Component, inject } from '@angular/core';
import { ModeService } from '../mode.service';

/** Theme 1: informative, decorative and complex images, icons, image links, SVG, CSS background images. */
@Component({
  selector: 'app-images',
  template: `
    @if (m.ok()) {
      <h1>Images</h1>

      <section aria-labelledby="info">
        <h2 id="info">Images informatives</h2>
        <img src="img/chart.svg" width="320" height="200" alt="Graphique en barres : les ventes passent de 40 en 2023 à 95 en 2025">
        <figure>
          <img src="img/team.svg" width="320" height="200" alt="Trois personnes autour d’une table de réunion" aria-describedby="team-desc">
          <figcaption id="team-desc">L’équipe produit lors de l’atelier de janvier : deux designers et un développeur.</figcaption>
        </figure>
        <figure>
          <img src="img/chart.svg" width="320" height="200" alt="Évolution des ventes, voir la description détaillée ci-dessous">
          <figcaption>Image complexe.</figcaption>
          <details><summary>Description détaillée</summary>
            <p>Trois barres : 40 en 2023, 70 en 2024, 95 en 2025. La croissance est régulière.</p></details>
        </figure>
      </section>

      <section aria-labelledby="deco">
        <h2 id="deco">Images décoratives</h2>
        <p><img src="img/deco.svg" width="120" height="40" alt="">Une image décorative a un attribut alt vide.</p>
        <div class="bg-deco" aria-hidden="true"></div>
        <p>Le bandeau ci-dessus est une image de fond purement décorative.</p>
      </section>

      <section aria-labelledby="icons">
        <h2 id="icons">Icônes</h2>
        <p><a href="#icons"><img src="img/icon-home.svg" width="20" height="20" alt="">Accueil</a> (icône décorative, le texte du lien suffit)</p>
        <p><a href="#icons"><img src="img/icon-home.svg" width="20" height="20" alt="Retour à l’accueil"></a> (lien contenant uniquement une image, l’alternative en donne l’intitulé)</p>
        <button type="button"><svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 16 16"><path d="M2 8l4 4 8-9" stroke="currentColor" stroke-width="2" fill="none"/></svg> Valider</button>
        <p>
          <svg role="img" aria-labelledby="svg-t" width="48" height="48" viewBox="0 0 48 48"><title id="svg-t">Alerte : action requise</title>
            <circle cx="24" cy="24" r="22" fill="#b00020"/><rect x="22" y="12" width="4" height="16" fill="#fff"/><rect x="22" y="32" width="4" height="4" fill="#fff"/></svg>
        </p>
        <div class="bg-info" role="img" aria-label="Photo : façade du bâtiment principal"></div>
      </section>
    } @else {
      <div class="big">Images</div>

      <div class="big small">Images informatives</div>
      <img src="img/chart.svg" width="320" height="200">
      <img src="img/team.svg" width="320" height="200" alt="team.svg">
      <img src="img/chart.svg" width="320" height="200" alt="">
      <img src="img/team.svg" width="320" height="200" alt="Image de l’équipe produit, prise en janvier lors de l’atelier de conception avec les designers, le développeur, le product owner et l’ensemble des participants invités à la réunion de lancement du projet">

      <div class="big small">Images décoratives</div>
      <img src="img/deco.svg" width="120" height="40" alt="décoration bleue">
      <div class="bg-deco"></div>

      <div class="big small">Icônes</div>
      <a href="#"><img src="img/icon-home.svg" width="20" height="20"></a>
      <a href="#"><img src="img/icon-home.svg" width="20" height="20" alt="icône"> Accueil</a>
      <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="#b00020"/></svg>
      <div class="bg-info"></div>
      <p class="low">Le bloc ci-dessus porte une information uniquement par son image de fond.</p>
    }
  `,
  styles: `
    .bg-deco { height: 40px; background: url('/img/deco.svg') repeat-x; margin: 1rem 0 }
    .bg-info { height: 120px; max-width: 320px; background: #cbd5e1 url('/img/team.svg') center/cover; margin: 1rem 0 }
    .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }
    img { vertical-align: middle; margin: .25rem }
  `,
})
export class Images {
  protected readonly m = inject(ModeService);
}
