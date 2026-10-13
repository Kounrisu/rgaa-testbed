import { Injectable, computed, effect, signal } from '@angular/core';

/**
 * The testbed ships two versions of every page: a compliant one (default) and one with deliberate RGAA errors
 * (`?mode=broken`). The list of the errors, with their criteria, is in ERRORS.md.
 */
@Injectable({ providedIn: 'root' })
export class ModeService {
  readonly broken = signal(new URLSearchParams(window.location.search).get('mode') === 'broken');
  readonly ok = computed(() => !this.broken());

  constructor() {
    // 8.3: the default language of the page. The broken version drops it.
    effect(() => {
      if (this.broken()) document.documentElement.removeAttribute('lang');
      else document.documentElement.lang = 'fr';
    });
  }
}
