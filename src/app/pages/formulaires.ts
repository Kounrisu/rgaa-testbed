import { Component, inject, signal } from '@angular/core';
import { ModeService } from '../mode.service';

/** Theme 11: labels, groups, required fields, input assistance, error messages, autocomplete, submit buttons. */
@Component({
  selector: 'app-formulaires',
  template: `
    @if (m.ok()) {
      <h1>Formulaires</h1>
      <p>Les champs marqués <span aria-hidden="true">*</span><span class="sr-only">d’un astérisque</span> sont obligatoires.</p>

      @if (errors().length) {
        <div role="alert" class="summary" tabindex="-1" #summary>
          <h2>Le formulaire contient {{ errors().length }} erreur(s)</h2>
          <ul>@for (e of errors(); track e.id) { <li><a [href]="'#' + e.id" (click)="focusField($event, e.id)">{{ e.text }}</a></li> }</ul>
        </div>
      }
      @if (sent()) { <p role="status" class="ok-msg">Merci, le formulaire est envoyé.</p> }

      <form (submit)="submit($event)" novalidate>
        <label for="name">Nom complet <span aria-hidden="true">*</span></label>
        <input id="name" name="name" type="text" autocomplete="name" required aria-required="true" [attr.aria-invalid]="has('name') ? 'true' : null" [attr.aria-describedby]="has('name') ? 'name-err' : null">
        @if (has('name')) { <p id="name-err" class="err">Erreur : saisissez votre nom.</p> }

        <label for="email">Courriel <span aria-hidden="true">*</span></label>
        <input id="email" name="email" type="email" autocomplete="email" required aria-required="true" aria-describedby="email-hint email-err-slot" [attr.aria-invalid]="has('email') ? 'true' : null">
        <p id="email-hint" class="note">Format attendu : prenom.nom&#64;exemple.fr</p>
        <p id="email-err-slot" class="err">@if (has('email')) { Erreur : saisissez une adresse de courriel valide. }</p>

        <label for="tel">Téléphone</label>
        <input id="tel" name="tel" type="tel" autocomplete="tel">

        <label for="cp">Code postal</label>
        <input id="cp" name="cp" type="text" inputmode="numeric" autocomplete="postal-code">

        <fieldset>
          <legend>Civilité</legend>
          <label><input type="radio" name="civ" value="f"> Madame</label>
          <label><input type="radio" name="civ" value="m"> Monsieur</label>
          <label><input type="radio" name="civ" value="n"> Ne se prononce pas</label>
        </fieldset>

        <label for="topic">Sujet</label>
        <select id="topic" name="topic">
          <optgroup label="Accessibilité"><option>RGAA</option><option>WCAG</option></optgroup>
          <optgroup label="Autre"><option>Question générale</option></optgroup>
        </select>

        <label for="msg">Message</label>
        <textarea id="msg" name="msg" rows="4" cols="40"></textarea>

        <fieldset><legend>Options</legend>
          <label><input type="checkbox" name="news"> Recevoir la lettre d’information</label>
        </fieldset>

        <p><button type="submit">Envoyer le formulaire</button> <button type="reset" class="secondary">Effacer</button></p>
      </form>
    } @else {
      <div class="big">Formulaires</div>
      <p><span class="red">Les champs en rouge</span> sont obligatoires.</p>
      <div class="msg-red">{{ sent() ? 'OK' : '' }}</div>
      <form (submit)="submit($event)" novalidate>
        <input type="text" placeholder="Nom complet" class="red-border"><br><br>
        <input type="text" placeholder="Courriel"><br><br>
        <label for="nothing-here">Téléphone</label>
        <input type="text" id="tel-x"><br><br>
        <input type="text" placeholder="Code postal" name="x"><br><br>
        <div>Civilité</div>
        <input type="radio" name="civ"> Madame <input type="radio" name="civ"> Monsieur<br><br>
        <select><option>RGAA</option><option>WCAG</option></select><br><br>
        <textarea rows="3" cols="40" placeholder="Message"></textarea><br><br>
        <input type="checkbox"> Recevoir la lettre d’information<br><br>
        @if (errors().length) { <div class="red">Champ invalide</div> }
        <div class="fake-submit" (click)="submit($event)">Envoyer</div>
        <input type="image" src="img/icon-home.svg" width="24" height="24">
      </form>
    }
  `,
  styles: `
    .summary { border: 2px solid #b00020; padding: .5rem 1rem; margin-block: 1rem } .summary h2 { font-size: 1.1rem; margin: 0 }
    .ok-msg { color: #166534; font-weight: 700 }
    .red { color: #dc2626 } .red-border { border: 2px solid #dc2626 } .msg-red { color: #16a34a }
    .fake-submit { display: inline-block; background: #1d4ed8; color: #fff; padding: .45rem .9rem; cursor: pointer }
    .big { font-size: 2rem; font-weight: 700; margin: 1rem 0 }
    input[type=radio], input[type=checkbox] { margin-right: .4rem } label input[type=radio], label input[type=checkbox] { margin-top: 0 }
  `,
})
export class Formulaires {
  protected readonly m = inject(ModeService);
  protected readonly errors = signal<{ id: string; text: string }[]>([]);
  protected readonly sent = signal(false);

  protected has(id: string): boolean { return this.errors().some((e) => e.id === id); }

  protected submit(event: Event): void {
    event.preventDefault();
    const form = (event.target as HTMLElement).closest('form') ?? document.querySelector('form');
    const get = (id: string) => (form?.querySelector<HTMLInputElement>('#' + id)?.value ?? '').trim();
    const errors: { id: string; text: string }[] = [];
    if (this.m.ok()) {
      if (!get('name')) errors.push({ id: 'name', text: 'Nom complet : saisissez votre nom' });
      if (!/^\S+@\S+\.\S+$/.test(get('email'))) errors.push({ id: 'email', text: 'Courriel : saisissez une adresse valide' });
    } else if (!form?.querySelector<HTMLInputElement>('input[type=text]')?.value) {
      errors.push({ id: 'x', text: 'invalide' });
    }
    this.errors.set(errors);
    this.sent.set(errors.length === 0);
  }

  protected focusField(event: Event, id: string): void {
    event.preventDefault();
    document.getElementById(id)?.focus();
  }
}
