import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ModeService } from '../mode.service';

/** Theme 7: a modal dialog, tabs, an accordion, a status message and script-built controls. */
@Component({
  selector: 'app-popin',
  template: `
    @if (m.ok()) {
      <h1>Popin et scripts</h1>

      <section aria-labelledby="dlg">
        <h2 id="dlg">Fenêtre modale</h2>
        <button type="button" (click)="open()">Ouvrir la popin</button>
        <dialog #dialog aria-labelledby="dlg-title" aria-describedby="dlg-text">
          <h3 id="dlg-title">Confirmer l’action</h3>
          <p id="dlg-text">Cette fenêtre modale est un élément <code>dialog</code> : le focus y est enfermé, Échap la ferme et le focus revient au bouton d’ouverture.</p>
          <button type="button" (click)="close()">Fermer</button>
        </dialog>
      </section>

      <section aria-labelledby="tabs-title">
        <h2 id="tabs-title">Onglets</h2>
        <div role="tablist" aria-label="Sections de démonstration" (keydown)="tabKeys($event)">
          @for (t of tabs; track t.id; let i = $index) {
            <button type="button" role="tab" [id]="'tab-' + t.id" [attr.aria-selected]="tab() === i" [attr.aria-controls]="'panel-' + t.id" [tabindex]="tab() === i ? 0 : -1" (click)="tab.set(i)" [class.secondary]="tab() !== i">{{ t.label }}</button>
          }
        </div>
        @for (t of tabs; track t.id; let i = $index) {
          <div role="tabpanel" [id]="'panel-' + t.id" [attr.aria-labelledby]="'tab-' + t.id" [hidden]="tab() !== i" tabindex="0"><p>{{ t.text }}</p></div>
        }
      </section>

      <section aria-labelledby="acc">
        <h2 id="acc">Accordéon</h2>
        <details><summary>Qu’est-ce que le RGAA ?</summary><p>Le référentiel général d’amélioration de l’accessibilité.</p></details>
        <details><summary>Qui doit l’appliquer ?</summary><p>Les services publics et certaines grandes entreprises.</p></details>
      </section>

      <section aria-labelledby="status">
        <h2 id="status">Message de statut</h2>
        <button type="button" (click)="copy()">Copier le lien</button>
        <p role="status">{{ message() }}</p>
      </section>
    } @else {
      <div class="big">Popin et scripts</div>

      <div class="big small">Fenêtre modale</div>
      <div class="fake-button" (click)="fake.set(true)">Ouvrir la popin</div>
      @if (fake()) {
        <div class="bad-popin">
          Une popin sans rôle, sans nom, sans piège à focus : Échap ne la ferme pas et le focus reste derrière.
          <span class="x" (click)="fake.set(false)">X</span>
        </div>
      }

      <div class="big small">Onglets</div>
      <div class="bad-tabs">
        @for (t of tabs; track t.id; let i = $index) { <div class="bad-tab" (click)="tab.set(i)">{{ t.label }}</div> }
      </div>
      <div>{{ tabs[tab()].text }}</div>

      <div class="big small">Message de statut</div>
      <a href="#" (click)="$event.preventDefault(); copy()">Copier le lien</a>
      <div class="toast">{{ message() }}</div>
      <div class="big small">Infobulle</div>
      <span class="hover-only" (mouseover)="tip.set(true)" (mouseout)="tip.set(false)">Survolez-moi pour voir l’aide</span>
      @if (tip()) { <span class="tip">Aide visible uniquement au survol</span> }
    }
  `,
  styles: `
    dialog { border: 2px solid #1d4ed8; border-radius: .5rem; max-width: 28rem }
    dialog::backdrop { background: rgba(0, 0, 0, .5) }
    [role='tablist'] { display: flex; gap: .4rem; margin-bottom: .5rem }
    [role='tabpanel'] { border: 1px solid #94a3b8; padding: .5rem 1rem }
    details { border: 1px solid #c7ccd6; padding: .5rem; margin-bottom: .4rem }
    .fake-button { display: inline-block; background: #1d4ed8; color: #fff; padding: .45rem .9rem; border-radius: .35rem; cursor: pointer }
    .bad-popin { position: fixed; top: 30%; left: 30%; background: #fff; border: 2px solid #1d4ed8; padding: 1rem; max-width: 20rem; z-index: 5 }
    .x { cursor: pointer; margin-left: 1rem; font-weight: 700 }
    .bad-tabs { display: flex; gap: .4rem } .bad-tab { padding: .4rem .8rem; border: 1px solid #94a3b8; cursor: pointer }
    .toast { color: #166534; margin-top: .5rem } .hover-only { border-bottom: 1px dotted #000 } .tip { margin-left: .5rem; background: #fef9c3; padding: .2rem .4rem }
    .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }
  `,
})
export class Popin {
  protected readonly m = inject(ModeService);
  private readonly dialog = viewChild<ElementRef<HTMLDialogElement>>('dialog');
  protected readonly tab = signal(0);
  protected readonly fake = signal(false);
  protected readonly tip = signal(false);
  protected readonly message = signal('');
  protected readonly tabs = [
    { id: 'a', label: 'Présentation', text: 'Contenu de l’onglet Présentation.' },
    { id: 'b', label: 'Détails', text: 'Contenu de l’onglet Détails.' },
    { id: 'c', label: 'Avis', text: 'Contenu de l’onglet Avis.' },
  ];

  protected open(): void { this.dialog()?.nativeElement.showModal(); }
  protected close(): void { this.dialog()?.nativeElement.close(); }
  protected copy(): void { this.message.set('Lien copié dans le presse-papiers.'); }

  /** Arrow keys, Home and End move between the tabs and select the focused one (ARIA authoring practices). */
  protected tabKeys(event: KeyboardEvent): void {
    const last = this.tabs.length - 1;
    const keys: Record<string, number> = { ArrowRight: (this.tab() + 1) % this.tabs.length, ArrowLeft: (this.tab() + last) % this.tabs.length, Home: 0, End: last };
    if (!(event.key in keys)) return;
    event.preventDefault();
    this.tab.set(keys[event.key]);
    (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[role=tab]')[keys[event.key]]?.focus();
  }
}
