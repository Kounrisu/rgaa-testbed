import { Component, inject } from '@angular/core';
import { ModeService } from '../mode.service';

/**
 * Theme 4. There is no real video file in the repository (it would be large and add nothing to the checks):
 * the <video> elements have a poster and no source. The audio is a one-second generated tone.
 */
@Component({
  selector: 'app-multimedia',
  template: `
    @if (m.ok()) {
      <h1>Multimédia</h1>

      <section aria-labelledby="video">
        <h2 id="video">Vidéo</h2>
        <video controls width="420" poster="img/team.svg" preload="none">
          <track kind="captions" srclang="fr" label="Français" src="media/demo.vtt" default>
          <p>Votre navigateur ne lit pas les vidéos. <a href="#video">Voir la transcription</a>.</p>
        </video>
        <details><summary>Transcription textuelle</summary><p>Bonjour, bienvenue sur le site de test. Cette vidéo présente l’équipe.</p></details>
        <p><a href="media/audiodescription.txt">Version avec audiodescription (texte)</a></p>
      </section>

      <section aria-labelledby="audio">
        <h2 id="audio">Son</h2>
        <audio controls src="media/tone.wav" preload="none"></audio>
        <details><summary>Transcription textuelle</summary><p>Un signal sonore de une seconde.</p></details>
      </section>
    } @else {
      <div class="big">Multimédia</div>

      <div class="big small">Vidéo</div>
      <video width="420" poster="img/team.svg" autoplay muted loop></video>
      <p>Cette vidéo se lance seule, tourne en boucle et n’a ni commandes, ni sous-titres, ni transcription.</p>

      <div class="big small">Son</div>
      <audio src="media/tone.wav" autoplay loop></audio>
      <p>Un son se déclenche automatiquement et ne peut pas être arrêté.</p>
    }
  `,
  styles: `video { display: block; max-width: 100%; background: #0f172a } .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 } .big.small { font-size: 1.3rem }`,
})
export class Multimedia {
  protected readonly m = inject(ModeService);
}
