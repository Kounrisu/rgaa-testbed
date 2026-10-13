import { Component, computed, inject, signal } from '@angular/core';
import { ModeService } from '../mode.service';

interface Row { id: number; commune: string; region: string; habitants: number }

const REGIONS = ['Bretagne', 'Occitanie', 'Normandie', 'Grand Est', 'Corse'];
const ROWS: Row[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  commune: `Commune ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
  region: REGIONS[i % REGIONS.length],
  habitants: 1200 + i * 937,
}));
const PER_PAGE = 5;

/** Theme 5: a data table (caption, headers, scope) and its pagination (nav, current page, announcement). */
@Component({
  selector: 'app-tableau',
  template: `
    @if (m.ok()) {
      <h1>Tableau et pagination</h1>
      <table>
        <caption>Communes du jeu de test, page {{ page() }} sur {{ pages() }}</caption>
        <thead><tr><th scope="col">N°</th><th scope="col">Commune</th><th scope="col">Région</th><th scope="col">Habitants</th></tr></thead>
        <tbody>
          @for (r of visible(); track r.id) {
            <tr><th scope="row">{{ r.id }}</th><td>{{ r.commune }}</td><td>{{ r.region }}</td><td>{{ r.habitants }}</td></tr>
          }
        </tbody>
      </table>
      <p role="status" class="sr-only">Page {{ page() }} sur {{ pages() }}</p>
      <nav aria-label="Pagination">
        <ul class="pager">
          <li><button type="button" class="secondary" (click)="go(page() - 1)" [disabled]="page() === 1">Page précédente</button></li>
          @for (n of numbers(); track n) {
            <li>
              <button type="button" [class.secondary]="n !== page()" (click)="go(n)" [attr.aria-current]="n === page() ? 'page' : null" [attr.aria-label]="'Page ' + n">{{ n }}</button>
            </li>
          }
          <li><button type="button" class="secondary" (click)="go(page() + 1)" [disabled]="page() === pages()">Page suivante</button></li>
        </ul>
      </nav>
    } @else {
      <div class="big">Tableau et pagination</div>
      <!-- a table with no caption and no header cells, plus a layout table that carries headers -->
      <table>
        <tr class="head"><td>N°</td><td>Commune</td><td>Région</td><td>Habitants</td></tr>
        @for (r of visible(); track r.id) {
          <tr><td>{{ r.id }}</td><td>{{ r.commune }}</td><td>{{ r.region }}</td><td>{{ r.habitants }}</td></tr>
        }
      </table>
      <div class="bad-pager">
        <span class="p" (click)="go(page() - 1)">&lt;</span>
        @for (n of numbers(); track n) {
          <span class="p" [class.cur]="n === page()" (click)="go(n)">{{ n }}</span>
        }
        <span class="p" (click)="go(page() + 1)">&gt;</span>
      </div>
      <table><tr><th>Mise en page</th><th>Colonne 2</th></tr><tr><td>Un tableau utilisé pour la mise en page</td><td>et non pour des données</td></tr></table>
    }
  `,
  styles: `
    .pager { display: flex; gap: .4rem; list-style: none; padding: 0; margin: 1rem 0; flex-wrap: wrap }
    .head td { font-weight: 700 }
    .bad-pager { display: flex; gap: .5rem; margin: 1rem 0 }
    .p { padding: .3rem .7rem; border: 1px solid #94a3b8; cursor: pointer } .p.cur { background: #dbeafe }
    .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 }
  `,
})
export class Tableau {
  protected readonly m = inject(ModeService);
  protected readonly page = signal(1);
  protected readonly pages = computed(() => Math.ceil(ROWS.length / PER_PAGE));
  protected readonly numbers = computed(() => Array.from({ length: this.pages() }, (_, i) => i + 1));
  protected readonly visible = computed(() => ROWS.slice((this.page() - 1) * PER_PAGE, this.page() * PER_PAGE));

  protected go(n: number): void {
    if (n >= 1 && n <= this.pages()) this.page.set(n);
  }
}
