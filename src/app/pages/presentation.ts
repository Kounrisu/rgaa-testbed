import { Component, inject } from '@angular/core';
import { ModeService } from '../mode.service';

/** Theme 3 (colours) and theme 10 (presentation of information: contrast, links, text resizing, spacing, focus, hidden content). */
@Component({
  selector: 'app-presentation',
  template: `
    @if (m.ok()) {
      <h1>Couleurs et présentation</h1>

      <section aria-labelledby="colors">
        <h2 id="colors">Information donnée par la couleur</h2>
        <ul>
          <li><span class="dot ok" aria-hidden="true"></span> Service disponible <span class="sr-only">(statut : en ligne)</span></li>
          <li><span class="dot ko" aria-hidden="true"></span> Service indisponible <span class="sr-only">(statut : hors ligne)</span></li>
        </ul>
        <p><span class="err">Erreur :</span> le champ obligatoire est vide. L’information n’est pas donnée par la couleur seule.</p>
      </section>

      <section aria-labelledby="contrast">
        <h2 id="contrast">Contrastes</h2>
        <p>Ce texte a un contraste de plus de 12:1 avec son fond.</p>
        <p class="strong-contrast">Ce texte blanc sur fond bleu foncé a un contraste de plus de 8:1.</p>
        <p>Dans un paragraphe, <a href="#contrast">un lien souligné</a> se distingue sans dépendre de la couleur.</p>
      </section>

      <section aria-labelledby="text">
        <h2 id="text">Texte redimensionnable</h2>
        <div class="flex-box"><p>Ce bloc grandit avec le texte : sa hauteur n’est pas fixée, rien n’est coupé quand on agrandit à 200 % ou qu’on change l’espacement des lignes, des mots et des lettres.</p></div>
        <button type="button">Un bouton avec un focus bien visible</button>
        <p><span class="sr-only">Texte réservé aux lecteurs d’écran : </span>Le texte masqué visuellement reste lu par les technologies d’assistance.</p>
      </section>
    } @else {
      <div class="big">Couleurs et présentation</div>

      <div class="big small">Information donnée par la couleur</div>
      <p>Les champs en rouge sont obligatoires, ceux en vert sont facultatifs.</p>
      <p><span class="dot ok"></span> Service A <span class="dot ko"></span> Service B</p>

      <div class="big small">Contrastes</div>
      <p class="low">Ce texte gris très clair sur fond blanc a un contraste insuffisant.</p>
      <p style="background:#3b82f6;color:#ffffff">Du texte blanc sur un bleu moyen : contraste insuffisant.</p>
      <p>Un <a href="#" class="ghost-link">lien non souligné</a> dont la couleur ressemble au texte qui l’entoure.</p>

      <div class="big small">Texte</div>
      <div class="fixed-box">Ce bloc a une hauteur fixée avec overflow caché : si on agrandit le texte ou les espacements, la fin de cette phrase est coupée et devient illisible pour l’utilisateur.</div>
      <p style="font-size:10px">Un texte en 10 px bloqué.</p>
      <button type="button" class="no-focus">Un bouton sans indicateur de focus</button>
      <span style="display:none">Contenu masqué qui ne devrait pas être lu</span>
    }
  `,
  styles: `
    .dot { display: inline-block; width: .8rem; height: .8rem; border-radius: 50%; margin-right: .3rem }
    .dot.ok { background: #16a34a } .dot.ko { background: #dc2626 }
    .strong-contrast { background: #1e3a8a; color: #fff; padding: .5rem }
    .flex-box { border: 1px solid #94a3b8; padding: .5rem; max-width: 24rem }
    .fixed-box { height: 2.4rem; width: 14rem; overflow: hidden; border: 1px solid #94a3b8; padding: .25rem }
    .ghost-link { color: #3a3a5e; text-decoration: none }
    .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }
  `,
})
export class Presentation {
  protected readonly m = inject(ModeService);
}
