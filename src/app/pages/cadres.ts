import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModeService } from '../mode.service';

/** Theme 2: inline frames need a relevant, distinct title. The frames use srcdoc, so nothing is loaded from the network. */
@Component({
  selector: 'app-cadres',
  template: `
    @if (m.ok()) {
      <h1>Cadres</h1>
      <section aria-labelledby="map">
        <h2 id="map">Plan d’accès</h2>
        <iframe title="Plan d’accès au site" width="420" height="160" [srcdoc]="doc('Plan d’accès', 'Gare à 5 minutes à pied.')"></iframe>
      </section>
      <section aria-labelledby="video">
        <h2 id="video">Vidéo de présentation</h2>
        <iframe title="Vidéo de présentation de l’équipe" width="420" height="160" [srcdoc]="doc('Vidéo', 'Lecteur de vidéo intégré.')"></iframe>
      </section>
      <section aria-labelledby="deco">
        <h2 id="deco">Cadre purement décoratif</h2>
        <iframe title="" aria-hidden="true" tabindex="-1" width="420" height="60" [srcdoc]="doc('', '')"></iframe>
      </section>
    } @else {
      <div class="big">Cadres</div>
      <div class="big small">Plan d’accès</div>
      <iframe width="420" height="160" [srcdoc]="doc('Plan', 'Gare à 5 minutes à pied.')"></iframe>
      <div class="big small">Vidéo</div>
      <iframe title="cadre" width="420" height="160" [srcdoc]="doc('Vidéo', 'Lecteur de vidéo intégré.')"></iframe>
      <div class="big small">Deuxième cadre</div>
      <iframe title="cadre" width="420" height="160" [srcdoc]="doc('Autre', 'Un autre contenu intégré.')"></iframe>
    }
  `,
  styles: `iframe { border: 1px solid #94a3b8; display: block; margin: .5rem 0 } .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }`,
})
export class Cadres {
  protected readonly m = inject(ModeService);
  private readonly san = inject(DomSanitizer);

  /** Fixed strings written in this file, never user input, so bypassing the sanitizer is safe here. */
  protected doc(title: string, text: string): SafeHtml {
    return this.san.bypassSecurityTrustHtml(
      `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${title}</title></head><body style="font:16px system-ui"><h1 style="font-size:18px">${title}</h1><p>${text}</p></body></html>`,
    );
  }
}
