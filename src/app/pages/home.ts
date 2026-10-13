import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ModeService } from '../mode.service';
import { PAGES } from '../app';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    @if (m.ok()) {
      <h1>RGAA Testbed</h1>
      <p>
        Site de test pour <strong>RGAA Assistant</strong>. Chaque page existe en deux versions : une version <strong>conforme</strong> au
        RGAA 4.1, et une version <strong>avec erreurs volontaires</strong> (ajoutez <code>?mode=broken</code> à l’adresse, ou utilisez le lien en bas de page).
      </p>
      <section aria-labelledby="pages-title">
        <h2 id="pages-title">Pages et thématiques RGAA couvertes</h2>
        <table>
          <caption>Les pages de test et les thématiques RGAA qu’elles permettent de contrôler</caption>
          <thead><tr><th scope="col">Page</th><th scope="col">Thématiques RGAA</th></tr></thead>
          <tbody>
            @for (p of pages; track p.path) {
              <tr>
                <th scope="row"><a [routerLink]="p.path" queryParamsHandling="preserve">{{ p.label }}</a></th>
                <td>{{ p.themes }}</td>
              </tr>
            }
          </tbody>
        </table>
        <p class="note">La thématique 8 (éléments obligatoires : langue, titre de page, doublons d’identifiants) est contrôlée sur chaque page.</p>
      </section>
    } @else {
      <div class="big">RGAA Testbed (version avec erreurs)</div>
      <p>Cette version contient des erreurs volontaires, listées dans <code>ERRORS.md</code>.</p>
      <div class="big small">Pages</div>
      @for (p of pages; track p.path) {
        <a [routerLink]="p.path" queryParamsHandling="preserve">{{ p.label }}</a><br>
      }
    }
  `,
  styles: `.big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }`,
})
export class Home {
  protected readonly m = inject(ModeService);
  protected readonly pages = PAGES;
}
