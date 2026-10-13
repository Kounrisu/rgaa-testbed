import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ModeService } from './mode.service';

/** 8.5 / 8.6: the compliant version gives each page its own title; the broken one keeps the same title everywhere. */
const title = (name: string) => () => (inject(ModeService).broken() ? 'RGAA Testbed' : `${name} — RGAA Testbed`);

export const routes: Routes = [
  { path: '', title: title('Accueil'), loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'images', title: title('Images'), loadComponent: () => import('./pages/images').then((m) => m.Images) },
  { path: 'cadres', title: title('Cadres'), loadComponent: () => import('./pages/cadres').then((m) => m.Cadres) },
  { path: 'presentation', title: title('Couleurs et présentation'), loadComponent: () => import('./pages/presentation').then((m) => m.Presentation) },
  { path: 'multimedia', title: title('Multimédia'), loadComponent: () => import('./pages/multimedia').then((m) => m.Multimedia) },
  { path: 'tableau', title: title('Tableau et pagination'), loadComponent: () => import('./pages/tableau').then((m) => m.Tableau) },
  { path: 'popin', title: title('Popin et scripts'), loadComponent: () => import('./pages/popin').then((m) => m.Popin) },
  { path: 'structure', title: title('Structuration'), loadComponent: () => import('./pages/structure').then((m) => m.Structure) },
  { path: 'formulaires', title: title('Formulaires'), loadComponent: () => import('./pages/formulaires').then((m) => m.Formulaires) },
  { path: 'navigation', title: title('Navigation, liens et consultation'), loadComponent: () => import('./pages/navigation').then((m) => m.Navigation) },
  { path: '**', redirectTo: '' },
];
